// token => トークンを再送信
// change => パスワードを変更するためのEmailを送る
// password => changeで送られたEmailのリンクをクリックしたページ

import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import axios from "axios"
import { withRouter } from "react-router-dom" 

import * as actions from "../../actions"

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

    handleResetClick = (e) => {
        e.preventDefault()

        const { type } = this.props.match.params

        if (type === "token") {
            axios.post("/api/resend", {email: this.state.sendEmail})
            .then(res => {
                switch(res.data) {
                    case "SUCCESS":
                        this.props.updateMessage("success", `"${this.state.sendEmail}"に確認メールを送信しました。`, 7000)
                        return
                    case "FAIL":
                        this.props.updateMessage("success", `"${this.state.sendEmail}"はまだ登録されていません。`, 7000)
                        return
                    case "ALREADY":
                        this.props.updateMessage("success", `"${this.state.sendEmail}"は既に認証済みです。`, 7000)
                        return
                    default:
                        return
                }
            })
            .catch(err => {
                console.log(err)
            })
        } else if(type === "change") {
            axios.post("/api/password/reset/email", {email: this.state.sendEmail})
            .then(res => {
                switch(res.data) {
                    case "SUCCESS":
                        this.props.updateMessage("success", `"${this.state.sendEmail}"にメールを送信しました。`, 7000)
                        return
                    case "FAIL":
                        this.props.updateMessage("fail", `"${this.state.sendEmail}"はまだ登録されていません。`, 7000)
                        return
                    default:
                        return
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    handleChangeClick = (e) => {
        e.preventDefault()
        axios.post(`/api/password/reset/${this.props.match.params.tokenId}`, {newPassword: this.state.newPassword, confirmPassword: this.state.confirmPassword})
            .then(res => {
                switch(res.data) {
                    case "SUCCESS":
                        this.props.history.push("/")
                        this.props.updateMessage("success", "パスワードを変更しました。", 7000)
                        return
                    case "FAIL":
                        this.props.updateMessage("fail", "変更に失敗しました。", 7000)
                        return
                    default:
                        return
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderChange = () => {
        return(
            <Change
                handleClick={this.handleChangeClick}
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
                handleClick={this.handleResetClick}
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
                    <p>
                    { type === "token"
                    ?
                    "認証メールを再送信する"
                    :
                    type === "password"
                    ?
                    "パスワードをリセットする"
                    :
                    type === "change"
                    ?
                    "パスワードをリセットする"
                    :
                    "" 
                    }
                    </p>
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

        & > span {
            margin-left: 10px;
            font-size: 10px;
            color: #555555;
        }
    }

    & > p:nth-child(2),
    & > p:nth-child(4) {
        font-size: 12px;
        color: #555555;
        margin-bottom: 10px;
    }

    & > input {
        min-width: 300px;
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

export default connect(null, actions)(withRouter(Verification))