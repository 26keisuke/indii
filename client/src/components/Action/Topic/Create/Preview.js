import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios"

import * as actions from "../../../../actions"

import {Box, BoxTransition,
    PreviewSection, PreviewTitle, PreviewUnderline,
    ButtonWrapper, ButtonLeft, ButtonRight,
    FinalCheck,
    PreviewList,
    TagElement,
    FriendWrapper, FriendNone } from "../../Element/Box"

import { Space } from "../../../Theme"
import Image from "../../Preview/Image"


class CreatePreviewTopic extends Component {

    handleBack = () => {
        this.props.setBackward(true);
        this.props.setStep(3);
    }   

    handleForward = () => {
        this.props.setBackward(false);
        this.props.isFetching();
        this.props.enableGray();

        axios.post("/api/topic", {
            img: this.props.img,
            tags: this.props.tags,
            topicName: this.props.topicName,
        })
        .then(res => {
            this.onExit()
        })

        // もしfriendsが招待されている場合はnotificationのrequestもする
    };

    onExit = () => {
        this.props.history.push("/")
        this.props.endFetching();
        this.props.disableGray();
        this.props.resetCategory();
        localStorage.clear();
        this.props.setCategory("home");
        setTimeout(() => this.props.updateMessage("success", `新しいトピック「${this.props.topicName}」を作成しました。`), 1000);
        setTimeout(() => this.props.resetMessage(), 5000)
    }

    renderTags = () => {
        if(this.props.tags && this.props.tags.length > 0){
            var res = this.props.tags.map((tag) => 
                <TagElement key={tag}>{tag}</TagElement>  
            );
        }; 
        return res;
    };

    renderFriends = () => {
        if(this.props.friends.length > 0){
            var res = this.props.friends.map(friend => 
                <FriendWrapper>
                    <img src={friend.imgUrl}/>
                </FriendWrapper>    
            )
        } else {
            var res = <FriendNone>誰も招待リストに追加されていません</FriendNone>
        }
        return res;
    }

    render(){
        return (
            <Box scroll={true}>
                <BoxTransition back={this.props.back} transition={true}>
                    <div> 
                        <p>プレビュー</p>
                    </div> 
                    <div>
                        <PreviewSection>
                            <div/>
                            <p>トピック名</p>
                        </PreviewSection>
                        <PreviewTitle>{this.props.topicName}</PreviewTitle>
                        <PreviewUnderline/>
                        <PreviewSection>
                            <div/>
                            <p>トピックの画像</p>
                        </PreviewSection>
                        
                        <Image newImg={this.props.img}/>

                        <PreviewSection>
                            <div/>
                            <p>このトピックに関連するタグ</p>
                        </PreviewSection>
                        <PreviewList>
                            {this.renderTags()}
                        </PreviewList>
                        <PreviewSection>
                            <div/>
                            <p>このトピックに招待するフォロワー</p>
                        </PreviewSection>
                        <PreviewList>
                            {this.renderFriends()}
                        </PreviewList>
                        <FinalCheck>この内容でよろしいですか？<span>(作成後はいつでもトピックを消すことができます。)</span></FinalCheck>
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

export default connect(null, actions)(withRouter(CreatePreviewTopic))