import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios"

import * as actions from "../../../../actions"

import {Box, BoxTransition,
    PreviewList,
    FinalCheck,
    TagElement,
    FriendWrapper, FriendNone } from "../../Element/Element"

import TwoButtons from "../../Element/TwoButtons"

import Section from "../../Element/Section"
import Title from "../../Element/Title"

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
            rectangleImg: this.props.rectangleImg,
            mobileImg: this.props.mobileImg,
            squareImg: this.props.squareImg,
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
        localStorage.clear();
        this.props.setCategory("home");
        this.props.updateMessage("success", `新しいトピック「${this.props.topicName}」を作成しました。`);
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
            var res = this.props.friends.map((friend,index) => 
                <FriendWrapper key={index}>
                    <img src={friend.photo}/>
                </FriendWrapper>    
            )
        } else {
            var res = <FriendNone>誰も招待リストに追加されていません</FriendNone>
        }
        return res;
    }

    render(){

        const { back, topicName, mobileImg, squareImg, rectangleImg, } = this.props

        return (
            <Box scroll={true}>
                <BoxTransition back={back} transition={true}>
                    <div> 
                        <p>プレビュー</p>
                    </div> 
                    <div>
                        <Section title={"トピック名"} content={topicName} width={440}/>

                        <Title title={"トピックの画像"}/>                        
                        <Image 
                            mobileImg={mobileImg}
                            squareImg={squareImg}
                            rectangleImg={rectangleImg}
                        />

                        <Title title={"このトピックに関連するタグ"}/>
                        <PreviewList>
                            {this.renderTags()}
                        </PreviewList>

                        <Title title={"このトピックに招待するフォロワー"}/>
                        <PreviewList>
                            {this.renderFriends()}
                        </PreviewList>

                        <FinalCheck>この内容でよろしいですか？<span>(作成後はいつでもトピックを消すことができます。)</span></FinalCheck>
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

export default connect(null, actions)(withRouter(CreatePreviewTopic))