import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Profile/Profile";

import indii from "../../images/indii.png";

import HeaderProfile from "./Profile/Profile";
import Navigation from "./Navigation"
import Search from "./Search/Search";

import "./Header.css"

class Header extends Component {
    render() {
        return (
        <nav className="nav-bar">
            <Link to={"/"} className="logo">
                <img src={indii} className="logo-image"/>
                <p className="logo-name">Indii</p>
            </Link>
            <Navigation/>
            <Search/>
            <div className="nav-right">
                <HeaderProfile/>
            </div>
        </nav>
        );
    }
}

export default Header;