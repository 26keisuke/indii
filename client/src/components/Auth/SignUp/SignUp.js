import React, { Component } from "react"
import styled from "styled-components"

import TextField from '@material-ui/core/TextField';

import { IoIosCheckmark　} from "react-icons/io"

import { BottomWrapper } from "../LogIn/LogIn"
import { Space } from "../../Theme"
import Button from "../../Util/Button"

class SignUp extends Component {

    render () {
        return (
            <Wrapper>
                <InputWrapper>
                    <TextField 
                        id="userName" 
                        label="ユーザー名" 
                        value={this.props.signUpStates.userName}
                        onChange={(e) => this.props.handleSignUpChange(e,"userName")} 
                        type="text"
                        maxlength="25"
                    />
                    { this.props.signUpStates.userName &&
                    <Match>
                        <Check/>
                    </Match>
                    }
                </InputWrapper>
                <InputWrapper>
                    <TextField 
                        id="email" 
                        label="Eメール" 
                        value={this.props.signUpStates.email}
                        onChange={(e) => this.props.handleSignUpChange(e,"email")}
                        type="email"
                    />
                    {   (this.props.valid.validEmail && this.props.valid.uniqueEmail) 
                    ?
                    <Match>
                        <Check/>
                    </Match>
                    :
                    <Match>
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
                    <TextField 
                        id="passoword" 
                        label="パスワード" 
                        value={this.props.signUpStates.password}
                        onChange={(e) => this.props.handleSignUpChange(e,"password")} 
                        type="password"
                    />
                    {   this.props.valid.longPassword
                    ?
                    <Match top={9} right={37}>
                        <Check/>
                    </Match>
                    :
                    <Match top={-18} left={25}>
                        { this.props.valid.longPassword === false &&
                        <div/>
                        }
                        { this.props.valid.longPassword === false &&
                        <p>パスワードは8文字以上にしてください。</p>
                        }
                    </Match>
                    }
                </InputWrapper>
                <Remember onClick={(e) => this.props.setPolicy(e)}>
                    <input 
                        type="checkbox" 
                        id="remember" 
                        name="remember" 
                        checked={this.props.valid.policy} 
                    />
                    <label htmlFor="remember">利用規約、及びCookieの使用を含むプライバシーポリシーに同意します。</label>
                </Remember>
                <Space height="20px"/>
                <BottomWrapper signUp={true}>
                    {this.props.valid.valid && this.props.valid.policy
                    ? <Button width={"316px"} type="submit" onClick={(e) => this.props.handleSubmit(e, "signUp")}>アカウントを作成</Button>
                    : <Button width={"316px"} disabled={true} type="submit">アカウントを作成</Button>
                    }
                </BottomWrapper>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    margin-top:  -15px;
`

const Remember = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0px 42px;
    margin-bottom: 27px;
`

const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
    position: relative;

    & input {
        width:  316px;
        height: 20px;
        font-size: 12px;
    }
`

const Match = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    top: 24px;
    right: 47px;

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
    transform: scale(3.0);
    color: #4CD964;
`

export default SignUp