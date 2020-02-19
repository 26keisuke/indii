import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import BraftEditor from 'braft-editor'

import * as actions from "../../actions"

import sample from "../../images/sample1.png"
import sample0 from "../../images/sample0.jpg"

import { SlashTitle } from "../Feed/Trend/Trend"
import People from "../People/People"
import Screen from "../Util/Screen"
import Recommend from "../Util/Recommend"
import List from "../Draft/Tool/List/List"
import { Space } from "../Theme"
import SkeletonBox from "./Skeleton/SkeletonBox"
import Image from "./Image/Image"
import Slider from "./Slider/Slider"
import Navigation from "./Navigation/Navigation"
import Star from "../Util/Star"
import Emoji from "../Util/Emoji"
import ShowMore from "../Util/ShowMore"

class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
            feedback: {},
            showStar: false,
            showEmoji: false,
            showMore: false,
            chosenEmoji: null
        }
        this.emojiRef = React.createRef();
        this.actionRef = React.createRef();
    }

    componentDidMount() {
        const url = this.props.location.pathname
        const id = url.substring(url.lastIndexOf('/') + 1)
        this.props.fetchPost(id)
    }

    // 注意! こっから先はFeed/Post/Post.jsと内容が同じなので、変える際はあっちも変えること！
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


    renderLeft = () => {
        return(
            <LeftWrapper>
                { this.props.post.fetched.content
                ? 
                <div>
                    <HeaderTitle>
                        {this.props.post.fetched.postName}
                    </HeaderTitle>
                    <HeaderUnderline/>
                    <BraftEditor
                        controls={[]}
                        readOnly={true}
                        value={BraftEditor.createEditorState(this.props.post.fetched.content)}
                        contentClassName="post-braft"
                    />
                    <div>
                        <Star
                            handleClick={this.handleStarClick}
                            icon={this.state.star}
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
                    </div>
                </div>
                :      
                <SkeletonBox/>
                }   
                <Space height={"300px"}/>
            </LeftWrapper>
        )
    }

    renderRight = () => {
        return(
            <div>
                <Image/>
                <Navigation/>
                <Slider/>
                <TitleWrapper>
                    <SlashTitle>
                        <p>このポストの著者</p>
                        <p>//////////////////////////////</p>
                    </SlashTitle>
                </TitleWrapper>
                <People
                    id={"123456789"}
                    name={"飯塚啓介"} 
                    job={"Chief株式会社 CEO"} 
                    intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなど。よろしくお願いします。"}
                />
                <TitleWrapper>
                    <SlashTitle>
                        <p>参照</p>
                        <p>////////////////////////////////////////</p>
                    </SlashTitle>
                </TitleWrapper>
                <List
                    reference={this.props.post.fetched.ref || []}
                />
                <TitleWrapper>
                    <SlashTitle>
                        <p>関連するポスト</p>
                        <p>////////////////////////////////</p>
                    </SlashTitle>
                </TitleWrapper>
                <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample0}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample}
                />
                <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample0}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample}
                />
                <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample0}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample}
                />
            </div>
        )
    }

    render() {
        return (
            <Screen space={false} noHeader={true}>
                {this.renderLeft()}
                {this.renderRight()}
            </Screen>
        )
    }
}

const LeftWrapper = styled.div`
    padding: 28px 75px;
    background-color: #ffffff;
    margin-top: -10px;
`

const TitleWrapper = styled.div`
    margin-top: 20px;
`

const HeaderTitle = styled.h1`
    color: #222222;
    font-size: 18px;
    text-align: center;
`

const HeaderUnderline = styled.div`
    border-bottom: 1px solid #d2d2d2;
    width: 50px;
    margin: 0 auto;
    margin-top: 8px;
`

function mapStateToProps(state) {
    return {
        post: state.post
    }
}

export default connect(mapStateToProps, actions)(Post)