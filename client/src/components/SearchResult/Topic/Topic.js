import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import { FaHashtag } from "react-icons/fa"

import { getEditorContent } from "../../Util/util"

const TopicChild = styled.div`
    display: flex;
    align-items: center;
    box-shadow: 1px 1px 10px #eaeaea;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;
    max-width: 340px;
    margin-bottom: 20px;

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
    font-size: 15px;
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
        font-size: 10px;
        margin-right: 3px;
        display: flex;
        align-items: center;

        /* & > svg {
            transform: scale(0.9);
            margin-right: 2px;
        } */
    }
`

const TopicLike = styled.p`
    font-size: 10px;
`

const S1Wrapper = styled.div`
    & > span {
        margin-right: 10px;
    }
`


class Topic extends Component {
    render () {

        const flag = !!this.props.id

        return (
            <Link to={this.props.id ? `/topic/${this.props.id}` : "/"}>
                <TopicChild>
                    { flag 
                    ? <img src={this.props.img}/> 
                    : 
                    <S1Wrapper>
                        <Skeleton width={70} height={70}/>
                    </S1Wrapper>
                    }
                    <div>
                        <Tag>
                            { flag
                            ? this.props.tags.map((tag,index) => 
                                <p key={tag+index}>#{tag}</p>    
                            )
                            : <Skeleton width={150} height={14}/>
                            }
                        </Tag>
                        { flag
                        ? <TopicTitle>{this.props.topicName}</TopicTitle>
                        : <Skeleton width={100} height={20}/>
                        }
                        { flag
                        ? <TopicContent>{getEditorContent(this.props.description)}</TopicContent>
                        : <Skeleton count={2} width={230} height={14}/>
                        }
                        { flag
                        ? <TopicLike>お気に入り数： {this.props.likes}</TopicLike>
                        : <Skeleton width={80} height={14}/>
                        }
                    </div>
                </TopicChild>
            </Link>
        )
    }
}

Topic.propTypes = {
    id: PropTypes.string,
    img: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    topicName: PropTypes.string,
    description: PropTypes.string,
    likes: PropTypes.string,
}

export default Topic