import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Helmet } from "react-helmet"

import * as actions from "../../actions"

import sample from "../../images/sample1.png"
import sample0 from "../../images/sample0.jpg"
import account from "../../images/account.png"

import Textarea from "./Textarea/Textarea"
import { SlashTitle } from "../Feed/Trend/Trend"
import People from "../People/People"
import Screen from "../Util/Screen"
import Recommend from "../Util/Recommend"
import List from "../Draft/Tool/List/List"
import { Space } from "../Theme"
import SkeletonBox from "./Skeleton/SkeletonBox"
import Image from "./Image/Image"
import Slider from "./Slider/Slider"
// import Navigation from "./Navigation/Navigation"

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
                <Space height={"300px"}/>
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
                <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample0}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample}
                />
                <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample0}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample}
                />
                <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample0}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample}
                />
            </div>
        )
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>{this.props.post.fetched.postName + " | Indii"}</title>
                    <meta name="description" content={`${BraftEditor.createEditorState(this.props.post.fetched.content).toText().replace(/a\s/g, "").substring(0, 30)}`}/>
                    <meta name="keywords" content={`${this.props.post.fetched.postName}`}/>
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
        auth: state.auth
    }
}

export default connect(mapStateToProps, actions)(Post)