// @flow
import React from 'react';

// react router
import { browserHistory } from 'react-router';

// css
import responsive from '../../css/responsive.css';

// components
import { Row, Column } from '../grid/grid';

import {
  List, ListItem, Subheader,
  FlatButton,
} from 'material-ui';

// actions
import {
  getAccessInfo, clearAccessInfo, approve,
  deny, openSnackBar,
} from '../../actions/index';

export class Access extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAccessInfo(this.props.location.query.clientId));
  }
  componentWillUnmount() {
    this.props.dispatch(clearAccessInfo());
  }
  render() {
    const dispatch = this.props.dispatch;
    const user = this.props.state.user
    const developer = user.access;
    if (user.authType) {
      if (user.authType === 'user') {
        if (developer && user.uid) {
          const url = developer.production ? developer.callbackUrl : developer.localCallback;
          // send user to callback if already approved
          const alreadyApproved = user.approved.find((dev) => dev.uid === developer.uid);
          if (alreadyApproved) {
            window.location = `${url}?uid=${user.uid}`;
            return (
              <span />
            );
          }
          return (
            <span>
              <Row>
                <Column md={4} sm={4} />
                <Column md={4} sm={4}>
                  <div className={responsive.textCenter}>
                    <List>
                      <Subheader>{developer.serviceName} would like to:</Subheader>
                      <ListItem primaryText="Use your PokemonGo access token" />
                    </List>
                  </div>
                  <div className={responsive.textRight}>
                    <FlatButton
                      label="Deny"
                      primary
                      onTouchTap={() => dispatch(
                        deny(url)
                      )}
                    />
                    <FlatButton
                      label="Allow"
                      primary
                      onTouchTap={() => dispatch(
                        approve(developer, user.uid, url)
                      )}
                    />
                  </div>
                </Column>
              </Row>
            </span>
          );
        }
      } else {
        dispatch(openSnackBar('Please create or sign in to your account.'));
        browserHistory.push('/login');
      }
    }
    return (
      <span />
    );
  }
}
