import React, { Component } from "react";

import NotifElement from "./NotifElement"

import absurd from "../images/absurd/09.png"
import NotifSearchFilter from "./NotifSearchFilter";

class Draft extends Component {
    render() {
        return(
            <div className="content">
                <div className="content-left">
                    <div className="content-intro">
                        <p className="content-intro-title">通知</p>
                    </div>
                    <div className="content-space"/>
                    <NotifElement/>
                    <NotifElement/>
                    <NotifElement/>
                    <NotifElement/>
                    <NotifElement/>
                    <NotifElement/>
                    <div className="content-bottom-space">
                        <img src={absurd} className="just-for-fun"/>
                    </div>
                </div>
                <div className="content-right">
                    <div className="content-right-card">
                        <div className="content-right-card-title">
                            <p>検索フィルター</p>
                        </div>
                        <NotifSearchFilter/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Draft;