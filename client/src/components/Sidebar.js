import React, { Component } from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import home from "../images/home.png";
import home_pressed from "../images/home-pressed.png";
import draft from "../images/draft.png";
import draft_pressed from "../images/draft-pressed.png";
import topic from "../images/topic.png";
import topic_pressed from "../images/topic-pressed.png";
import post from "../images/post.png";
import post_pressed from "../images/post-pressed.png";
import notif from "../images/notification.png";
import notif_pressed from "../images/notification-pressed.png";
import setting from "../images/setting.png";
import setting_pressed from "../images/setting-pressed.png";

import * as actions from "../actions"

import "./Sidebar.css"

// logicは、後でreduxに全部書き換える
class Sidebar extends Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(id) {
        this.props.resetCategory()
        this.props.setCategory(id)
        this.props.nudgeCheck(id)
    }

    nudgeRender(nudge) {
        const show = nudge === true
        const hide = show ? "" : "hide"
        const cName = hide + " " + "checked"
        return cName
    }

    render() {
        const cate = this.props.category

        const home_nudge = this.nudgeRender(this.props.nudge.home)
        const draft_nudge = this.nudgeRender(this.props.nudge.draft)
        const topic_nudge = this.nudgeRender(this.props.nudge.topic)
        const post_nudge = this.nudgeRender(this.props.nudge.post)
        const notif_nudge = this.nudgeRender(this.props.nudge.notification)
        const setting_nudge = this.nudgeRender(this.props.nudge.setting)
        
        return (

            <div className="side-bar-list">
                <Link to={"/"} className="side-bar-row" onClick={() => this.handleClick("home")}>
                    <div className={home_nudge}></div>
                    <img src={cate.home ? home_pressed : home} className="side-bar-img"/>
                    <p className={cate.home ? "selected" : "unselected"}>ホーム</p>
                </Link>
                <Link to={"/draft"} className="side-bar-row" onClick={() => this.handleClick("draft")}>
                    <div className={draft_nudge}></div>
                    <img src={cate.draft ? draft_pressed : draft} className="side-bar-img"/>
                    <p className={cate.draft ? "selected" : "unselected"}>下書き</p>
                </Link>
                <Link to={"/create/topic"} className="side-bar-row" onClick={() => this.handleClick("topic")}>
                    <div className={topic_nudge}></div>
                    <img src={cate.topic ? topic_pressed : topic} className="side-bar-img"/>
                    <p className={cate.topic ? "selected" : "unselected"}>トピックを作成</p>
                </Link>
                <Link to={"/create/post"} className="side-bar-row" onClick={() => this.handleClick("post")}>
                    <div className={post_nudge}></div>
                    <img src={cate.post ? post_pressed : post} className="side-bar-img"/>
                    <p className={cate.post ? "selected" : "unselected"}>ポストを作成</p>
                </Link>
                <Link to={"/notification"} className="side-bar-row" onClick={() => this.handleClick("notification")}> 
                    <div className={notif_nudge}></div>
                    <img src={cate.notification ? notif_pressed : notif} className="side-bar-img"/>
                    <p className={cate.notification ? "selected" : "unselected"}>通知</p>
                </Link>
                <Link to={"/settings"} className="side-bar-row" onClick={() => this.handleClick("setting")}>
                    <div className={setting_nudge}></div>
                    <img src={cate.setting ? setting_pressed : setting} className="side-bar-img"/>
                    <p className={cate.setting ? "selected" : "unselected"}>設定</p>
                </Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        category: state.category,
        nudge: state.nudge
    }
}

export default connect(mapStateToProps, actions)(Sidebar);