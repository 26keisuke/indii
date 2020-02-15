import React, { Component } from "react"
import styled from "styled-components"

import indii from "../../images/indii.png"

import { validateEmail } from "../Util/util"

import Reset from "./Reset/Reset"
import Change from "./Change/Change"

class Verification extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // パスワード設定用
            newPassword: "",
            confirmPassword: "",

            // パスワードリセットemail用
            sendEmail: "",
            validEmail: "",
        }

    }

    handleChange = (e, type) => {

        if(type === "sendEmail") {
            var validEmail = validateEmail(e.target.value)

            this.setState({
                ["sendEmail"]: e.target.value,
                validEmail: validEmail
            })

            return;
        }

        this.setState({
            [type]: e.target.value,
        })
    }

    handleClick = () => {

    }

    renderChange = () => {
        return(
            <Change
                handleClick={this.handleClick}
                handleChange={this.handleChange}
                newPassword={this.state.newPassword}
                confirmPassword={this.state.confirmPassword}
            />
        )
    }

    renderReset = (type) => {
        return(
            <Reset
                type={type}
                handleClick={this.handleClick}
                handleChange={this.handleChange}
                value={this.state.sendEmail}
                valid={this.state.validEmail}
            />
        )
    }

    render() {

        const { type } = this.props.match.params

        return (
            <VerifyPage>
                <div>
                    <img src={indii} alt={"ロゴの写真"}/>
                    <p>パスワードをリセットする</p>
                </div>
                <VerifyContainer>
                    { type === "token"
                    ?
                    this.renderReset("token")
                    :
                    type === "password"
                    ?
                    this.renderChange()
                    :
                    type === "change"
                    ?
                    this.renderReset("password")
                    :
                    ""
                    }
                </VerifyContainer>
            </VerifyPage>
        )
    }
}

const VerifyPage = styled.div`
    z-index: 99;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #ffffff;


    & > div {

        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid #d2d2d2;
        padding-left: 300px;

        & > img {
            height: 45px;
            margin-bottom: 5px;
        }

        & > p {
            font-size: 13px;
            margin-top: 5px;
        }
    }
`

const VerifyContainer = styled.div`
    padding: 75px 150px;

`

export const VerifyBox = styled.form`
    display: flex;
    flex-direction: column;

    & > p:nth-child(1) {
        font-size: 16px;
        margin-bottom: 15px;
    }

    & > p:nth-child(2),
    & > p:nth-child(4) {
        font-size: 12px;
        color: #555555;
        margin-bottom: 10px;
    }

    & > input {
        width: 300px;
        background-color:#E9E9EE;
        height: 36px;
        border: none;
        border-radius: 2px;
        padding-left: 20px;
        font-size: 13px;
        margin-bottom: 15px;
        font-family: "Gennokaku Gothic";
    }

    & > div {
        display: flex;
        flex-direction: row;
        position: relative;

        & > a {
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;
        }
    }
`

export const Warning = styled.div`

    display: flex;
    align-items: center;
    margin-top: -8px;
    margin-bottom: 8px;

    & > div {
        width: 7px;
        height: 7px;
        border-radius: 100%;
        background-color: #FF5F5F;
        margin-right: 8px;
    }
    
`

export default Verification