import React from 'react';

// react-router
import { Link } from 'react-router';

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

export const Login = (props) => {
  const form = props.state.forms.userLogin;
  return (
    <span>
      <Row>
        <Column md={4} sm={4} />
        <Column md={4} sm={4}>
          <div style={styles.header}>
            <h1 className={responsive.textCenter}>PokéAuth</h1>
            <p className={responsive.textCenter}>One account for all 3rd party apps.</p>
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
                  updateField('userLogin', 'email', e.target.value)
                )}
                id="email"
                hintText="Email"
                floatingLabelText="Email"
                value={form.email}
                errorText={form.error.email}
                fullWidth
              />
              <TextField
                onChange={(e) => props.dispatch(
                  updateField('userLogin', 'password', e.target.value)
                )}
                id="password"
                hintText="Password"
                floatingLabelText="Password"
                type="password"
                value={form.password}
                errorText={form.error.password}
                fullWidth
              />
            </CardText>
            <CardActions style={styles.cardActions}>
              <FlatButton
                label="Login"
                primary
                onTouchTap={() => props.dispatch(
                  validate(props.state.forms, 'userLogin')
                )}
              />
            </CardActions>
          </Card>
        </Column>
      </Row>
      <Row>
        <Column md={4} sm={4} />
        <Column md={4} sm={4}>
          <div style={styles.accountLink} className={responsive.textCenter}>
            <Link to="/register">Need an account?</Link>
          </div>
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
  accountLink: {
    marginTop: 10,
  },
};
