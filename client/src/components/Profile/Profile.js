import React, { Component } from "react"
import ProfileTop from "./ProfileTop"
import ProfileTopic from "./ProfileTopic"
import ProfilePost from "./ProfilePost"
import ProfileFollow from "./ProfileFollow"

import sample from "../../images/sample0.jpg"

import "./Profile.css"

// 本来はhookを使って一気に簡略化するべき
class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            toggle: {
                owner: true,
                favoriteTopic: false,
                favoritePost: false,
                follows: false,
                followers: false,
            }
        }
    }

    setElement = (target) => {
        this.setState({
            toggle: {
                owner: false,
                favoriteTopic: false,
                favoritePost: false,
                follows: false,
                followers: false,
            }
        })
        this.setState({
            toggle: {
                [target]: true,
            }
        })
    }

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
                    setElement={this.setElement}
                    toggle={this.state.toggle}
                />
                { this.state.toggle.owner ? <ProfilePost/> : "" }
                { this.state.toggle.favoriteTopic ? <ProfileTopic/> : "" }
                { this.state.toggle.favoritePost ? <ProfilePost/> : "" }
                { this.state.toggle.follows ? <ProfileFollow/> : "" }
                { this.state.toggle.followers ? <ProfileFollow/> : "" }
            </div>
        )
    }
}



export default Profile