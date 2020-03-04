import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import logger from "redux-logger"

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import App from "./components/App";
import Theme from "./components/Theme";
import reducers from "./reducers";

import "./index.css";

const theme = createMuiTheme({
    typography: {
        fontFamily: "serif",
    },
    palette: {
        primary: {
            main: "#646380",
        },
        secondary: {
            main: "#9EAEE5",
        }
    },
})

const middlewares = [];

middlewares.push(reduxThunk);

if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger)
}

const store = createStore(reducers, {}, applyMiddleware(...middlewares))

ReactDOM.render(
    <Provider store={store}>
        <Theme>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </Theme>
    </Provider>,
    document.getElementById("root")
)