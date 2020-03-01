import React, { Component } from "react"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"

class TwoButtons extends Component {
    render() {
        return (
            <ButtonWrapper>
                <ButtonLeft onClick={this.props.handleBack}>{this.props.text[0]}</ButtonLeft>
                <ButtonRight disabled={this.props.disabled} onClick={this.props.handleForward}>{this.props.text[1]}</ButtonRight>
            </ButtonWrapper>
        )
    }
}


export const ButtonWrapper = styled.div`
    width: 444px;
    display: flex;
    justify-content: space-between;
    margin-top:30px;
`

export const ButtonLeft = styled.button`
    width: 90px;
    height:34px;
    cursor: pointer;
    background-color: #ffffff;
    border: 0.5px solid #636480;
    outline:0;
`

const ButtonRight = styled.button`
    width: 90px;
    height:34px;
    cursor: pointer;
    border: none;
    background-color: #636480;
    color: #ffffff;
    outline:0;

    ${props => props.disabled && css`
        opacity: 0.2;
        pointer-events: none;
    `}
`

TwoButtons.defaultProps = {
    disabled: false,
}

TwoButtons.propType = {
    handleBack: PropTypes.func,
    handleForward: PropTypes.func,
    text: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool
}


export default TwoButtons