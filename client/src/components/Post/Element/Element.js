import React, { Component } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import "./Element.css"

import star_pressed from "../../../images/star-pressed.png"

const PostElement = styled(Link)`
    padding: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #ffffff;

    &:hover{
        background-color: ${props => props.theme.hover};
    }

    & > div:nth-child(1){
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-right:10px;

        & > p:nth-child(1) {
            margin-top: -7px;
            font-size:13px;
            color: #767676;
        }

        & > p:nth-child(2) {
            font-size: 16px;
            color: #1C1C1C;
            margin-bottom: 2px;
            font-weight: bold;
        }

        & > p:nth-child(3) {
            font-size: 11px;
            margin-bottom: 6px;
            color: #1c1c1c;
        }

        & > div {
            display: flex;
            flex-direction: row;

            & > img {
                width: 13px;
                height: 13px;
                margin-right:6px;
            }

            & > p:nth-child(2) {
                margin-right:20px;
                padding-top: 1px;
            }

            & > p:nth-child(3) {
                font-size: 10px;
                color: #8F8B8B;
            }
        }
    }

    & > div:nth-child(2){
        & > img {
            width: 87px;
            height: 87px;
            object-fit: contain;
        }
    }

`

class Post extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <PostElement to={"/topic/" + this.props.id}>
                <div>
                    <p>{this.props.topic}</p>
                    <p>{this.props.title}</p>
                    <p>{this.props.content}</p>
                    <div>
                        <img src={star_pressed}/>
                        <p>{this.props.count}</p>
                        <p>最後の編集: {this.props.date}</p>
                    </div>
                </div>
                <div>
                    <img src={this.props.img}/>
                </div>
            </PostElement>
        )
    }
}

export default Post