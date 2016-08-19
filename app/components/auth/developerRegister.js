import React from 'react';

// css
import responsive from '../../css/responsive.css';

// components
import { Row, Column } from '../grid/grid';

import {
  TextField, FlatButton, Card,
  CardActions, CardText,
} from 'material-ui';

// actions
import { updateField, validate } from '../../actions/index';

export const DeveloperRegister = (props) => {
  const form = props.state.forms.developerRegister;
  return (
    <span>
      <Row>
        <Column md={4} sm={3} />
        <Column md={4} sm={3}>
          <div style={styles.header}>
            <h1 className={responsive.textCenter}>PokéAuth</h1>
            <h5 className={responsive.textCenter}>Developer Account Application</h5>
          </div>
        </Column>
      </Row>
      <Row>
        <Column md={4} sm={3} />
        <Column md={4} sm={6}>
          <Card>
            <CardText style={styles.cardText}>
              <TextField
                onChange={(e) => props.dispatch(
                  updateField('developerRegister', 'email', e.target.value)
                )}
                id="email"
                hintText="email"
                floatingLabelText="email"
                value={form.email}
                errorText={form.error.email}
                fullWidth
              />
              <TextField
                onChange={(e) => props.dispatch(
                  updateField('developerRegister', 'password', e.target.value)
                )}
                id="password"
                hintText="password"
                floatingLabelText="password"
                type="password"
                value={form.password}
                errorText={form.error.password}
                fullWidth
              />
              <TextField
                onChange={(e) => props.dispatch(
                  updateField('developerRegister', 'serviceName', e.target.value)
                )}
                id="serviceName"
                hintText="service name"
                floatingLabelText="service name"
                value={form.serviceName}
                errorText={form.error.serviceName}
                fullWidth
              />
              <TextField
                onChange={(e) => props.dispatch(
                  updateField('developerRegister', 'serviceDescription', e.target.value)
                )}
                id="serviceDescription"
                floatingLabelText="service description"
                multiLine
                rows={2}
                value={form.serviceDescription}
                errorText={form.error.serviceDescription}
                fullWidth
              />
              <TextField
                onChange={(e) => props.dispatch(
                  updateField('developerRegister', 'callbackUrl', e.target.value)
                )}
                id="callbackUrl"
                hintText="callback url"
                floatingLabelText="callback url"
                value={form.callbackUrl}
                errorText={form.error.callbackUrl}
                fullWidth
              />
            </CardText>
            <CardActions style={styles.cardActions}>
              <FlatButton
                label="Register"
                primary
                onTouchTap={() => props.dispatch(
                  validate(props.state.forms, 'developerRegister')
                )}
              />
            </CardActions>
          </Card>
        </Column>
      </Row>
    </span>
  );
};

const styles = {
  header: {
    marginBottom: 40,
  },
  cardText: {
    paddingTop: 2,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
  },
  cardActions: {
    width: '100%',
    textAlign: 'right',
    paddingTop: 0,
  },
};
