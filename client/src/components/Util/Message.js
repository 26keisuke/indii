import React, { Component } from "react"
import styled, { keyframes } from "styled-components"

import { MdCheck } from "react-icons/md"

const dangle = keyframes`
    0% {opacity: 0; margin-top: -30px;}
    10% {opacity: 1; margin-top: 0px;}
    90% {opacity: 1; margin-top: 0px;}
    100% {opacity: 0; margin-top: -30px;}
`

const MessageElement = styled.div`
    background: linear-gradient(-90deg, #fff 0%, #fff 98%, #4CD964 98%, #4CD964 100%);
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
    height: 60px;
    width: 330px;
    opacity: 0;
    padding: 10px;
    border-radius: 3px;
    animation: ${dangle} 3s linear;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 13%;
    margin: auto 0;
    z-index: 100;
    padding-left: 30px;

    & > div {
        width:20px;
        height: 20px;
        background-color: #4CD964;
        left: 18px;
        border-radius: 100%;
        position: absolute;
    }

    & > p:nth-child(2){
        font-size: 13px;
        font-weight: bold;
        margin-top: 11px;
        margin-left: 15px;
    }

    & > p:nth-child(3){
        font-size: 11px;
        margin-left: 9px;
        margin-top: 3px;
        color: #333333;
    }
`

const MessageIcon = styled(MdCheck)`
    color: white;
    margin-left: 4px;
    margin-top: 4px;
`

class Message extends Component {
    render () {
        return (
            <MessageElement>
                <div>
                    <MessageIcon/>
                </div>
                <p>完了しました！</p>
                <p>{this.props.message}</p>
            </MessageElement>
        )
    }
}

export default Message