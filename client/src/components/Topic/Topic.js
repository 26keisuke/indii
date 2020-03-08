import React, { Component, PureComponent } from "react"
import { withRouter } from "react-router-dom"
import styled, {css, keyframes} from "styled-components"
import { connect } from "react-redux"
import BraftEditor from 'braft-editor'
import { FaHashtag } from "react-icons/fa"
import Skeleton from "react-loading-skeleton"
import { Waypoint } from "react-waypoint"

import * as actions from "../../actions"

import question from "../../images/question.png"
import post from "../../images/post.png"

import Talk from "./Talk/Talk"
import { Space } from "../Theme"
import Back from "../Util/Back"

import { arrObjLookUp } from "../Util/util"

class ColumnElement extends PureComponent {
    render() {
        return (
            <Waypoint key={String(this.props.index)} onEnter={(data) => this.props.onEnter(true, data)} onLeave={(data) => this.props.onLeave(false, data)}>
                <Column>
                    <p>{this.props.index}</p>
                    <h2>{this.props.title}</h2>
                </Column>
            </Waypoint>
        )
    }
}

class PostElement extends PureComponent {
    render() {
        return (
            <Waypoint onEnter={this.props.onEnter} onLeave={this.props.onLeave}>
                <Post>
                    <PostTop>
                        <p>{this.props.index}</p>
                        <h3>{this.props.postName}</h3>
                    </PostTop>
                    <BraftEditor
                        controls={[]}
                        readOnly={true}
                        value={this.props.content}
                        contentClassName="post-braft"
                    />
                </Post>
            </Waypoint>
        )
    }
}

class TOF extends PureComponent {
    render() {
        return (
            <TableRow>
                { this.props.indent && <p></p> }
                <p>{this.props.index}</p>
                <p>{this.props.title}</p>
            </TableRow>
        )
    }
}


class TopicPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toggle: {
                topic: true,
                talk: false,
                activity: false,
            },
            enter: 43,
            trigger: false,
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchTopic(id, "ALL");
    }

    toggleState = (name) => {
        this.setState({
            toggle: {
                topic: false,
                talk: false,
                activity: false,
            } 
        })
        this.setState({
            toggle: {
                [name]: true,
            }
        })
    }

    toggleBar = (name) => {
        if(this.state.toggle[name] === true) {
            return ""
        } 
        return "hide"
    }

    toggleText = (name) => {
        if(this.state.toggle[name] === true) {
            return "topic-top-toggle-selected"
        } 
        return "topic-top-toggle-unselected"
    }

    handleEnter = (isEnter, data) => {
        const prev = data.previousPosition
        const now = data.currentPosition

        if(isEnter){
           if((prev === "below") && (now === "inside")){
                this.setState({ enter: this.state.enter + 28})
           }
        } else {
            if((prev === "inside") && (now === "below")){
                this.setState({ enter: this.state.enter - 28})
            }
        }
    }

    renderPost = () => {
        const { order, posts } = this.props.topic.fetched
        const columns = this.props.topic.fetched.column

        var column;
        var post;
        var fstArr = [];
        var sndArr = [];

        var tableArr = []

        const content = "You can use withRouter to accomplish this. Simply wrap your exported classed component inside of withRouter and then you can use this.props.match.params.id to get the parameters instead of using useParams(). You can also get any location, match, or history info by using withRouter. They are all passed in under this.props.You can use withRouter to accomplish this. Simply wrap your exported classed component inside of withRouter and then you can use this.props.match.params.id to get the parameters instead of using useParams(). You can also get any location, match, or history info by using withRouter. They are all passed in under this.props.You can use withRouter to accomplish this. Simply wrap your exported classed component inside of withRouter and then you can use this.props.match.params.id to get the parameters instead of using useParams(). You can also get any location, match, or history info by using withRouter. They are all passed in under this.props.You can use withRouter to accomplish this. Simply wrap your exported classed component inside of withRouter and then you can use this.props.match.params.id to get the parameters instead of using useParams(). You can also get any location, match, or history info by using withRouter. They are all passed in under this.props.You can use withRouter to accomplish this. Simply wrap your exported classed component inside of withRouter and then you can use this.props.match.params.id to get the parameters instead of using useParams(). You can also get any location, match, or history info by using withRouter. They are all passed in under this.props."

        tableArr.push(
            <div>コンテンツ一覧</div>
        )

        for(var i=1; i < order.length; i++){
            column = arrObjLookUp(columns, "_id", order[i]);
            fstArr.push(
                <ColumnElement
                    key={column.index}
                    index={column.index}
                    title={column.title}
                    onLeave={this.handleEnter}
                    onEnter={this.handleEnter}
                />
            )

            tableArr.push(
                <TOF
                    key={column.index}
                    index={column.index}
                    title={column.title}
                    indent={false}
                />
            )

            for(var j=0; j < column.posts.length; j++){
                post = arrObjLookUp(posts, "_id", column.posts[j]);

                sndArr.push(
                    <PostElement
                        key={String(post.index.join("."))}
                        onEnter={(data) => this.handleEnter(true, data)} 
                        onLeave={(data) => this.handleEnter(false, data)}
                        index={post.index.join(".")}
                        postName={post.postName}
                        content={BraftEditor.createEditorState(content)}
                   />
                )

                tableArr.push(
                    <TOF
                        key={String(post.index.join("."))}
                        index={post.index.join(".")}
                        title={post.postName}
                        indent={true}
                    />
                )
            }

            fstArr.push(<PostWrapper>{sndArr}</PostWrapper>)

            sndArr = [];
        }

        return [fstArr, tableArr];
    }   

    render() {
        const flag = this.props.topic.fetched._id
        const { tags, posts, likes, postCount, _id, topicName, column, activity } = this.props.topic.fetched

        const squareImg = this.props.topic.fetched.squareImg || {}

        const overview = flag ? arrObjLookUp(posts, "_id", column[0].posts[0]) : ""

        const renderedPosts = flag && this.renderPost()[0]
        const renderedTable = flag && this.renderPost()[1]

        return (
            <TopicBox>
                <TopWrapper>
                <TopicTop>
                    <div>
                        <BackWrapper>
                            <div>
                                <Back
                                    back={() => this.props.history.goBack()}
                                    name="戻る"
                                />
                            </div>
                        </BackWrapper>
                        <TopicTags>
                            { flag 
                            ?
                                tags.map(tag =>
                                    <div>
                                        <Tag/>
                                        <p>{tag}</p>
                                    </div>
                                )
                            :
                                <div><Skeleton count={3} width={50} height={22}/></div>
                            }
                        </TopicTags>
                        <TopicTitle>{flag ? topicName : <Skeleton width={300} height={28}/>}</TopicTitle>
                        <TopicContent>
                            {
                                flag 
                                ?
                                "You can use withRouter to accomplish this. Simply wrap your exported classed component inside of withRouter and then you can use this.props.match.params.id to get the parameters instead of using useParams(). You can also get any location, match, or history info by using withRouter. They are all passed in under this.props"   
                                :
                                <ContentSkeleton>
                                    <Skeleton count={5} height={18}/>
                                </ContentSkeleton>
                            }
                        </TopicContent>
                        <TopicTimeStamp>
                            {flag && <p>ポスト数: {postCount}</p> }
                            {flag && <p>お気に入り数: {likes}</p>}
                            {!flag && <p><Skeleton width={160} height={18}/></p> }
                        </TopicTimeStamp>
                        <TopicOption>
                            { flag && 
                            <div>
                                <PostRequestIcon src={question} alt="ポストリクエストのボタン"/>
                            </div>
                            }
                            { flag && 
                            <div>
                                <PostCreateIcon src={post} alt="ポスト作成のボタン"/>
                            </div>
                            }
                        </TopicOption>
                        { flag &&
                        <TopicToggle>
                            <TopicToggleElement selected={this.state.toggle["topic"]} onClick={() => this.toggleState("topic")}>
                                <p>トピック</p>
                                <div/>
                            </TopicToggleElement>
                            <TopicToggleElement selected={this.state.toggle["talk"]} onClick={() => this.toggleState("talk")}>
                                <p>フリートーク</p>
                                <div/>
                            </TopicToggleElement>
                            <TopicToggleElement selected={this.state.toggle["activity"]} onClick={() => this.toggleState("activity")}> 
                                <p>アクティビティー </p>
                                <div/>
                            </TopicToggleElement>
                        </TopicToggle>
                        }
                    </div>
                    { flag 
                    ? <img src={squareImg.image} alt="トピックを代表する写真"/>
                    : <section><Skeleton width={250} height={250}/></section>
                    }
                </TopicTop>
                </TopWrapper>
                <Waypoint onEnter={() => this.setState({ trigger: false　})} onLeave={() => this.setState({ trigger: true })}>
                    <Gap/>
                </Waypoint>
                { this.state.toggle["topic"] &&
                <TopicBottom>
                    <div className="topic-contents">
                        { flag && renderedPosts }
                        <Space height={"200px"}/>
                    </div>

                    { flag ?
                    <TocWrapper className="fake" position={this.state.trigger}>
                            <TableOfContent>
                                <FocusBar top={this.state.enter}/>
                                { flag && renderedTable }
                            </TableOfContent>
                    </TocWrapper>
                    : <div className="fake"/>
                    }
                </TopicBottom>
                }
                { this.state.toggle["talk"] &&
                <div>
                    <Talk/>
                    <Space height={"200px"}/>
                </div>
                }
            </TopicBox>
        )
    }
}

const TocWrapper = styled.div`
    ${ props => props.position 
    ? css`
        position: fixed;
        top: 66px;
        left: 954px;
    `
    : css`
        position: relative;
    `
    }
`

const FocusBar = styled.div`
    transition: 300ms;
    position: absolute;
    top: ${props => String(props.top) + "px"};
    width: 251px;
    height: 28px;
    border-radius: 3px;
    border: 1px solid #636480;
    left: 10px;
`

const TableOfContent = styled.div`
    margin-left: 20px;
    width: 236px;
    background-color: white;
    box-shadow: 1px 1px 10px #d2d2d2;
    padding: 20px;
    height: min-content;
    border-radius: 5px;
    position: relative;

    & > div {
        font-size: 12px;
        margin-bottom: 10px;

        & > p {
            margin-right: 10px;
        }
    }
`

const TableRow = styled.div`
    display: flex;
`

const ContentSkeleton = styled.div`
    & span {
        width: 100%;
    }
`

const PostWrapper = styled.div`
    padding-top: 15px;
    padding-bottom: 20px;
    background-color: white;
    box-shadow: 1px 10px 10px #d2d2d2;
    margin-bottom: 6px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
`

const Column = styled.div`
    background-color: white;
    max-width: 725px;
    min-width: 725px;
    box-shadow: 1px 1px 10px #d2d2d2;
    margin-bottom: 1px;
    height: 45px;
    display: flex;
    align-items: center;
    padding-left: 44px;
    font-size: 18px;
    box-sizing: border-box;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;

    & > p {
        margin-right: 20px;
    }

    & > h2 {
        font-size: 18px;
    }
`

const Post = styled.div`
    background-color: white;
    min-width: 725px;
    max-width: 725px;
    padding: 0px 50px;
    padding-top: 15px;
    box-sizing: border-box;

    & .public-DraftEditor-content > div{
        padding-bottom: 0px !important;
    }

    & .bf-content * {
        color: #444444 !important;
    }
`

const PostTop = styled.div`

    display: flex;
    font-size: 16px;

    & > p {
        margin-bottom: -5px;
        padding-left: 14px;
        margin-right: 18px;
    }

    & > h3 {
        margin-top: -2px;
    }
`

const TopicBox = styled.div`
    width:100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar{
        width: 0px !important;
    }
`

const TopWrapper = styled.div`
    padding: 40px 30px;
    padding-bottom: 10px;
    background-color: #F9FAFB;
`

const TopicTop = styled.div`
    background-color: white;
    min-width: 770px;
    box-shadow: 1px 1px 10px #d2d2d2;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #eaeaea;
    padding-top: 20px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 50px;
    min-width: 960px;

    & > div {
        display: flex;
        flex-direction: column;
        position: relative;
        min-width: 420px;
        width: 100%;
    }

    & > img {
        min-height: 250px;
        min-width: 250px;
        max-height: 250px;
        max-width: 250px;
        /* padding-right: 30px; */
        object-fit: contain;
        flex-shrink: 0;
    }

    & > section {
        /* padding-right: 30px; */
        flex-shrink: 0;
    }
`

const TopicTags = styled.div`
    display: flex;
    flex-direction: row;

    & > div {

        display: flex;
        align-items: center;
        margin-right: 7px;

        & > p {
            color: #5a5a5a;
            font-size: 13px;
            flex-shrink: 0;
        }
    }    

    & span {
        margin-right: 7px;
    }
`

const Tag = styled(FaHashtag)`
    color: #5a5a5a;
    transform: scale(0.9);
    margin-top: -2px;
    margin-right: 2px;
`

const TopicTitle = styled.h1`
    color: #1C1C1C;
    font-size: 23px;
    font-weight: bold;
    margin-bottom:15px;
`

const TopicTimeStamp = styled.p`
    display: flex;
    flex-direction: row;
    font-size: 11px;
    color: #5a5a5a;
    position: absolute;
    bottom: 0px;

    & > p {
        margin-right: 10px;
    }
`

const TopicBottom = styled.div`
    display: flex;
    flex-direction: row;
    width:100%;
    padding: 0px 30px;
    background-color: #f9f9f9;
`

const TopicContent = styled.h2`
    color: #2B2B2b;
    margin-bottom: 30px;
    margin-right:30px;
    font-size: 12px;

    & > div {
        & span {
            margin-bottom: 5px;
        }
    }
`

const TopicOption = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    right:38px;
    bottom: 0px;

    & > div {
        width:28px;
        height:28px;
        border: 0.5px solid #636480;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        cursor: pointer;
        margin-left: 30px;
    }
`

const PostRequestIcon = styled.img`
    width: 22px;
    height: 22px;
`

const PostCreateIcon = styled.img`
    width: 18px;
    height: 18px;
`

const TopicToggle = styled.div`
    display: flex;
    position: absolute;
    bottom:-45px;
`

const extend = keyframes`
    from {
        width: 0px;
    } to {
        width: 80%;
    }
`

const TopicToggleElement = styled.div`
    padding: 10px;
    padding-bottom: 0px;
    margin-right:70px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    flex-shrink: 0;
    align-items: center;
    position: relative;

    & > p {
        color: ${props => props.selected ? "#000000" : "#8D8D8D"}
    }

    & > div {
        ${props => props.selected && css`
            background-color: #636480;
            width:100%;
            height:1px;
            animation-name: ${extend};
            animation-duration: 250ms;
            animation-timing-function: ease-in-out;
        `}
    }
`

const BackWrapper = styled.div`
    position: relative;
    margin-top: 6px;

    & > div {
        position: absolute;
        width: 300px;
        top: -54px;
        left: -36px;
    }
`

const Gap = styled.div`
    height:10px;
    background-color: #F9F9F9;
`

function mapStateToProps({auth, topic}){
    return {
        auth,
        topic,
    }
}

export default connect(mapStateToProps, actions)(withRouter(TopicPage));