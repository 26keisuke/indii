import React, { Component } from "react";

import NotifElement from "./NotifElement"

import absurd from "../../images/absurd/09.png"
import NotifSearchFilter from "./NotifSearchFilter";
import LeftAndRight from "../LeftAndRight";

class Draft extends Component {

    renderImgContent() {
        return(
            <img src={absurd} className="just-for-fun"/>
        )
    }

    renderTopContent() {
        return(
            <p className="content-intro-title">通知</p>
        )
    }

    renderLeftContent() {
        return(
            <div>
                <NotifElement 
                    id={"123123"}
                    name={"飯塚啓介"}
                    date={"May 25, 2018 6:34 PM"}
                    action={"EDIT_REQUEST"}
                />
            </div>
        )
    }

    renderRightContent() {
        return(
            <div>
                <div className="content-right-card-title">
                    <p>検索フィルター</p>
                </div>
                <NotifSearchFilter/>
            </div>
        )
    }

    render() {
        return(
            <LeftAndRight
                img={this.renderImgContent()}
                top={this.renderTopContent()} 
                left={this.renderLeftContent()} 
                right={this.renderRightContent()}
            />
        )
    }
}

export default Draft;