import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import Response from "../../Util/Response"
import SlateTextArea from "../../Util/TextArea/TextArea"
import Breakpoint from "../../Breakpoint"
import { Space } from "../../Theme"
import Sns from "./Sns/Sns"
import { fmtDate } from "../../Util/util"

const MobileTopicName = styled.h3`
    font-size: 15px;
    font-weight: bold;
    color: #767676;
`

const MobileTitle = styled.div`
    display: flex;
    font-size: 18px;
    padding-bottom: 5px;
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 12px;
    align-items: center;

    & > p {
        font-size: 17px;
        margin-right: 9px;
    }
`

const S1Wrapper = styled.div`
    & span {
        width: 100%;
        margin-bottom: 3px;
    }
`

const TopicTitle = styled.h3`
    font-size: 15px;
    font-weight: bold;
    color: #767676;

    &:hover {
        color: #565656;
    }
`

const Edited = styled.p`
    margin: 10px 0px;
    font-size: 11px;
    color: #777;
`

const Textarea = ({ lastEdited, index, topicId, topicName, postName, content, postId }) => {
    return (
        <>
            <Breakpoint name="dablet">
                <Link to={`/topic/${topicId}`}>
                    <TopicTitle>
                        {topicName}
                    </TopicTitle>
                </Link>
                <HeaderTitle>
                    {postName}
                </HeaderTitle>
                <Edited>最後の編集日： {fmtDate(lastEdited)}</Edited>
                <Sns/>
                <TextAreaWrapper>
                    <SlateTextArea
                        readOnly={true}
                        content={content}
                    />
                </TextAreaWrapper>
            </Breakpoint>

            <Breakpoint name="mobile">
                { topicName
                ?
                <Link to={`/topic/${topicId}`}>
                    <MobileTopicName>{topicName}</MobileTopicName>
                </Link>
                :
                <Skeleton width={100} height={14}/>
                }
                { postName
                ?
                <MobileTitle>
                    <p>{index && index.join(".")}</p>
                    <h1>{postName}</h1>
                </MobileTitle>
                :
                <MobileTitle>
                    <Skeleton width={150} height={17}/>
                </MobileTitle>
                }
                <TextAreaMobileWrapper>
                    { content
                    ?
                    <SlateTextArea
                        readOnly={true}
                        content={content}
                    />
                    :
                    <S1Wrapper>
                        <Skeleton count={5} height={16}/>
                        <Skeleton width={100} height={16}/>
                        <Space height={"10px"}/>
                        <Skeleton count={2} height={16}/>
                        <Skeleton width={100} height={16}/>
                    </S1Wrapper>
                    }
                </TextAreaMobileWrapper>
            </Breakpoint>
            
            <Breakpoint name="mobile">
                <ResponseMobileWrapper>
                    { postId 
                    ?
                    <Response
                        postId={postId}
                    />
                    :
                    <div>
                        <Skeleton width={100} height={16}/>
                    </div>
                    }
                </ResponseMobileWrapper>
            </Breakpoint>
            
            <Breakpoint name="dablet">
                <ResponseWrapper>
                    <Response
                        postId={postId}
                    />
                </ResponseWrapper>
            </Breakpoint>

        </>
    )
}

const ResponseMobileWrapper = styled.div`
    & svg,
    & img {
        margin-right:65px;
    }

    & > div {

        display: flex;
        justify-content: flex-end;
        z-index:2;
        padding-top: 13px;

        & > div:last-child {
            margin-right: -30px;
        }
    }
`

const ResponseWrapper = styled.div`
    & > div {
        display: flex;
        justify-content: space-around;
    }
`

const TextAreaWrapper = styled.div`
    & > div {
        padding-top: 20px;
        padding-bottom: 50px;
    }
`

const TextAreaMobileWrapper = styled.div`
    & > div {
        
    }
`

const HeaderTitle = styled.h1`
    color: #222222;
    font-size: 20px;
`

export default Textarea