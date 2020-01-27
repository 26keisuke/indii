import React, { Component } from "react";
import { Link } from "react-router-dom"

import account from "../../images/account.png";

class HeaderProfile extends Component {
    render() {
        return (
            <div className="nav-profile-wrapper">
                <Link to="/profile" className="nav-profile">
                    <div><img src={account} className="nav-profile-img"/></div>
                    <div className="nav-profile-name">Keisuke Iizuka</div>
                </Link>
            </div>
        )
    }
}

export default HeaderProfile