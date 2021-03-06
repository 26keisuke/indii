import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { Transition } from 'react-transition-group';
import { MdCheck, MdClose } from "react-icons/md"

import Breakpoint from "../Breakpoint"

import * as actions from "../../actions"

const MessageElement = styled.div`
    background: ${props => props.type === "success" 
                ? 
                "linear-gradient(-90deg, #fff 0%, #fff 98%, #4CD964 98%, #4CD964 100%)" 
                :
                "linear-gradient(-90deg, #fff 0%, #fff 98%, #FF5F5F 98%, #FF5F5F 100%)"
                };
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
    height: 60px;
    width: 380px;
    padding: 10px;
    border-radius: 3px;

    @media only screen and (max-width: 670px) {
        left: 50%;
        width: 300px;
        top: 70px;
    }

    position: fixed;
    left: 220px;
    transform: translate(-50%, -50%);
    bottom: -15px;
    z-index: 100;
    padding-left: 30px;

    & > div {
        width:20px;
        height: 20px;
        background-color: ${props => props.type === "success" ? "#4CD964" : "#FF5F5F"};
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

const SuccessIcon = styled(MdCheck)`
    color: white;
    margin-left: 4px;
    margin-top: 4px;
`

const FailIcon = styled(MdClose)`
    color: white;
    margin-left: 4px;
    margin-top: 4px;
`

const defaultStyle = {
    transition: "all 200ms linear",
    marginTop: "-30px",
    opacity: 0,
}

const transitionStyle = {
    entering: {opacity: 0, bottom: "-35px", pointerEvents: "none"},
    entered:  {opacity: 1, bottom: "-15px",},
    exiting:  {opacity: 1, bottom: "-15px",},
    exited:  {opacity: 0, bottom: "-35px", pointerEvents: "none"},
}

const transitionMobileStyle = {
    entering: {opacity: 0, top: "70px", pointerEvents: "none"},
    entered:  {opacity: 1, top: "90px",},
    exiting:  {opacity: 1, top: "90px",},
    exited:  {opacity: 0, top: "70px", pointerEvents: "none"},
}

const Message = ({ message, ...props }) => {
    return (
        <Fade in={message ? message.on : false} type={message.type} onExited={props.resetMessage}>
            <div>
            { message && (message.type === "success")
                ?
                <SuccessIcon/>
                :
                <FailIcon/>
                }
            </div>
            <p>
                { message && (message.type === "success")
                ?
                "完了しました！"
                :
                "失敗しました。"
                }
            </p>
            <p>{message && message.message}</p>
        </Fade>
    )
}


const Fade = ({in: inProps, children, type, onExited, ...otherProps}) => {
    return (
        <Transition in={inProps} timeout={100} { ...otherProps } onExited={() => {}}>
            {(state) => ([
                <Breakpoint key="dablet" name="dablet">
                    <MessageElement 
                        type={type}
                        style={{
                            ...defaultStyle,
                            ...transitionStyle[state]
                        }}
                    >
                        { children }
                    </MessageElement>
                </Breakpoint>,

                <Breakpoint key="mobile" name="mobile">
                    <MessageElement 
                        type={type}
                        style={{
                            ...defaultStyle,
                            ...transitionMobileStyle[state]
                        }}
                    >
                        { children }
                    </MessageElement>     
                </Breakpoint>
                
            ])}
        </Transition>
    )
}

function mapStateToProps({ update }){
    return {
        message: update.updateMessage,
    }
}

export default connect(mapStateToProps, actions)(Message)