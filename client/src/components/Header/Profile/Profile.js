import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import account from "../../../images/account.png";

class Profile extends Component {
    render() {
        const flag = !_.isEmpty(this.props.auth) 
        return (
            <div className="nav-profile-wrapper">
                <Link to="/profile" className="nav-profile">
                    {
                        flag
                        ?
                        this.props.auth.photo
                        ?
                        <div><img src={this.props.auth.photo} className="nav-profile-img"/></div>
                        :
                        <div><img src={account} className="nav-profile-img"/></div>
                        :
                        ""
                    }
                    {   flag
                        ? 
                        <div className="nav-profile-name">
                            {this.props.auth.name.familyName} 
                            <span className="nav-profile-name-space"/>
                            {this.props.auth.name.givenName}
                        </div>
                        :
                        <Link to={"/login"} className="nav-profile-name">
                            <div className="nav-profile-btn">
                                ログイン/サインアップ
                            </div>
                        </Link>
                    }
                </Link>
            </div>
        )
    }
}

function mapStateToProps({auth}) {
    return {
        auth
    }
}

export default connect(mapStateToProps, null)(Profile)