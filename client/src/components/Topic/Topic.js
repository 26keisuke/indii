import React, { useState, useEffect, useMemo } from "react"
import styled, { css } from "styled-components"
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
import Scroll from "../Util/Scroll"

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

const TOF = ({ selected, index, title, indent }) => {

    const row = useMemo(() => {
        return (
            <TableRow selected={selected}>
                <p/>
                <p/>
                { indent && <p/> }
                <p>{index}</p>
                <p>{title}</p>
            </TableRow>
        )
    }, [selected, indent, title, indent])

    return (
        row
    )
}

const TopicPage = ({ fetched, ...props}) => {

    const [toggle, setToggle] = useState({
        topic: true,
        talk: false,
        activity: false,
    })
    const [trigger, setTrigger] = useState(false)
    const [currentIdx, setCurrentIdx] = useState("1")

    useEffect(() => {
        const id = props.match.params.id;
        props.fetchTopic(id, "ALL");
        return () => {
            props.fetchTopic()
        }
    }, [])

    const toggleState = (name) => {
        setToggle({
            topic: false,
            talk: false,
            activity: false,
        })
        setToggle({
            [name]: true,
        })
    }

    const handleEnter = (index, isEnter, data) => {
        const prev = data.previousPosition
        const now = data.currentPosition
        
        var current;

        if(isEnter){
            if((prev === "above") && (now === "inside")){
                current = indexArr.indexOf(index)
                if(!indexArr[current - 1]) return
                setCurrentIdx(indexArr[current - 1])
            }
         } else {
             if((prev === "inside") && (now === "above")){
                 current = indexArr.indexOf(index)
                 if(!indexArr[current + 1]) return
                 setCurrentIdx(indexArr[current + 1])
             }
         }
    }

    const renderPost = useMemo(() => {

        if(!fetched.order || !fetched.posts || !fetched.column) return

        const { order, posts } = fetched
        const columns = fetched.column

        var column;
        var post;

        var fstArr = [];
        var sndArr = [];
        var indexArr = [];
        var tableArr = [];

        tableArr.push(
            <div key="contentDiv">コンテンツ一覧</div>
        )

        for(var i=1; i < order.length; i++){
            column = arrObjLookUp(columns, "_id", order[i]);
            fstArr.push(
                <ColumnElement
                    key={"column" + column.index}
                    index={column.index}
                    title={column.title}
                    onLeave={handleEnter}
                    onEnter={handleEnter}
                />
            )

            tableArr.push(
                <TOF
                    key={"tof" + column.index}
                    selected={currentIdx === String(column.index)}
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
                        onEnter={handleEnter} 
                        onLeave={handleEnter}
                        index={post.index.join(".")}
                        postName={post.postName}
                        content={post.content}
                   />
                )

                tableArr.push(
                    <TOF
                        key={"tof" + String(post.index.join("."))}
                        selected={currentIdx === String(post.index.join("."))}
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

    }, [currentIdx, fetched.order, fetched.column, fetched.posts])

    const { likes, postCount, _id, topicName, order, column, activity, mobileImg } = fetched

    const flag = _id

    const tags = fetched.tags || []

    const posts = fetched.posts || {}
    const squareImg = fetched.squareImg || {}

    const rendered = flag ? renderPost : []

    const renderedPosts = rendered[0] 
    const renderedTable = rendered[1]
    const indexArr = rendered[2]

    const titleName = topicName || " "
    const descriptionPost = posts[0] || {}
    const subDescriptionPost = posts[1] || {}
    const description = getEditorContent(descriptionPost.content, 150) || getEditorContent(subDescriptionPost.content, 150) || `${topicName}に関するトピックです。`

    return (
        <TopicBox>
            <Helmet>
                <title>{titleName + " | Indii"}</title>
                <meta name="description" content={description}/>
                <meta name="keywords" content={`${titleName},${tags.join(",")}`}/>
            </Helmet>
            <Scroll/>
            <Breakpoint name="mobile">
                <Mobile
                    selected={toggle}
                    handleClick={toggleState}
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
                        selected={toggle}
                        handleClick={toggleState}
                        squareImg={squareImg}
                    />
                </TopWrapper>

                <Waypoint 
                    scrollableAncestor={window}
                    onEnter={() => setTrigger(false)}
                    onLeave={() => setTrigger(true)}
                    fireOnRapidScroll
                >
                    <Trigger/>
                </Waypoint>
                <TriggerFill/>

                { toggle["topic"] && posts.length > 1 &&
                <TopicBottom>
                    <TopicPostWrapper>
                        { flag && renderedPosts }
                        <Space height={"200px"}/>
                    </TopicPostWrapper>

                    { flag ?
                    <TocWrapper className="fake" position={trigger}>
                        <TableOfContent>
                            { renderedTable }
                        </TableOfContent>
                    </TocWrapper>
                    : <div className="fake"/>
                    }
                </TopicBottom>
                }

                {/* { toggle["talk"] &&
                <div>
                    <Talk/>
                    <Space height={"200px"} backgroundColor={"#f9f9f9"}/>
                </div>
                } */}
                
                { toggle["activity"] &&
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

    ${props => props.selected && css`
        transition: 200ms;

        & > p:nth-child(2) {
            border-left: 1px solid royalblue;
        }

        & > p {
            color: royalblue;
        }
    `}

    & > p {
        margin-right: 10px;
    }
`

const PostWrapper = styled.div`
    padding-top: 15px;
    padding-bottom: 20px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 1px;
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
    box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 1px;
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
    padding: 0px 30px;
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
        /* auth, */
        fetched: topic.fetched,
    }
}

export default connect(mapStateToProps, actions)(TopicPage);