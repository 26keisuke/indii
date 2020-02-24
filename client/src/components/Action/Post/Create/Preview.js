import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios"

import * as actions from "../../../../actions"

import {Box, BoxTransition,
        Title, Section, PreviewTitle,
        ButtonWrapper, ButtonLeft, ButtonRight,
        FinalCheck,
        PreviewConfig, ConfigUnderline } from "../../Element/Element"

import { Space } from "../../../Theme"

import { sendMessage } from "../../../Util/util"

class CreatePreviewTopic extends Component {

    handleBack = () => {
        this.props.setBackward(true);
        this.props.setStep(2);
    }   

    handleForward = () => {
        this.props.setBackward(false);
        this.props.isFetching();
        this.props.enableGray();

        const url = "/api/topic/" + this.props.selectedTopic._id + "/post"

        const data = {
            topic: this.props.selectedTopic._id,
            topicName: this.props.selectedTopic.topicName,
            topicRectangleImg: this.props.selectedTopic.rectangleImg,
            topicSquareImg: this.props.selectedTopic.squareImg._id, // populateしているから
            topicMobileImg: this.props.selectedTopic.mobileImg,
            postName: this.props.postName,
            config: {
                allowEdit: this.props.config.allowEdit,
            }
        }

        axios.post(url, data)
        .then(res => {
            this.onExit()
        })
    };

    onExit = () => {
        this.props.endFetching();
        this.props.disableGray();
        this.props.resetCategory();
        localStorage.clear();
        this.props.setCategory("home");
        this.props.nudgeAdd("draft")        
        sendMessage("success", `トピック「${this.props.postName}」を下書きに追加しました。`, 5000, this.props)
        // 後でやらないと、メッセージが表示されない
        this.props.history.push("/")
    }

    render(){

        return (
            <Box scroll={true}>
                <BoxTransition back={this.props.back} transition={true}>
                    <div> 
                        <p>プレビュー</p>
                    </div> 
                    <div>
                        <Section title={"トピック名"} content={this.props.selectedTopic.topicName}/>
                        <Section title={"ポスト名"} content={this.props.postName}/>
                        
                        <form>
                            <Title title={"承認無しに変更を許可する"}/>
                            <PreviewConfig config={this.props.config.allowEdit}>
                                <PreviewTitle>{this.props.config.allowEdit ? "許可" : "許可しない"}</PreviewTitle>
                                <div>
                                    <input type="button"/>
                                    <div/>
                                </div>
                            </PreviewConfig>
                            <ConfigUnderline/>
                        </form>

                        <FinalCheck>この内容で下書きを作成してよろしいですか？<span></span></FinalCheck>
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