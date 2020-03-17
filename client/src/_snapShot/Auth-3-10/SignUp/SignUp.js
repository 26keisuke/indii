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
    left: 30px;
    top: 10px;
    transform: scale(1.2);
`

const MailIcon = styled(IoMdMail)`
    position: absolute;
    color: #636480;
    z-index: 1;
    left: 30px;
    top: 10px;
    transform: scale(1.2);
`

const PasswordIcon = styled(IoIosLock)`
    position: absolute;
    color: #636480;
    z-index: 1;
    left: 30px;
    top: 10px;
    transform: scale(1.2);
`

class SignUp extends Component {

    render () {
        return (
            <form>
                <InputWrapper>
                    <UserIcon/>
                    <input 
                        value={this.props.signUpStates.userName}
                        placeholder="表示名" 
                        onChange={(e) => this.props.handleSignUpChange(e,"userName")} 
                        type="text" 
                        id="userName"
                        inputProps={{
                            maxLength: 25,
                        }}    
                    />
                    { this.props.signUpStates.userName &&
                    <Match top={9} right={37}>
                        <Check/>
                    </Match>
                    }
                </InputWrapper>
                <InputWrapper>
                    <MailIcon/> 
                    <input 
                        value={this.props.signUpStates.email}
                        placeholder="Eメール" 
                        onChange={(e) => this.props.handleSignUpChange(e,"email")} 
                        type="email"
                    />
                    {   (this.props.valid.validEmail && this.props.valid.uniqueEmail) 
                    ?
                    <Match top={9} right={37}>
                        <Check/>
                    </Match>
                    :
                    <Match top={-18} left={25}>
                        {   ((this.props.valid.validEmail　=== false) || (this.props.valid.uniqueEmail === false)) &&
                        <div/>
                        }
                        {   (this.props.valid.validEmail) && (this.props.valid.uniqueEmail === false) &&
                        <p>このEmailは既に使用されています。</p>
                        }
                        {   this.props.valid.validEmail === false &&
                        <p>Emailの形式が正しくありません。</p>
                        }
                    </Match>
                    }
                </InputWrapper>
                <InputWrapper>
                    <PasswordIcon/>
                    <input 
                        value={this.props.signUpStates.password}
                        placeholder="パスワード" 
                        onChange={(e) => this.props.handleSignUpChange(e,"password")} 
                        type="password" 
                        id="password"
                    />
                    {   (this.props.valid.matchPassword && this.props.valid.longPassword)
                    ?
                    <Match top={9} right={37}>
                        <Check/>
                    </Match>
                    :
                    <Match top={-18} left={25}>
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
                    }
                </InputWrapper>
                <InputWrapper>
                    <PasswordIcon/>
                    <input 
                        value={this.props.signUpStates.confirm}
                        placeholder="パスワードの確認" 
                        onChange={(e) => this.props.handleSignUpChange(e,"confirm")} 
                        type="password" 
                        id="confirmPassowrd"
                    />
                    {   (this.props.valid.matchPassword && this.props.valid.longPassword) &&
                    <Match top={9} right={37}>
                        <Check/>
                    </Match>
                    }
                </InputWrapper>
                <Space height="20px"/>
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

const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 25px;
    position: relative;

    & > input {
        width:  316px;
        padding-right: 12px;
        padding-left: 32px;
        height: 29px;
        font-size: 12px;
        font-family: ${props => props.theme.font};
        position: relative;
        border: none;
        background-color: #f6f6f6;
    }

    & > input:nth-child(1) {
        width: 116px !important;
    }
`

const Match = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    top: ${props => String(props.top) + "px"};
    left: ${props => String(props.left) + "px"};
    right: ${props => String(props.right) + "px"};

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
    transform: scale(2.2);
    margin-top: 1px;
    color: #4CD964;
`

export default SignUp