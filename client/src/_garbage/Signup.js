import React, { Component } from "react"
import styled from "styled-components"

import { IoIosCheckmark, IoMdMail, IoIosLock } from "react-icons/io"
import { FaUserCircle } from "react-icons/fa"

import { BottomWrapper } from "../LogIn/LogIn"
import { Space } from "../../Theme"
import Button from "../../Util/Button"

const UserIcon = styled(FaUserCircle)`
    position: absolute;
    color: #636480;
    z-index: 1;
    left: 33px;
    top: 8px;
`

const MailIcon = styled(IoMdMail)`
    position: absolute;
    color: #636480;
    z-index: 1;
    left: 33px;
    top: 8px;
`

const PasswordIcon = styled(IoIosLock)`
    position: absolute;
    color: #636480;
    z-index: 1;
    left: 33px;
    top: 8px;
`

class SignUp extends Component {

    render () {
        return (
            <form>
                <Space height="10px"/>
                <InputWrapperTop>
                    <UserIcon/>
                    <input 
                        value={this.props.signUpStates.userName}
                        placeholder="表示名" 
                        onChange={(e) => this.props.handleSignUpChange(e,"userName")} 
                        type="text" 
                        id="userName"
                    />
                    {/* <label htmlFor="userName">表示名</label> */}
                    {/* <input 
                        value={this.props.signUpStates.familyName}
                        placeholder="苗字" 
                        onChange={(e) => this.props.handleSignUpChange(e,"familyName")} 
                        type="text" 
                        id="familyName"
                    /> */}
                    {/* <label htmlFor="familyName">苗字</label> */}
                    {/* <input 
                        value={this.props.signUpStates.givenName}
                        placeholder="名前" 
                        onChange={(e) => this.props.handleSignUpChange(e,"givenName")} 
                        type="text" 
                        id="givenName"
                    /> */}
                    {/* <label htmlFor="givenName">名前</label> */}
                    { this.props.signUpStates.userName &&
                    <Match left="23px">
                        <Check/>
                    </Match>
                    }
                    {/* { this.props.signUpStates.familyName &&
                    <Match left="192px">
                        <Check/>
                    </Match>
                    }
                    { this.props.signUpStates.givenName &&
                    <Match left="306px">
                        <Check/>
                    </Match>
                    } */}
                </InputWrapperTop>
                <InputWrapperMiddle>
                    <MailIcon/> 
                    <input 
                        value={this.props.signUpStates.email}
                        placeholder="Eメール" 
                        onChange={(e) => this.props.handleSignUpChange(e,"email")} 
                        type="email"
                    />
                    {/* <label htmlFor="email">Eメール</label> */}
                    <Match left="23px">
                        {   this.props.valid.validEmail && this.props.valid.uniqueEmail &&
                        <Check/>
                        }
                        {   ((this.props.valid.validEmail　=== false) || (this.props.valid.uniqueEmail === false)) &&
                        <div/>
                        }
                        {   (this.props.valid.validEmail) && (this.props.valid.uniqueEmail === false) &&
                        <p>このEmailは既に使用されています。</p>
                        }
                        {   this.props.valid.validEmail === false &&
                        <p>Emailは「__@__」の形で入力してください。</p>
                        }
                    </Match>
                </InputWrapperMiddle>
                <InputWrapperBottom>
                    <PasswordIcon/>
                    <input 
                        value={this.props.signUpStates.password}
                        placeholder="パスワード" 
                        onChange={(e) => this.props.handleSignUpChange(e,"password")} 
                        type="password" 
                        id="password"
                    />
                    {/* <label htmlFor="password">パスワード</label> */}
                    <input 
                        value={this.props.signUpStates.confirm}
                        placeholder="パスワードの確認" 
                        onChange={(e) => this.props.handleSignUpChange(e,"confirm")} 
                        type="password" 
                        id="confirmPassowrd"
                    />
                    <Match left="23px">
                        { this.props.valid.matchPassword && this.props.valid.longPassword &&
                        <Check/>
                        }
                        { ((this.props.valid.matchPassword === false) || (this.props.valid.longPassword === false)) &&
                        <div/>
                        }
                        { this.props.valid.longPassword === false &&
                        <p>パスワードが短すぎます。</p>
                        }
                        { (this.props.valid.longPassword) && (this.props.valid.matchPassword === false) &&
                        <p>パスワードが一致しません。</p>
                        }
                    </Match>
                </InputWrapperBottom>
                <BottomWrapper signUp={true}>
                    {this.props.valid.valid
                    ? <Button width={"360px"} type="submit" onClick={(e) => this.props.handleSubmit(e, "signUp")}>アカウントを作成</Button>
                    : <Button width={"360px"} disabled={true} type="submit">アカウントを作成</Button>
                    }
                    <p>アカウントを作成すると、利用規約、及びCookieの使用を含むプライバシーポリシーに同意したことになります。</p>
                </BottomWrapper>
            </form>
        )
    }
}

/* 今はわざと三つに分けてる後々変える可能性が高いから */
const InputWrapperTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 29px;
    position: relative;

    & > input {
        width:  334px;
        margin: 0px 6px;
        padding: 0px 12px;
        height: 28px;
        font-size: 12px;
        font-family: ${props => props.theme.font};
        position: relative;
        border: none;
        background-color: #f6f6f6;
    }

    & > input:nth-child(1) {
        width: 116px !important;
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

export default SignUp