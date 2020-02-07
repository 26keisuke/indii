import React, { Component } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import back from "../../images/back-arrow.png"

const BackNormalElement = styled(Link)`
    position: absolute;
    display: flex;
    flex-direction: row;
    z-index: 3;
    align-items: center;
    left: 11px;
    cursor: pointer;

    & > img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
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

    & > img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    & > p {
        font-size: 10px;
        color: #656565;
    }
`

class Back extends Component {

    renderNormal = () => {
        return (
            <BackNormalElement to={this.props.url}>
                <img src={back} alt={"矢印戻るボタン"}/>
                <p>{this.props.name}</p>
            </BackNormalElement>
        )
    }

    renderGiven = () => {
        return (
            <BackGivenElement onClick={this.props.back}>
                <img src={back} alt={"矢印戻るボタン"}/>
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