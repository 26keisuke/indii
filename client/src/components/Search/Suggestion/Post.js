import React, { Component } from "react";
import styled from "styled-components";

import { IoMdStar } from "react-icons/io"
import { FaUserCheck } from "react-icons/fa"

import { fmtDate } from "../../Util/util"

const PostElement = styled.div`
    width: 100%;
    padding: 10px;
    cursor: pointer;
    box-sizing: border-box;

    background-color: ${props => props.hover && "rgb(245,245,245)"};

    &:hover {
        background-color: ${props => props.theme.searchHover};
    }

    & > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
    }
`

const PostLeft = styled.div`
    font-size: 14px;
    color: #333333;
    & > p {
        margin-right: 15px;
    }
`

const PostRight = styled.img`
    min-width: 40px;
    min-height: 40px;
    max-width: 40px;
    max-height: 40px;
    position: absolute;
    right: 12px;
`

const PostMiddle = styled.div`
    display: flex;
    flex-direction: column;

    & > p {
        font-size: 13px;
        margin-bottom: 5px;
    }

    & > div {
        display: flex;
        flex-direction: row;
        align-items: center;

        & p:nth-child(2) {
            font-size: 10px;
            margin-right:10px;
        }

        & p:nth-child(3) {
            color: #777777;
            font-size: 10px;
            margin-right:5px;
        }

        & p:nth-child(4) {
            color: #777777;
            font-size: 10px;
        }
    }
`

const StarImg = styled(IoMdStar)`
    color: #646380;
    transform: scale(1.1);
    margin-right:3px;
    margin-top: -1px;
`

const PermissionImg = styled(FaUserCheck)`
    position: absolute;
    right: 90px;
    transform: scale(1.1);
    color: #9EAEE5;
`

class Post extends Component {

    renderLevel = () => {
        switch(this.props.suggestion.editLevel){
            //今はいらない
            // case "yellow":
            //     return <div className="post-suggestion-level-yellow"/>
            // case "green":
            //     return <div className="post-suggestion-level-green"/>
            // case "blue":
            //     return <div className="post-suggestion-level-blue"/>
            // case "red":
            //     return <div className="post-suggestion-level-red"/>
            default:
                return null
        }
    }

    handleClick = () => {
        const { handleClick, suggestion　} = this.props

        return handleClick(suggestion)
    }

    render () {

        const { index, postName, star, config, postImg, topicSquareImg, lastEdited, onHover } = this.props.suggestion

        return (
            // <div>
                <PostElement onClick={this.handleClick} hover={onHover}>
                    <div>
                        <PostLeft>
                            <p>
                            {index.join(".")}
                            </p>
                        </PostLeft>
                        <PostMiddle>
                            <p>{postName}</p>
                            <div>
                                <StarImg/>
                                <p>{star.counter}</p>
                                <p>最後の編集日:</p>
                                <p>{lastEdited ? fmtDate(lastEdited) : "-"}</p>
                            </div>
                        </PostMiddle>
                        {/* <div>
                            {this.renderLevel()}
                        </div> */}
                        { !config.allowEdit ? <PermissionImg/>: "" }
                        <PostRight src={ postImg ? postImg.image : topicSquareImg.image } alt="ポストの検索結果のメイン画像"/>
                    </div>
                </PostElement>
            // </div>
        )
    }
}

export default Post