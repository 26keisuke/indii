import React, { Component } from "react"
import styled, { css, keyframes } from "styled-components"

class Carousel extends Component {

    renderCarousel = () => {

        const { list, getState, state, setToggle } = this.props

        const res = list.map((name,index) => {
            return (
                <RefToggle key={name} selected={getState("toggle") === state[index]} onClick={() => setToggle(state[index])}>
                    <div>
                        <p>{name}</p>
                        <div/>
                    </div>
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
    position: relative;

    & > div:nth-child(1) {
        display: flex;
        flex-direction: row;
        overflow-x: scroll;
        padding: 6px 15px;
        border-bottom: 1px solid #d2d2d2;

        &::-webkit-scrollbar{
            width: 0px !important;
            height: 0px !important;
        }
    }
`

const extend = keyframes`
    from {
        width: 0px;
    } to {
        width: 80%;
    }
`

const RefToggle = styled.div`
    width: 60px;
    flex-shrink: 0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div {

        display: flex;
        flex-direction: column;
        align-items: center;

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
                width: 80%;
                height: 1px;
                animation-name: ${extend};
                animation-duration: 250ms;
                animation-timing-function: ease-in-out;
            `}
        }

    }
`



export default Carousel