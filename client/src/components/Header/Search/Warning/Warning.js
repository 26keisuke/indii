import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const WarningElement = styled.div`
    color: ${props => props.color === "green" ? "#4CD964" : "#747474"};
    font-size: 11px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: -28px;
    width: 440px;
    & > div {
        width: 10px;
        height: 10px;
        border-radius: 100%;
        margin-right: 10px;
        background-color: #FF5F5F;
    }
    & a {
        text-decoration: underline !important;
        text-decoration-style: dotted !important;
    }
`

class Warning extends Component {
    render() {

        const { color, children } = this.props;
        
        return (
            <WarningElement color={color}>
                <div/>
                {children}
            </WarningElement>
        )
    }
}

Warning.propTypes = {
    color: PropTypes.string,
    children: PropTypes.object,
}

export default Warning