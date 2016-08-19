import React from 'react';

// react router
import { browserHistory } from 'react-router';

// components
import {
  AppBar,
  FlatButton,
} from 'material-ui';


export const NavBar = (props) => {
  if (props.state.poke.isAdmin) {
    return (
      <AppBar
        showMenuIconButton={false}
        iconElementRight={
          <FlatButton onClick={() => browserHistory.push('/admin/dashboard')} label="Admin" />
        }
      />
    );
  }
  return null;
};
