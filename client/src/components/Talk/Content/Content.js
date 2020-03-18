import React, { Component } from "react"
import styled from "styled-components"
import { GoComment } from "react-icons/go"
// import { AiOutlineLike } from "react-icons/ai"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"

import * as actions from "../../../actions"

import CommentBox from "./Comment/Comment"
import Element from "./Element/Element"
import Recommend from "../../Util/Recommend"
import TopicRecommend from "../../Util/TopicRecommend"

import { fmtDate, getEditorContent } from "../../Util/util"

import { Space } from "../../Theme"

class Content extends Component {

    constructor(props){
        super(props)
        this.state = {
            value: "",
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.createComment(this.props.talk._id, this.state.value)
        this.setState({
            value: "",
        })
    }

    render() {

        var refId, refImg, refTitle, refTags, refContent, refCount, refLikes, refLastEdited;

        const { 
            creator,
            timeStamp,
            title,
            refType,
            post,
            topic,
            description,
            msgCounter,
            comments,
        } = this.props.talk

        if((refType === "POST") && (post.postName)){
            refId = post._id
            refImg = post.postImg && post.postImg.image
            if(!refImg){ refImg = post.topicSquareImg.image }
            refTitle = post.postName
            refLastEdited = post.lastEdited
        } else if((refType === "TOPIC") && (topic.topicName)){
            refId = topic._id
            refImg = topic.squareImg.image
            refTags = topic.tags
            refContent = topic.posts[0].content
            refTitle = topic.topicName
            refCount = topic.postCount
            refLikes = topic.likes.counter
        }

        const flag = !!title

        return(
            <Wrapper>
                    <Box>
                        <Wrapper>
                            {
                            flag
                            ?
                            <UserName><Link to={`/profile/${creator && creator._id}`}>{creator && creator.userName}</Link> ・　{fmtDate(timeStamp)}</UserName>
                            :
                            <UserName><Skeleton width={180} height={15}/></UserName>
                            }
                            {
                            flag
                            ?
                            <Title>{title}</Title>
                            :
                            <Title><Skeleton width={220} height={27}/></Title>
                            }
                            
                            { refType === "POST" &&
                                <Recommend
                                    id={refId}
                                    title={refTitle}
                                    content={getEditorContent(refContent, 100)}
                                    authorImg={creator.photo}
                                    author={creator.userName}
                                    editDate={fmtDate(refLastEdited)}
                                    postImg={refImg}
                                />
                            }
                            { refType === "TOPIC" &&
                                <TopicRecommend
                                    id={refId}
                                    img={refImg}
                                    topicName={refTitle}
                                    tags={refTags}
                                    content={getEditorContent(refContent, 100)}
                                    postCount={refCount}
                                    likes={refLikes}
                                />
                            }
                            {
                            flag
                            ?
                            <Description>{description}</Description>
                            :
                            <S1Wrapper><Skeleton width={480} count={3} height={16}/></S1Wrapper>
                            }
                            { flag &&
                            <Bottom>
                                <div>
                                    <GoComment/>
                                    {msgCounter}
                                </div>
                                {/* <div>
                                    <AiOutlineLike/>
                                    120
                                </div> */}
                            </Bottom>
                            }

                            <Space height={"30px"}/>

                            <div>
                                { 
                                flag 
                                ? comments.map(comment =>
                                    <Element
                                        key={comment._id}
                                        user={comment.user}
                                        date={fmtDate(comment.timeStamp)}
                                        content={comment.content}
                                    />
                                )
                                :
                                <div>
                                    <Element skeleton={true}/>
                                    <Element skeleton={true}/>
                                    <Element skeleton={true}/>
                                    <Element skeleton={true}/>
                                    <Element skeleton={true}/>
                                </div>
                                }
                            </div>

                            <Space height={"300px"}/>

                            { flag && this.props.auth.loggedIn &&
                            <CommentBox
                                value={this.state.value}
                                handleChange={(e) => this.setState({ value: e.target.value })}
                                handleSubmit={this.handleSubmit}
                            />
                            }

                        </Wrapper>
                    </Box>
            </Wrapper>
        )
    }
}

const S1Wrapper = styled.div`
    & span {
        margin-bottom: 6px;
    }
`

const Wrapper = styled.div`
    position: relative;
`

const UserName = styled.p`
    margin-bottom: 5px;
    color: #767676;

    & > a {
        &:hover{
            color: #565656;
        }
    }
`

const Description = styled.p`
    font-size: 12px;
    color: #555555;
    margin-top: 20px;
    margin-bottom: 20px;
`

const Box = styled.div`
    width: 49%;
    padding: 40px;
    position: fixed;
    overflow-y: scroll;
    height: 81%;

    /* &::-webkit-scrollbar-track{
        background-color: #F5F5F5;
    } */

    &::-webkit-scrollbar{
        width: 0px !important;
        /* background-color: #F5F5F5; */
    }

    /* &::-webkit-scrollbar-thumb{
        background-color: ${props => props.theme.secondary};
    } */
`

const Title = styled.h1`
    margin-bottom: 15px;
    font-size: 19px;
`

const Bottom = styled.div`
    display: flex;
    margin-top: 10px;
    margin-right: 20px;
    margin-left: 3px;
    font-size: 12px;

    & > div {

        display: flex;
        align-items: center;
        margin-right: 30px;

        & > svg {
            transform: scale(1.2);
            margin-right: 6px;
            margin-top: 2px;
        }
    }
`

function mapStateToProps({auth}){
    return {
        auth
    }
}

export default connect(mapStateToProps, actions)(Content)