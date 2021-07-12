import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { startChecking } from "../action/authAction";
import { startGettingAllClient } from "../action/clientsAction";
import { Login } from "../components/auth/Login";
import { Loading } from "../components/Loading";
import Dashboard from "./Dashboard";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export default function AppRoute() {
  // get the data of the auth store
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startChecking());
    // dispatch(startGettingAllClient());
  }, []);
  const { uid, checking } = useSelector((state) => state.auth);
  // console.log(checking, uid);

  if (checking) {
    return <Loading />;
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isLogged={!!uid}
            exact
            path="/auth/login"
            component={Login}
          />
          <PrivateRoute isLogged={!!uid} path="/" component={Dashboard} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
}
