import React, { Component } from "react";
import { Link } from "react-router-dom"

import home from "../../images/home.png";
import draft from "../../images/draft.png";
import topic from "../../images/topic.png";
import post from "../../images/post.png";
import notif from "../../images/notification.png";
import setting from "../../images/setting.png";

class HeaderIcon extends Component {
    render() {
        return (
            <div className="nav-icon-list">
                <Link to={"/"} className="nav-icon-row">
                    <div className="nav-icon-check"></div>
                    <img src={home} className="nav-icon-img"/>
                </Link>
                <Link to={"/draft"} className="nav-icon-row">
                    <div className="nav-icon-check"></div>
                    <img src={draft} className="nav-icon-img"/>
                </Link>
                <Link to={"/topic"} className="nav-icon-row">
                    <img src={topic} className="nav-icon-img"/>
                </Link>
                <Link to={"/notification"} className="nav-icon-row"> 
                    <div className="nav-icon-check"></div>
                    <img src={notif} className="nav-icon-img"/>
                </Link>
                <Link to={"/settings"} className="nav-icon-row"> 
                    <div className="nav-icon-check"></div>
                    <img src={setting} className="nav-icon-img"/>
                </Link>
            </div>
        )
    }
}

export default HeaderIcon