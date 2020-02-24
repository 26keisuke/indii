import React, { Component } from "react"
import styled, { css, keyframes } from "styled-components"
import PropTypes from "prop-types"

import { IoIosArrowDown } from "react-icons/io"

class ArrowSpin extends Component {
    
    render() {
        return (
            <Wrapper size={this.props.size}>
                <p onClick={this.props.handleClick}></p>
                <Arrow isOpened={this.props.isOpened} changed={this.props.changed} rotate={this.props.rotate}/>
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
    transform: ${ props => `rotate(${props.rotate + 0}deg)`};

    ${props => props.changed // pageがロードした時にアニメーションが発火しないように
    ? props => !props.isOpened 
        ? css `
            animation-name: ${spin(props.rotate)};
            animation-duration: 400ms;
            animation-fill-mode: forwards;
        `
        : css `
            animation-name: ${spin_1(props.rotate)};
            animation-duration: 400ms;
            animation-fill-mode: forwards;
        `
    : css `
    `}
`

const spin = (rotate) => keyframes`
    from {
        transform: ${`rotate(${rotate + 0}deg)`};
    }
    to {
        transform: ${`rotate(${rotate + 180}deg)`};
    }
`

const spin_1 = (rotate) => keyframes`
    from {
        transform: ${`rotate(${rotate + 180}deg)`};
    }
    to {
        transform: ${`rotate(${rotate + 360}deg)`};
    }
`

ArrowSpin.defaultProps = {
    rotate: 0,
}

ArrowSpin.propTypes = {
    rotate: PropTypes.number,
    size: PropTypes.number.isRequired,
    handleClick: PropTypes.func,
    isOpened: PropTypes.bool,
    changed: PropTypes.bool,
}


export default ArrowSpin