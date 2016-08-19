import React from 'react';

// react router
import { browserHistory } from 'react-router';

// css
import responsive from '../../css/responsive.css';

// components
import {
  List, ListItem, Subheader,
  FlatButton, TextField, Dialog,
} from 'material-ui';

import ContentClear from 'material-ui/svg-icons/content/clear';

import { Row, Column } from '../grid/grid';

// actions
import {
  deleteAccount, openDeleteDialog, closeDeleteDialog,
  updateEmail, updatePassword, removeDeveloper,
  openSnackBar, logout,
} from '../../actions/index';

export const UserDashboard = (props) => {
  const user = props.state.user;
  if (user.authType) {
    if (user.authType === 'user') {
      const approved = props.state.user.approved.map((developer, index) => {
        return (
          <ListItem
            key={index}
            primaryText={developer.serviceName}
            rightIcon={
              <ContentClear
                onTouchTap={() => props.dispatch(
                  removeDeveloper(developer.uid, developer.serviceName, user.uid)
                )}
              />
            }
          />
        );
      });
      const display = approved.length ? approved : null;

      const actions = [
        <FlatButton
          label="Cancel"
          primary
          onTouchTap={() => props.dispatch(closeDeleteDialog())}
        />,
        <FlatButton
          label="Delete"
          primary
          onTouchTap={() => props.dispatch(deleteAccount(user.uid, user.email, user.password))}
        />,
      ];
      return (
        <span>
          <Row>
            <Column md={4} sm={3} />
            <Column md={4} sm={6}>
              <List>
                <Subheader>Approved Applications</Subheader>
                {display}
              </List>
            </Column>
          </Row>
          <Row>
            <Column md={4} sm={3} />
            <Column md={4} sm={3}>
              <div className={responsive.textCenter}>
                <FlatButton
                  style={styles.deleteButton}
                  label="Delete Account"
                  primary
                  onTouchTap={() => props.dispatch(openDeleteDialog())}
                />
                <FlatButton
                  label="Sign Out"
                  primary
                  onTouchTap={() => props.dispatch(
                    logout('/')
                  )}
                />
              </div>
            </Column>
          </Row>
          <Dialog
            title="Delete your account"
            contentStyle={styles.dialog}
            actions={actions}
            modal={false}
            open={user.deleteDialogOpen}
            onRequestClose={() => props.dispatch(closeDeleteDialog())}
          >
            <TextField
              onChange={(e) => props.dispatch(updateEmail(e.target.value))}
              value={user.email}
              id="email"
              hintText="Email"
              floatingLabelText="Email"
            />
            <br />
            <TextField
              onChange={(e) => props.dispatch(updatePassword(e.target.value))}
              value={user.password}
              id="password"
              hintText="Password"
              floatingLabelText="Password"
            />
          </Dialog>
        </span>
      );
    } else if (user.authType === 'developer') {
      browserHistory.push('/developer/dashboard');
    } else {
      props.dispatch(openSnackBar('Please create or sign in to your account.'));
      browserHistory.push('/login');
    }
  }
  return (
    <span />
  );
};

const styles = {
  deleteButton: {
    textAlign: 'right',
  },
  dialog: {
    width: 300,
  },
};
