import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import SearchResult from "./SearchResult/SearchResult"
import Notification from "./Notif"
import Check from "./Check"
// import Draft from "./Draft"

const Draft = () => <h2>Draft</h2>
const Topic = () => <h2>Topic</h2>
const User = () => <h2>User</h2>

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="browser">
                <BrowserRouter>
                    <div className="router">
                        <Header />
                        <Sidebar />
                        <div className="fakebox">
                            <Route exact path="/" component={Feed} />
                            <Route path="/draft" component={Draft} />
                            <Route path="/search" component={SearchResult} />
                            <Route exact path="/notification" component={Notification} />
                            <Route path="/notification/check" component={Check} />
                            <Route path="/topic" component={Topic} />
                            <Route path="/user" component={User} />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);