import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const TopicBox = styled.div`
    
`

const TopicChild = styled.div`
    display: flex;
    align-items: center;
    box-shadow: 1px 1px 10px #d2d2d2;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;

    &:hover{
        background-color: ${props => props.theme.hover};
    }

    & > img {
        min-width: 70px;
        min-height: 70px;
        max-width: 70px;
        max-height: 70px;
        object-fit: contain;
        margin-right: 10px;
    }
`

const TopicTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #333333;
`

const TopicContent = styled.div`
    font-size: 11px;
    color: #333333;
    margin-bottom: 6px;
    height: 35px;
    overflow: hidden;
`

const Tag = styled.div`
    display: flex;
    flex-direction: row;

    & > p {
        color: #767676;
        font-size: 11px;
        margin-right: 8px;
    }
`

const TopicLike = styled.p`
    font-size: 10px;
`


class Topic extends Component {
    render () {
        return (
            <TopicBox>
                <TopicChild>
                    <img src={this.props.img}/>
                    <div>
                        <Tag>
                            {
                                this.props.tags.map(tag => 
                                    <p># {tag}</p>    
                                )
                            }
                        </Tag>
                        <TopicTitle>{this.props.topicName}</TopicTitle>
                        <TopicContent>{this.props.description}</TopicContent>
                        <TopicLike>お気に入り数： {this.props.likes}</TopicLike>
                    </div>
                </TopicChild>
            </TopicBox>
        )
    }
}

Topic.propTypes = {
    img: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    topicName: PropTypes.string,
    description: PropTypes.string,
    likes: PropTypes.string,
}

export default Topic