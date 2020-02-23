import React, { Component } from "react";

import down from "../images/down.png";

class HeaderLang extends Component {
    render() {
        return (
            <ul className="nav-language">
                <li className="nav-language-name">JP</li>
                <li><img src={down} className="nav-language-down"/></li>
            </ul>
        )
    }
}


export default HeaderLang