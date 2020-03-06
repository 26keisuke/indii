import React, { Component } from "react"
import styled, { css, keyframes } from "styled-components"

class ToggleBtn extends Component {
    render () {
        return (
            <Toggle on={this.props.on} onClick={() => this.props.handleClick()}>
                <input type="button"/>
                <div/>
            </Toggle>
        )
    }
}

const leftToRight = keyframes`
    0% {
        right: 20px;
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
        right: 20px;
    }
`

const Toggle = styled.div`
    position: relative;

    & > input {
        position:absolute;
        top: -10px;
        right: 3px; 
        width: 27px;
        height: 27px;
        margin-top: 12px;
        background-color: #9EAEE6;
        cursor: pointer;
        border: none;
        border-radius: 100%;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);

        ${props => props.on 
        ? css`
            animation-name: ${leftToRight};
            animation-duration: 300ms;
            animation-fill-mode: forwards;
        `
        : css`
            animation-name: ${rightToLeft};
            animation-duration: 300ms;
            animation-fill-mode: forwards;
            background-color: #eaeaea !important;
        `}
    }


    & > div {
        border: 1px solid #eaeaea;
        width: 48px;
        height: 30px;
        cursor: pointer;
        border-radius: 50px;
    }
`



export default ToggleBtn