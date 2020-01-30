import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import logger from "redux-logger"

import App from "./components/App";
import reducers from "./reducers";

import "./index.css";

const middlewares = [];

middlewares.push(reduxThunk);

if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger)
}

const store = createStore(reducers, {}, applyMiddleware(...middlewares))

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
)