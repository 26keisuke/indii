import React, { Component } from "react";

import down from "../../images/down.png";

class HeaderLang extends Component {
    render() {
        return (
            <div className="nav-language">
                <div className="nav-language-name">JP</div>
                <div><img src={down} className="nav-language-down"/></div>
            </div>
        )
    }
}

export default HeaderLang