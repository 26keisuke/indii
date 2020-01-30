import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import axios from "axios";

import { MdCheck } from "react-icons/md"
import { IoMdClose } from "react-icons/io"

import Header from "./Header/Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed/Feed";
import SearchResult from "./SearchResult/SearchResult"
import Notification from "./Notif/Notif"
import Check from "./Check"
import Topic from "./Topic"
import Draft from "./Draft/DraftNavigation"
import DraftEdit from "./Draft/DraftEdit"
import CreateTopic from "./CreateTopic/CreateTopic"
import Login from "./Login"
import Profile from "./Profile"

const CreatePost = () => <h2>Post</h2>

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
            }
        }
    }

    componentDidMount() {
        console.log("LOADEDED")
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
    
    onConfirm = (action, id) => {
        this.postAction(action, id)
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
            default:
                return false
        }
    }

    renderConfirmContent = (action) => {
        switch(action){
            case "GIVE_FEEDBACK":
                return this.renderReport()
        }
    }

    handleReportChange = (e, problemName) => {
        this.setState({
            problems: {
                [problemName]: e.target.checked
            }  
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

    renderConfirmBox = (id, action, title, caution, message, buttonMessage) => {
        return (
            <div className={ this.state.confirmationCancel ? "confirm-box onLeave" : "confirm-box onEnter"}>
                <div className="confirm-box-row">
                    <IoMdClose className="confirm-box-close" onClick={() => this.onCancel(action)}/>
                    <p className="confirm-box-title">{title}</p>
                    <p className="confirm-box-message">{message}</p>
                    <p className="confirm-box-caution">{caution}</p>
                    {this.renderConfirmContent(action)}
                    <div className="confirm-box-buttons">
                        <button className="confirm-box-buttons-yes" onClick={() => this.onConfirm(action, id)}>{buttonMessage}</button>
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
                        <Sidebar />
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

function mapStateToProps(state){
    return {
        update: state.update
    }
}

export default connect(mapStateToProps, actions)(App);