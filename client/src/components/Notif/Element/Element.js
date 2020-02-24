import React, { Component } from "react";
import { Link } from "react-router-dom";

import sample from "../../../images/sample0.jpg";

import "../Notif.css";

class Element extends Component {

    renderAction(action) {
        switch(action){
            case "EDIT_REQUEST":
                return "あなたのポストへの編集要請を出しました。"
            default:
                return;
        }
    }

    render() {
        return(
            <Link to={"/notification/check/" + this.props.id}>
                <div className="notif">
                    <div className="notif-unread"/>
                    <div className="notif-profile">
                        <img src={sample} className="notif-people-img" alt={"行動を起こした人のプロフィール写真"}/>
                        <div>
                            <p className="notif-people-name"><span>{this.props.name}</span>さんが、{this.renderAction(this.props.action)}</p>
                            <p className="notif-people-date">{this.props.date}</p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default Element;