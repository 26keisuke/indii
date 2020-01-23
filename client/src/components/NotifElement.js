import React, { Component } from "react";
import { Link } from "react-router-dom";

import accept from "../images/accept.png";
import sample from "../images/sample0.jpg";

import "./Notif.css";

class NotifElement extends Component {
    render() {
        return(
            <div className="notif">
                <div className="notif-unread"/>
                <div className="notif-profile">
                    <img src={sample} className="notif-people-img"/>
                    <div>
                        <p className="notif-people-name"><span>飯塚　啓介</span>さんが、あなたのポストへの編集要請を出しました。</p>
                        <p className="notif-people-date">May 25, 2018 6:34 PM</p>
                    </div>
                </div>
                <Link to={"/notification/check"}>
                <img src={accept} className="notif-people-check"/>
                </Link>
            </div>
        )
    }
}

export default NotifElement;