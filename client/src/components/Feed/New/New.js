import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"

// import Recommend from "../../Util/Recommend"
import Topic from "../../SearchResult/Topic/Topic"

class Trend extends Component {

    render () {
        return (
            <div>
                <SlashTitle>
                    <p>新着のトピック</p>
                    <p>////////////////////////</p>
                </SlashTitle>
                {this.props.topics.length !== 0 
                ?
                this.props.topics.map(topic => 
                    <Topic
                        key={topic._id}
                        id={topic._id}
                        img={topic.squareImg.image}
                        tags={topic.tags}
                        topicName={topic.topicName}
                        description={topic.posts[0].content}
                        likes={topic.likes.counter}
                    />
                )
                :
                <div>
                    <Topic/>
                    <Topic/>
                    <Topic/>
                    {/* <Recommend/>
                    <Recommend/>
                    <Recommend/> */}
                </div>
                }
            </div>
        )
    }
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
        letter-spacing: 2.5px;
    }
`

function mapStateToProps({ feed }){
    return {
        topics: feed.newTopic
    }
}

export default connect(mapStateToProps)(Trend)