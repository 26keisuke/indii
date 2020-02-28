// 余計なstateは管理しないこと！confirmのstateはconfirm上で管理して、postActionのvalueとidで管理すること

import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

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

const authList = ["SIGN_UP", "LOG_IN"]

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

            // logInError: false,

        }
        this.confirmRef = React.createRef()
        this.authRef = React.createRef()
    }

    componentDidMount() {
        this.props.fetchUser();
    }

    componentDidUpdate(prevProps) {
        if (this.props.update.confirmation.on || this.props.auth.showForm) {
            document.addEventListener("mousedown", this.outsideClick)
        } else {
            document.removeEventListener("mousedown", this.outsideClick)
        }

        if((prevProps.auth.logInError === null) && (this.props.auth.logInError === false)) {
            this.startAction("logIn")
        }
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.outsideClick)
    }

    outsideClick = (e) => {

        if(this.props.auth.showForm) {
            if(this.authRef.current.contains(e.target)) {
                return;
            }
            this.startAction("logIn")
        }

        if(this.props.update.confirmation.on) {
            if(this.confirmRef.current.contains(e.target)) {
                return;
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

        // 初期に共通して行うこと
        if(authList.includes(action)){
            this.props.isFetching()
        } else {
            this.startAction("confirm")
        }

        switch(action){

            // ======== Confirm(PopUp)関係 ==========

            case "POST_DELETE":
                if (id){
                    this.props.isFetching()
                    this.props.deletePost(id)
                    return
                } else {
                    this.props.disableGray();
                    return
                }

            case "GIVE_FEEDBACK":
                if (id){
                    this.props.isFetching()
                    this.props.sendFeedBack(id, value)
                    return
                } else {
                    this.props.disableGray();
                    return
                }

            case "ADD_COLUMN":
                if (value){
                    this.props.addColumn(value);
                }
                this.props.disableGray();
                return

            case "REVERT_COLUMN":
                if (id) {
                    this.props.revertColumn(true);
                }
                this.props.disableGray();
                return

            case "DELETE_COLUMN":
                if (id) {
                    this.props.deleteColumn(id)
                }
                this.props.disableGray();
                return

            case "DRAFT_DELETE_CHECK":
                if (id){
                    this.props.isFetching()
                    this.props.deleteDraft(id)
                    return
                } else {
                    this.props.disableGray();
                    return
                }

            case "DRAFT_UPLOAD_CHECK":
                if (value){
                    this.props.uploadDraft(value)
                    return
                } else {
                    this.props.disableGray();
                    this.props.endFetching()
                    return
                }
            case "DELETE_REF":
                if(id) {
                    this.props.deleteRef(id)
                    return
                } else {
                    this.props.disableGray()
                    return
                }
            case "SELF_INTRO":
                if(id) {
                    this.props.updateIntro(id, value)
                    return
                } else {
                    this.props.disableGray()
                    return
                }

            case "SELF_IMAGE":
                if(id) {
                    this.props.updateImage(id, value)
                    return
                } else {
                    this.props.disableGray()
                    return
                }

            // ======== logIn系 ==========

            case "SIGN_UP":
                this.props.signUp(value)
                this.startAction("logIn")
                return
            case "LOG_IN":
                this.props.logIn(value)
                return

            default:
                this.props.disableGray();
                return null;
        }
    }

    renderMessage = () => {

        const { type, message } = this.props.update.updateMessage

        switch(type){
            case "success":
                return (
                    <Message type={"SUCCESS"} message={message}/>
                )
            case "fail":
                return (
                    <Message type={"FAIL"} message={message}/>
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
                            // error={this.state.logInError}
                        /> 
                        }
                        { update.fetching && <Loading/>}
                        { update.grayBackground && <Filter/>}
                        { update.confirmation.on && 
                        <ConfirmWrapper
                            ref={this.confirmRef}
                            cancel={this.state.confirmationCancel}
                            postAction={this.postAction}
                        />
                        }
                        { update.updateMessage.on && this.renderMessage()} 
                        <div className="fakebox">
                            <Route exact path="/" component={Feed} />
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

function mapStateToProps({ update, auth }){
    return {
        update,
        auth,
    }
}

export default connect(mapStateToProps, actions)(App);