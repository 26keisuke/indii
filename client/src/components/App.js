// confirmation renderの引数いらない。reduxで既に送られている

import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import * as actions from "../actions";

import { sendMessage } from "./Util/util"

import Header from "./Header/Header";
import Navigation from "./Navigation/Navigation";
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
import Message from "./Util/Message"
import Confirm from "./Confirm/Confirm"
import Loading from "./Util/Loading"
import Filter from "./Util/Filter"
import Auth from "./Auth/Auth"
import Verification from "./Verification/Verification"

import {
    deletePost,
    sendFeedBack,
    deleteDraft,
    uploadDraft,
    deleteRef,
    logIn,
    signUp,
    updateIntro,
    updateImage,
} from "./Action"

const ConfirmWrapper = React.forwardRef((props, ref) => (
     <Confirm innerRef={ref} {...props}/>
))

const AuthWrapper = React.forwardRef((props, ref) => (
    <Auth innerRef={ref} {...props}/>
))

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // この二つは将来的にreact-transition-groupなどで完結にする
            // onExitのアニメーションを適用させるためにある
            confirmationCancel: false,
            logInFormShow: true,

            // ポストをレポートする際のradio button
            problems: {
                problem0: false,
                problem1: false,
                problem2: false,
                problem3: false,
                problem4: false,
            },

            // Action/Topic/Editのindexのやつ
            addColumn: "",

            logInError: false,
        }
        this.confirmRef = React.createRef()
        this.authRef = React.createRef()
    }

    componentDidMount() {
        this.props.fetchUser();
    }

    componentDidUpdate() {
        if (this.props.update.confirmation.on || this.props.auth.showForm) {
            document.addEventListener("mousedown", this.outsideClick)
        } else {
            document.removeEventListener("mousedown", this.outsideClick)
        }
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.outsideClick)
    }

    outsideClick = (e) => {

        if(this.props.auth.showForm) {
            if(this.authRef.current.contains(e.target)) {
                return null;
            }
            this.startAction("logIn")
        }

        if(this.props.update.confirmation.on) {
            if(this.confirmRef.current.contains(e.target)) {
                return null;
            } 
            this.startAction("confirm")
        }

        this.props.disableGray();        
    }

    startAction = (type) => {
        switch(type) {
            case "confirm":
                this.setState({confirmationCancel: true}) // Animation starts (200ms)
                setTimeout(() => this.cancelAction("confirm"), 200)
                return
            case "logIn":
                this.setState({logInFormShow: false})
                setTimeout(() => this.cancelAction("logIn"), 200)
                return
            default:
                return
        }
    }

    cancelAction = (type) => {
        switch(type) {
            case "confirm":
                this.setState({confirmationCancel: false}) // onEnter状態で待機させる（まだDOMとしては残っている）=> animationを適用させるため
                this.props.hideConfirmation(); // DOMとしても消して、全て値(this.props.update.confirmation)を初期化する
                return;
            case "logIn":
                this.setState({logInFormShow: true});
                this.props.hideLogin();
                return;
            default:
                return;
        }   
    }

    postAction = (action, id, value) => {
        switch(action){

            // ======== PopUp関係 ==========

            case "POST_DELETE":
                this.startAction("confirm")
                if (id){
                    this.props.isFetching()
                    deletePost(id, this.props)
                    return
                } else {
                    this.props.disableGray();
                    return
                }

            case "GIVE_FEEDBACK":
                this.startAction("confirm")
                if (id){
                    this.props.isFetching()
                    sendFeedBack(id, this.state.problems, this.props)
                    return
                } else {
                    this.props.disableGray();
                    return
                }

            case "ADD_COLUMN":
                this.startAction("confirm")
                if (id){
                    this.props.addColumn(id, this.state.addColumn);
                }
                this.props.disableGray();
                return
            
            case "DRAFT_DELETE_CHECK":
                this.startAction("confirm")
                if (id){
                    this.props.isFetching()
                    deleteDraft(id, this.props)
                    return
                } else {
                    this.props.disableGray();
                    return
                }

            case "DRAFT_UPLOAD_CHECK":
                this.startAction("confirm")
                if (value){
                    uploadDraft(value, this.props)
                    return
                } else {
                    this.props.disableGray();
                    this.props.endFetching()
                    return
                }
            case "DELETE_REF":
                this.startAction("confirm")
                if(id) {
                    deleteRef(id, this.props)
                    return
                } else {
                    this.props.disableGray()
                    return
                }
            case "SELF_INTRO":
                this.startAction("confirm")
                if(id) {
                    updateIntro(value, this.props)
                    return
                } else {
                    this.props.disableGray()
                    return
                }

            case "SELF_IMAGE":
                this.startAction("confirm")
                if(id) {
                    updateImage(value, this.props)
                    return
                } else {
                    this.props.disableGray()
                    return
                }

            // ======== logIn系 ==========

            case "SIGN_UP":
                this.props.isFetching()
                this.startAction("logIn")
                signUp(value, this.props)
                return
            case "LOG_IN":
                this.props.isFetching()
                this.startAction("logIn")
                logIn(value, this.props)
                return
            default:
                this.startAction("confirm")
                this.props.disableGray();
                return null;
        }
    }

    handleReportChange = (state) => {
        this.setState({
            ...this.state,
            problems: state,
        })
    }

    handleAddColumnChange = (e) => {
        this.setState({
            ...this.state,
            addColumn: e.target.value
        })
    }

    renderMessage = () => {
        switch(this.props.update.updateMessage.type){
            case "success":
                return (
                    <Message type={"SUCCESS"} message={this.props.update.updateMessage.message}/>
                )
            case "fail":
                return (
                    <Message type={"FAIL"} message={this.props.update.updateMessage.message}/>
                )
            default:
                return;
        }
    }

    render() {

        const { update, auth } = this.props

        return (
            <div className="browser">
                <BrowserRouter>
                    <div className="router">
                        <Header/>
                        <Navigation/>
                        { auth.showForm && 
                        <AuthWrapper 
                            ref={this.authRef} 
                            show={this.state.logInFormShow}
                            postAction={this.postAction}
                            error={this.state.logInError}
                        /> 
                        }
                        { update.fetching && <Loading/>}
                        { update.grayBackground && <Filter/>}
                        { update.confirmation.on && 
                        <ConfirmWrapper
                            ref={this.confirmRef}
                            cancel={this.state.confirmationCancel}
                            postAction={this.postAction}
                            reportChange={this.handleReportChange}
                            addColumnChange={this.handleAddColumnChange}
                        />
                        }
                        { update.updateMessage.on && this.renderMessage()} 
                        <div className="fakebox">
                            <Route exact path="/" component={Feed} />
                            <Route path="/profile" component={Profile} />
                            <Route exact path="/draft" render={() => (auth.loggedIn ? <Draft/> : <Redirect to="/"/>)} />
                            <Route path="/draft/edit/:id" component={DraftEditor} />
                            <Route path="/search" component={SearchResult} />
                            <Route exact path="/notification" render={() => (auth.loggedIn ? <Notification/> : <Redirect to="/"/>)} />
                            <Route path="/notification/check/:id" component={EditConfirm} />
                            <Route path="/action/post/create" render={() => (auth.loggedIn ? <CreatePost/> : <Redirect to="/"/>)} />
                            <Route path="/action/topic/create" render={() => (auth.loggedIn ? <CreateTopic/> : <Redirect to="/"/>)} />
                            <Route path="/action/post/edit" render={() => (auth.loggedIn ? <EditPost/> : <Redirect to="/"/>)} />
                            <Route path="/action/topic/edit" render={() => (auth.loggedIn ? <EditTopic/> : <Redirect to="/"/>)} />
                            <Route path="/topic/:id" component={Topic} />
                            <Route path="/post/:id" component={Post} />
                            <Route path="/profile/:id" component={Profile} />
                            <Route exact path="/action" component={Action} />
                            <Route path="/verification/:type" component={Verification}/>
                            <Route path="/verification/:type/:tokenId" component={Verification}/> 
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

function mapStateToProps(state){
    return {
        update: state.update,
        auth: state.auth
    }
}

export default connect(mapStateToProps, actions)(App);