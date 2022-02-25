import React, { useEffect } from 'react';
import AddUser from '../components/users/AddUser';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import { startChecking } from '../action/authAction';
import { Login } from '../components/auth/Login';
import { Index } from '../components/Index';
import { Loading } from '../components/Loading';
import { CheckState } from '../components/works/CheckState';
import Dashboard from './Dashboard';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export default function AppRoute() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startChecking());
  }, []);
  const { uid, role, checking } = useSelector((state) => state.auth);

  if (checking) {
    return <Loading />;
  }
  return (
    <Router>
      <>
        <Switch>
          <PublicRoute isLogged={!!uid} component={Index} exact path="/index" />
          <PublicRoute isLogged={!!uid} exact path="/login" component={Login} />
          <PublicRoute isLogged={!!uid} exact path="/register" component={AddUser} />
          <PublicRoute isLogged={!!uid} exact path="/work/check" component={CheckState} />
          <PrivateRoute role={role} isLogged={!!uid} path="/" refresh={true} component={Dashboard} />
          {/* <Redirect to="/index" /> */}
        </Switch>
      </>
    </Router>
  );
}
