// ここはめちゃくちゃわかりにくいし長いから後できれいにする

import React, { Component } from "react";
import styled, { css, keyframes } from "styled-components"
import { Link } from "react-router-dom"
import axios from "axios"
import { connect } from "react-redux"

import * as actions from "../../actions"

import Button from "../Util/Button"

import { IoMdMail, IoIosLock, IoIosCheckmark } from "react-icons/io"
import google from "../../images/google-logo.png"
import facebook from "../../images/facebook-logo.png"

import { Space } from "../Theme"

class LogIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            logBtn: true,
            signBtn: false,
            remember: false,
            logIn: {
                email: "",
                password: ""
            },
            signUp: {
                userName: "",
                familyName: "",
                givenName: "",
                email: "",
                password: "",
                confirm: "",
            },

            // signUpに関するもの
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

    handleSignUpChange = (e, type) => {

        var res = false;
        var check = ""
        var res2 = false;
        var check2 = ""
        var value = e.target.value

        if (type === "email") {
            check = "validEmail"
            if (this.validateEmail(value)) {

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
            <form>
                <Division>
                    <div/>
                    <p>OR</p>
                    <div/>
                    { this.props.error &&
                    <Message>
                        <div/>
                        <p>Emailかパスワードが間違っています。</p>
                    </Message>
                    }
                </Division>
                <Input>
                    <Icon1/>
                    <input 
                        value={this.state.logIn.email}
                        onChange={(e) => this.handleLogInChange(e,"email")} 
                        placeholder="Eメール" 
                        type="email"
                    />
                </Input>
                <Input>
                    <Icon2/>
                    <input 
                        value={this.state.logIn.password}
                        onChange={(e) => this.handleLogInChange(e,"password")} 
                        placeholder="パスワード" 
                        type="password"
                    />
                </Input>
                <Remember>
                    <input 
                        type="radio" 
                        id="remember" 
                        name="remember" 
                        checked={this.state.remember && "checked"} 
                        onChange={() => this.setState({remember: !this.state.remember})}
                    />
                    <label htmlFor="remember">次から入力を省略</label>
                </Remember>
                <BottomWrapper>
                    {   ((this.state.logIn.email) && (this.state.logIn.password)) 
                    ?
                    <Button type="submit" onClick={(e) => this.handleSubmit(e, "logIn")}>ログイン</Button>
                    :
                    <Button disabled={true} type="submit">ログイン</Button>
                    }
                    <Link to={"/"}>パスワードを忘れた方はこちら</Link>
                </BottomWrapper>
            </form>
        )
    }

    renderSignUp = () => {
        return (
            <form>
                <Space height="10px"/>
                <InputWrapperTop>
                    <input 
                        value={this.state.signUp.userName}
                        placeholder="表示名" 
                        onChange={(e) => this.handleSignUpChange(e,"userName")} 
                        type="text" 
                        id="userName"
                    />
                    <label htmlFor="userName">表示名</label>
                    <input 
                        value={this.state.signUp.familyName}
                        placeholder="苗字" 
                        onChange={(e) => this.handleSignUpChange(e,"familyName")} 
                        type="text" 
                        id="familyName"
                    />
                    <label htmlFor="familyName">苗字</label>
                    <input 
                        value={this.state.signUp.givenName}
                        placeholder="名前" 
                        onChange={(e) => this.handleSignUpChange(e,"givenName")} 
                        type="text" 
                        id="givenName"
                    />
                    <label htmlFor="givenName">名前</label>
                    { this.state.signUp.userName &&
                    <Match left="62px">
                        <Check/>
                    </Match>
                    }
                    { this.state.signUp.familyName &&
                    <Match left="192px">
                        <Check/>
                    </Match>
                    }
                    { this.state.signUp.givenName &&
                    <Match left="306px">
                        <Check/>
                    </Match>
                    }
                </InputWrapperTop>
                <InputWrapperMiddle>
                    <input 
                        value={this.state.signUp.email}
                        placeholder="Eメール" 
                        onChange={(e) => this.handleSignUpChange(e,"email")} 
                        type="email"
                    />
                    <label htmlFor="email">Eメール</label>
                    
                    <Match left="66px">
                        {   this.state.validEmail && this.state.uniqueEmail &&
                        <Check/>
                        }
                        {   ((this.state.validEmail　=== false) || (this.state.uniqueEmail === false)) &&
                        <div/>
                        }
                        {   (this.state.validEmail) && (this.state.uniqueEmail === false) &&
                        <p>このEmailは既に使用されています。</p>
                        }
                        {   this.state.validEmail === false &&
                        <p>Emailが正しくありません。</p>
                        }
                    </Match>
                </InputWrapperMiddle>
                <InputWrapperBottom>
                    <input 
                        value={this.state.signUp.password}
                        placeholder="パスワード" 
                        onChange={(e) => this.handleSignUpChange(e,"password")} 
                        type="password" 
                        id="password"
                    />
                    <label htmlFor="password">パスワード</label>
                    <input 
                        value={this.state.signUp.confirm}
                        placeholder="パスワードの確認" 
                        onChange={(e) => this.handleSignUpChange(e,"confirm")} 
                        type="password" 
                        id="confirmPassowrd"
                    />
                    <Match left="82px">
                        { this.state.matchPassword && this.state.longPassword &&
                        <Check/>
                        }
                        { ((this.state.matchPassword === false) || (this.state.longPassword === false)) &&
                        <div/>
                        }
                        { this.state.longPassword === false &&
                        <p>パスワードが短すぎます。</p>
                        }
                        { (this.state.longPassword) && (this.state.matchPassword === false) &&
                        <p>パスワードが一致しません。</p>
                        }
                    </Match>
                </InputWrapperBottom>
                <BottomWrapper signUp={true}>
                    {this.state.valid
                    ? <Button type="submit" onClick={(e) => this.handleSubmit(e, "signUp")}>アカウントを作成</Button>
                    : <Button disabled={true} type="submit">アカウントを作成</Button>
                    }
                    <p>アカウントを作成すると、利用規約、及びCookieの使用を含むプライバシーポリシーに同意したことになります。</p>
                </BottomWrapper>
            </form>
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
            height: 35px;
            border-radius: 1px;
            padding-left: 35px;
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

const Division = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 28px;
    position: relative;
    & > p {
        color: #B3B3C8;
        font-size: 10px;
    }

    & > div:nth-child(1),
    & > div:nth-child(3){
        width: 44%;
        border: none;
        border-bottom: 1px solid #B3B3C8;
    }
`

const Input = styled.div`
    position: relative;
    justify-content: center;
    display: flex;
    margin: 18px 0px;

    & > input {
        width: 315px;
        height: 33px;
        background-color: #f5f5f5;
        border: none;
        padding-left: 45px;
        font-size: 13px;
        font-family: ${props => props.theme.font}
    }
`

const Icon1 = styled(IoMdMail)`
    position:absolute;
    transform: scale(1.6);
    top: 12px;
    left: 38px;
    color: ${props => props.theme.fontColor.lightBlue};
`

const Icon2 = styled(IoIosLock)`
    position:absolute;
    transform: scale(1.6);
    top: 12px;
    left: 38px;
    color: ${props => props.theme.fontColor.lightBlue};
`

const BottomWrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-top: ${props => props.signUp ? "-6px" : "10px"};

    & > a {
        color: #656565;
        margin-top: 20px;
        cursor: pointer;
        border-bottom: 1px dotted #656565;
    }

    & > p {
        font-size: 9px;
        width: 300px;
        text-align: center;
        margin-top: 17px;
        color: #444444;
    }
`

const Remember = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0px 34px;
`

const onLeave = keyframes`
    from {top: 320px; opacity: 1;}
    to {top: 370px; opacity: 0;}
`

const onEnter = keyframes`
    from {top: 370px; opacity: 0;}
    to {top: 320px; opacity: 1;}
`

/* 今はわざと三つに分けてる後々変える可能性が高いから */
const InputWrapperTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 29px;
    position: relative;

    & > input {
        width:  81px;
        margin: 0px 6px;
        padding: 0px 10px;
        height: 28px;
        font-size: 12px;
        font-family: ${props => props.theme.font};
        position: relative;
        border: none;
        background-color: #f6f6f6;
    }

    & > input:nth-child(1) {
        width: 106px !important;
    }

    & > label:nth-child(2) {
        position:absolute;
        left: 25px;
        top: -18px;
        color: #888888;
        font-size: 10px;
    }

    & > label:nth-child(4) {
        position:absolute;
        left: 167px;
        top: -18px;
        color: #888888;
        font-size: 10px;
    }

    & > label:nth-child(6) {
        position:absolute;
        left: 282px;
        top: -18px;
        color: #888888;
        font-size: 10px;
    }
`

const InputWrapperMiddle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 29px;
    position: relative;

    & > input {
        width:  329px;
        margin: 0px 6px;
        padding: 0px 12px;
        height: 28px;
        font-size: 12px;
        font-family: ${props => props.theme.font};
        position: relative;
        border: none;
        background-color: #f6f6f6;
    }

    & > label:nth-child(2) {
        position:absolute;
        left: 25px;
        top: -18px;
        color: #888888;
        font-size: 10px;

    }
`

const InputWrapperBottom = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 29px;
    position: relative;

    & > input {
        width: 151px;
        margin: 0px 6px;
        padding: 0px 10px;
        height: 29px;
        font-size: 12px;
        font-family: ${props => props.theme.font};
        position: relative;
        border: none;
        background-color: #f6f6f6;
    }

    & > label:nth-child(2) {
        position:absolute;
        left: 25px;
        top: -18px;
        color: #888888;
        font-size: 10px;

    }
`

const Match = styled.div`
    position: absolute;
    top: -18px;
    display: flex;
    align-items: center;
    left: ${props => props.left};

    & > div {
        background-color: #FF5F5F;
        width: 6px;
        height: 6px;
        border-radius: 100%;
        margin-right: 5px;
        margin-top: -1px;
    }
    
    & > p {
        font-size: 10px;
        color: #555555;
    }
`

const Check = styled(IoIosCheckmark)`
    transform: scale(1.6);
    margin-top: 1px;
    color: #4CD964;
`

const Message = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    bottom: -20px;
    left: 19px;
    font-size: 10px;
    color: #333333;

    & > div {
        width: 7px;
        height: 7px;
        margin-right: 8px;
        border-radius: 100%;
        background-color: #FF5F5F;
        
    }
`

export default connect(null, actions)(LogIn)