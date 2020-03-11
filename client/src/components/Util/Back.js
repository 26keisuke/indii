import React, { Component } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { IoIosArrowRoundBack } from "react-icons/io"

import back from "../../images/back-arrow.png"

const BackNormalElement = styled(Link)`
    position: absolute;
    display: flex;
    flex-direction: row;
    z-index: 3;
    align-items: center;
    left: 11px;
    cursor: pointer;

    & > div {

        position:relative;

        & > p {
            position: absolute;
            right: 1px;
            top: -8px;
            width: 30px;
            height: 30px;
            display: block;
            cursor: pointer;

            &::before {
                content: "";
                display: none;
                background-color: #1C1C1C;
                opacity: 0.1;
                border-radius: 100%;
                width: 30px;
                height: 30px;
            }

            &:hover::before {
                display: block;
            }

        }
    }

    & > p {
        font-size: 10px;
        color: #656565;
    }
`

const BackGivenElement = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    z-index: 3;
    align-items: center;
    left: 11px;
    cursor: pointer;

    & > div {

        position:relative;
        display: flex;

        & > p {
            position: absolute;
            right: 2px;
            top: -7px;
            width: 30px;
            height: 30px;
            display: block;
            cursor: pointer;

            &::before {
                content: "";
                display: none;
                background-color: #1C1C1C;
                opacity: 0.1;
                border-radius: 100%;
                width: 30px;
                height: 30px;
            }

            &:hover::before {
                display: block;
            }

        }
    }

    & > p {
        font-size: 10px;
        color: #656565;
        white-space: nowrap;
    }
`

// const BackIcon = styled(IoIosArrowRoundBack)`
//     transform: scale(2.8, 1.7);
//     margin-right: 10px;
//     pointer-events: none;
// `

const BackIcon = styled.img`
    margin-right: 10px;
    pointer-events: none;
    width: 15px;
    height: 15px;
    margin-top: 2px;
`

class Back extends Component {

    renderNormal = () => {
        return (
            <BackNormalElement to={this.props.url}>
                <div>
                    <p></p>
                    <BackIcon src={back} alt={"矢印戻るボタン"}/>
                </div>
                <p>{this.props.name}</p>
            </BackNormalElement>
        )
    }

    renderGiven = () => {
        return (
            <BackGivenElement onClick={this.props.back}>
                <div>
                    <p></p>
                    <BackIcon src={back} alt={"矢印戻るボタン"}/>
                </div>
                <p>{this.props.name}</p>
            </BackGivenElement>
        )
    }

    render() {
        return (
            <div>
                { this.props.back
                ? this.renderGiven()
                : this.renderNormal()
                }
            </div>
        )
    }
}

export default Back