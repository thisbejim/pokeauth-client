import React from 'react';

// react-router
import { Link } from 'react-router';

// css
import responsive from '../../css/responsive.css';

// components
import { Row, Column } from '../grid/grid';

import {
  TextField, FlatButton, RadioButton,
  RadioButtonGroup, Card, CardActions,
  CardText,
} from 'material-ui';

// actions
import { updateField, validate, changeProvider } from '../../actions/index';

const getUserNameField = (form, dispatch) => {
  if (form.provider === 'ptc') {
    return (
      <TextField
        onChange={(e) => dispatch(
          updateField('userRegister', 'userName', e.target.value)
        )}
        id="userName"
        hintText={form.userNamePlaceholder}
        floatingLabelText={form.userNamePlaceholder}
        value={form.userName}
        errorText={form.error.userName}
        fullWidth
      />
    );
  }
  return null;
};

export const Register = (props) => {
  const form = props.state.forms.userRegister;
  const userNameField = getUserNameField(form, props.dispatch);
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
                  updateField('userRegister', 'email', e.target.value)
                )}
                id="email"
                hintText={form.emailPlaceholder}
                floatingLabelText={form.emailPlaceholder}
                value={form.email}
                errorText={form.error.email}
                fullWidth
              />
              {userNameField}
              <TextField
                onChange={(e) => props.dispatch(
                  updateField('userRegister', 'password', e.target.value)
                )}
                id="password"
                type="password"
                hintText={form.passwordPlaceholder}
                floatingLabelText={form.passwordPlaceholder}
                value={form.password}
                errorText={form.error.password}
                fullWidth
              />
              <RadioButtonGroup
                style={styles.radioButtonGroup}
                name="shipSpeed"
                defaultSelected="google"
                onChange={(event, value) => props.dispatch(
                  changeProvider(value)
                )}
              >
                <RadioButton
                  style={styles.radioButtonOne}
                  value="google"
                  label="Google"
                />
                <RadioButton
                  style={styles.radioButtonTwo}
                  value="ptc"
                  label="Pokémon Trainer Club"
                />
              </RadioButtonGroup>
            </CardText>
            <CardActions style={styles.cardActions}>
              <FlatButton
                label="Register"
                primary
                onTouchTap={() => props.dispatch(
                  validate(props.state.forms, 'userRegister')
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
            <Link to="/login">Already have an account?</Link>
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
  radioButtonGroup: {
    marginTop: 20,
  },
  radioButtonOne: {
    display: 'inline-block',
    width: '100px',
  },
  radioButtonTwo: {
    display: 'inline-block',
    width: '200px',
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
