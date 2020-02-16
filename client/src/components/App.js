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
import WorkSpace from "./WorkSpace"
import Message from "./Util/Message"
import Confirm from "./Confirm/Confirm"
import Loading from "./Util/Loading"
import Filter from "./Util/Filter"
import Auth from "./Auth/Auth"
import Verification from "./Verification/Verification"

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
            case "POST_DELETE":
                this.startAction("confirm")
                if (id){
                    this.props.isFetching()
                    axios.post("/api/post/delete", {id})
                    .then(()=> {
                        // 本来はsettimeoutはいらん
                        setTimeout(() => {
                        this.props.endFetching(); 
                        this.props.disableGray();
                        sendMessage("success", "ポストを削除しました。", 3000, this.props)
                        }, 500)
                    })
                    .catch((err)=> console.error(err))
                } else {
                    this.props.disableGray();
                }
                return null;

            case "GIVE_FEEDBACK":
                this.startAction("confirm")
                if (id){
                    this.props.isFetching()
                    axios.post("/api/feeback", {id: id, problems: this.state.problems})
                    .then(()=> {
                        // 本来はsettimeoutはいらん
                        setTimeout(() => {
                        this.props.endFetching(); 
                        this.props.disableGray();
                        sendMessage("success", "フィードバックを受け取りました。", 3000, this.props)
                        }, 500);
                    })
                    .catch((err) => console.error(err))
                } else {
                    this.props.disableGray();
                }
                return null;

            case "ADD_COLUMN":
                this.startAction("confirm")
                if (id){
                    this.props.addColumn(id, this.state.addColumn);
                }
                this.props.disableGray();
                return null;
            
            case "DRAFT_DELETE_CHECK":
                this.startAction("confirm")
                if (id){
                    this.props.isFetching()
                    axios.post("/api/draft/delete", {subject: id})
                    .then(res => {
                        this.props.endFetching();
                        this.props.disableGray();
                        this.props.fetchDraft() // this certainly isnt the optimal because req is sent to server again
                        sendMessage("success", "下書きを削除しました。", 3000, this.props)
                        return null
                    })
                    .catch(err => {
                        console.log(err)
                        this.props.endFetching()
                        this.props.disableGray();
                        return null
                    })
                } else {
                    this.props.disableGray();
                    return null;
                }

            case "DRAFT_UPLOAD_CHECK":
                this.startAction("confirm")
                if (value){

                    const promises = []

                    for(var key in value) {
                        promises.push(
                            axios.post("/api/draft/upload", {value: value[key]})
                        )
                    }

                    Promise.all(promises).then(() => {
                        this.props.disableGray();
                        this.props.endFetching();
                        this.props.fetchDraft();
                        sendMessage("success", "ポストをアップロードしました。", 4000, this.props)
                    })

                } else {
                    this.props.disableGray();
                    this.props.endFetching()
                }

                return null;

            case "SIGN_UP":
                this.props.isFetching()
            
                axios.post("/api/login", value)
                .then(user => {
                    setTimeout(() => {
                        this.props.disableGray()
                        this.props.endFetching()
                        this.startAction("logIn")
                        sendMessage("success", `"${user.data.email}"に確認メールを送信しました。`, 7000, this.props)
                        this.props.fetchUser();
                    }, 2500)
                })
                .catch(err => {
                    console.log(err)
                })

                return null;
                
            case "LOG_IN":
                this.props.isFetching()
            
                axios.post("/api/login", value)
                .then(user => {
                    if(!user.data.userName) { // if user is not found, return error message
                        this.props.endFetching()
                        this.setState({ logInError: true })
                        return false;
                    }
                    this.props.disableGray()
                    this.props.endFetching()
                    this.startAction("logIn")
                    sendMessage("success", `${user.data.userName}さん、お帰りなさい。`, 3000, this.props)
                    this.props.fetchUser();
                })
                .catch(err => {
                    console.log(err)
                })

                return null;

            case "DELETE_REF":
                this.startAction("confirm")

                if(id) {
                    axios.delete(`/api/draft/${id.draftId}/ref/${id.refId}`)
                    .then(res => {
                        this.props.disableGray()
                        sendMessage("success", "参照を削除しました。", 3000, this.props)
                        return null
                    })
                    .catch(err => {
                        console.log(err)
                        return null
                    })
                } else {
                    this.props.disableGray()
                    return null;
                }

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

    renderConfirmBox = (id, action, title, caution, message, buttonMessage) => {
        return (
            <ConfirmWrapper
                ref={this.confirmRef}
                id={id}
                action={action}
                title={title}
                caution={caution}
                message={message}
                buttonMessage={buttonMessage}
                cancel={this.state.confirmationCancel}
                postAction={this.postAction}
                reportChange={this.handleReportChange}
                addColumnChange={this.handleAddColumnChange}
            />
        )
    }

    renderMessage = () => {
        switch(this.props.update.updateMessage.type){
            case "success":
                return (
                    <Message message={this.props.update.updateMessage.message}/>
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
                        <Header />                        
                        <Navigation />
                        { auth.showForm && <AuthWrapper 
                                                ref={this.authRef} 
                                                show={this.state.logInFormShow}
                                                postAction={this.postAction}
                                                error={this.state.logInError}
                                            /> 
                        }
                        { update.fetching && <Loading/>}
                        { update.grayBackground && <Filter/>}
                        { update.confirmation.on && 
                        this.renderConfirmBox(update.confirmation.id,
                                            update.confirmation.action,
                                            update.confirmation.title,
                                            update.confirmation.caution,
                                            update.confirmation.message,
                                            update.confirmation.buttonMessage)
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
                            {/* <Route exact path="/workspace" component={WorkSpace} /> */}
                            <Route path="/verification/:type" component={Verification}/>
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