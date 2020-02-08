import React, { Component } from "react";
import styled, { css, keyframes } from "styled-components"
import { Link } from "react-router-dom"
import axios from "axios"

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
            validEmail: null,
            matchPassword: null,
            validPassword: null,
            validUserName: null,
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

    handleSignUpChange = (e, type) => {

        var res = false;

        if (type === "email") {
            var check = "validEmail"
            if (this.validateEmail(e.target.value)) {
                res = true
            } else {
                res = false
            }
        } else if (type === "confirm") {
            var check = "matchPassword"
            if (this.state.signUp.password === e.target.value) {
                res = true
            } else {
                res = false
            }
        } else if (type === "password") {
            if (e.target.value.length < 8) {
                var check = "validPassword"
                res = false
            } else if(this.state.signUp.confirm){
                var check = "matchPassword"
                var check2 = "validPassword"
                var res2 = true
                if (this.state.signUp.confirm === e.target.value) {
                    res = true
                } else {
                    res = false
                }
            } else {
                var check = "validPassword"
                res = true
            }
        } else if (type === "userName") {
            var check = "validUserName" 
            // make api request and check if its unique
        }

        this.setState({
            ...this.state,
            [check]: res, 
            [check2]: res2,
            signUp: {
                ...this.state.signUp,
                [type]: e.target.value
            }
        }, () => {
            // validPasswordはいらない。なぜなら、validPasswordでないとmatchPasswordにならないから
            if(this.state.validEmail && 
            this.state.matchPassword && 
            this.state.validUserName) {
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

    toggleRadio = (e) => {
        this.setState({
            remember: !this.state.remember,
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

            axios.post("/api/login", value)
            .then(() => {
                //ここでredux, fetching その他諸々
            })
            .catch(err => {
                console.log(err)
            })

        } else if (type === "logIn") {

        }
    }

    renderLogIn = () => {
        return (
            <form>
                <Division>
                    <div/>
                    <p>OR</p>
                    <div/>
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
                        onChange={(e) => this.toggleRadio(e)}
                    />
                    <label htmlFor="remember">次から入力を省略</label>
                </Remember>
                <BottomWrapper>
                    <Button type="submit" onClick={(e) => this.handleSubmit(e, "logIn")}>ログイン</Button>
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
                        placeholder="ユーザー名" 
                        onChange={(e) => this.handleSignUpChange(e,"userName")} 
                        type="text" 
                        id="userName"
                    />
                    <label htmlFor="userName">ユーザー名</label>
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
                    { 
                    <Match left="79px">
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
                        {   this.state.validEmail &&
                        <Check/>
                        }
                        {   this.state.validEmail === false &&
                        <div/>
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
                        { this.state.matchPassword && this.state.validPassword &&
                        <Check/>
                        }
                        { ((this.state.matchPassword === false) || (this.state.validPassword === false)) &&
                        <div/>
                        }
                        { this.state.validPassword === false &&
                        <p>パスワードが短すぎます。</p>
                        }
                        { (this.state.validPassword) && (this.state.matchPassword === false) &&
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
            <LogInCard ref={this.props.innerRef} show={true}>
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
                            <img src={google}/>
                            <button>
                                {this.state.logBtn ? "Googleでログイン" : "Googleで登録"}
                            </button>
                        </a>
                        <a href="/auth/facebook">
                            <img src={facebook}/>
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

const ToggleUnderline = styled.div`
    position: absolute;
    width: 100%;
    border: none;
    border-bottom: 1px solid #d2d2d2;
    bottom: 0px;
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
    margin-bottom: 15px;
    & > p {
        color: #B3B3C8;
        font-size: 10px;
    }

    & > div {
        width: 44%;
        border: none;
        border-bottom: 1px solid #B3B3C8;
    }
`

const Input = styled.div`
    position: relative;
    justify-content: center;
    display: flex;
    margin: 19px 0px;

    & > input {
        width: 315px;
        height: 32px;
        padding-left: 45px;
        font-size: 13px;
        font-family: ${props => props.theme.font}
    }
`

const Icon1 = styled(IoMdMail)`
    position:absolute;
    transform: scale(1.6);
    top: 13px;
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
    margin: 10px 34px;
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
        height: 26px;
        font-size: 12px;
        font-family: ${props => props.theme.font};
        position: relative;
        -webkit-appearance: none;
        border: 1px solid #d2d2d2;
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
        width:  336px;
        margin: 0px 6px;
        padding: 0px 10px;
        height: 26px;
        font-size: 12px;
        font-family: ${props => props.theme.font};
        position: relative;
        -webkit-appearance: none;
        border: 1px solid #d2d2d2;
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
        height: 26px;
        font-size: 12px;
        font-family: ${props => props.theme.font};
        position: relative;
        -webkit-appearance: none;
        border: 1px solid #d2d2d2;
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


export default LogIn