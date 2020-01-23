import React, { Component } from "react";

import account from "../images/account.png";

class HeaderProfile extends Component {
    render() {
        return (
            <ul className="nav-profile-wrapper">
                <a href="/" className="nav-profile">
                    <li><img src={account} className="nav-profile-img"/></li>
                    <li className="nav-profile-name">Keisuke Iizuka</li>
                </a>
            </ul>
        )
    }
}


export default HeaderProfile