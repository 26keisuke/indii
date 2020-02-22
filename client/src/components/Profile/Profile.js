import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import axios from "axios"

import ProfileTop from "./ProfileTop"
import ProfileTopic from "./ProfileTopic"
import ProfilePost from "./ProfilePost"
import ProfileFollow from "./ProfileFollow"


import sample from "../../images/sample0.jpg"

import "./Profile.css"

class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            user: {},
            isThisUser: false,
            toggle: {
                owner: true,
                favoriteTopic: false,
                favoritePost: false,
                follows: false,
                followers: false,
            }
        }
        this.getProfile()
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

    getProfile = () => {
        if(this.props.match.params.id && this.props.auth.info._id) {
            axios.get(`/api/profile/${this.props.match.params.id}`)
            .then(user => {
                this.setState({user})
                this.isThisUser()
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    isThisUser = () => {
        if(this.props.match.params.id === this.props.auth.info._id) { this.setState({ isThisUser: true }) }
    }

    render() {
        return (
            <div className="profile">
                <ProfileTop
                    isThisUser={this.state.isThisUser}
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


function mapStateToProps({auth}) {
    return {
        auth
    }
}

export default connect(mapStateToProps)(Profile)