import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import TopicElement from "../../Topic/Element/Element"

class ProfileTopic extends Component {

    render() {
        return (
            <Wrapper>
                { 
                this.props.topics.map(elem =>
                <Box key={elem.topic._id}>
                    <TopicElement
                        id={elem.topic._id}
                        title={elem.topic.topicName}
                        img={elem.topic.squareImg.image}
                        content={elem.topic.posts[0].content}
                        likes={elem.topic.likes.counter}
                        tags={elem.topic.tags}
                    />
                </Box>
                )}
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    height: 100%;
    background-color: #fafafa;
    padding: 30px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Box = styled.div`
    box-shadow: 1px 1px 10px #eaeaea;
    width: 600px;
    margin-bottom: 12px;
`

function mapStateToProps({profile}) {
    return {
        profile
    }
}

export default connect(mapStateToProps, null)(ProfileTopic)