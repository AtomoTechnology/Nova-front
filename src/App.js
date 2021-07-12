import React from "react";
import AppRoute from "./routes/AppRoute";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { startChecking } from "./action/authAction";

export const App = () => {
  return (
    <Provider store={store}>
      <AppRoute />
    </Provider>
  );
};
