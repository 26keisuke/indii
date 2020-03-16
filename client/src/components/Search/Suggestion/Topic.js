import React, { Component } from "react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import styled from "styled-components"

import Breakpoint from "../../Breakpoint"

const TopicElement = styled.div`    
    cursor: pointer;
    display: flex;
    flex-direction: row;
    padding: 10px;
    align-items: center;
    width: auto;
    justify-content: flex-start;

    & > img {
        width: 35px;
        height: 35px;
        margin-right: 20px;
    }

    background-color: ${props => props.onHover && "rgb(240,240,240)"};

    &:hover {
        background-color: rgb(240,240,240);
    }
`

const TopicName = styled.div`
    font-size: 12px;
    color: #333333;
`

const TopicInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: 20px;
    justify-content: flex-end;

    & div:nth-child(1) {
        display: flex;
        flex-direction: row;
        align-items: center;

        & > p {
            font-size:10px;
            color: #656565;
            padding-left: 5px;
            margin-left: auto;
        }
    }

    & div:nth-child(2) {
        display: flex;
        flex-direction: row;
        margin-left: auto;

        & > p {
            font-size:10px;
            margin-left: 10px;
        }
    }
`

class Topic extends Component {

    handleClick = () => {
        const { handleClick, suggestion　} = this.props

        return handleClick(suggestion)
    }

    render () {

        const { suggestion, url, onHover } = this.props

        const tags = suggestion.tags.map(tag => 
            <p key={tag}>#{tag}</p>
        )

        return (
            <Link key={suggestion._id} to={url} onClick={this.handleClick}>
                <TopicElement onHover={onHover}>
                    <img src={suggestion.squareImg.image} alt="検索結果のトピック一覧のメイン画像"/>
                    <TopicName>
                        {suggestion.topicName}
                    </TopicName>
                    <Breakpoint name="dablet">
                        <TopicInfo>
                            <div>
                                {tags}
                            </div>
                            <div>
                                <p>ポスト数 {suggestion.postCount}</p>
                                <p>お気に入り数 {suggestion.likes.counter}</p>
                            </div>
                        </TopicInfo>
                    </Breakpoint>
                </TopicElement>
            </Link>
        )
    }
}

Topic.propTypes = {
    url: PropTypes.string,
    handleClick: PropTypes.func,
    suggestion: PropTypes.object,
    // target: PropTypes.string
}

export default Topic