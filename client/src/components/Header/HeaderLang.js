import React, { Component } from "react";
import { IoIosArrowDown } from "react-icons/io"

import down from "../../images/down.png";

class HeaderLang extends Component {
    render() {
        return (
            <div className="nav-language">
                <div className="nav-language-name">JP</div>
                <div><IoIosArrowDown className="nav-language-down"/></div>
            </div>
        )
    }
}

export default HeaderLang