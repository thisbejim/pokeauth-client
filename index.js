// react
import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { reducer } from './app/reducers/index';
import thunk from 'redux-thunk';

// material-ui
import { MuiThemeProvider, LinearProgress, Snackbar } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// react-router
import {
  Router, Route, IndexRoute,
  browserHistory,
} from 'react-router';

// components
import {
  Login, Register, Success,
  DeveloperLogin, DeveloperRegister, Access,
  RegisterProcessing, RegisterError,
} from './app/components/auth/index';

import { DeveloperDashboard } from './app/components/developer/index';
import { AdminDashboard } from './app/components/admin/index';
import { UserDashboard } from './app/components/user/index';
import { NavBar } from './app/components/navBar/index';
import { Container } from './app/components/grid/grid';

// actions
import { startUp, closeSnackBar } from './app/actions/index';

class App extends React.Component {
  props: Props;
  componentDidMount() {
    this.props.dispatch(startUp(this.props.state, this.props.location.pathname));
  }
  render() {
    // clone state and dispatch to child component props
    let elements;
    if (this.props.children) {
      elements = React.cloneElement(this.props.children,
        {
          state: this.props.state,
          dispatch: this.props.dispatch,
        }
      );
    }
    const state = this.props.state;
    const loading = state.poke.loading
      ? <LinearProgress mode={state.poke.loadingType} value={state.poke.progress} />
      : null;
    return (
      <MuiThemeProvider>
        <span>
          {loading}
          <NavBar state={state} dispatch={this.props.dispatch} />
          <Container>
            <div style={{ marginBottom: 30 }} />
            {elements}
            <Snackbar
              open={state.poke.snackBarOpen}
              message={state.poke.snackBarMessage}
              onRequestClose={() => this.props.dispatch(closeSnackBar())}
            />
          </Container>
        </span>
      </MuiThemeProvider>
    );
  }
}

// create store
const store = createStore(reducer, applyMiddleware(thunk));

const mapStateToProps = (state) => ({
  state,
});

// connect to store
const AppContainer = connect(
  mapStateToProps
)(App);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={Login} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/register/processing" component={RegisterProcessing} />
        <Route path="/register/error" component={RegisterError} />
        <Route path="/register/success" component={Success} />
        <Route path="/dashboard" component={UserDashboard} />
        <Route path="/access" component={Access} />

        <Route path="/developer/login" component={DeveloperLogin} />
        <Route path="/developer/register" component={DeveloperRegister} />
        <Route path="/developer/dashboard" component={DeveloperDashboard} />

        <Route path="/admin/dashboard" component={AdminDashboard} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
