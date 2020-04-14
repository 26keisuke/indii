import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import Topic from "../../SearchResult/Topic/Topic"
import { Space } from "../../Theme"

import computer from "../../../images/computer_science.png"
import business from "../../../images/business.png"
import deep from "../../../images/deep_learning.png"

const Box = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    & > img {
        width: 100%;
        border-radius: 8px;
        box-shadow: 1px 1px 10px #d2d2d2;
    }
`

const getCategoryThumb = (category) => {
    switch(category) {
        case "コンピューターサイエンス":
            return (
                <Box>
                    <img src={computer} alt="コンピューターサイエンスの画像"/>
                </Box>
            )
        case "ビジネス":
            return (
                <Box>
                    <img src={business} alt="ビジネスの画像"/>
                </Box>
            )
        case "ディープラーニング":
            return (
                <Box>
                    <img src={deep} alt="ディープラーニングの画像"/>
                </Box>
            )
        default:
            return null
    }
}

const Category = ({ category }) => {    
    return (
        <>
        {category.length !== 0 && category.map(cat => {
            return (
                <>
                { getCategoryThumb(cat.catId) }
                { 
                cat.topics.map(topic => 
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
                }
                <Space height={"50px"}/>
                </>
            )
        })
        }
        
        </>
    )
}

function mapStateToProps({ feed }){
    return {
        category: feed.category
    }
}

export default connect(mapStateToProps)(Category)