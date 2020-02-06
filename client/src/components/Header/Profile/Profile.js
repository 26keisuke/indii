import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components"
import _ from "lodash";

import account from "../../../images/account.png";

const ProfileArea = styled.div`
    @media only screen and (max-width: 670px) {
        padding-left: 15px !important;
    }   

    display: flex;
    justify-content: center;
    margin-right:50px;
    align-items: center;
    padding-left:40px;

    & > div {
        @media only screen and (max-width: 670px) {
            margin-right:-35px;
        } 
        display: flex;
        align-items: center;
    }

    & img {
        @media only screen and (max-width: 670px) {
            width: 26px !important;
            height: 26px !important;
        } 
        width:32px;
        height:32px;
        margin-right:10px;
    }
`

const Name = styled(Link)`
    @media only screen and (max-width: 670px) {
        display: none;
    } 
    display: flex;
    & > p {
        margin: 0px 2px;
    }
`

const LogInButton = styled.div`
    @media only screen and (max-width: 670px) {
        font-size: 10px;
        margin-right: -20px;
    }   
    width: 125px;
    font-size: 12px;
    cursor: pointer;
`

class Profile extends Component {
    render() {
        const flag = !_.isEmpty(this.props.auth) 
        return (
            <ProfileArea>
                <div>
                    {
                        flag
                        ?
                        this.props.auth.photo
                        ?
                        <Link to="/profile"><img src={this.props.auth.photo}/></Link>
                        :
                        <Link to="/profile"><img src={account}/></Link>
                        :
                        ""
                    }
                    {   flag
                        ? 
                        <Name to="/profile">
                            <p>{this.props.auth.name.familyName}</p>
                            <p>{this.props.auth.name.givenName}</p>
                        </Name>
                        :
                        <LogInButton onClick={(e) => this.props.click(e)}>
                            ログイン/サインアップ
                        </LogInButton>
                    }
                </div>
            </ProfileArea>
        )
    }
}

function mapStateToProps({auth}) {
    return {
        auth
    }
}

export default connect(mapStateToProps, null)(Profile)