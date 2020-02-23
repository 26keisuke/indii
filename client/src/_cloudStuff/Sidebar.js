import React, { Component } from "react";
import { Link } from "react-router-dom"

import home from "../images/home.png";
import home_gray from "../images/home-gray.png";
import draft from "../images/draft.png";
import draft_gray from "../images/draft-gray.png";
import topic from "../images/topic.png";
import topic_gray from "../images/topic-gray.png";
import post from "../images/post.png";
import post_gray from "../images/post-gray.png";
import notif from "../images/notification.png";
import notif_gray from "../images/notification-gray.png";
import setting from "../images/setting.png";
import setting_gray from "../images/setting-gray.png";

import "./Sidebar.css"


// logicは、後でreduxに全部書き換える
class Sidebar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            home_notif: false,
            draft_notif: false,
            post_notif: true,
            notif_notif: false,

            // home_clicked: true,
            // draft_clicked: false,
            // topic_clicked: false,
            // post_clicked: false,
            // notif_clicked: false,
            // settings_clicked: false,
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        // switch(e.target.innerHTML){
        //     case "HOME":
        //         console.log("HOME")
        //         return
        //     case "DRAFT":
        //         console.log("DRAFT")
        //         return
        //     case "CREATE TOPIC":
        //         console.log("CREATE TOPIC")
        //         return
        //     case "CREATE POST":
        //         console.log("CREATE POST")
        //         return
        //     case "NOTIFICATION":
        //         console.log("NOTIFICATION")
        //         return
        //     case "SETTINGS":
        //         console.log("SETTINGS")
        //         return
        //     default:
        //         console.log("TRY AGAIN")
        //         return
        // }
    }

    notif_checker(notif) {
        let hide = notif === false ? "hide" : ""
        let cName = hide + " " + "checked"
        return cName
    }

    render() {

        let home_notif = this.notif_checker(this.state.home_notif)
        let draft_notif = this.notif_checker(this.state.draft_notif)
        let post_notif = this.notif_checker(this.state.post_notif)
        let notif_notif = this.notif_checker(this.state.home_notif)

        return (
            <div className="side-bar-list">
                <Link to={"/"} className="side-bar-row" onClick={this.handleClick}>
                    <div className={home_notif}></div>
                    <img src={home} className="side-bar-img"/>
                    <p className="selected">HOME</p>
                </Link>
                <Link to={"/draft"} className="side-bar-row" onClick={this.handleClick}>
                    <div className={draft_notif}></div>
                    <img src={draft} className="side-bar-img"/>
                    <p className="unselected">DRAFT</p>
                </Link>
                <Link to={"/create/topic"} className="side-bar-row" onClick={this.handleClick}>
                    <img src={topic} className="side-bar-img"/>
                    <p className="unselected">CREATE TOPIC</p>
                </Link>
                <Link to={"/create/post"} className="side-bar-row" onClick={this.handleClick}>
                    <div className={post_notif}></div>
                    <img src={post} className="side-bar-img"/>
                    <p className="unselected">CREATE POST</p>
                </Link>
                <Link to={"/notification"} className="side-bar-row" onClick={this.handleClick}> 
                    <div className={notif_notif}></div>
                    <img src={notif} className="side-bar-img"/>
                    <p className="unselected">NOTIFICATION</p>
                </Link>
                <Link to={"/settings"} className="side-bar-row" onClick={this.handleClick}>
                    <img src={setting} className="side-bar-img"/>
                    <p className="unselected">SETTINGS</p>
                </Link>
            </div>
        );
    }
}

export default Sidebar;