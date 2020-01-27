import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header/Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed/Feed";
import SearchResult from "./SearchResult/SearchResult"
import Notification from "./Notif"
import Check from "./Check"
import Topic from "./Topic"
import SurveyNew from "./surveys/SurveyNew"
import Draft from "./Draft/DraftNavigation"
import DraftEdit from "./Draft/DraftEdit"
import CreateTopic from "./CreateTopic"

const Profile = () => <h2>Profile</h2>
const CreatePost = () => <h2>Post</h2>

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
                            <Route exact path="/draft" component={Draft} />
                            <Route path="/draft/edit/:id" component={DraftEdit} />
                            <Route path="/search" component={SearchResult} />
                            <Route exact path="/notification" component={Notification} />
                            <Route path="/notification/check/:id" component={Check} />
                            <Route path="/create/post" component={CreatePost} />
                            <Route path="/create/topic" component={CreateTopic} />
                            <Route path="/topic/:id" component={Topic} />
                            <Route path="/profile/:id" component={Profile} />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);