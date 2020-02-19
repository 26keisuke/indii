import React, { Component } from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { Collapse } from 'react-collapse';
import styled from "styled-components"

import sample from "../../../images/sample0.jpg";

import ShowMore from "../../Util/ShowMore"
import ArrowSpin from "../../Util/ArrowSpin"
import Emoji from "../../Util/Emoji"
import Star from "../../Util/Star"

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
            showStar: false,
            showEmoji: false,
            showMore: false,
            chosenEmoji: null
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

    handleCollapseClick = (e) => {
        e.preventDefault()
        this.setState({
            isOpened: !this.state.isOpened,
            changed: true,
            showMore: false,
            showEmoji: false,
        })
    }

    // 注意! こっから先はPost/Post.jsと内容が同じなので、変える際はあっちも変えること！
    // TODO: このabstractionを作る

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

    handleStarClick = (e) => {
        e.preventDefault()
        if (!this.state.showStar) {
            this.props.starOn(this.props.id)
            this.setState({
                showStar: true
            })
        } else {
            this.props.starOff(this.props.id)
            this.setState({
                showStar: false
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
            chosenEmoji: id
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

    // ↑ ここまで

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
                        <ArrowWrapper>
                            <ArrowSpin
                                handleClick={this.handleCollapseClick}
                                isOpened={this.state.isOpened}
                                changed={this.state.changed}
                                size={38}
                            />
                        </ArrowWrapper>
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
                        <Star
                            handleClick={this.handleStarClick}
                            icon={this.state.showStar}
                            shadow={true}
                        />
                        <Emoji
                            ref={this.emojiRef}
                            handleResponseClick={this.handleResponseClick}
                            handleEmojiClick={this.handleEmojiClick}
                            chosenEmoji={this.state.chosenEmoji}
                            showEmoji={this.state.showEmoji}
                            shadow={true}
                        />
                        <ShowMoreWrapper>
                            <ShowMore
                                ref={this.actionRef}
                                handleClick={this.handleMoreClick}
                                show={this.state.showMore}
                                left="-110px"
                                bottom="23px"
                                actionName={["フィードバックをする", "この投稿を削除する"]}
                                action={[this.reportPost, this.deletePost]}
                                shadow={true}
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
                font-size: 10px;
            }
        }
    }
`

const ArrowWrapper = styled.div`
    margin-right: 8px;
`

const PostMiddle = styled.div`

    & > p {
        font-size: 12px;
        font-weight: bold;
        color: #767676;
        cursor: pointer;

        &:hover {
            color: #565656;
        }
    }

    /* title */
    & > p:nth-child(2) {
        font-size: 17px;
        color: #1C1C1C;
        margin-bottom: 5px;
        font-weight: bold;
    }

    & > div p{
        line-height: 20px;
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
        margin-right:65px;
    }

`

function mapStateToProps(state) {
    return {
        response: state.response
    }
}

export default connect(mapStateToProps, actions)(Post);