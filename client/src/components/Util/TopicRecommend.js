import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"


class TopicRecommend extends Component {
    
    render() {

        const { id, img, topicName, tags, content, postCount, likes } = this.props

        return(
            <TopicInfo to={`/topic/${id}`}>
                <div>
                    <img src={img}/>
                    <TopicContent>
                        {/* タグ */}
                        <div>
                            { tags.map(tag => 
                                <Tag>#<p>{tag}</p></Tag>
                            )}
                        </div>
                        {/* タイトル */}
                        <h3>{topicName}</h3>
                        {/* コンテンツ */}
                        <h4>{content}</h4>
                        {/* 基礎情報 */}
                        <div>
                            <div>ポスト数: <p>{postCount}</p></div>
                            <div>お気に入り数: <p>{likes}</p></div>
                        </div>
                    </TopicContent>
                </div>
            </TopicInfo>
        )
    }
}

const TopicInfo = styled(Link)`

    cursor: pointer;
    box-shadow: 1px 1px 10px #eaeaea;
    padding: 15px;
    margin-right: 20px;
    height: 132px;
    box-sizing: border-box;
    border-radius: 4px;

    & > h3 {
        margin-bottom: 8px;
    }

    & > div {
        display: flex;

        & > img {
            min-width: 100px;
            max-width: 100px;
            min-height: 100px;
            max-height: 100px;
            border: 1px solid #eaeaea;
            object-fit: contain;
            margin-right: 10px;
        }
    }
`

const TopicContent = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 300px;

    & > div:nth-child(1) {
        display: flex;
        margin-bottom: 0px;
        margin-top: -4px;
    }

    & > h3 {
        font-size: 13px;
    }

    & > h4 {
        font-size: 10px;
        min-height: 45px;
    }

    & > div:last-child {
        display: flex;
        font-size: 10px;

        & > div {
            display: flex;

            & > p {
                margin: 0px 8px;
            }

        }

    }
`

const Tag = styled.div`
    display: flex;
    margin-right: 8px;
    font-size: 10px;

    & > p {
        margin-left: 2px;
    }
`

TopicRecommend.propTypes = {
    // id
    // img
    // topicName
    // tags
    // content
    // postCount
    // likes
}


export default TopicRecommend