import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import * as actions from "../../actions"

import ProfileTop from "./Info/Info"
import ProfileTopic from "./ProfileTopic"
import ProfilePost from "./ProfilePost"
import ProfileFollow from "./ProfileFollow"

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
                <ProfileTop
                    skeleton={false}
                    isThisUser={isThisUser}
                    setElement={this.setElement}
                    toggle={toggle}
                />
                :
                <ProfileTop 
                    skeleton={true}
                    setElement={this.setElement}
                    toggle={toggle}
                />
                }
                { toggle.owner ? <ProfilePost/> : "" }
                { toggle.favoriteTopic ? <ProfileTopic/> : "" }
                { toggle.favoritePost ? <ProfilePost/> : "" }
                { toggle.follows ? <ProfileFollow/> : "" }
                { toggle.followers ? <ProfileFollow/> : "" }
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