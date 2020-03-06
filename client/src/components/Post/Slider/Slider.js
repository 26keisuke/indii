import React, { Component } from "react"
import styled, { css, keyframes } from "styled-components"

class Slider extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toggle: "home"
        }
    }

    render () {
        return (
            <Row>
                <Element selected={this.state.toggle === "home"} onClick={() => this.setState({ toggle : "home" })}>
                    <p>基本情報</p>
                    <div/>
                </Element>
                <Element selected={this.state.toggle === "topic"} onClick={() => this.setState({ toggle : "topic" })}>
                    <p>トピック</p>
                    <div/>
                </Element>
                <Element selected={this.state.toggle === "else"} onClick={() => this.setState({ toggle : "else" })}>
                    <p>その他</p>
                    <div/>
                </Element>
            </Row>
        )
    }
}

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 3px;
`

const extend = keyframes`
    from {
        width: 0%;
    } to {
        width: 100%;
    }
`

const Element = styled.div`
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;

    & > p {
        color: ${props => props.selected ? "#000000" : "#777777"};

    }

    & > div {
        ${props => props.selected && css`
            width: 100%;
            border-bottom: 1px solid #636480;
            position: absolute;
            bottom: -3px;
            animation-duration: 300ms;
            animation-name: ${extend};
            animation-fill-mode: forwards;
        `}
    }
`

export default Slider