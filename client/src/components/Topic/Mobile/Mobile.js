import React, { useEffect } from "react"
import styled from "styled-components"
import Skeleton from "react-loading-skeleton"
import Slider from "react-slick";

import Like from "../Like/Like"
import Toggle from "../Toggle/Toggle"
import Activity from "../Activity/Activity"
import MobileBack from "../../Util/MobileBack"
import TextArea from "../../Util/TextArea/TextArea"
import { Space } from "../../Theme"


const MobileImg = styled.img`
    width: 380px;
    height: 200px;
    border-bottom-right-radius: 35px;
    border-bottom-left-radius: 35px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    z-index: 1;
    position: relative;
`

const LikeWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 14px;
    z-index: 1;

    & svg {
        transform: scale(1.2);
    }
`

const ToggleWrapper = styled.div`
    height: 100px;
    position: relative;
    background: #F8F8F8;
    border-bottom: 1px solid #ADADAD;
    margin-top: -52px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;

    & > div {
        bottom: 0px;
        width: 90%;
        justify-content: space-around;

        & > div {
            margin-right: 0px;
        }
    }
`

const Tag = styled.div`
    font-size: 12px;
    color: #8D8D8D;

    & > span {
        margin-right: 6px;
    }
`

const TopicName = styled.h1`
    font-size: 18px;
    margin-top: 2px;
    margin-bottom: 10px;
`

const Info = styled.div`
    background: #FDFDFD;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    margin-bottom: 3px;
    padding: 15px 10px;
    padding-top: 10px;
`

const Top = styled.div`
    position: relative;
`

const toggleToIdx = (selected) => {
    if(selected["topic"]) return 0
    if(selected["activity"]) return 1
}

const Post = ({ flag, tags, topicName, content, posts }) => {
    return (
        <div>
            <div>
                <Info>
                    <Tag>
                        { flag 
                        ?
                        tags.map((tag,index) => <span key={index+tag}># {tag}</span>)
                        :
                        <Skeleton width={130} height={16}/>
                        }
                    </Tag>
                    { flag
                    ?
                    <TopicName>{topicName}</TopicName>
                    :
                    <S3Wrapper>
                        <Skeleton width={240} height={22}/>
                    </S3Wrapper>
                    }
                    <p>
                        { flag 
                        ? <TextArea content={content} readOnly={true}/>
                        : 
                        ([<S2Wrapper key="s2Wrapper">
                            <Skeleton count={3} height={16}/>
                        </S2Wrapper>,
                        <Skeleton key="s2Skeleton" width={100} height={16}/>
                        ])
                        }
                    </p>
                </Info>
            </div>
            { posts }
            <Space height={"200px"}/>
        </div>
    )
}

const Action = ({ flag, order, columns, posts, activity }) => {
    return (
        <div>
            { flag &&
            <Activity
                order={order}
                columns={columns}
                posts={posts}
                activity={activity}
            />
            }
            <Space height={"200px"}/>
        </div>
    )
}

const Mobile = ({ order, columns, activity, activityPosts, posts, tags, topicName, content, mobileImg, topicId, selected, handleClick,  }) => {

    var slider;

    const flag = topicId

    const idx = toggleToIdx(selected)

    useEffect(() => {
        slider.slickGoTo(idx)
    }, [idx])

    const handleChange = (current, next) => {
        switch(next){
            case 0:
                handleClick("topic")
                return
            case 1:
                handleClick("activity")
                return
            default:
                return
        }
    }

    return (
        <div>
            <Top>
                <MobileBack/>
                { flag ?
                <MobileImg src={mobileImg && mobileImg.image} alt="トピックを代表する写真"/>
                :
                <S1Wrapper>
                    <Skeleton width={380} height={200}/>
                </S1Wrapper>
                }
                <LikeWrapper>
                    <Like topicId={topicId}/>
                </LikeWrapper>
            </Top>
            <ToggleWrapper>
                <Toggle
                    selected={selected}
                    handleClick={handleClick}
                />
            </ToggleWrapper>
            <Slider
                ref={thisSlider => (slider = thisSlider)}
                speed={250}
                beforeChange={handleChange}
                infinite={false}
                adaptiveHeight={true}
            >
                <Post
                    flag={flag}
                    tags={tags}
                    topicName={topicName}
                    content={content}
                    posts={posts}
                />
                <Action
                    flag={flag}
                    order={order}
                    columns={columns}
                    posts={activityPosts}
                    activity={activity}
                />
            </Slider>
        </div>
    )
}

const S1Wrapper = styled.div`
    & span {
        border-bottom-right-radius: 35px;
        border-bottom-left-radius: 35px;
        box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
        z-index: 1;
        position: relative;
    }
`

const S2Wrapper = styled.div`
    & span {
        width: 100%;
        margin-bottom: 4px;
    }
`

const S3Wrapper = styled.div`
    & span {
        margin: 8px 0px;
    }
`

export default Mobile