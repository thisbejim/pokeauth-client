import React from 'react';

import { browserHistory } from 'react-router';

// css
import responsive from '../css/responsive.css';

import { auth, database } from './firebase';

const startUp = (state, path) => (dispatch) => {
  dispatch(startLoading('indeterminate'));
  // check auth
  auth.onAuthStateChanged(async(authState) => {
    if (authState) {
      // check if authState contains a user or developer
      let [user, developer] = await Promise.all([
        database.ref('users').child(authState.uid).child('uid').once('value'),
        database.ref('developers').child(authState.uid).once('value'),
      ]);
      // check if user is a developer
      user = user.val();
      developer = developer.val();
      if (user) {
        dispatch(authChecked('user'));
        dispatch(getUser(authState.uid));
        // send to dashboard if not on the access page
        if (!['/access'].includes(path)) {
          browserHistory.push('/dashboard');
        }
        // check if user is admin
        const admin = await database.ref('admins').child(authState.uid).once('value');
        if (admin.val()) {
          dispatch(isAdmin());
        }
      } else if (developer) {
        dispatch(authChecked('developer'));
        dispatch(updateDeveloper(developer));
        if (!['/access'].includes(path)) {
          browserHistory.push('/developer/dashboard');
        }
      }
      dispatch(stopLoading());
    } else {
      dispatch(authChecked('loggedOut'));
      dispatch(stopLoading());
    }
  });
};

const getUser = (uid) => async(dispatch) => {
  let userApproved = await database.ref('users').child(uid).child('approved').once('value');
  userApproved = userApproved.val();
  const approved = Object.values(userApproved || {});
  dispatch(updateUser(uid, approved));
};

const authChecked = (authType) => ({
  type: 'AUTH_CHECKED',
  authType,
});

const updateUser = (uid, approved) => ({
  type: 'UPDATE_USER',
  uid,
  approved,
});

const updateDeveloper = (developer) => ({
  type: 'UPDATE_DEVELOPER',
  developer,
});

const finishLogout = () => ({
  type: 'LOGOUT',
});

const logout = (path) => async(dispatch) => {
  browserHistory.push(path);
  await auth.signOut();
  // send user to designated path
  dispatch(finishLogout());
};

const isAdmin = () => ({
  type: 'IS_ADMIN',
});

const updateDevelopers = (developers) => ({
  type: 'UPDATE_DEVELOPERS',
  developers,
});

const getDevelopers = () => async(dispatch) => {
  try {
    let developers = await database.ref('developers').once('value');
    developers = developers.val();
    if (developers) {
      dispatch(updateDevelopers(Object.values(developers)));
    }
  } catch(e) {
    console.log(e)
  }
};

const progress = (value) => ({
  type: 'PROGRESS',
  value,
});

const startLoading = (loadingType) => ({
  type: 'START_LOADING',
  loadingType,
});

const stopLoading = () => ({
  type: 'STOP_LOADING',
});

const snackBarMessage = (message) => ({
  type: 'OPEN_SNACK_BAR',
  message,
});

const openSnackBar = (message) => (dispatch) => {
  setTimeout(() => dispatch(closeSnackBar()), 4000);
  // work around for getting the snackbar to only display once
  // https://github.com/callemall/material-ui/issues/3186

  // delay display because the SnackBar is buggy
  setTimeout(() => dispatch(
    dispatch(snackBarMessage(
      [<p key="message" className={responsive.textCenter}>{message}</p>]
    ))
  ), 100);
};

const closeSnackBar = () => ({
  type: 'CLOSE_SNACK_BAR',
});

module.exports = {
  startUp, startLoading, stopLoading,
  progress, getDevelopers, logout,
  finishLogout, updateDeveloper, updateUser,
  getUser, openSnackBar, closeSnackBar,
};
