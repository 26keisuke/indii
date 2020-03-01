import React, { Component } from "react";
import styled, { css } from "styled-components"
import { withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios"

import { FiColumns } from "react-icons/fi"

import * as actions from "../../../../actions"

import {Box, BoxTransition,
        FinalCheck,
        TagElement,
        PreviewList,
        PreviewIndex, IndexBox } from "../../Element/Element"

import Section from "../../Element/Section"
import Title from "../../Element/Title"
import TwoButtons from "../../Element/TwoButtons"

import { Space } from "../../../Theme"
import Image from "../../Preview/Image"

import { arrObjLookUp } from "../../../Util/util"

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
            this.onExit()
        })
        .catch(err => {
            console.log(err)
        })

    };

    onExit = () => {
        this.props.history.push(`/topic/${this.props.topicId}`)
        this.props.endFetching();
        this.props.disableGray();
        localStorage.clear();
        this.props.setCategory("home");
        this.props.updateMessage("success", `トピック「${this.props.topicName}」を編集しました。`)
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
                        <Section title={"トピック名"} content={this.props.topicName} width={440}/>

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
                        <TwoButtons
                            handleBack={this.handleBack}
                            handleForward={this.handleForward}
                            text={["戻る", "作成する"]}
                        />
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