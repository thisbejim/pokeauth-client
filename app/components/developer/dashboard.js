import React from 'react';

// react router
import { browserHistory } from 'react-router';

// css
import responsive from '../../css/responsive.css';

// components
import { Row, Column } from '../grid/grid';

import { TextField, Toggle, FlatButton } from 'material-ui';

// actions
import {
  validate, updateField, openSnackBar,
  logout,
} from '../../actions/index';

export const DeveloperDashboard = (props) => {
  const form = props.state.forms.developerDashboard;
  const user = props.state.user;
  if (user.authType) {
    if (user.authType === 'developer') {
      return (
        <Row>
          <Column md={4} sm={3} />
          <Column md={4} sm={6}>
            <TextField
              onChange={(e) => props.dispatch(
                updateField('developerDashboard', 'serviceName', e.target.value)
              )}
              id="serviceName"
              hintText="serviceName"
              floatingLabelText="service name"
              value={form.serviceName}
              errorText={form.error.serviceName}
              fullWidth
            />
            <TextField
              onChange={(e) => props.dispatch(
                updateField('developerDashboard', 'serviceDescription', e.target.value)
              )}
              id="serviceDescription"
              hintText="serviceDescription"
              floatingLabelText="service description"
              multiLine
              rows={2}
              value={form.serviceDescription}
              errorText={form.error.serviceDescription}
              fullWidth
            />
            <TextField
              onChange={(e) => props.dispatch(
                updateField('developerDashboard', 'callbackUrl', e.target.value)
              )}
              id="callbackUrl"
              hintText="callbackUrl"
              floatingLabelText="callback url"
              value={form.callbackUrl}
              errorText={form.error.callbackUrl}
              fullWidth
            />
            <TextField
              onChange={(e) => props.dispatch(
                updateField('developerDashboard', 'localCallback', e.target.value)
              )}
              id="localCallback"
              hintText="localCallback"
              floatingLabelText="development callback"
              value={form.localCallback}
              errorText={form.error.localCallback}
              fullWidth
            />
            <TextField
              id="accessUrl"
              inputStyle={styles.accessUrl}
              hintText="send your users to this url"
              floatingLabelText="send your users to this url"
              defaultValue={`https://www.pokeauth.com/access?clientId=${form.uid}`}
              fullWidth
              disabled
            />
            <Toggle
              id="Production"
              defaultToggled={form.production}
              label="Production"
              onToggle={(e, value) => props.dispatch(
                updateField('developerDashboard', 'production', value)
              )}
            />
            <div className={responsive.textCenter}>
              <FlatButton
                label="Save Changes"
                primary
                onTouchTap={() => props.dispatch(
                  validate(props.state.forms, 'developerDashboard')
                )}
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
      );
    } else if (user.authType === 'user') {
      browserHistory.push('/dashboard');
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
  accessUrl: {
    color: 'rgba(0, 0, 0, 0.870588)',
  },
};
