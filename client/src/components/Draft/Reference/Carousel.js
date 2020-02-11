import React, { Component } from "react"
import styled, { css } from "styled-components"

class Carousel extends Component {

    renderCarousel = () => {

        const res = this.props.list.map((name,index) => {
            const selected = index === 0 ? true : false
            return (
                <RefToggle selected={selected}>
                    <p>{name}</p>
                    <div/>
                </RefToggle>
            )
        })   

        return res
    }

    render() {
        return (
            <RefCarousel>
                <div>
                    {this.renderCarousel()}
                </div>
            </RefCarousel>
        )
    }
}

const RefCarousel = styled.div`
    width: 100%;

    & > div {
        display: flex;
        flex-direction: row;
        overflow-x: scroll;
        padding: 5px 15px;
        border-bottom: 1px solid #d2d2d2;

        &::-webkit-scrollbar{
            width: 0px !important;
            height: 0px !important;
        }
    }

`

const RefToggle = styled.div`
    width: 60px;
    flex-shrink: 0;
    cursor: pointer;

    & > p {
        white-space: nowrap;
        text-align: center;

        ${props => props.selected 
        ? css`
            color: #000000;
        `
        : css`
            color: #8D8D8D;
        `}
    }

    & > div {
        ${props => props.selected && css`
            background-color: #636480;
            width: 100%;
            height: 1px;
            animation-name: gZUEHJ;
            animation-duration: 250ms;
            animation-timing-function: ease-in-out;
        `}
    }
`

export default Carousel