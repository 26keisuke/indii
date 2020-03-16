import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet } from "react-helmet"

import GAListener from "./GA"
import Feed from "./Feed/Feed";
import SearchResult from "./SearchResult/SearchResult"
import Notification from "./Notif/Notif"
import EditConfirm from "./Notif/Confirm/Confirm"
import Topic from "./Topic/Topic"
import Post from "./Post/Post"
import Draft from "./Draft/Draft"
import DraftEditor from "./Draft/Editor/Editor"
import CreateTopic from "./Action/Topic/Create/Controller"
import Profile from "./Profile/Profile"
import CreatePost from "./Action/Post/Create/Controller"
import Action from "./Action/Action"
import EditTopic from "./Action/Topic/Edit/Controller"
import EditPost from "./Action/Post/Edit/Controller"
import AppState from "./AppState"
import Verification from "./Verification/Verification"
import Setting from "./Setting/Setting"
import Talk from "./Talk/Talk"
import Policy from "./Setting/Policy/Policy"
import Terms from "./Setting/Terms/Terms"
import WorkSpace from "./WorkSpace"

class App extends Component {

    render() {

        const { auth } = this.props

        return (
            <div className="browser">
                <Helmet>
                    <title>{"Indii | もっと詳しく。もっと楽しく。"}</title>
                    <meta name="description" content={"Indiiでは自分の持っている知識を簡単に共有することができます。力を合わして日本一のデータベースを作り上げましょう！"}/>
                    <meta name="keywords" content={"コミュニティー,コンピューターサイエンス,ギーク,オタク"}/>
                </Helmet>
                <BrowserRouter>
                    <GAListener>
                        <AppState>
                            <div className="fakebox">
                                <Route exact path="/" component={Feed} />
                                <Route exact path="/draft" render={() => (auth.loggedIn ? <Draft/> : <Redirect to="/"/>)} />
                                <Route path="/draft/edit/:id" component={DraftEditor} />
                                <Route path="/search" component={SearchResult} />
                                <Route exact path="/notification" render={() => (auth.loggedIn ? <Notification/> : <Redirect to="/"/>)} />
                                <Route path="/notification/check/:id" render={() => (auth.loggedIn ? <EditConfirm/> : <Redirect to="/"/>)} />
                                <Route path="/action/post/create" render={() => (auth.loggedIn ? <CreatePost/> : <Redirect to="/"/>)} />
                                <Route path="/action/topic/create" render={() => (auth.loggedIn ? <CreateTopic/> : <Redirect to="/"/>)} />
                                <Route path="/action/post/edit" render={() => (auth.loggedIn ? <EditPost/> : <Redirect to="/"/>)} />
                                <Route path="/action/topic/edit" render={() => (auth.loggedIn ? <EditTopic/> : <Redirect to="/"/>)} />
                                <Route path="/topic/:id" component={Topic} />
                                <Route path="/post/:id" component={Post} />
                                <Route path="/talk" component={Talk} />
                                <Route path="/profile/:id" component={Profile} />
                                <Route exact path="/action" component={Action} />
                                <Route path="/verification/:type" component={Verification}/>
                                <Route path="/verification/:type/:tokenId" component={Verification}/> 
                                <Route exact path="/setting" component={Setting}/>
                                <Route path="/setting/policy" component={Policy}/>
                                <Route path="/setting/terms" component={Terms}/>
                                <Route path="/workspace" component={WorkSpace}/>
                            </div>
                        </AppState>
                    </GAListener>
                </BrowserRouter>
            </div>
        );
    }
};

function mapStateToProps({ auth }){
    return {
        auth,
    }
}

export default connect(mapStateToProps)(App);