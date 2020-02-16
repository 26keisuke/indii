import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components"

import "./Profile/Profile";
import * as actions from "../../actions"

import indii from "../../images/indii.png";

import Profile from "./Profile/Profile";
import Navigation from "./Navigation/Navigation"
// import Search from "../Search/Search";
import Select from "../Action/Controller/Select"

const NavBar = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 55px;
    align-items: center;
    border-bottom: 1px solid #D2D2D2;
    background-color: #ffffff;
    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 5;
`

const Logo = styled(Link)`
    display: flex;
    align-items: center;
    margin-left:20px;

    @media only screen and (max-width: 670px) {
        margin-bottom:-5px;
    }

    & > p {
        font-family: 'Libre Baskerville', serif;
        font-size:24px;
        color: #222222;
        margin-right:20px;

        @media only screen and (max-width: 670px) {
            font-size:21px !important;
            font-family: 'Libre Baskerville', serif !important;
        }
    }

    & > img {
        width: 40px;
        height: 55px;
        margin-top:-8px;

        @media only screen and (max-width: 670px) {
            width:30px !important;
            height:40px !important;
        }
    }
`

class Header extends Component {

    logInClicked = (e) => {
        e.preventDefault()
        this.props.showLogin()
        this.props.enableGray()
    }

    render() {
        return (
        <NavBar>
            <Logo to={"/"}>
                <img src={indii}/>
                <p>Indii</p>
            </Logo>
            <Navigation/>
            <Select
                placeholder="Indiiで検索"
                searchBox={true}
                type="Match"
                content="Topic"
                // data={topics}
                searchByVariable="topicName"
                storage="searchTopicName"
            />
            <Profile click={this.logInClicked}/>
        </NavBar>
        );
    }
}

export default connect(null, actions)(Header);