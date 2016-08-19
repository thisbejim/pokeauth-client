// react-router
import { browserHistory } from 'react-router';

// openpgp
import * as openpgp from 'openpgp';

// firebase
import { auth, database, firebaseError } from './firebase';

// validator
import validator from 'validator';

// actions
import {
  startLoading, stopLoading, progress,
  openSnackBar, logout,
} from './poke';

const encrypt = async(data, pubKey) => {
  try {
    const options = {
      data,
      publicKeys: openpgp.key.readArmored(pubKey).keys,
    };
    const ciphertext = await openpgp.encrypt(options);
    return ciphertext.data;
  } catch (e) {
    return e;
  }
};

const updateField = (form, field, value) => ({
  type: 'UPDATE_FIELD',
  form,
  field,
  value,
});

const error = (form, field, value) => ({
  type: 'ERROR',
  form,
  field,
  value,
});


// form validations
const emailValidation = (value) => {
  if (!value) {
    return { valid: false, message: 'A valid email is required.' };
  }
  if (!validator.isEmail(value)) {
    return { valid: false, message: 'A valid email is required.' };
  }
  return { valid: true, message: null };
};

const passwordValidation = (value) => {
  if (!value) {
    return { valid: false, message: 'A password is required.' };
  }
  return { valid: true, message: null };
};

const urlValidation = (value) => {
  if (!value) {
    return { valid: false, message: 'A callback url is required.' };
  }
  if (!validator.isURL(value, { protocols: ['https', 'http'], require_protocol: true })) {
    return { valid: false, message: 'A valid callback url is required , e.g. https://www.mydomain.com/callback.' };
  }
  return { valid: true, message: null };
};

const serviceDescriptionValidation = (value) => {
  if (!value) {
    return { valid: false, message: 'A service description is required.' };
  }
  if (!validator.isLength(value, { min: 20, max: undefined })) {
    return { valid: false, message: 'Service description should be more than 20 characters.' };
  }
  return { valid: true, message: null };
};

const serviceNameValidation = (value) => {
  if (!value) {
    return { valid: false, message: 'A service name is required.' };
  }
  return { valid: true, message: null };
};

const validations = {
  developerRegister: {
    email: (value) => emailValidation(value),
    password: (value) => passwordValidation(value),
    serviceName: (value) => serviceNameValidation(value),
    serviceDescription: (value) => serviceDescriptionValidation(value),
    callbackUrl: (value) => urlValidation(value),
  },
  developerLogin: {
    email: (value) => emailValidation(value),
    password: (value) => passwordValidation(value),
  },
  developerDashboard: {
    serviceName: (value) => serviceNameValidation(value),
    serviceDescription: (value) => serviceDescriptionValidation(value),
    callbackUrl: (value) => urlValidation(value),
  },
  userRegister: {
    email: (value) => emailValidation(value),
    password: (value) => passwordValidation(value),
    pubKey: (value) => {
      if (!value) {
        return { valid: false, message: 'Unexpected error.' };
      }
      return { valid: true, message: null };
    },
  },
  userLogin: {
    email: (value) => emailValidation(value),
    password: (value) => passwordValidation(value),
  },
};

// form submissons
const login = async(email, password, dispatch) => {
  dispatch(startLoading('indeterminate'));
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (e) {
    dispatch(openSnackBar(firebaseError(e.code)));
  }
  dispatch(stopLoading());
};

const submit = {
  developerRegister: async(form, dispatch) => {
    dispatch(startLoading('indeterminate'));
    const developer = await auth.createUserWithEmailAndPassword(form.email, form.password);
    // set up push
    await database.ref('developers').child(developer.uid).set({
      serviceName: form.serviceName,
      serviceDescription: form.serviceDescription,
      callbackUrl: form.callbackUrl,
      localCallback: 'http://localhost:3000/callback',
      production: false,
      uid: developer.uid,
    });
    dispatch(stopLoading());
    browserHistory.push('/developer/dashboard');
  },
  developerLogin: async(form, dispatch) => await login(form.email, form.password, dispatch),
  developerDashboard: async(form, dispatch) => {
    await database.ref('developers').child(form.uid).update({
      serviceName: form.serviceName,
      serviceDescription: form.serviceDescription,
      callbackUrl: form.callbackUrl,
      localCallback: form.localCallback,
      production: form.production,
    });
    dispatch(openSnackBar('Changes saved.'));
  },
  userRegister: async(form, dispatch) => {
    dispatch(startLoading('indeterminate'));
    // second wave validation to make sure username is included for PTC
    if (form.provider === 'ptc') {
      if (!form.userName) {
        dispatch(error('userRegister', 'userName', 'Your PTC username is required'));
        return;
      }
    }
    // create the user
    browserHistory.push('/register/processing');
    const user = await auth.createUserWithEmailAndPassword(form.email, form.password);
    // encrypt sensitive data
    const encryptedUsername = await encrypt(form.userName, form.pubKey);
    const encryptedEmail = await encrypt(form.email, form.pubKey);
    const encryptedPassword = await encrypt(form.password, form.pubKey);
    // set up push
    await database.ref('tokens').child('tasks').child(user.uid).set({
      email: encryptedEmail,
      password: encryptedPassword,
      provider: form.provider,
      uid: user.uid,
      userName: encryptedUsername,
    });
    // watch for task registration progress
    dispatch(watch(user.uid));
  },
  userLogin: async(form, dispatch) => await login(form.email, form.password, dispatch),
};

const watch = (uid) => async(dispatch) => {
  dispatch(startLoading('determinate'));
  database.ref('tokens').child('tasks').child(uid).on('value', async(snap) => {
    const value = snap.val();
    if (value) {
      dispatch(progress(value._progress));
    } else {
      database.ref('token').child('tasks').child(uid).off('value');
      const userData = await database.ref('users').child(uid).child('uid').once('value');
      dispatch(stopLoading());
      if (!userData.val()) {
        dispatch(logout('/register'));
        dispatch(openSnackBar('Incorrect PokemonGo login details, please try again.'));
      } else {
        browserHistory.push('/register/success');
      }
    }
  });
};

// handle validations and submissions
const validate = (state, form) => (dispatch) => {
  const fields = Object.keys(state[form]);
  let allValid = true;
  for (const field of fields) {
    if (validations[form].hasOwnProperty(field)) {
      const validation = validations[form][field];
      const value = state[form][field];
      const { valid, message } = validation(value);
      if (!valid) {
        allValid = false;
        dispatch(error(form, field, message));
      } else {
        // clear any errors
        dispatch(error(form, field, ''));
      }
    }
  }
  if (allValid) {
    submit[form](state[form], dispatch);
  }
};

const changeProvider = (provider) => ({
  type: 'CHANGE_PROVIDER',
  provider,
});

module.exports = {
  updateField, validate, changeProvider,
};
