import React from "react";
import ReactDOM from "react-dom";

import AppWrapper from "./AppWrapper";
import App from "./App";
import { Provider } from "react-redux";
import store from "./components/redux/store";

ReactDOM.render(
  <AppWrapper>
    <Provider store={store}>
      <App />
    </Provider>
  </AppWrapper>,
  document.getElementById("root")
);
