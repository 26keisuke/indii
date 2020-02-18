import React, { Component } from "react"
import styled from "styled-components"

class Recommend extends Component {

    render () {
        return (
            <TrendElement>
                <div>
                    <p>{this.props.title}</p>
                    <p>{this.props.content}</p>
                    <TrendInfo>
                        <TrendAuthor>
                            <img src={this.props.authorImg}/>
                            <p>{this.props.author}</p>
                        </TrendAuthor>
                        <p>{this.props.editDate}</p>
                    </TrendInfo>
                </div>
                <img src={this.props.postImg}/>
            </TrendElement>
        )
    }
}



const TrendElement = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 25px;

    & > div {

        width: 225px;
        margin-right: 25px;  

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

export default Recommend