import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./HeaderProfile";

import indii from "../images/indii.png";

import HeaderProfile from "./HeaderProfile";
import HeaderLang from "./HeaderLang";
import HeaderIcon from "./HeaderIcon";
import SearchBox from "./SearchBox"

class Header extends Component {
    render() {
        console.log(this.props.auth)
        return (
        <nav className="nav-bar">
            <Link to={"/"} className="logo">
                <img src={indii} className="logo-image"/>
                <p className="logo-name">Indii</p>
            </Link>
            <HeaderIcon/>
            <SearchBox/>
            <div className="nav-right">
                <HeaderLang/>
                <HeaderProfile/>
            </div>
        </nav>
        );
    }
}

function mapStateToProps({auth}) {
    return { auth }; // { auth : state.auth }
}

export default connect(mapStateToProps)(Header);