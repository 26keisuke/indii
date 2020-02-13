import React, { Component } from "react"
import styled from "styled-components"

import sample from "../../../images/sample1.png"

const Box = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
    align-items: center;
    height:135px;
    cursor: pointer;

    &:hover {
        background-color: ${props=>props.theme.hover}
    }

    & > img {
        height: 110px;
        width:110px;
        object-fit: contain;
        padding: 0px 10px;
        flex-shrink:0;
    }
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 0px;
    padding-right:15px;

    & > p:nth-child(1) {
        color: #333333;
        font-size:17px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    & > p:nth-child(2) {
        margin-bottom: 7px;
    }

    & > div {
        display: flex;
        flex-direction: row;
        align-items: center;

        & > p {
            color: #5a5a5a;
            font-size: 11px;
            margin-right: 20px;;
        }

        & > div {
            display: flex;
            flex-direction: row;

            & > p {
                margin-right: 5px;
                font-size: 10px;
                color: #8F8B8B;
            }
        }
    }
`

class Element extends Component {
    render() {
        return (
            <Box>
                <img src={sample} alt={"トピックを代表する写真"}/>
                <Content>
                    <p>{this.props.title}</p>
                    <p>{this.props.content}</p>
                    <div>
                        <p>{this.props.likes.toLocaleString()} Favorites</p>
                        <div>
                            {this.props.tags.map(tag => {
                                return <p key={tag}>#{tag}</p>
                            })}
                        </div>
                    </div>
                </Content>
            </Box>
        )
    }
}

export default Element