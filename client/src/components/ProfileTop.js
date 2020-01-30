import React, { Component } from "react"

import PeopleFollow from "./PeopleFollow"

import { FaTwitter, FaBlog, FaGithub, FaFacebookSquare } from "react-icons/fa"

class ProfileTop extends Component {

    render() {
        return (
            <div className="profile-top-wrapper">
                <div className="profile-top">
                    <div className="profile-top-left">
                        <p className="profile-name">
                            {this.props.familyName}
                            <span className="profile-name-space"></span>
                            {this.props.givenName}
                        </p>
                        <p className="profile-job">{this.props.job}</p>
                        <p className="profile-intro">{this.props.intro}</p>
                    </div>
                    <div className="profile-img">
                        <img src={this.props.photo} className="profile-top-right"/>
                    </div>
                </div>
                <div className="profile-bottom">
                    <div className="profile-bottom-left">
                        <div className="profile-sns">
                            <FaTwitter className="profile-icon"/>
                            <FaGithub className="profile-icon"/>
                            <FaBlog className="profile-icon"/>
                            <FaFacebookSquare className="profile-icon"/>
                        </div>
                        <div className="profile-record">
                            <div className="profile-stats">
                                <p className="profile-number">{this.props.posts}</p>
                                <p className="profile-category">Posts</p>
                            </div>
                            <div className="profile-stats"> 
                                <p className="profile-number">{this.props.edits}</p>
                                <p className="profile-category">Edits</p>
                            </div>
                            <div className="profile-stats"> 
                                <p className="profile-number">{this.props.follows}</p>
                                <p className="profile-category">Follows</p>
                            </div>
                            <div className="profile-stats">
                                <p className="profile-number">{this.props.followers}</p>
                                <p className="profile-category">Followers</p>
                            </div>
                        </div>
                    </div>
                    <div className="profile-bottom-right">
                        <div className="profile-follow-wrapper">
                            <PeopleFollow/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileTop