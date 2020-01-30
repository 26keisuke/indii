import React, { Component } from "react"
import ProfileTop from "./ProfileTop"
import ProfileHome from "./ProfileHome"

import sample from "../images/sample0.jpg"

import "./Profile.css"

class Profile extends Component {

    componentDidMount(){
        // retrieve all data by id
    }

    render() {
        return (
            <div className="profile">
                <ProfileTop
                    familyName={"飯塚"}
                    givenName={"啓介"}
                    job={"Chief株式会社 CEO"}
                    intro={"Chief株式会社のCEOです。よろしくお願いします。大手製薬会社のMerck & Co.は2017年にランサムウェア（身代金要求型マルウェア）「NotPetya」による攻撃を受け、10億ドルもの損失を被った。同社はこの経験を受け、将来的な攻撃に対する耐性を高めるため、広範にわたってネットワークの俊敏性を高める対策に着手した。"}
                    photo={sample}
                    sns={["twitter", "github", "personal"]}
                    posts={123}
                    edits={1623}
                    follows={82}
                    followers={423}
                />
                <ProfileHome/>
            </div>
        )
    }
}



export default Profile