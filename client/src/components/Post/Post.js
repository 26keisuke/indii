import React, { useEffect } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Helmet } from "react-helmet"
import Skeleton from "react-loading-skeleton"

import * as actions from "../../actions"

import account from "../../images/account.png"

import Textarea from "./Textarea/Textarea"
import { SlashTitle } from "../Feed/Trend/Trend"
import People from "../People/People"
import Screen from "../Util/Screen"
import Recommend from "../Util/Recommend"
import List from "../Draft/Editor/Tool/List/List"
import { Space } from "../Theme"
import SkeletonBox from "./Skeleton/SkeletonBox"
import Image from "./Image/Image"
// import MobileInfo from "./Info/Info"
import Slider from "./Slider/Slider"
// import Navigation from "./Navigation/Navigation"
import Scroll from "../Util/Scroll"
import Breakpoint from "../Breakpoint"
import MobileBack from "../Util/MobileBack"

import { getEditorContent, fmtDate, } from "../Util/util"

const MobileImg = styled.div`
    height: 40px;
    overflow: hidden;
    & > img {
        width: 100%;
        filter: blur(2px) brightness(0.5);
    }
`

const ScreenWrapper = styled.div`
    & .feed-left {
        padding: 0px;
    }
`

const MobileWrapper = styled.div`
    padding: 10px 15px;
    box-shadow: 1px 3px 10px #d2d2d2;
`

const MobileInfo = styled.div`
    box-shadow: 1px 3px 10px #d2d2d2;
    background-color: white;
    padding: 10px 15px;
`

const MobileTitle = styled.div`
    margin: 12px 0px;
    font-size: 13px;
    display: flex;
    align-items: center;

    & > div {
        background-color: #9EAEE5;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-right: 5px;
    }
`

const S1Wrapper = styled.div`
    & span {
        width: 100%;
    }
`

const Post = ({ post, recommend, ...props}) => {

    const postId = post.fetched._id
    const userId = post.fetched.creator

    const { content, postName, topic, topicName, index, tags, creator, ref } = post.fetched
    if (post.fetched.creator) {
        var {  userName, photo, comment, intro } = post.fetched.creator 
    }

    const titleName = postName || ""
    const description = getEditorContent(content, 150)
    const keywords = tags ? titleName + "," + tags.join(",") : ""

    useEffect(() => {
        props.fetchPost(props.match.params.id)
        return () => {
            props.fetchPost()
        }
    }, [])

    useEffect(() => {
        props.fetchPost(props.match.params.id)
        document.getElementsByClassName("fakebox")[0].scrollTo(0, 0)
    }, [props.match.params.id])

    const renderLeft = () => {

        return([
            <Breakpoint key="dabletPostLeft" name="dablet">
                <LeftWrapper>
                    { content
                    ? 
                    <Textarea
                        postName={postName}
                        content={content}
                        postId={postId}
                    />
                    :      
                    <SkeletonBox/>
                    }   
                    <Space height={"100px"}/>
                </LeftWrapper>
            </Breakpoint>,
            <Breakpoint key="mobilePostLeft" name="mobile">
                <MobileImg>
                    <MobileBack/>
                    { !topic
                    ?
                    <S1Wrapper>
                        <Skeleton height={40}/>
                    </S1Wrapper>
                    :
                    <img src={topic.mobileImg.image}/>
                    }
                </MobileImg>
                <MobileWrapper>
                    <Textarea
                        topicId={topic && topic._id}
                        topicName={topicName}
                        index={index}
                        postName={postName}
                        content={content}
                        postId={postId}
                    />
                </MobileWrapper>
                <Space height={"10px"}/>
                <MobileInfo>
                    <MobileTitle><div/><span>このポストの著者</span></MobileTitle>
                    <People
                        id={userId}
                        photo={photo || account}
                        name={userName} 
                        job={comment} 
                        intro={intro}
                        skeleton={!creator}
                    />
                    <MobileTitle><div/><span>関連するポスト</span></MobileTitle>
                    {
                    recommend && recommend.slice(0,3).map(recom => 
                        <Recommend
                            key={recom._id}
                            id={recom._id}
                            title={recom.postName}
                            content={recom.content}
                            authorImg={recom.creator[0].photo}
                            author={recom.creator[0].userName}
                            editDate={fmtDate(recom.lastEdited)}
                            topicName={recom.topicName}
                            postImg={recom.postImg[0] ? recom.postImg[0].image : recom.topicSquareImg[0].image}
                        />
                    )
                    }
                    <MobileTitle><div/><span>参照</span></MobileTitle>
                    <List
                        readOnly={true}
                        reference={ref || []}
                    />
                    <Space height={"200px"}/>
                </MobileInfo>
            </Breakpoint>
        ])
    }

    const renderRight = () => {
        return(
            <div>
                <Image/>
                {/* <Navigation/> */}
                <Slider/>
                <TitleWrapper>
                    <SlashTitle>
                        <p>このポストの著者</p>
                        <p>{"//////////////////////"}</p>
                    </SlashTitle>
                </TitleWrapper>
                <People
                    id={userId}
                    photo={photo || account}
                    name={userName} 
                    job={comment} 
                    intro={intro}
                    skeleton={!creator}
                />
                <TitleWrapper>
                    <SlashTitle>
                        <p>参照</p>
                        <p>{"///////////////////////////////"}</p>
                    </SlashTitle>
                </TitleWrapper>
                <ListWrapper>
                    <List
                        readOnly={true}
                        reference={ref || []}
                    />
                </ListWrapper>
                <TitleWrapper>
                    <SlashTitle>
                        <p>関連するポスト</p>
                        <p>{"///////////////////////"}</p>
                    </SlashTitle>
                </TitleWrapper>
                {
                recommend && recommend.slice(0,3).map(recom => 
                    <Recommend
                        key={recom._id}
                        id={recom._id}
                        title={recom.postName}
                        content={recom.content}
                        authorImg={recom.creator[0].photo}
                        author={recom.creator[0].userName}
                        editDate={fmtDate(recom.lastEdited)}
                        topicName={recom.topicName}
                        postImg={recom.postImg[0] ? recom.postImg[0].image : recom.topicSquareImg[0].image}
                    />
                )
                }
                <Space height={"200px"}/>
            </div>
        )
    }

    return (
        <div>
            <Helmet>
                <title>{titleName + " | Indii"}</title>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
            </Helmet>
            <Scroll/>
            <ScreenWrapper>
                <Screen space={false} noHeaderSpace={true} noHeader={true} post={true} noBorder={true}>
                    {renderLeft()}
                    {renderRight()}
                </Screen>
            </ScreenWrapper>
        </div>
    )
}

const LeftWrapper = styled.div`
    padding: 28px 65px;
    background-color: #ffffff;
    margin-top: -10px;

    box-shadow: 1px 1px 3px #eaeaea;
`

const TitleWrapper = styled.div`
    margin-top: 20px;
`

const ListWrapper = styled.div`
    margin-left: -10px;
`

function mapStateToProps(state) {
    return {
        post: state.post,
        // auth: state.auth,
        recommend: state.feed.recommend,
    }
}

export default connect(mapStateToProps, actions)(Post)