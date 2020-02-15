import React, { Component } from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { Collapse } from 'react-collapse';
import styled, { css, keyframes } from "styled-components"

import { IoIosArrowDown } from "react-icons/io"

import response from "../../../images/response.png";
import star_pressed from "../../../images/star-pressed.png";
import star from "../../../images/star.png";
import more from "../../../images/more.png";
import sample from "../../../images/sample0.jpg";
import dissapointed from "../../../images/dissapointed.png";
import love from "../../../images/love.png";
import good from "../../../images/good.png";
import nerd from "../../../images/nerd.png";
import hmm from "../../../images/hmm.png";

import ShowMore from "../../Util/ShowMore"

import "./Post.css";

import * as actions from "../../../actions";

const message = [
    "さんが、ポストを投稿しました。",
    "さんが、ポストを編集しました。",
    "さんが、ポストにスターを付けました。" ,
]

class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpened: true, 
            changed: false,
            star: star,
            showEmoji: false,
            showMore: false,
            chosenResponse: -1
        }
        this.emojiRef = React.createRef();
        this.actionRef = React.createRef();
    }

    componentDidUpdate() {
        if (this.state.showEmoji || this.state.showMore) {
            document.addEventListener("mousedown", this.outsideClick)
        } else {
            document.removeEventListener("mousedown", this.outsideClick)
        }
    }

    componentDidMount() {
        // checkForStars and checkForFeedbacks
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.outsideClick)
    }

    outsideClick = (e) => {
        if(this.emojiRef.current.contains(e.target)) {
            return null;
        }

        if(this.actionRef.current.contains(e.target)) {
            return null;
        }

        this.setState({
            showEmoji: false,
            showMore: false,
        })
    }

    handleCollapseClick = (e) => {
        e.preventDefault()
        this.setState({
            isOpened: !this.state.isOpened,
            changed: true,
            showMore: false,
            showEmoji: false,
        })
    }

    handleStarClick = (e) => {
        e.preventDefault()
        this.setState({showMore: false})
        this.setState({showEmoji: false})
        if (this.state.star === star) {
            this.props.starOn(this.props.id)
            this.setState({
                star: star_pressed
            })
        } else {
            this.props.starOff(this.props.id)
            this.setState({
                star
            })
        }
    }

    handleResponseClick = (e) => {
        e.preventDefault()
        this.setState({showMore: false})
        this.setState({
            showEmoji: !this.state.showEmoji
        })
    }

    handleEmojiClick = (e, id) => {
        e.preventDefault()
        this.setState({
            chosenResponse: id
        })
        this.setState({
            showEmoji: false
        })
    }

    handleMoreClick = (e) => {
        e.preventDefault()
        this.setState({showEmoji: false})
        this.setState({
            showMore: !this.state.showMore
        })
    }

    actionRender = (action) => {
        switch(action){
            case "CREATE_POST":
                return message[0]
            case "EDIT_POST":
                return message[1]
            case "STAR_POST":
                return message[2]
            default:
                return;
        }
    }

    renderIcon = () => {
        switch(this.state.chosenResponse){
            case 0:
                return <img className="post-feed-response"　alt={"ものすごく良い"} src={love}/>
            case 1:
                return <img className="post-feed-response"　alt={"とても良い"}src={good}/>
            case 2:
                return <img className="post-feed-response"　alt={"かなり良い"} src={nerd}/>
            case 3:
                return <img className="post-feed-response"　alt={"まぁまぁ"} src={hmm}/>
            case 4:
                return <img className="post-feed-response"　alt={"残念"} src={dissapointed}/>
            default:
                return <img className="post-feed-response"　alt={"フィードバックのアイコンを表示する"} src={response}/>
        }
    }

    deletePost = () => {
        this.setState({showMore: false})
        const id = this.props.id;
        const action = "POST_DELETE"
        const title = "ポストを削除";
        const caution = ""
        const message = "このポストを削除してもよろしいですか？";
        const buttonMessage = "削除する";
        this.props.showConfirmation(id, action, title, caution, message, buttonMessage)
        this.props.enableGray()
    }

    reportPost = () => {
        this.setState({showMore: false});
        const id = this.props.id;
        const action = "GIVE_FEEDBACK";
        const title = "このポストへのフィードバック";
        const message = "このポストについてどう思いましたか？";
        const caution = "（このフィードバックは匿名で保存されます。）";
        const buttonMessage = "送信する";
        this.props.showConfirmation(id, action, title, caution, message, buttonMessage);
        this.props.enableGray();
    };

    render() {
        return (
                <PostBox to={"/post/" + this.props.id}>
                    <PostTop>
                        <div>
                            <img src={sample} alt={"このポストの作成者の写真"}/>
                            <div>
                                <div>
                                    <p>{this.props.name}</p>
                                    <p>{this.actionRender(this.props.action)}</p>
                                </div>
                                <p>{this.props.date}</p>
                            </div>
                        </div>
                        <div>
                            <p onClick={this.handleCollapseClick}></p>
                            <Arrow isOpened={this.state.isOpened} changed={this.state.changed}/>
                        </div>
                    </PostTop>
                    
                    <PostMiddle>
                        <p>{this.props.topic}</p>
                        <p>{this.props.title}</p>
                        <Collapse isOpened={this.state.isOpened}>
                        <p>{this.props.content}</p>
                        </Collapse>
                    </PostMiddle>
                    <Collapse isOpened={this.state.isOpened}>
                    <PostBottom>
                        <div>
                            <p onClick={this.handleStarClick}></p>
                            <img className="post-feed-star"　src={this.state.star} alt={"星マーク"}/>
                        </div>
                        <div ref={this.emojiRef}>
                            <p onClick={this.handleResponseClick}></p>
                            <Emoji show={this.state.showEmoji}>
                                <img alt={"ものすごく良い"} src={love} onClick={(e) => this.handleEmojiClick(e,0)}/>
                                <img alt={"とても良い"} src={good} onClick={(e) => this.handleEmojiClick(e,1)}/>
                                <img alt={"かなり良い"} src={nerd} onClick={(e) => this.handleEmojiClick(e,2)}/>
                                <img alt={"まぁまぁ"} src={hmm} onClick={(e) => this.handleEmojiClick(e,3)}/>
                                <img alt={"残念"} src={dissapointed} onClick={(e) => this.handleEmojiClick(e,4)}/>
                            </Emoji>
                            {this.renderIcon()}
                        </div>
                        <ShowMoreWrapper>
                            <ShowMore
                                ref={this.actionRef}
                                handleClick={this.handleMoreClick}
                                show={this.state.showMore}
                                left="-110px"
                                bottom="23px"
                                actionName={["フィードバックをする", "この投稿を削除する"]}
                                action={[this.reportPost, this.deletePost]}
                            />
                        </ShowMoreWrapper>
                    </PostBottom>
                    </Collapse>
                </PostBox>
        )
    }
}

const PostBox = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: start;
    background-color: #ffffff;
    padding: 15px 20px;
    border-top: 1px solid #d2d2d2;
    border-bottom: 1px solid #d2d2d2;

    &:hover {
        background-color: rgba(233, 233, 238, 0.25);    
    }
`
// 詰め込みすぎ
const PostTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;

    & > div:nth-child(1) {
        display: flex;
        flex-direction: row;
        align-items: center;

        & > img {
            width: 37px;
            height: 37px;
            border-radius: 5px;
            object-fit: cover;
            margin-right:10px;
            cursor: pointer;
        }

        & > div {
            & > div {
                display: flex;
                flex-direction: row;
                margin-bottom: 3px;

                & > p:nth-child(1) {
                    margin-right: 5px;
                    color: #4B4B4B;
                    cursor: pointer;
                }

                & > p:nth-child(2) {
                    color: #252525;
                }

            }

            & > p {
                color: #747474;
            }
        }
    }

    & > div:nth-child(2) {

        position: relative;

        & > p {

            position: absolute;
            right:-7px;
            top: -13px;
            width: 40px;
            height: 40px;
            display: block;
            cursor: pointer;

            &::before {
                content: "";
                display: none;
                background-color: #1C1C1C;
                opacity: 0.1;
                border-radius: 100%;
                width: 40px;
                height: 40px;
            }

            &:hover::before {
                display: block;
            }
        }
    }
`

const spin = keyframes`
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(180deg)
    }
`

const spin_1 = keyframes`
    from {
        transform: rotate(180deg)
    }
    to {
        transform: rotate(360deg)
    }
`

const Arrow = styled(IoIosArrowDown)`
    margin-right: 8px;
    pointer-events: none;

    ${props => props.changed
    ? props => !props.isOpened 
        ? css `
            animation-name: ${spin};
            animation-duration: 400ms;
            animation-fill-mode: forwards;
        `
        : css `
            animation-name: ${spin_1};
            animation-duration: 400ms;
            animation-fill-mode: forwards;
        `
    : css `
    `}
`

const PostMiddle = styled.div`

    & > p {
        font-size: 14px;
        font-weight: bold;
        color: #767676;
        cursor: pointer;

        &:hover {
            color: #565656;
        }
    }

    /* title */
    & > p:nth-child(2) {
        font-size: 18px;
        color: #1C1C1C;
        margin-bottom: 5px;
        font-weight: bold;
    }
`

const Emoji = styled.div`
    background-color: white;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
    display: ${props => props.show ? "flex" : "none"};
    padding: 2px;
    border-radius: 18px;;
    align-items: center;
    position: absolute;
    top:-40px;
    left: -88px;
    animation-name: bounce;
    animation-duration: 300ms;
    animation-fill-mode: forwards;
    z-index:1;

    & > img {
        margin: 0px 5px !important;
        padding:5px;
        cursor: pointer;

        &:hover {
            animation-name: bounce;
            animation-duration: 300ms;
            animation-fill-mode: forwards;
            background-color: rgba(158, 175, 229, 0.3);
            border-radius: 100%;
        }
    }
`

const ShowMoreWrapper = styled.div`
    margin-right:65px;
`

const PostBottom = styled.div`
    display: flex;
    justify-content: flex-end;
    z-index:2;
    padding-top:10px;

    & img {
        width:18px;
        height:18px;
        margin-right:65px;
    }

    & > div {
        position: relative;

        & > p {
            width:40px;
            height:40px;
            position: absolute;
            top:-10px;
            left: -11px;
            cursor: pointer;

            &:hover::before {
                display: block;
            }

            &::before {
                content: "";
                position: absolute;
                display: none;
                width:40px;
                height:40px;
                background-color: #9EAEE5;
                opacity: 0.1;
                border-radius: 100%;
            }

        }

    }

    & p:hover ~ .post-feed-star{
        animation-name: bounce;
        animation-duration: 300ms;
        animation-fill-mode: forwards;
    }

    & p:hover ~ .post-feed-response{
        animation-name: bounce;
        animation-duration: 300ms;
        animation-fill-mode: forwards;
    }
`

function mapStateToProps(state) {
    return {
        response: state.response
    }
}

export default connect(mapStateToProps, actions)(Post);