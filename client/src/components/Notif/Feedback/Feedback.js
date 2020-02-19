import React, { Component } from "react"
import styled, { css } from "styled-components"

import love from "../../../images/love.png"
import good from "../../../images/good.png"
import nerd from "../../../images/nerd.png"
import happy from "../../../images/happy.png"
import dissapointed from "../../../images/dissapointed.png"

class Feedback extends Component {
    render () {
        return (
            <FeedbackBox>
                <FeedbackIcon 
                    src={love} 
                    pressed={this.props.feedback[0]} 
                    onClick={()=>this.props.handleClick(0)}
                />
                <FeedbackIcon 
                    src={good} 
                    pressed={this.props.feedback[1]} 
                    onClick={()=>this.props.handleClick(1)}
                />
                <FeedbackIcon 
                    src={nerd} 
                    pressed={this.props.feedback[2]} 
                    onClick={()=>this.props.handleClick(2)}
                />
                <FeedbackIcon 
                    src={happy} 
                    pressed={this.props.feedback[3]} 
                    onClick={()=>this.props.handleClick(3)}
                />
                <FeedbackIcon 
                    src={dissapointed} 
                    pressed={this.props.feedback[4]} 
                    onClick={()=>this.props.handleClick(4)}
                />
            </FeedbackBox>
        )
    }
}


const FeedbackBox = styled.div`
    background-color: white;
    display: flex;
    padding: 2px;
    width: 200px;
    border-radius: 18px;
    margin-left: 18px;
    align-items: center;
    animation-name: bounce;
    animation-duration: 300ms;
    animation-fill-mode: forwards;
    z-index:1;
`

const FeedbackIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-right:20px;
    cursor: pointer;
    padding:5px;
    margin: 0px 5px !important;

    ${props => props.pressed
    ? css`        
        opacity: 1;
        transform: scale(1.08);
        background-color: rgba(154, 174, 230, 0.7);
        border-radius: 100%;
    `
    : css`
        &:hover {
            animation-name: bounce;
            animation-duration: 300ms;
            animation-fill-mode: forwards;
            background-color: rgba(158, 175, 229, 0.3);
            border-radius: 100%;
        }
    `}
`

export default Feedback