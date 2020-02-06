// 注意
//　alt を追加すると、autosuggestが少し変になるが別に心配ない！

import React, { Component } from "react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import styled from "styled-components"

const TopicElement = styled.div`    
    display: flex;
    flex-direction: row;
    padding: 10px;
    align-items: center;
    width: auto;
    justify-content: flex-start;
    & > img {
        width: 35px;
        height: 35px;
        border: 1px solid black;
        margin-right: 20px;
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
            margin-left:10px;
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
    render () {

        const {suggestion, target, url, handleClick} = this.props

        const tags = suggestion.tags.map(tag => 
            <p key={tag}>#{tag}</p>
        )

        return (
            <Link key={suggestion.id} to={url} onClick={() => handleClick(suggestion[target])}>
                <TopicElement>
                    <img src={suggestion.imgUrl} alt="検索結果のトピック一覧のメイン画像"/>
                    <TopicName>
                        {suggestion.name}
                    </TopicName>
                    <TopicInfo>
                        <div>
                            {tags}
                        </div>
                        <div>
                            <p>{suggestion.posts.toLocaleString()} Posts</p>
                            <p>{suggestion.likes.toLocaleString()} Favorites</p>
                        </div>
                    </TopicInfo>
                </TopicElement>
            </Link>
        )
    }
}

Topic.propTypes = {
    url: PropTypes.string,
    handleClick: PropTypes.func,
    suggestion: PropTypes.object,
    target: PropTypes.string
}

export default Topic