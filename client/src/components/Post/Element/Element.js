import React, { Component } from "react"
import { Link } from "react-router-dom"
import styled, {css} from "styled-components"
import StarIcon from '@material-ui/icons/Star';

import { fmtDate, getEditorContent } from "../../Util/util"

// import star_pressed from "../../../images/star-pressed.png"

class Post extends Component {
    render() {
        return (
            <PostElement search={this.props.search} to={"/post/" + this.props.id}>
                <div>
                    <p>{this.props.topic}</p>
                    <p>{this.props.title}</p>
                    <p>{getEditorContent(this.props.content, 150)}</p>
                    <div>
                        <StarIcon alt={"ポストのいいねボタン"}/>
                        <p>{this.props.count}</p>
                        <p>最後の編集: {fmtDate(this.props.date)}</p>
                    </div>
                </div>
                <div>
                    <img src={this.props.img} alt={"ポストの画像"}/>
                </div>
            </PostElement>
        )
    }
}


const PostElement = styled(Link)`
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #ffffff;

    ${props => !props.search && css`
        &:hover{
            background-color: ${props => props.theme.hover};
        }
    `}

    ${props => props.search && css`
        pointer-events: none;
        cursor: default;
    `}
   

    & > div:nth-child(1){
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-right:10px;
        /* max-width: 440px;
        min-width: 440px; バグ起こすかも*/
        width: 100%;

        & > p:nth-child(1) {
            margin-top: -7px;
            font-size:13px;
            color: #767676;
        }

        & > p:nth-child(2) {
            font-size: 15px;
            color: ${props => props.search ? "royalblue" : "#1C1C1C"};
            margin-bottom: 2px;
            font-weight: bold;

            ${props => props.search && css`
                cursor: pointer;
                pointer-events: auto;
            `}
        }

        & > p:nth-child(3) {
            font-size: 12px;
            margin-bottom: 6px;
            color: #1c1c1c;
            height: 50px;
            overflow: hidden;
        }

        & > div {
            display: flex;
            flex-direction: row;
            align-items: center;

            & > svg {
                width: 13px;
                height: 13px;
                margin-right:6px;
                color: ${props => props.theme.secondary};
            }

            & > p:nth-child(2) {
                margin-right:20px;
            }

            & > p:nth-child(3) {
                font-size: 10px;
                color: #8F8B8B;
            }
        }
    }

    & > div:nth-child(2){
        & > img {
            width: 110px;
            height: 110px;
            object-fit: contain;
        }
    }

`

Post.defaultProps = {
    search: false,
}

export default Post