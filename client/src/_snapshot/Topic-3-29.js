import React, { Component, PureComponent, useMemo } from "react"
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
import Breakpoint from "../Breakpoint"
import Mobile from "./Mobile/Mobile"

import { arrObjLookUp, getEditorContent } from "../Util/util"

const ColumnElement = ({ index, title, onEnter, onLeave }) => {

    const children = useMemo(() => {
        return (
            <Column>
                <p>{index}</p>
                <h2>{title}</h2>
            </Column>
            
        )
    }, [index, title])

    return ([
        <Breakpoint key={`columnDablet${index}`} name="dablet">
            <Waypoint 
                key={String(index)} 
                scrollableAncestor={window}
                onEnter={(data) => onEnter(String(index), true, data)} 
                onLeave={(data) => onLeave(String(index), false, data)}
            >
                {children}
            </Waypoint>
        </Breakpoint>,
         <Breakpoint key={`columnMobile${index}`} name="mobile">
             {children}
         </Breakpoint>
    ])
}

const PostElement = ({ postId, index, postName, content, onEnter, onLeave }) => {

    const children = useMemo(() => {
        return (
            <Link to={`/post/${postId}`}>
                <Post>
                    <PostTop>
                        <p>{index}</p>
                        <h3>{postName}</h3>
                    </PostTop>
                    <TextAreaWrapper>
                        <TextArea
                            readOnly={true}
                            content={content}
                        />
                    </TextAreaWrapper>
                </Post>
            </Link>
        )  
    }, [postId, index, postName, content])

    return ([
        <Breakpoint key={`postDablet${postId + index}`} name="dablet">
            <Waypoint 
                scrollableAncestor={window}
                onEnter={(data) => onEnter(index, true, data)} 
                onLeave={(data) => onLeave(index, false, data)}
            >
                {children}
            </Waypoint>
        </Breakpoint>,
        <Breakpoint key={`postMobile${postId + index}`} name="mobile">
            {children}
        </Breakpoint>
    ])
}

class TOF extends PureComponent {
    render() {
        return (
            <TableRow>
                <p/>
                <p/>
                { this.props.indent && <p/> }
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
            trigger: false,
            current: "1",
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchTopic(id, "ALL");
    }

    componentWillUnmount() {
        this.props.fetchTopic()
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

    handleEnter = (index, isEnter, data) => {
        console.log(index)
        const prev = data.previousPosition
        const now = data.currentPosition

        if(isEnter){
           if((prev === "below") && (now === "inside")){
                this.setState({ current: this.state.enter + 27})
           }
        } else {
            if((prev === "inside") && (now === "below")){
                this.setState({ current: this.state.enter - 27})
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

        const indexArr = [];

        var tableArr = []

        tableArr.push(
            <div key={"contentDiv"}>コンテンツ一覧</div>
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

            indexArr.push(String(column.index))

            for(var j=0; j < column.posts.length; j++){
                post = arrObjLookUp(posts, "_id", column.posts[j]);

                sndArr.push(
                    <PostElement
                        key={"post" + String(post.index.join("."))}
                        postId={post._id}
                        onEnter={this.handleEnter} 
                        onLeave={this.handleEnter}
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

                indexArr.push(post.index.join("."))
            }

            fstArr.push(<PostWrapper key={"wrapper" + i}>{sndArr}</PostWrapper>)

            sndArr = [];
        }

        return [fstArr, tableArr, indexArr];
    }   

    render() {
        const { tags, likes, postCount, _id, topicName, order, column, activity, mobileImg } = this.props.topic.fetched

        const flag = _id

        const posts = this.props.topic.fetched.posts || {}
        const squareImg = this.props.topic.fetched.squareImg || {}

        const renderedPosts = flag && this.renderPost()[0]
        const renderedTable = flag && this.renderPost()[1]

        const titleName = topicName || " "

        const descriptionPost = posts[0] || {}
        const description = getEditorContent(descriptionPost.content, 150) || `${topicName}に関するトピックです。`

        return (
            <TopicBox>
                <Helmet>
                    <title>{titleName + " | Indii"}</title>
                    <meta name="description" content={description}/>
                    <meta name="keywords" content={`${titleName}`}/>
                </Helmet>
                <Breakpoint name="mobile">
                    <Mobile
                        selected={this.state.toggle}
                        handleClick={this.toggleState}
                        content={descriptionPost.content}
                        tags={tags} 
                        topicName={topicName} 
                        mobileImg={mobileImg} 
                        topicId={_id} 
                        posts={renderedPosts}
                        // actiivty
                        order={order}
                        columns={column}
                        activityPosts={posts}
                        activity={activity}
                    />
                </Breakpoint>

                <Breakpoint name="dablet">
                    <TopWrapper>
                        <Info
                            id={_id}
                            flag={flag}
                            tags={tags}
                            content={descriptionPost.content}
                            topicName={topicName}
                            postCount={postCount}
                            likes={likes}
                            handleClick={this.toggleState}
                            selected={this.state.toggle}
                            squareImg={squareImg}
                        />
                    </TopWrapper>

                    <Waypoint 
                        scrollableAncestor={window}
                        onEnter={() => this.setState({ trigger: false　})}
                        onLeave={() => this.setState({ trigger: true })}
                        fireOnRapidScroll
                    >
                        <Trigger/>
                    </Waypoint>
                    <TriggerFill/>

                    { this.state.toggle["topic"] && posts.length > 1 &&
                    <TopicBottom>
                        <TopicPostWrapper>
                            { flag && renderedPosts }
                            <Space height={"200px"}/>
                        </TopicPostWrapper>

                        { flag ?
                        <TocWrapper className="fake" position={this.state.trigger}>
                            <TableOfContent>
                                {/* <FocusBar top={this.state.enter}/> */}
                                { renderedTable }
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
                </Breakpoint>
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

/* const FocusBar = styled.div`
    transition: 300ms;
    position: absolute;
    top: ${props => String(props.top) + "px"};
    width: 251px;
    height: 28px;
    border-radius: 3px;
    border: 1px solid #636480;
    left: 10px;
` */

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

    & > div:first-child{
        margin-bottom: 10px;
    }
`

const TableRow = styled.div`
    font-size: 12px;
    margin-bottom: 10px;
    display: flex;

    & > p:nth-child(2) {
        border-left: 1px solid ${props => props.theme.secondary};
    }

    & > p {
        margin-right: 10px;
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

    @media only screen and (max-width: 670px) {
        background: #FDFDFD;
        box-shadow: 0px 1px 1px rgba(0,0,0,0.25);
        padding-top: 10px;
    }
`

const Column = styled.div`

    @media only screen and (max-width: 670px) {
        background: #FDFDFD;
        box-shadow: 0px 1px 1px rgba(0,0,0,0.25);
        width: 100%;
        padding-left: 10px;
        font-size: 15px;
        margin-bottom: 2px;
        height: 38px;

        & > h2 {
            font-size: 15px !important;
        }
    }

    @media only screen and (min-width: 670px) {
        max-width: 725px;
        min-width: 725px;
    }

    background-color: white;
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

    @media only screen and (max-width: 670px) {
        padding: 0px;
        width: 100%;
    }

    @media only screen and (min-width: 670px) {
        min-width: 725px;
        max-width: 725px;
    }

    background-color: white;
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
        padding-left: 14px;
        margin-right: 18px;
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

// TOCのTiggerを出すためのfake component
const Trigger = styled.div` 
    height: 10px;
    background-color: transparent;
    margin-top: -60px;
    margin-bottom: 60px;
`

// Triggerの抜けた穴を埋める fake component
const TriggerFill = styled.div`
    background-color: #f9f9f9;
    margin-bottom: 10px;
    margin-top: -10px;
`

function mapStateToProps({auth, topic}){
    return {
        auth,
        topic,
    }
}

export default connect(mapStateToProps, actions)(TopicPage);