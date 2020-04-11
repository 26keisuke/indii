import React, { Component } from "react"
import styled, { css } from "styled-components"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"
import { Link } from "react-router-dom"

import { FaHashtag } from "react-icons/fa"

import { getEditorContent } from "../../Util/util"

class Image extends Component {

    render () {

        const { fetched } = this.props

        if(fetched.topic) {
            const { _id, topicName, tags, rectangleImg, posts } = fetched.topic

            return (
                <Link to={`/topic/${_id}`}>
                    <ImageBox>
                        <Overlay/>
                        <Container src={rectangleImg.image}/>
                        <Tag>
                            {
                                tags.slice(0,2).map(tag => 
                                    <div key={tag}>
                                        <TagIcon/>
                                        <p>{tag}</p>
                                    </div>
                                )
                            }
                        </Tag>
                        <Title>{topicName}</Title>
                        <Content>{getEditorContent(posts[0].content, 100)}</Content>
                    </ImageBox>
                </Link>
            )
        } 

        return (
            <ImageBox skeleton={true}>
                <Skeleton width={318} height={176}/>
            </ImageBox>
        )
    }
}

const TagIcon = styled(FaHashtag)`
    transform: scale(0.8);
    margin-right: 2px;
`

const ImageBox = styled.div`
    position: relative;
    margin-left: -10px;
    margin-top: -15px;
    margin-bottom: 15px;
    ${props => !props.skeleton && css`
        box-shadow: 1px 1px 10px #eaeaea;
    `}
    min-width: 318px;
    max-width: 318px;
    min-height: 180px;
    max-height: 180px;
    overflow: hidden;
    cursor: pointer;

    &:hover > div:nth-child(1) {
        height: 180px;
    }

    &:hover > div:nth-child(3) {
        bottom: 112px;
    }

    &:hover > h2 {
        bottom: 87px;
    }

    &:hover > p:nth-child(5) {
        top:100px;
    }
`

const Container = styled.img`
    height: 180px;
    width: 318px;
`

const Overlay = styled.div`
    content: "";
    background-color: #000000;
    opacity: 0.6;
    width: 318px;
    height: 65px;
    left: 0px;
    transition: 250ms;
    bottom: 0px;
    position: absolute;
`

const Tag = styled.div`
    transform: scale(0.9);
    position: absolute;
    display: flex;
    flex-direction: row;
    color: #ffffff;
    bottom: 40px;
    left: 20px;
    font-weight: bold;
    transition: 300ms;
    margin-left: -6px;
    font-weight: normal;

    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        border: 1px solid white;
        padding: 1px 8px;
        border-radius: 3px;
        font-size: 10px;
    }
`

const Title = styled.h2`
    position: absolute;
    color: #ffffff;
    font-size: 14px;
    bottom: 12px;
    left: 18px;
    font-weight: bold;
    transition: 300ms;
`

const Content = styled.p`
    position: absolute;
    top: 179px;
    left: 20px;
    margin-left: -2px;
    color: white;
    padding-right: 20px;
    transition: 300ms;
    height: 70px;
    overflow: hidden;
`

function mapStateToProps({ post }) {
    return {
        fetched: post.fetched
    }
}

export default connect(mapStateToProps, null)(Image)