import React, { Component } from "react"
import { GiPencil } from "react-icons/gi"
// import { FaTwitter, FaBlog, FaGithub, FaFacebookSquare } from "react-icons/fa"

import PeopleFollow from "../PeopleFollow"

class ProfileTop extends Component {

    toggleBar = (target) => {
        if(this.props.toggle[target] === true){
            return "selected"
        }
        return "unselected"
    }

    toggleElement = (target) => {
        if(this.props.toggle[target] === true){
            return "profile-underbar"
        }
        return "profile-underbar hide"
    }

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
                        {/* <div className="profile-sns">
                            <FaTwitter className="profile-icon"/>
                            <FaGithub className="profile-icon"/>
                            <FaBlog className="profile-icon"/>
                            <FaFacebookSquare className="profile-icon"/>
                        </div> */}
                        <div className="profile-record">
                            <div className="profile-stats">
                                <p className="profile-number">{this.props.posts}</p>
                                <p className="profile-category">ポスト数</p>
                            </div>
                            <div className="profile-stats"> 
                                <p className="profile-number">{this.props.edits}</p>
                                <p className="profile-category">編集回数</p>
                            </div>
                            <div className="profile-stats"> 
                                <p className="profile-number">{this.props.follows}</p>
                                <p className="profile-category">フォロー</p>
                            </div>
                            <div className="profile-stats">
                                <p className="profile-number">{this.props.followers}</p>
                                <p className="profile-category">フォロワー</p>
                            </div>
                        </div>
                    </div>
                    <div className="profile-bottom-right">
                        <div className="profile-follow-button-wrapper">
                            <PeopleFollow/>
                        </div>
                    </div>
                    <div className="profile-toggle-box">
                        <div onClick={() => this.props.setElement("owner")} className="profile-toggle-element">
                            <p className={this.toggleBar("owner")}>オーナー</p>
                            <div className={this.toggleElement("owner")}/>
                        </div>
                        <div onClick={() => this.props.setElement("favoriteTopic")} className="profile-toggle-element">
                            <p className={this.toggleBar("favoriteTopic")}>お気に入りのトピック</p>
                            <div className={this.toggleElement("favoriteTopic")}/>
                        </div>
                        <div onClick={() => this.props.setElement("favoritePost")} className="profile-toggle-element">
                            <p className={this.toggleBar("favoritePost")}>お気に入りのポスト</p>
                            <div className={this.toggleElement("favoritePost")}/>
                        </div>
                        <div onClick={() => this.props.setElement("follows")} className="profile-toggle-element">
                            <p className={this.toggleBar("follows")}>フォロー</p>
                            <div className={this.toggleElement("follows")}/>
                        </div>
                        <div onClick={() => this.props.setElement("followers")} className="profile-toggle-element">
                            <p className={this.toggleBar("followers")}>フォロワー</p>
                            <div className={this.toggleElement("followers")}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileTop