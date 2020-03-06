import React, { Component } from "react"
import styled, { css, keyframes } from "styled-components"

class ToggleText extends Component {
    render () {
        return (
            <Toggle on={this.props.on} onClick={this.props.handleClick}>
                <div>
                    <p>編集後</p>
                    <p>編集前</p>
                    <input type="button"/>
                </div>
            </Toggle>
        )
    }
}

const leftToRight = keyframes`
    0% {
        right: 63px;
    }
    100% {
        right: 3px;
    }
`

const rightToLeft = keyframes`
    0% {
        right: 3px;
    }
    100% {
        right: 63px;
    }
`

const Toggle = styled.div`
    position: relative;

    & > div {

        position: relative;

        border: 1px solid #eaeaea;
        width: 122px;
        height: 32px;
        cursor: pointer;
        border-radius: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 10px;

        & > p:nth-child(1){
            color: ${props => props.on ? "#b2b2b2" : "#fff"};
            z-index: 1;
            transition: 300ms;
        }

        & > p:nth-child(2){
            color: ${props => props.on ? "#fff" : "#b2b2b2"};
            z-index: 1;
            transition: 300ms;
        }

        & > input {
            position:absolute;
            top: -10px;
            right: 63px; 
            width: 55px;
            height: 27px;
            margin-top: 12px;
            background-color: #9EAEE6;
            cursor: pointer;
            border: none;
            border-radius: 15px;
            box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);

            ${props => props.on === true
            && css`
                animation-name: ${leftToRight};
                animation-duration: 300ms;
                animation-fill-mode: forwards;
            `}
            ${props => props.on === false
            && css`
                animation-name: ${rightToLeft};
                animation-duration: 300ms;
                animation-fill-mode: forwards;
            `}
        }
    }
`



export default ToggleText