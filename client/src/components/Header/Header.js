import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components"

import "./Profile/Profile";
import * as actions from "../../actions"

import indii from "../../images/indii.png";

import Profile from "./Profile/Profile";
import Navigation from "./Navigation/Navigation"
import Select from "../Action/Controller/Select"

const NavBar = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 55px;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    background-color: #ffffff;
    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 5;
    box-shadow: 1px 1px 4px #e2e2e2;
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
        text-shadow: 1px 2px 4px #eaeaea;
        font-size:24px;
        color: #222222;
        margin-right:20px;
        letter-spacing: 0px;

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
                type="Unique"
                content="Topic"
                // data={topics}
                searchByVariable="topicName"
            />
            <Profile click={this.logInClicked}/>
        </NavBar>
        );
    }
}

export default connect(null, actions)(Header);