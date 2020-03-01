// ここをPureComponentにしてるのは、メッセージがrenderされるとinputのカーソルが崩れるのを防ぐため
import React, { PureComponent } from "react";
import styled, { css, keyframes } from "styled-components"
import axios from "axios"
import { connect } from "react-redux"

import { validateEmail, sendMessage } from "../Util/util"

import * as actions from "../../actions"

import SignUp from "./SignUp/SignUp"
import LogIn from "./LogIn/LogIn"

import google from "../../images/google-logo.png"
import facebook from "../../images/facebook-logo.png"

class Auth extends PureComponent {

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

    handleLogInChange = (e, type) => {
        this.setState({
            logIn: {
                ...this.state.logIn,
                [type]: e.target.value
            }
        })
    }

    handleSignUpChange = async (e, type) => {

        var res = false;
        var check = "";
        var res2 = false;
        var check2 = "";
        var value = e.target.value;

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
            const {userName} = this.state.signUp
            const {uniqueEmail, matchPassword} = this.state
            // longPasswordとvalidEmailはいらない。なぜなら、longPasswordでないとmatchPasswordにならないから
            if(uniqueEmail && matchPassword && userName) {
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

    handleSubmit = (e, type) => {
        e.preventDefault()

        const { signUp, logIn, remember } = this.state
        

        if(type === "signUp") {

            if(this.state.signUp.userName.length > 25) {
                sendMessage("fail", "ユーザー名の長さが上限を超えています。")
                return
            }

            const value = {
                username: signUp.userName,
                email: signUp.email,
                password: signUp.password,
            }

            this.props.postAction("SIGN_UP", "", value)

        } else if (type === "logIn") {
            const value = {
                email: logIn.email,
                password: logIn.password,
                remember: remember,
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
                setRemember={() => this.setState({remember: !this.state.remember})}
                logInStates={this.state.logIn}
                remember={this.state.remember}
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
    height: 430px;
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
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        position: relative;

        & > button {
            background-color: rgba(0,0,0,0);
            border: 1px solid #d2d2d2;
            width: 155px;
            height: 36px;
            border-radius: 5px;
            padding-left: 32px;
            font-family: ${props => props.theme.font};
            color: #252525;
            cursor: pointer;
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