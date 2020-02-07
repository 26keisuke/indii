import React, { Component } from "react";
import styled, { css, keyframes } from "styled-components"
import { Link } from "react-router-dom"

import Button from "../Util/Button"

import { IoMdMail, IoIosLock } from "react-icons/io"
import google from "../../images/google-logo.png"
import facebook from "../../images/facebook-logo.png"


class LogIn extends Component {
    render () {
        return (
            <LogInCard ref={this.props.innerRef} show={true}>
                <div>
                    <Toggle>
                        <p>ログイン</p>
                        <p>新規登録</p>
                        <ToggleUnderline/>
                    </Toggle>
                    <ThirdPartyButton>
                        <a href="/auth/google">
                            <img src={google}/>
                            <button>Googleでログイン</button>
                        </a>
                        <a href="/auth/facebook">
                            <img src={facebook}/>
                            <button>Facebookでログイン</button>
                        </a>
                    </ThirdPartyButton>
                    <Division>
                        <div/>
                        <p>OR</p>
                        <div/>
                    </Division>
                    <Input>
                        <Icon1/>
                        <input placeholder="Eメール" type="text"/>
                    </Input>
                    <Input>
                        <Icon2/>
                        <input placeholder="パスワード" type="text"/>
                    </Input>
                    <Remember>
                        <input type="radio" id="remember" value="remember" name="remember"/>
                        <label htmlFor="remember">次から入力を省略</label>
                    </Remember>
                    <BottomWrapper>
                        <Button>ログイン</Button>
                        <Link to={"/"}>パスワードを忘れた方はこちら</Link>
                    </BottomWrapper>
                </div>
            </LogInCard>
        )
    }
}


const LogInCard = styled.div`
    width: 400px;
    height: 380px;
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

    ${props => props.toggle && css`
        background-color: #9EAEE5;
        opacity: 0.1;
        border-top-left-radius: 5px;
    `}

    & > p {
        padding: 15px;
        width: 200px;
        text-align: center;
        font-size: 12px;
        cursor: pointer;
    }
`

const ToggleUnderline = styled.div`
    position: absolute;
    width: 100%;
    border: none;
    border-bottom: 1px solid black;
    bottom: 0px;
`

const ThirdPartyButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 12px 0px;
    
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
    margin: 10px 0px;

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
    margin-top: 10px;

    & > a {
        color: #656565;
        margin-top: 20px;
        cursor: pointer;
        border-bottom: 1px dotted #656565;
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

export default LogIn