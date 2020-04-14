import React, { useEffect } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { Waypoint } from "react-waypoint"

import Topic from "../../SearchResult/Topic/Topic"

const Trend = ({ renderNewTopic, renderedTopics, setTopicPage, topicPage, fetchTopics, topics }) => {
    useEffect(() => {
        fetchTopics(0)
    },[])

    const render = () => {
        var result = topics[topics.length-1].map(topic => 
            <Topic
                key={topic._id}
                id={topic._id}
                img={topic.squareImg[0].image}
                tags={topic.tags}
                topicName={topic.topicName}
                description={topic.posts[0] && topic.posts[0].content}
                likes={topic.likes.counter}
            />
        )
        
        return result
    }

    const handleEnter = () => {
        setTopicPage(topicPage+1)
    }

    useEffect(() => {
        if(topicPage > 0) {
            fetchTopics(topicPage)
        }
    }, [topicPage])

    useEffect(() => {
        if(
            !topics[0] || 
            !topics[topicPage]
        ) return

        var temp = renderedTopics.slice()
        renderNewTopic(temp.concat(render()))
    }, [topics])

    return (
        <>
            {topics.length > 0 &&
            <>
            <SlashTitle>
                <p>新着のトピック</p>
                <p>////////////////////////</p>
            </SlashTitle>
            { renderedTopics }
            <Waypoint 
                scrollableAncestor={window}
                fireOnRapidScroll
                onEnter={handleEnter} 
            />
            </>
            }
        </>
    )
}

export const SlashTitle = styled.div`

    display: flex;
    flex-direction: row;
    margin-bottom: 15px;

    & > p:nth-child(1) {
        margin-right: 10px;
        font-size: 14px;
    }

    & > p:nth-child(2) {
        color: #eaeaea;
        font-size: 14px;
        letter-spacing: 5.5px;
    }
`

function mapStateToProps({ feed }){
    return {
        topicPage: feed.topicPage,
        topics: feed.newTopic,
        renderedTopics: feed.renderedTopics,
    }
}

export default connect(mapStateToProps)(Trend)