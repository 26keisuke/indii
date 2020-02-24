import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components"

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
        white-space: nowrap;
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

        const flag = this.props.auth.loggedIn && this.props.auth.info.isVerified
        const { photo, userName, _id } = this.props.auth.info

        return (
            <ProfileArea>
                <div>
                    {   flag
                        ?
                        photo
                        ?
                        <Link to={`/profile/${_id}`}><img src={photo} alt={"ユーザーのプロフィール画像"}/></Link>
                        :
                        <Link to={`/profile/${_id}`}><img src={account} alt={"ユーザーのデフォルトのプロフィール画像"}/></Link>
                        :
                        ""
                    }
                    {   flag
                        ? 
                        <Name  to={`/profile/${_id}`}>
                            <p>{userName}</p>
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