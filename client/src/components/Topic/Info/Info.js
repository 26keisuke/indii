import React from "react"
import styled from "styled-components"
import Skeleton from "react-loading-skeleton"
import { withRouter } from "react-router-dom"

import TextArea from "../../Util/TextArea/TextArea"
import Like from "../Like/Like"
import Toggle from "../Toggle/Toggle"

// import question from "../../../images/question.png"
// import post from "../../../images/post.png"

import Back from "../../Util/Back"

const Info = ({ 

    history, 
    id, content, flag, tags, topicName, postCount, likes, handleClick, selected, squareImg,

}) => {
    return (
        <TopicTop>
            <div>
                <BackWrapper>
                    <div>
                        <Back
                            back={history.goBack}
                            name="戻る"
                        />
                    </div>
                </BackWrapper>
                <TopicTags>
                    { flag 
                    ?
                        tags.map(tag =>
                            <div key={tag}># {tag}</div>
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
                        <TextArea
                            content={content}
                            readOnly={true}
                        />
                        :
                        <ContentSkeleton>
                            <Skeleton count={5} height={18}/>
                        </ContentSkeleton>
                    }
                </TopicContent>
                <TopicTimeStamp>
                    {flag && <p>ポスト数: {postCount}</p> }
                    {flag && <p>お気に入り数: {likes.counter}</p>}
                    {!flag && <p><Skeleton width={160} height={18}/></p> }
                </TopicTimeStamp>
                <TopicOption>
                    {/* { flag && 
                    <div>
                        <PostRequestIcon src={question} alt="ポストリクエストのボタン"/>
                    </div>
                    }
                    { flag && 
                    <div>
                        <PostCreateIcon src={post} alt="ポスト作成のボタン"/>
                    </div>
                    } */}
                    { flag 
                    &&
                    <Like
                        topicId={id}
                    />
                    }
                </TopicOption>
                { flag &&
                    <Toggle
                        selected={selected}
                        handleClick={handleClick}
                    />
                }
            </div>
            { flag 
            ? <img src={squareImg.image} alt="トピックを代表する写真"/>
            : <section><Skeleton width={250} height={250}/></section>
            }
        </TopicTop>
    )
}


const ContentSkeleton = styled.div`
    & span {
        width: 100%;
    }
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
        object-fit: contain;
        flex-shrink: 0;
    }

    & > section {
        flex-shrink: 0;
    }
`

const TopicTags = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;

    & > div {

        display: flex;
        align-items: center;
        margin-right: 7px;

        & > p {
            color: #5a5a5a;
            font-size: 12px;
            flex-shrink: 0;
            margin-top: -1px;
        }
    }    

    & span {
        margin-right: 7px;
    }
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
    
    & svg {
        transform: scale(1.2);
        cursor: pointer;
        color: ${props => props.theme.primary};

        &:hover{
            color: ${props => props.theme.secondary};
        }
    }

    /* & > div {
        width:28px;
        height:28px;
        border: 0.5px solid #636480;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        cursor: pointer;
        margin-left: 30px;
    } */
`

// const PostRequestIcon = styled.img`
//     width: 22px;
//     height: 22px;
// `

// const PostCreateIcon = styled.img`
//     width: 18px;
//     height: 18px;
// `

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

export default withRouter(Info)