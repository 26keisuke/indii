import React, { Component } from "react"
import styled from "styled-components"

import sample from "../../../images/sample0.jpg"
import sample1 from "../../../images/sample1.png";

class Trend extends Component {

    renderElement = () => {
    }

    render () {
        return (
            <div>
                <TrendTitle>
                    <p>トレンド</p>
                    <p>/////////////////////////////////</p>
                </TrendTitle>
                {/* {this.renderElement()} */}
                <TrendElement>
                    <div>
                        <p>タイトルが入ります</p>
                        <p>radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。</p>
                        <TrendInfo>
                            <TrendAuthor>
                                <img src={sample}/>
                                <p>飯塚啓介</p>
                            </TrendAuthor>
                            <p>作成日が入ります </p>
                        </TrendInfo>
                    </div>
                    <img src={sample1}/>
                </TrendElement>
                <TrendElement>
                    <div>
                        <p>タイトルが入ります</p>
                        <p>radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。</p>
                        <TrendInfo>
                            <TrendAuthor>
                                <img src={sample}/>
                                <p>飯塚啓介</p>
                            </TrendAuthor>
                            <p>作成日が入ります </p>
                        </TrendInfo>
                    </div>
                    <img src={sample1}/>
                </TrendElement>
            </div>
        )
    }
}

const TrendTitle = styled.div`

    display: flex;
    flex-direction: row;
    margin-bottom: 15px;

    & > p:nth-child(1) {
        margin-right: 10px;
        font-size: 14px;
    }

    & > p:nth-child(2) {
        color: #d2d2d2;
        font-size: 14px;
        letter-spacing: 2.5px;
    }
`

const TrendElement = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;

    & > div {

        width: 218px;  

        & > p:nth-child(1) {
            font-size: 13px;
            margin-bottom: 5px;
        }

        & > p:nth-child(2) {
            font-size: 10px;
            margin-bottom: 5px;
        }
    }

    & > img {
        width: 100px;
        height: 100px;
        border: 1px solid;
        object-fit: contain;
    }
`

const TrendInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > p {
        color: #747474;
        font-size: 10px;
    }
`

const TrendAuthor = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 6px;

    & > img {
        width: 27px;
        height: 27px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 5px;
        object-fit: cover;
    }

    & > div {
        & > p {
            font-size: 10px;
        }
    }
`

export default Trend