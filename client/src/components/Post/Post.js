import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import BraftEditor from 'braft-editor'

import * as actions from "../../actions"

import sample from "../../images/sample1.png"
import sample0 from "../../images/sample0.jpg"
import account from "../../images/account.png"

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
import Response from "../Util/Response"

class Post extends Component {
    
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id)
    }

    renderLeft = () => {
        return(
            <LeftWrapper>
                { this.props.post.fetched.content
                ? 
                <div>
                    <HeaderTitle>
                        {this.props.post.fetched.postName}
                    </HeaderTitle>
                    <HeaderUnderline/>
                    <BraftEditor
                        controls={[]}
                        readOnly={true}
                        value={BraftEditor.createEditorState(this.props.post.fetched.content)}
                        contentClassName="post-braft"
                    />
                    <Response
                        postId={this.props.post.fetched._id}
                        wrapperStyle={wrapperStyle}
                    />
                </div>
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
                <Image/>
                {/* <Navigation/> */}
                <Slider/>
                <TitleWrapper>
                    <SlashTitle>
                        <p>このポストの著者</p>
                        <p>{"//////////////////////////////"}</p>
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
                        <p>{"////////////////////////////////////////"}</p>
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
                        <p>{"////////////////////////////////"}</p>
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
            <Screen space={false} noHeader={true}>
                {this.renderLeft()}
                {this.renderRight()}
            </Screen>
        )
    }
}

const wrapperStyle= {
    display: "flex",
    justifyContent: "space-around",
}

const LeftWrapper = styled.div`
    padding: 28px 75px;
    background-color: #ffffff;
    margin-top: -10px;
`

const TitleWrapper = styled.div`
    margin-top: 20px;
`

const ListWrapper = styled.div`
    margin-left: -10px;
`

const HeaderTitle = styled.h1`
    color: #222222;
    font-size: 18px;
    text-align: center;
`

const HeaderUnderline = styled.div`
    border-bottom: 1px solid #d2d2d2;
    width: 50px;
    margin: 0 auto;
    margin-top: 8px;
`

function mapStateToProps(state) {
    return {
        post: state.post,
        auth: state.auth
    }
}

export default connect(mapStateToProps, actions)(Post)