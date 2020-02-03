import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import axios from "axios";

import { MdCheck } from "react-icons/md"
import { IoMdClose } from "react-icons/io"

import Header from "./Header/Header";
import Navigation from "./Navigation/Navigation";
import Feed from "./Feed/Feed";
import SearchResult from "./SearchResult/SearchResult"
import Notification from "./Notif/Notif"
import Check from "./Check"
import Topic from "./Topic"
import Draft from "./Draft/DraftNavigation"
import DraftEdit from "./Draft/DraftEdit"
import CreateTopic from "./CreateTopic/CreateTopic"
import Login from "./Login"
import Profile from "./Profile/Profile"
import CreatePost from "./CreatePost//CreatePost"
import Create from "./Create"
import EditTopic from "./EditTopic/EditTopic"
import EditPost from "./EditPost/EditPost"
import WorkSpace from "./WorkSpace"

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            confirmationCancel: false,
            problems: {
                problem0: false,
                problem1: false,
                problem2: false,
                problem3: false,
                problem4: false,
            },
            addColumn: "",
        }
    }

    componentDidMount() {
        this.props.fetchUser();
    }

    renderMessage = () => {
        switch(this.props.update.updateMessage.type){
            case "success":
                return (
                    <div className="message">
                        <div className="message-check">
                            <MdCheck className="message-check-icon"/>
                        </div>
                        <p className="message-title">完了しました！</p>
                        <p className="message-content">{this.props.update.updateMessage.message}</p>
                    </div>
                )
            default:
                return ""
        }
    }

    cancelAction = () => {
        this.setState({confirmationCancel: false}) // onEnter状態で待機させる（まだDOMとしては残っている）
        this.props.hideConfirmation(); // DOMとしても消して、全て値(this.props.update.confirmation)を初期化する
    }

    onCancel = (action) => {
        this.postAction(action)
    }

    postAction = (action, id) => {
        switch(action){
            case "POST_DELETE":
                this.setState({confirmationCancel: true})
                setTimeout(() => this.cancelAction(), 300)
                if (id){
                    this.props.isFetching()
                    axios.post("/api/post/delete", {id})
                    .then(()=> {
                        // 本来はsettimeoutはいらん
                        setTimeout(() => {
                        this.props.endFetching(); 
                        this.props.disableGray();
                        this.props.updateMessage("success", "ポストを削除しました。");
                        setTimeout(() => this.props.resetMessage(), 3000)
                        }, 500)
                    })
                    .catch((err)=> console.error(err))
                } else {
                    this.props.disableGray();
                }
                return false
            case "GIVE_FEEDBACK":
                this.setState({confirmationCancel: true})
                this.setState({
                    problems: {
                        problem0: false,
                        problem1: false,
                        problem2: false,
                        problem3: false,
                        problem4: false,
                    }
                })
                setTimeout(() => this.cancelAction(), 300)
                if (id){
                    this.props.isFetching()
                    axios.post("/api/feeback", {id: id, problems: this.state.problems})
                    .then(()=> {
                        // 本来はsettimeoutはいらん
                        setTimeout(() => {
                        this.props.endFetching(); 
                        this.props.disableGray();
                        this.props.updateMessage("success", "フィードバックを受け取りました。");
                        setTimeout(() => this.props.resetMessage(), 3000)
                        }, 500);
                    })
                    .catch((err)=> console.error(err))
                    
                } else {
                    this.props.disableGray();
                }
                return false
            case "ADD_COLUMN":
                this.setState({confirmationCancel: true})
                setTimeout(() => this.cancelAction(), 300)
                if (id){
                    this.props.addColumn(id, this.state.addColumn);
                    this.props.disableGray();
                } else {
                    this.props.disableGray();
                }
            default:
                return false
        }
    }

    renderConfirmContent = (id, action) => {
        switch(action){
            case "GIVE_FEEDBACK":
                return this.renderReport()
            case "ADD_COLUMN":
                return this.renderAddColumn(id, action)
        }
    }

    handleReportChange = (e, problemName) => {
        this.setState({
            problems: {
                [problemName]: e.target.checked
            }  
        })
    }

    handleAddColumnChange = (e) => {
        this.setState({
            addColumn: e.target.value
        })
    }

    renderReport = () => {
        return (
            <form className="confirm-report">
                <div className="confirm-report-box">
                    <input className="confirm-report-radio" onChange={(e) => this.handleReportChange(e, "problem0")} type="checkbox" id="0" name="p0"/>
                    <label className="confirm-report-label" htmlFor="0">理解するのが難しいです。</label>
                </div>
                <div className="confirm-report-box">
                    <input className="confirm-report-radio" onChange={(e) => this.handleReportChange(e, "problem1")} type="checkbox" id="1" name="p1"/>
                    <label className="confirm-report-label" htmlFor="1">書かれている内容が不適切です。</label>
                </div>
                <div className="confirm-report-box">
                    <input className="confirm-report-radio" onChange={(e) => this.handleReportChange(e, "problem2")} type="checkbox" id="2" name="p2"/>
                    <label className="confirm-report-label" htmlFor="2">書かれている内容が間違っています。</label>
                </div>
                <div className="confirm-report-box">
                    <input className="confirm-report-radio" onChange={(e) => this.handleReportChange(e, "problem3")} type="checkbox" id="3" name="p3"/>
                    <label className="confirm-report-label" htmlFor="3">タイトルを変えるべきです。</label>
                </div>
                <div className="confirm-report-box">
                    <input className="confirm-report-radio" onChange={(e) => this.handleReportChange(e, "problem4")} type="checkbox" id="4" name="p4"/>
                    <label className="confirm-report-label" htmlFor="4">同じようなポストが既にあります。</label>
                </div>
            </form>
        )
    }

    renderAddColumn = (id, action) => {
        return (
            <form onSubmit={(e) => {e.preventDefault(); this.postAction(action, id)}}>
                <input 
                    onChange={(e) => this.handleAddColumnChange(e)}
                    className="confirm-add-column-input" 
                    type="text" 
                    placeholder="タイトルを入力..."/>
            </form>
        )
    }

    renderConfirmBox = (id, action, title, caution, message, buttonMessage) => {
        return (
            <div className={ this.state.confirmationCancel ? "confirm-box onLeave" : "confirm-box onEnter"}>
                <div className="confirm-box-row">
                    <IoMdClose className="confirm-box-close" onClick={() => this.onCancel(action)}/>
                    <p className="confirm-box-title">{title}</p>
                    <p className="confirm-box-message">{message}</p>
                    <p className="confirm-box-caution">{caution}</p>
                    {this.renderConfirmContent(id, action)}
                    <div className="confirm-box-buttons">
                        <button className="confirm-box-buttons-yes" onClick={() => this.postAction(action, id)}>{buttonMessage}</button>
                        <button className="confirm-box-buttons-no" onClick={() => this.onCancel(action)}>キャンセル</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {

        return (
            <div className="browser">
                <BrowserRouter>
                    <div className="router">
                        <Header />                        
                        <Navigation />
                        <div className={this.props.update.fetching ? "loading" : ""}/>
                        <div className={this.props.update.grayBackground ? "filter" : ""}/>
                        {this.props.update.confirmation.on
                        ? this.renderConfirmBox(this.props.update.confirmation.id,
                                                this.props.update.confirmation.action,
                                                this.props.update.confirmation.title,
                                                this.props.update.confirmation.caution,
                                                this.props.update.confirmation.message,
                                                this.props.update.confirmation.buttonMessage)
                        : ""
                        }
                        {this.props.update.updateMessage.on 
                        ? this.renderMessage()
                        : ""
                        } 
                        <div className="fakebox">
                            <Route exact path="/" component={Feed} />
                            <Route path="/login" component={Login} />
                            <Route path="/profile" component={Profile} />
                            <Route exact path="/draft" component={Draft} />
                            <Route path="/draft/edit/:id" component={DraftEdit} />
                            <Route path="/search" component={SearchResult} />
                            <Route exact path="/notification" component={Notification} />
                            <Route path="/notification/check/:id" component={Check} />
                            <Route path="/action/post/create" component={CreatePost} />
                            <Route path="/action/topic/create" component={CreateTopic} />
                            <Route path="/action/post/edit" component={EditPost} />
                            <Route path="/action/topic/edit" component={EditTopic} />
                            <Route path="/topic/:id" component={Topic} />
                            <Route path="/profile/:id" component={Profile} />
                            <Route exact path="/action" component={Create} />
                            <Route exact path="/workspace" component={WorkSpace} />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

function mapStateToProps(state){
    return {
        update: state.update
    }
}

export default connect(mapStateToProps, actions)(App);