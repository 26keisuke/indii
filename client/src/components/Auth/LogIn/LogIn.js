import React, { Component } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { IoMdMail, IoIosLock } from "react-icons/io"

import Button from "../../Util/Button"

class LogIn extends Component {

    render () {
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
                        value={this.props.logInStates.email}
                        onChange={(e) => this.props.handleLogInChange(e,"email")} 
                        placeholder="Eメール" 
                        type="email"
                        name="email"
                    />
                </Input>
                <Input>
                    <Icon2/>
                    <input 
                        value={this.props.logInStates.password}
                        onChange={(e) => this.props.handleLogInChange(e,"password")} 
                        placeholder="パスワード" 
                        type="password"
                        name="password"
                    />
                </Input>
                <Remember>
                    <input 
                        type="radio" 
                        id="remember" 
                        name="remember" 
                        checked={this.props.remember && "checked"} 
                        onChange={this.props.setRemember}
                    />
                    <label htmlFor="remember">次から入力を省略</label>
                </Remember>
                <BottomWrapper>
                    {   ((this.props.logInStates.email) && (this.props.logInStates.password)) 
                    ?
                    <Button width={"360px"} type="submit" onClick={(e) => this.props.handleSubmit(e, "logIn")}>ログイン</Button>
                    :
                    <Button width={"360px"} disabled={true} type="submit">ログイン</Button>
                    }
                    <Link to={"/verification/password"}>パスワードを忘れた方はこちら</Link>
                </BottomWrapper>
            </form>
        )
    }
}

const Division = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
    & > p {
        color: #B3B3C8;
        font-size: 10px;
    }

    & > div:nth-child(1),
    & > div:nth-child(3){
        width: 44%;
        border: none;
        border-bottom: 1px solid #d2d2d2;
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

export const BottomWrapper = styled.div`
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
        font-size: 10px;
        width: 300px;
        text-align: center;
        margin-top: 18px;
        color: #444444;
    }
`

const Remember = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0px 34px;
    margin-bottom: 18px;
`

const Message = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    bottom: -20px;
    left: 22px;
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

export default LogIn