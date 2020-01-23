import React, { Component } from "react";

import home from "../images/home.png";
import draft from "../images/draft-gray.png";
import topic from "../images/topic-gray.png";
import post from "../images/post-gray.png";
import notif from "../images/notification-gray.png";
import setting from "../images/setting-gray.png";

class HeaderIcon extends Component {
    render() {
        return (
            <ul className="nav-icon-list">
                <li className="nav-icon-row">
                    <div className="nav-icon-check"></div>
                    <img src={home} className="nav-icon-img"/>
                </li>
                <li className="nav-icon-row">
                    <div className="nav-icon-check"></div>
                    <img src={draft} className="nav-icon-img"/>
                </li>
                <li className="nav-icon-row">
                    <img src={topic} className="nav-icon-img"/>
                </li>
                <li className="nav-icon-row"> 
                    <div className="nav-icon-check"></div>
                    <img src={notif} className="nav-icon-img"/>
                </li>
            </ul>
        )
    }
}

export default HeaderIcon