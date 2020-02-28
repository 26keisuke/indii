import React, { Component } from "react";
import styled, { css } from "styled-components"
import { withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios"

import { FiColumns } from "react-icons/fi"

import * as actions from "../../../../actions"

import {Box, BoxTransition,
        Title, Section,
        ButtonWrapper, ButtonLeft, ButtonRight,
        FinalCheck,
        TagElement,
        PreviewList,
        PreviewIndex, IndexBox } from "../../Element/Element"

import { Space } from "../../../Theme"
import Image from "../../Preview/Image"

import { arrObjLookUp, sendMessage } from "../../../Util/util"

class CreatePreviewTopic extends Component {

    handleBack = () => {
        this.props.setBackward(true);
        this.props.setStep(3);
    }   

    handleForward = () => {

        const {
            editedMobileImg,
            editedRectangleImg,
            editedSquareImg,
            editedPosts,
            editedColumns,
            editedOrder,
            editedTags,
        } = this.props

        this.props.setBackward(false);
        this.props.isFetching();
        this.props.enableGray();

        const url = `/api/topic/${this.props.topicId}/edit`
        const data = {
            mobileImg: editedMobileImg,
            rectangleImg: editedRectangleImg,
            squareImg: editedSquareImg,
            tags: editedTags,
            posts: editedPosts,
            columns: editedColumns,
            order: editedOrder,
        }

        axios.post(url, data)
        .then(() => {
            console.log("DONE")
            this.onExit()
        })
        .catch(err => {
            console.log(err)
        })

    };

    onExit = () => {
        this.props.history.push("/")
        this.props.endFetching();
        this.props.disableGray();
        this.props.resetCategory();
        localStorage.clear();
        this.props.setCategory("home");
        sendMessage("success", `トピック「${this.props.topicName}」を編集しました。`, 5000, this.props)
    }

    renderTags = () => {
        if(this.props.editedTags && this.props.editedTags.length > 0){
            var res = this.props.editedTags.map((tag) => 
                <TagElement key={tag}>{tag}</TagElement>  
            );
        }; 
        return res;
    };

    renderIndex = () => {

        const originalCol = this.props.originalColumns
        const editedCol = this.props.editedColumns

        var post = {}
        var postAfter = []
        var postBefore = []

        for(var a=0; a < originalCol.length; a++){
            postBefore.push({index: originalCol[a].index, name: originalCol[a].title, column: true})
            for(var b=0; b < originalCol[a].posts.length; b++){
                post = arrObjLookUp(this.props.originalPosts, "_id", originalCol[a].posts[b])
                postBefore.push({index: post.index, name: post.postName})
            }
        }

        for(var i=0; i < editedCol.length; i++){
            postAfter.push({index: editedCol[i].index, name: editedCol[i].title, column: true})
            for(var j=0; j < editedCol[i].posts.length; j++){
                post = arrObjLookUp(this.props.editedPosts, "_id", editedCol[i].posts[j])
                postAfter.push({index: post.index, name: post.postName})
            }
        }

        return(
            <PreviewIndex>
                <div>
                    <p>Before</p>
                    <p>After</p>
                </div>
                <hr/>
                <IndexBox>
                    <div>
                        <div>
                            {
                                postBefore.map((post,index) => {
                                    if((post.column) && (post.index === 0)) {
                                        return ""
                                    }

                                    if(post.column) {
                                        return (
                                            <IconWrapper key={index+post.name} left="1">
                                                <Icon left="1"/>
                                                <p>{post.index}</p>
                                            </IconWrapper>
                                        )
                                    } 
                                    return <p key={index+post.name}>{post.index.join(".")}</p>
                                })
                            }
                        </div>
                        <div>
                            {
                                postBefore.map((post,index) => {
                                    if((post.column) && (post.index === 0)) {
                                        return ""
                                    }
                                    return <p key={index+post.name}>{post.name}</p>
                                })
                            }
                        </div>
                    </div> 
                    <div>
                        <div>
                            {
                                postAfter.map((post,index) => {
                                    if((post.column) && (post.index === 0)) {
                                        return ""
                                    }
                                    return <p key={index+post.name}>{post.name}</p>
                                })
                            }
                        </div>
                        <div>
                            {
                                postAfter.map((post,index) => {
                                    if((post.column) && (post.index === 0)) {
                                        return ""
                                    }
                                    if(post.column) {
                                        return (
                                            <IconWrapper key={index+post.name} right="1">
                                                <p>{post.index}</p>
                                                <Icon right="1"/>
                                            </IconWrapper>
                                        )
                                    }
                                    return <p key={index+post.name}>{post.index.join(".")}</p>
                                })
                            }
                        </div>
                    </div> 
                </IndexBox>
            </PreviewIndex>
        )
    }


    render(){

        return (
            <Box scroll={true}>
                <BoxTransition back={this.props.back} transition={true}>
                    <div> 
                        <p>プレビュー</p>
                    </div> 
                    <div>
                        <Section title={"トピック名"} content={this.props.topicName}/>

                        <Title title={"トピックの画像"}/>
                        <Image
                            originalSquareImg={this.props.originalSquareImg}
                            originalRectangleImg={this.props.originalRectangleImg}
                            originalMobileImg={this.props.originalMobileImg}
                            
                            mobileImg={this.props.editedMobileImg}
                            rectangleImg={this.props.editedRectangleImg}
                            squareImg={this.props.editedSquareImg}
                        />

                        <Title title={"このトピックに関連するタグ"}/>
                        <PreviewList>
                            {this.renderTags()}
                        </PreviewList>

                        <Title title={"目次"}/>
                        {this.renderIndex()}
                        
                        <FinalCheck>この内容で編集を反映してよろしいですか？<span></span></FinalCheck>
                        <ButtonWrapper>
                            <ButtonLeft onClick={this.handleBack}>戻る</ButtonLeft>
                            <ButtonRight onClick={this.handleForward}>作成する</ButtonRight>
                        </ButtonWrapper>
                        <Space height="220px"/>
                    </div>
                </BoxTransition>
            </Box>
        )
    }

}


const Icon = styled(FiColumns)`
    color: #9EAEE6;

    ${props => props.left  && css`
        margin-right: 5px;
    `}

    ${props => props.right && css`
        margin-left: 5px;
    `}
`

const IconWrapper = styled.div`
    display: flex;
    align-items: center;

    ${props => props.left && css`
        margin-left: -17px;
    `}

    ${props => props.right && css`
        margin-right: -17px;
        float: right;
    `}
    
`


export default connect(null, actions)(withRouter(CreatePreviewTopic))