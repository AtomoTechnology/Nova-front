import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ role, isLogged, component: Component, ...rest }) => {
  return <Route {...rest} component={(props) => (isLogged ? <Component {...props} /> : <Redirect to="/index" />)} />;
};

PrivateRoute.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
