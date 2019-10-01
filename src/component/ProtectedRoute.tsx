import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReduxState } from 'reducers';

type Props = {
  connected: boolean;
  component: any;
  [key: string]: any;
  advisorConnected: boolean;
};

const ProtectedRoute = ({
  component: Component,
  connected,
  advisorConnected,
  ...rest
}: Props) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        connected ? (
          <Component {...props} />
        ) : advisorConnected ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state: ReduxState) => ({
  connected: state.login.get('connected'),
  advisorConnected: state.loginAdvisor.get('connected'),
});

export default connect(mapStateToProps)(ProtectedRoute);
