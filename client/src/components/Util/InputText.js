// 使いずらすぎる。アニメーションは別にすべき。

import React, { Component} from "react"
import styled, { css, keyframes } from "styled-components"
import PropTypes from "prop-types"

class InputText extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startAnimation: false,
            focus: false,
        }
    }

    componentDidMount() {
        this.setState({ startAnimation: true })
    }

    handleFocus = () => {
        this.setState({ focus: true })
    }

    handleBlur = () => {
        this.setState({ focus: false })
    }

    render () {
        return (
            <Wrapper coordinates={this.props.animationCoordinates} duration={this.props.animationDuration}>
                <Input width={this.props.width} focus={this.state.focus} onSubmit={(e) => this.props.onSubmit(e)}>
                    <p>{this.props.placeholder}</p>
                    { this.props.type !== "textarea" 
                    ?
                    <input 
                        maxLength={String(this.props.maxLength)}
                        onFocus={this.handleFocus} 
                        onBlur={this.handleBlur} 
                        onChange={this.props.handleChange}
                        value={this.props.value} 
                        type="text"
                    />
                    :
                    <textarea
                        maxLength={String(this.props.maxLength)}
                        height={this.props.height}
                        width={this.props.width}
                        onChange={this.props.handleChange}
                        value={this.props.value} 
                        type="text"
                    />
                    }
                    <div/>
                </Input>
                <Button onClick={this.props.cancelAction}>キャンセル</Button>
            </Wrapper>
        )
    }
}

const fadeIn = (fromTo) => keyframes`
    from {
        right: ${fromTo[0]}px;
        opacity: 0;
    }

    to {
        right: ${fromTo[1]}px;
        opacity: 1;
    }
`

const Button = styled.button`
    border: none;
    color: #777777;
    margin-left: 10px;
    cursor: pointer;
    -webkit-appearance: none;
    outline: none;
`

const Wrapper = styled.div`
    display: flex;

    ${props => props.coordinates
    ? css`
        position: absolute;
        top: 0px;
    `
    : css`
        position: relative;
    `}

    ${props => props.coordinates && props.duration && css`
        animation-name: ${props => fadeIn(props.coordinates)};
        animation-duration: ${props => props.duration}ms;
        animation-fill-mode: forwards;
    `}
`

const Input = styled.form`
    position: relative;
    display: flex;
    justify-content: center;

    & > p {
        position: absolute;
        transition: 200ms;
        

        ${props => !props.focus
        ? css`
            font-size: 11px;
            top: 3px;
            left: 10px;
            color: #888888;
            opacity: 0;
        `
        : css`
            transform: scale(0.8);
            font-size: 10px;
            top: -13px;
            left: 2px;
            color: #9EAEE5; 
            opacity: 1;  
        `}
    }

    & > input {
        width: ${props => String(props.width) + "px"};
        border: none;
        border-bottom: 1px solid #eaeaea;
        font-size: 13px;
    }

    & > textarea {
        height: ${props => String(props.height) + "px"};
        width: ${props => String(props.width) + "px"};
    }

    & > div {
        width: 0px;
        transition: 200ms;
        position: absolute;

        ${props => props.focus && css`
            width: ${props => String(props.width + 2) + "px"};
            border-bottom: 2px solid #9EAEE5;
            bottom: -1px;
        `}
    }

`

InputText.propTypes = {
    onSubmit: PropTypes.func,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    handleChange: PropTypes.func,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    cancelAction: PropTypes.func,
    animationCoordinates: PropTypes.arrayOf(PropTypes.number),
    animationDuration: PropTypes.number,
}

export default InputText