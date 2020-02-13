import React, { Component } from "react"
import styled from "styled-components"

import star_pressed from "../../../images/star-pressed.png"
import feedback from "../../../images/comment.png"

const TalkElement = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    position: relative;
    border-bottom: 1px solid #d2d2d2;
    background-color: #ffffff;

    &:hover {
        background-color: rgba(233, 233, 238, 0.25);
    }
`

const TalkTop = styled.div`
    display: flex;
    flex-direction: row;

    & > p:nth-child(1) {
        font-size: 13px;
        color: #767676;
        margin-right: 20px;
        cursor: pointer;
    }

    & > p:nth-child(2) {
        color: #737373;
    }

    & > div {
        position: absolute;
        padding: 0px 8px;
        height:22px;
        border-radius: 3px;
        background-color: #636480;
        display: flex;
        justify-content: center;
        align-items: center;
        right:10px;

        & > p {
            color: #ffffff;
            margin-top:-3px;
        }
    }
`

const TalkBottom = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const TalkTitle = styled.p`
    font-size: 17px;
    color: #1C1C1C;
    margin: 5px 0px;
    font-weight: bold;
    cursor: pointer;
`

const TalkContent = styled.p`
    margin-bottom: 10px;
    cursor: pointer;
`

const StarIcon = styled.img`
    width:15px;
    height:15px;
    margin-right: 6px;
`

const CommentIcon = styled.img`
    width:14px;
    height:14px;
    margin-left: 30px;
    margin-right: 6px;
`

class Talk extends Component {
    
    tagRender(tag) {
        switch(tag){
            case "question":
                return "Question"
            default:
                return null;
        }
    }

    render() {
        return (
            <TalkElement>
                <TalkTop>
                    <p>{this.props.topic}</p>
                    <p>{this.props.date}</p>
                    <div>
                        <p>{this.tagRender(this.props.tag)}</p>
                    </div>
                </TalkTop>
                <TalkTitle>{this.props.title}</TalkTitle>
                <TalkContent>{this.props.content}</TalkContent>
                <TalkBottom>
                    <StarIcon src={star_pressed} alt={"いいねの数のアイコン"}/>
                    <p>12</p>
                    <CommentIcon src={feedback} alt={"コメント数のアイコン"}/>
                    <p>12</p>
                </TalkBottom>
            </TalkElement>
        )
    }
}

export default Talk