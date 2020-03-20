import React, { Component, PureComponent } from "react"
import styled, {css} from "styled-components"
import { connect } from "react-redux"
import { Waypoint } from "react-waypoint"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

import * as actions from "../../actions"

import Info from "./Info/Info"
import Activity from "./Activity/Activity"
import { Space } from "../Theme"
import TextArea from "../Util/TextArea/TextArea"

import { arrObjLookUp, getEditorContent } from "../Util/util"

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
                <Link to={`/post/${this.props.postId}`}>
                    <Post>
                        <PostTop>
                            <p>{this.props.index}</p>
                            <h3>{this.props.postName}</h3>
                        </PostTop>
                        <TextAreaWrapper>
                            <TextArea
                                readOnly={true}
                                content={this.props.content}
                            />
                        </TextAreaWrapper>
                    </Post>
                </Link>
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

        tableArr.push(
            <div>コンテンツ一覧</div>
        )

        for(var i=1; i < order.length; i++){
            column = arrObjLookUp(columns, "_id", order[i]);
            fstArr.push(
                <ColumnElement
                    key={"column" + column.index}
                    index={column.index}
                    title={column.title}
                    onLeave={this.handleEnter}
                    onEnter={this.handleEnter}
                />
            )

            tableArr.push(
                <TOF
                    key={"tof" + column.index}
                    index={column.index}
                    title={column.title}
                    indent={false}
                />
            )

            for(var j=0; j < column.posts.length; j++){
                post = arrObjLookUp(posts, "_id", column.posts[j]);

                sndArr.push(
                    <PostElement
                        key={"post" + String(post.index.join("."))}
                        postId={post._id}
                        onEnter={(data) => this.handleEnter(true, data)} 
                        onLeave={(data) => this.handleEnter(false, data)}
                        index={post.index.join(".")}
                        postName={post.postName}
                        content={post.content}
                   />
                )

                tableArr.push(
                    <TOF
                        key={"tof" + String(post.index.join("."))}
                        index={post.index.join(".")}
                        title={post.postName}
                        indent={true}
                    />
                )
            }

            fstArr.push(<PostWrapper key={"wrapper" + i}>{sndArr}</PostWrapper>)

            sndArr = [];
        }

        return [fstArr, tableArr];
    }   

    render() {
        const flag = this.props.topic.fetched._id
        const { tags, likes, postCount, _id, topicName, order, column, activity } = this.props.topic.fetched

        const posts = this.props.topic.fetched.posts || {}
        const squareImg = this.props.topic.fetched.squareImg || {}

        const renderedPosts = flag && this.renderPost()[0]
        const renderedTable = flag && this.renderPost()[1]

        const titleName = topicName || " "

        const descriptionPost = posts[0] || {}
        const description = getEditorContent(descriptionPost.content) || `${topicName}に関するトピックです。`

        return (
            <TopicBox>
                <Helmet>
                    <title>{titleName + " | Indii"}</title>
                    <meta name="description" content={description}/>
                    <meta name="keywords" content={`${titleName}`}/>
                </Helmet>
                <TopWrapper>
                    <Info
                        id={_id}
                        flag={flag}
                        tags={tags}
                        content={description}
                        topicName={topicName}
                        postCount={postCount}
                        likes={likes}
                        handleClick={this.toggleState}
                        selected={this.state.toggle}
                        squareImg={squareImg}
                    />
                </TopWrapper>

                <Waypoint 
                    onEnter={() => this.setState({ trigger: false　})} 
                    onLeave={() => this.setState({ trigger: true })}
                    fireOnRapidScroll
                >
                    <Gap/>
                </Waypoint>

                { this.state.toggle["topic"] && posts.length > 1 &&
                <TopicBottom>
                    <TopicPostWrapper>
                        { flag && renderedPosts }
                        <Space height={"200px"}/>
                    </TopicPostWrapper>

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

                {/* { this.state.toggle["talk"] &&
                <div>
                    <Talk/>
                    <Space height={"200px"} backgroundColor={"#f9f9f9"}/>
                </div>
                } */}
                
                { this.state.toggle["activity"] &&
                <div>
                    <Activity
                        order={order}
                        columns={column}
                        posts={posts}
                        activity={activity}
                    />
                    <Space height={"200px"} backgroundColor={"#f9f9f9"}/>
                </div>
                }

                <Space height={"500px"} backgroundColor={"#f9f9f9"}/>

            </TopicBox>
        )
    }
}

const TextAreaWrapper = styled.div`
    & > div {
        padding: 15px;
    }
`

const TocWrapper = styled.div`    

    ${ props => props.position 
    ? css`
        position: fixed;
        top: 66px;

        @media only screen and (max-width: 1024px) {
            left: 860px;
        } 

        @media (min-width: 1024px) {
            left: 974px;
        }
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

const TopicPostWrapper = styled.div`
    margin-right: 20px;
`

const TableOfContent = styled.div`
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
    height: 50px;
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
        font-size: 17px;
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

const TopicBottom = styled.div`
    display: flex;
    flex-direction: row;
    width:100%;
    padding: 0px 30px;
    background-color: #f9f9f9;
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

export default connect(mapStateToProps, actions)(TopicPage);