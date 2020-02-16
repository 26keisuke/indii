import React, { Component } from "react"
import styled, { css, keyframes } from "styled-components"
import PropTypes from "prop-types"

import { IoIosArrowDown } from "react-icons/io"

class ArrowSpin extends Component {
    render() {
        return (
            <Wrapper size={this.props.size}>
                <p onClick={this.props.handleClick}></p>
                <Arrow isOpened={this.props.isOpened} changed={this.props.changed}/>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    position: relative;

    & > p {

        position: absolute;
        width: ${props => String(props.size)+ "px"};
        height:  ${props => String(props.size)+ "px"};

        right: ${props => String(props.size/10 * -5 + 5)+ "px"};
        top: ${props => String(props.size/10 * -5 + 8)+ "px"};
        display: block;
        cursor: pointer;

        &::before {
            content: "";
            display: none;
            background-color: #1C1C1C;
            opacity: 0.1;
            border-radius: 100%;
            width: ${props => String(props.size)+ "px"};
            height:  ${props => String(props.size)+ "px"};
        }

        &:hover::before {
            display: block;
        }
    }
`


const Arrow = styled(IoIosArrowDown)`
    pointer-events: none;

    ${props => props.changed // pageがロードした時にアニメーションが発火しないように
    ? props => !props.isOpened 
        ? css `
            animation-name: ${spin};
            animation-duration: 400ms;
            animation-fill-mode: forwards;
        `
        : css `
            animation-name: ${spin_1};
            animation-duration: 400ms;
            animation-fill-mode: forwards;
        `
    : css `
    `}
`

const spin = keyframes`
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(180deg)
    }
`

const spin_1 = keyframes`
    from {
        transform: rotate(180deg)
    }
    to {
        transform: rotate(360deg)
    }
`

ArrowSpin.propTypes = {
    size: PropTypes.number.isRequired,
    handleClick: PropTypes.func,
    isOpened: PropTypes.bool,
    changed: PropTypes.bool,
}


export default ArrowSpin