import { auth, database } from './firebase';

// actions
import { logout, startLoading, stopLoading, updateUser } from './poke';

const closeDeleteDialog = () => ({
  type: 'CLOSE_DELETE_DIALOG',
});

const openDeleteDialog = () => ({
  type: 'OPEN_DELETE_DIALOG',
});

const updateEmail = (email) => ({
  type: 'UPDATE_EMAIL',
  email,
});

const updatePassword = (password) => ({
  type: 'UPDATE_PASSWORD',
  password,
});

const deleteAccount = (uid, email, password) => async(dispatch) => {
  dispatch(startLoading('indeterminate'));
  // add to task queue for deletion
  await database.ref('removeUser').child('tasks').push({ uid });
  await auth.currentUser.reauthenticate(
    firebase.auth.EmailAuthProvider.credential(email, password)
  );
  await auth.currentUser.delete();
  await database.ref('users').child(uid).remove();
  dispatch(stopLoading());
  dispatch(logout('/'));
};

const updateAccessInfo = (developer) => ({
  type: 'UPDATE_ACCESS_INFO',
  developer,
});

const clearAccessInfo = () => ({
  type: 'CLEAR_ACCESS_INFO',
});

const getAccessInfo = (developerId) => async(dispatch) => {
  try {
    dispatch(startLoading('indeterminate'));
    const developer = await database.ref('developers').child(developerId).once('value');
    dispatch(stopLoading());
    if (developer.val()) {
      dispatch(updateAccessInfo(developer.val()));
    } else {
      // developer doesn't exist or has not been approved
    }
  } catch(e) {

  }
};

const getUser = (uid) => async(dispatch) => {
  let user = await database.ref('users').child(uid).once('value');
  user = user.val();
  if (user) {
    const approved = Object.values(user.approved || {});
    dispatch(updateUser(user.uid, approved));
  }
};

const removeDeveloper = (developerId, uid) => async(dispatch) => {
  await database.ref('users').child(uid).child('approved')
  .child(developerId).remove();
  dispatch(getUser(uid));
};

const approve = (developer, uid, callbackUrl) => async() => {
  await database.ref('users').child(uid).child('approved')
  .child(developer.uid).set(developer);
  window.location = `${callbackUrl}?uid=${uid}`;
};

const deny = (callbackUrl) => {
  window.location = `${callbackUrl}?error="Access Denied"`;
};

module.exports = {
  updateUser, deleteAccount, openDeleteDialog,
  closeDeleteDialog, updateEmail, updatePassword,
  getAccessInfo, clearAccessInfo, approve,
  removeDeveloper, deny,
};
