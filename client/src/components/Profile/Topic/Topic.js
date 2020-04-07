import React, { useEffect } from "react"
import styled from "styled-components"

import TopicElement from "../../Topic/Element/Element"

const ProfileTopic = ({ topics, fetchTopics }) => {

    useEffect(() => {
        fetchTopics();
    }, [])

    return (
        <Wrapper>
            { 
            topics.map(topic=> {
                if(!topic.topicName) return null
                return (
                    <Box key={topic._id}>
                        <TopicElement
                            id={topic._id}
                            title={topic.topicName}
                            img={topic.squareImg[0].image}
                            content={topic.posts[0].content}
                            likes={topic.likes.counter}
                            tags={topic.tags}
                        />
                    </Box>
                )
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: #fafafa;
    min-height: 50vh;
    padding: 30px 60px;
    padding-bottom: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Box = styled.div`
    box-shadow: 1px 1px 10px #eaeaea;
    width: 600px;
    margin-bottom: 12px;
`

export default ProfileTopic