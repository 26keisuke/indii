import React, { useRef, useState, useEffect} from "react"
import styled from "styled-components"
import { GoComment } from "react-icons/go"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"
import * as actions from "../../../actions"
import TextField from "@material-ui/core/TextField"

import ShowMore from "../../Util/ShowMore"
import CommentBox from "./Comment/Comment"
import Element from "./Element/Element"
import Recommend from "../../Util/Recommend"
import TopicRecommend from "../../Util/TopicRecommend"
import MobileBack from "../../Util/MobileBack"
import Breakpoint from "../../Breakpoint"
import MobileComment from "../../Util/Comment"

import { fmtDate } from "../../Util/util"

import { Space } from "../../Theme"

const Content = ({ auth, transition, setTransition, talk, ...props}) => {

    var refId, refImg, refTitle, refTags, refContent, refCount, refLikes, refLastEdited, refTopicName;

    const [value, setValue] = useState("")
    const [isOpened, setOpen] = useState(false)
    const moreRef = useRef()

    useEffect(() => {
        return () => {
            document.removeEventListener("mousedown", outsideClick)
        }
    }, [])

    useEffect(() => {
        if(isOpened){
            document.addEventListener("mousedown", outsideClick)
        } else {
            document.removeEventListener("mousedown", outsideClick)
        }
    },[isOpened])

    const outsideClick = (e) => {
        if(moreRef.current.contains(e.target)) return
        setOpen(false)
    }

    const handleEdit = () => {
        setOpen(false)

        const id = talk._id;
        const action = "TALK_EDIT";
        const title = "トークを編集する"
        const message = "";
        const caution = "";
        const buttonMessage = "変更する";
        const value = talk.description
        props.showConfirmation(id, action, title, caution, message, buttonMessage, "", value);
        props.enableGray();
    }

    const handleDelete = () => {
        setOpen(false)

        const id = talk._id;
        const action = "TALK_DELETE";
        const title = "トークを削除する"
        const message = "このトークを削除してよろしいですか";
        const caution = "";
        const buttonMessage = "削除する";
        props.showConfirmation(id, action, title, caution, message, buttonMessage);
        props.enableGray();
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.createComment(talk._id, value)
        setValue("")
    }

    const handleBack = () => {
        setTransition(false)
        props.history.push("/talk")
    }

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
    } = talk || {}

    if((refType === "POST") && (post.postName)){
        refId = post._id
        refImg = post.postImg && post.postImg.image
        if(!refImg){ refImg = post.topicSquareImg.image }
        refTitle = post.postName
        refContent = post.content
        refLastEdited = post.lastEdited
        refTopicName = post.topicName
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

    return([
        <Wrapper key="mobileTalkContentWrapper">
            <Box>
                <Wrapper>
                    <Breakpoint name="mobile">
                        <MobileBack top={-31} left={-5} handleClick={handleBack}/>
                    </Breakpoint>
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
                            content={refContent}
                            authorImg={creator.photo}
                            author={creator.userName}
                            editDate={fmtDate(refLastEdited)}
                            postImg={refImg}
                            topicName={refTopicName}
                        />
                    }
                    { refType === "TOPIC" &&
                        <TopicRecommend
                            id={refId}
                            img={refImg}
                            topicName={refTitle}
                            tags={refTags}
                            content={refContent}
                            postCount={refCount}
                            likes={refLikes}
                        />
                    }
                    {
                    flag
                    ?
                    <Description>
                        <TextField
                            id="description"
                            multiline
                            value={description}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Description>
                    :
                    <S1Wrapper><Skeleton width={480} count={3} height={16}/></S1Wrapper>
                    }
                    { flag &&
                    <Bottom>
                        <div>
                            <GoComment/>
                            {msgCounter}
                        </div>
                        { auth.info._id === creator._id &&
                        <ShowMoreWrapper>
                            <ShowMore
                                ref={moreRef}
                                handleClick={() => setOpen(!isOpened)}
                                show={isOpened} 
                                left={"-162px"} 
                                bottom={"19px"} 
                                actionName={["このトークを編集する", "このトークを削除する"]}
                                action={[handleEdit, handleDelete]}
                            />
                        </ShowMoreWrapper>
                        }
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

                    { flag && auth.loggedIn &&
                    <Breakpoint name="dablet">
                        <CommentBox
                            value={value}
                            handleChange={(e) => setValue(e.target.value)}
                            handleSubmit={handleSubmit}
                        />
                    </Breakpoint>
                    }

                </Wrapper>
            </Box>
        </Wrapper>,
        <Breakpoint name="mobile">
            { flag && auth.loggedIn && transition &&
            <MobileComment 
                key="mobileCommentTalk" 
                bottom={64}
                value={value}
                handleChange={(e) => setValue(e.target.value)}
                handleSubmit={handleSubmit}
            />
            }
        </Breakpoint>
    ])
}

const ShowMoreWrapper = styled.div`
    position: absolute;
    right: -26px;
`

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
    cursor: default;

    & > div {
        width: 100%;
    }

    & .MuiOutlinedInput-multiline{
        padding: 0px;
    }

    & .MuiOutlinedInput-notchedOutline{
        border: none;
    }
`

const Box = styled.div`    
    @media only screen and (max-width: 670px) {
        width: 100%;
        height: 100%;
        padding: 20px;
        padding-top: 40px;
        box-sizing: border-box;
    }

    width: 50%;
    padding: 40px;
    position: fixed;
    overflow-y: scroll;
    height: 81%;

    scrollbar-color: transparent transparent;
    
    &::-webkit-scrollbar{
        width: 0px !important;
        background-color: transparent;
    }
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
    position: relative;

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

export default connect(mapStateToProps, actions)(withRouter(Content))