import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import { Helmet } from "react-helmet"
import { connect } from "react-redux"

import Post from "../Post/Element/Element"
import Screen from "../Util/Screen"
import Topic from "./Topic/Topic"

const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 11px;

    & p:nth-child(1){
        color: #464646;
        font-size: 12px;
        margin: 0px 10px;
    }
`

const Wrapper = styled.div`
    padding: 15px 0px;
`

const NotFound = styled.div`
    margin-left: 15px;
    margin-top: 30px;
    font-size: 13px;
`

class SearchResult extends Component {

    renderLeft = () => {

        const { term, posts } = this.props

        return (
            <Wrapper>
                <Title>
                    <p>「{term}」</p>
                    <p>の検索結果</p>
                </Title>
                <div>
                    { 
                    posts.length === 0
                    ?
                    <NotFound>「{term}」に関連するポストがありません。</NotFound>
                    : posts.map(post =>
                    <Post
                        id={post._id}
                        search={true}
                        topic={post.topicName}
                        title={post.postName}
                        content={post.content}
                        count={post.star.counter}
                        date={post.creationDate}
                        img={post.postImg ? post.postImg.image : post.topicSquareImg.image}
                    />
                    )
                    }
                </div>
            </Wrapper> 
        )
    }

    renderRight = () => {
        const { topics } = this.props
        return (
            <div>
                {
                topics.map(topic => 
                    <Topic
                        id={topic._id}
                        img={topic.squareImg.image}
                        tags={topic.tags}
                        topicName={topic.topicName}
                        description={topic.posts[0].content}
                        likes={topic.likes.counter}
                    />
                )
                }
            </div>
        )
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>{"Neural Networks" + "の検索結果 | Indii"}</title>
                    <meta name="description" content=""/>
                    <meta name="keywords" content=""/>
                </Helmet>
                <Screen space={false} noHeader={true} noBorder={true} noHeaderSpace={true}>
                    {this.renderLeft()}
                    {this.renderRight()}
                </Screen>
            </div>
        )
    }
}

function mapStateToProps({ feed }){
    return({
        posts: feed.postsFound,
        topics: feed.topicsFound,
        term: feed.searchTerm
    })
}

export default connect(mapStateToProps)(withRouter(SearchResult))