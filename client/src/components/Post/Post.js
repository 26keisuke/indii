import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Helmet } from "react-helmet"

import * as actions from "../../actions"

import account from "../../images/account.png"

import Textarea from "./Textarea/Textarea"
import { SlashTitle } from "../Feed/Trend/Trend"
import People from "../People/People"
import Screen from "../Util/Screen"
import Recommend from "../Util/Recommend"
import List from "../Draft/Editor/Tool/List/List"
import { Space } from "../Theme"
import SkeletonBox from "./Skeleton/SkeletonBox"
import Image from "./Image/Image"
import Slider from "./Slider/Slider"
// import Navigation from "./Navigation/Navigation"

import { getEditorContent, fmtDate, } from "../Util/util"

class Post extends Component {
    
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id)

    }

    renderLeft = () => {
        return(
            <LeftWrapper>
                { this.props.post.fetched.content
                ? 
                <Textarea
                    postName={this.props.post.fetched.postName}
                    content={this.props.post.fetched.content}
                    postId={this.props.post.fetched._id}
                />
                :      
                <SkeletonBox/>
                }   
                <Space height={"100px"}/>
            </LeftWrapper>
        )
    }

    renderRight = () => {
        
        if(this.props.post.fetched.creator) {
            var { _id, userName, photo, comment, intro } = this.props.post.fetched.creator
        }

        return(
            <div>
                <Image
                    id={this.props.post.fetched.topic && this.props.post.fetched.topic._id}
                />
                {/* <Navigation/> */}
                <Slider/>
                <TitleWrapper>
                    <SlashTitle>
                        <p>このポストの著者</p>
                        <p>{"//////////////////////"}</p>
                    </SlashTitle>
                </TitleWrapper>
                <People
                    id={_id}
                    photo={photo || account}
                    name={userName} 
                    job={comment} 
                    intro={intro}
                    skeleton={!this.props.post.fetched.creator}
                />
                <TitleWrapper>
                    <SlashTitle>
                        <p>参照</p>
                        <p>{"///////////////////////////////"}</p>
                    </SlashTitle>
                </TitleWrapper>
                <ListWrapper>
                    <List
                        readOnly={true}
                        reference={this.props.post.fetched.ref || []}
                    />
                </ListWrapper>
                <TitleWrapper>
                    <SlashTitle>
                        <p>関連するポスト</p>
                        <p>{"///////////////////////"}</p>
                    </SlashTitle>
                </TitleWrapper>
                {
                this.props.feed.recommend.map(recom => 
                    <Recommend
                        key={recom._id}
                        id={recom._id}
                        title={recom.postName}
                        content={recom.content}
                        authorImg={recom.creator[0].photo}
                        author={recom.creator[0].userName}
                        editDate={fmtDate(recom.lastEdited)}
                        postImg={recom.postImg[0] ? recom.postImg[0].image : recom.topicSquareImg[0].image}
                    />
                )
                }
                <Space height={"200px"}/>
            </div>
        )
    }

    render() {

        const titleName = this.props.post.fetched.postName || ""
        const description = getEditorContent(this.props.post.fetched.content, 30)

        const keywords = this.props.post.fetched.tags ? titleName + "," + this.props.post.fetched.tags.join(",") : ""

        return (
            <div>
                <Helmet>
                    <title>{titleName + " | Indii"}</title>
                    <meta name="description" content={description}/>
                    <meta name="keywords" content={keywords}/>
                </Helmet>
                <Screen space={false} noHeader={true} post={true} noBorder={true}>
                    {this.renderLeft()}
                    {this.renderRight()}
                </Screen>
            </div>
        )
    }
}

const LeftWrapper = styled.div`
    padding: 28px 65px;
    background-color: #ffffff;
    margin-top: -10px;

    box-shadow: 1px 1px 3px #eaeaea;
`

const TitleWrapper = styled.div`
    margin-top: 20px;
`

const ListWrapper = styled.div`
    margin-left: -10px;
`

function mapStateToProps(state) {
    return {
        post: state.post,
        auth: state.auth,
        feed: state.feed,
    }
}

export default connect(mapStateToProps, actions)(Post)