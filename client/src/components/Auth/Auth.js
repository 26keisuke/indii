// ここはめちゃくちゃわかりにくいし長いから後できれいにする

import React, { Component } from "react";
import styled, { css, keyframes } from "styled-components"
import axios from "axios"
import { connect } from "react-redux"

import { validateEmail } from "../Util/util"

import * as actions from "../../actions"

import SignUp from "./SignUp/SignUp"
import LogIn from "./LogIn/LogIn"

import google from "../../images/google-logo.png"
import facebook from "../../images/facebook-logo.png"

class Auth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            logBtn: true,
            signBtn: false,

            // logInに関するもの
            logIn:  {
                email: "",
                password: ""
            },

            remember: false,

            // signUpに関するもの
            signUp: {
                userName: "",
                familyName: "",
                givenName: "",
                email: "",
                password: "",
                confirm: "",
            },

            validEmail: null,
            uniqueEmail: null,
            matchPassword: null,
            longPassword: null,
            valid: null,
        }
    }

    handleClick = (type) => {
        if((type === "log" && !this.state.logBtn) || (type === "sign" && !this.state.signBtn)) {
            this.setState({
                logBtn: !this.state.logBtn,
                signBtn: !this.state.signBtn,
            })
        }
    }

    setRemember = () => {
        this.setState({remember: !this.state.remember})
    }

    handleLogInChange = (e, type) => {
        this.setState({
            logIn: {
                ...this.state.logIn,
                [type]: e.target.value
            }
        })
    }

    handleSignUpChange = (e, type) => {

        var res = false;
        var check = ""
        var res2 = false;
        var check2 = ""
        var value = e.target.value

        if (type === "email") {
            check = "validEmail"
            if (validateEmail(value)) {

                res = true

                axios.get(`/api/email/${value}`)
                .then(res => {
                    if(res.data) {
                        check2 = "uniqueEmail"
                        res2 = true
                    } else {
                        // there is already a user who own this email
                        check2 = "uniqueEmail"
                        res2 = false
                    }
                    this.setSignUpState(value, type, check, res, check2, res2)
                    return;
                })
                .catch(err => {
                    console.error(err)
                }) 
            } else {
                res = false
            }
        } else if (type === "confirm") {
            check = "matchPassword"
            if (this.state.signUp.password === value) {
                res = true
            } else {
                res = false
            }
        } else if (type === "password") {
            if (value.length < 8) {
                check = "longPassword"
                res = false
            } else if(this.state.signUp.confirm){
                check = "matchPassword"
                check2 = "longPassword" // password length is equal to or longer than 8
                res2 = true
                if (this.state.signUp.confirm === value) {
                    res = true
                } else {
                    res = false
                }
            } else {
                check = "longPassword"
                res = true
            }
        }
        this.setSignUpState(value, type, check, res, check2, res2)
    }

    setSignUpState = (value, type, check, res, check2, res2) => {

        this.setState({
            ...this.state,
            [check]: res, 
            [check2]: res2,
            signUp: {
                ...this.state.signUp,
                [type]: value
            }
        }, () => {
            const {userName, familyName, givenName} = this.state.signUp
            const {uniqueEmail, matchPassword} = this.state
            // longPasswordとvalidEmailはいらない。なぜなら、longPasswordでないとmatchPasswordにならないから
            if(uniqueEmail && matchPassword && userName && familyName && givenName) {
                this.setState({
                    valid: true,
                })
            } else {
                this.setState({
                    valid: false,
                })
            }
        })   
    }

    validateEmail(value){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
            return true;
        }
            return false;
    }

    handleSubmit = (e, type) => {
        e.preventDefault()
        if(type === "signUp") {

            const value = {
                username: this.state.signUp.userName,
                email: this.state.signUp.email,
                familyName: this.state.signUp.familyName,
                givenName: this.state.signUp.givenName,
                password: this.state.signUp.password,
            }

            this.props.postAction("SIGN_UP", "", value)

        } else if (type === "logIn") {
            const value = {
                email: this.state.logIn.email,
                password: this.state.logIn.password,
                remember: this.state.remember,
            }

            this.props.postAction("LOG_IN", "", value)
        }
    }

    renderLogIn = () => {
        
        return (
            <LogIn
                postAction={this.props.postAction}
                handleLogInChange={this.handleLogInChange}
                handleSubmit={this.handleSubmit}
                setRemember={this.setRemember}
                logInStates={this.state.logIn}
                rememberState={this.state.remember}
                error={this.props.error}
            />
        )
    }

    renderSignUp = () => {
        return (
            <SignUp
                postAction={this.props.postAction}
                handleSignUpChange={this.handleSignUpChange}
                handleSubmit={this.handleSubmit}
                signUpStates={this.state.signUp}
                valid={{
                    validEmail: this.state.validEmail,
                    uniqueEmail: this.state.uniqueEmail,
                    matchPassword: this.state.matchPassword,
                    longPassword: this.state.longPassword,
                    valid: this.state.valid,
                }}
            />
        )
    }

    render () {

        return (
            <LogInCard ref={this.props.innerRef} show={this.props.show}>
                <div>
                    <Toggle>
                        <ToggleBtn 
                            toggleOn={this.state.logBtn} 
                            borderRight={true}
                            onClick={() => this.handleClick("log")}>
                            ログイン
                        </ToggleBtn>
                        <ToggleBtn 
                            toggleOn={this.state.signBtn} 
                            onClick={() => this.handleClick("sign")}>
                            新規登録
                        </ToggleBtn>
                    </Toggle>
                    <ThirdPartyButton>
                        <a href="/auth/google">
                            <img src={google} alt={"Googleでサインする画像"}/>
                            <button>
                                {this.state.logBtn ? "Googleでログイン" : "Googleで登録"}
                            </button>
                        </a>
                        <a href="/auth/facebook">
                            <img src={facebook} alt={"Facebookでサインする画像"}/>
                            <button>
                                {this.state.logBtn ? "Facebookでログイン" : "Facebookで登録"}    
                            </button>
                        </a>
                    </ThirdPartyButton>
                    
                    {
                        this.state.logBtn ? this.renderLogIn() : this.renderSignUp()
                    }

                </div>
            </LogInCard>
        )
    }
}


const LogInCard = styled.div`
    width: 400px;
    height: 385px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    background-color: #ffffff;
    z-index: 20;
    position: absolute;
    top: 320px;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;

    ${props => props.show 
    ? css`
        animation: ${onEnter} 250ms ease-out forwards;
    `
    : css`
        animation: ${onLeave} 250ms ease-out forwards;
    `}

    & > div {
        display: flex;
        flex-direction: column;
    }
`

const onLeave = keyframes`
    from {top: 320px; opacity: 1;}
    to {top: 370px; opacity: 0;}
`

const onEnter = keyframes`
    from {top: 370px; opacity: 0;}
    to {top: 320px; opacity: 1;}
`

const Toggle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: relative;
`

const ToggleBtn = styled.p`
    padding: 15px;
    width: 200px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    border-bottom: 1px solid #d2d2d2;
    border-right: ${props => props.borderRight && "1px solid #d2d2d2"};

    ${props => !props.toggleOn && css`
        &:hover {
            background-color: rgba(158, 174, 229, 0.05);
        }
    `}

    ${props => props.toggleOn && css`
        background-color: rgba(158, 174, 229, 0.2);
    `}

`

const ThirdPartyButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 18px 0px;
    
    & > a {

        position: relative;

        & > button {
            width: 155px;
            height: 36px;
            border-radius: 5px;
            padding-left: 32px;
            font-family: ${props => props.theme.font};
            color: #252525;
            cursor: pointer;
            border-color: #d2d2d2;
            outline: 0;
        }

        & > img {
            width: 23px;
            position: absolute;
            top: 6px;
            left: 11px;
        }
    }   
`

export default connect(null, actions)(Auth)