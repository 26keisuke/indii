import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import * as actions from "../../actions"

import Top from "./Info/Info"
import Topic from "./Topic/Topic"
import Post from "./Post/Post"
import Follow from "./Follow/Follow"

import "./Profile.css"

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
`

class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
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

    componentDidUpdate(prevProps) {
        if(prevProps.profile.user !== this.props.profile.user) {
            if(this.props.profile.user._id === this.props.auth.info._id) {
                this.setState({
                    isThisUser: true,
                })
            }
        }
    }

    setElement = (target) => {
        this.setState({
            ...this.state,
            toggle: {
                owner: false,
                favoriteTopic: false,
                favoritePost: false,
                follows: false,
                followers: false,
            }
        }, () => {
            this.setState({
                ...this.state,
                toggle: {
                    ...this.state.toggle,
                    [target]: true,
                }
            })
        })
    }

    getProfile = () => {
        if(this.props.match.params.id) {
            this.props.fetchProfile(this.props.match.params.id)
        }
    }

    render() {

        const { isThisUser, toggle } = this.state

        return (
            <Wrapper>
                { !!this.props.profile.user._id 
                ?
                <Top
                    skeleton={false}
                    isThisUser={isThisUser}
                    setElement={this.setElement}
                    toggle={toggle}
                />
                :
                <Top 
                    skeleton={true}
                    setElement={this.setElement}
                    toggle={toggle}
                />
                }
                { toggle.owner ? <Post posts={this.props.profile.user.post}/> : "" }
                { toggle.favoriteTopic ? <Topic topics={this.props.profile.user.likedTopic}/> : "" }
                { toggle.favoritePost ? <Post posts={this.props.profile.user.likedPost}/> : "" }
                { toggle.follows ? <Follow users={this.props.profile.user.follows}/> : "" }
                { toggle.followers ? <Follow users={this.props.profile.user.followers}/> : "" }
            </Wrapper>
        )
    }
}


function mapStateToProps({auth, profile}) {
    return {
        auth,
        profile
    }
}

export default connect(mapStateToProps, actions)(Profile)