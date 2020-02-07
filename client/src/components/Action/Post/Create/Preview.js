import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import * as actions from "../../../../actions"

import {Box, BoxTransition,
        PreviewSection, PreviewTitle, PreviewUnderline,
        ButtonWrapper, ButtonLeft, ButtonRight,
        FinalCheck,
        PreviewConfig, ConfigUnderline } from "../../Element/Box"

import { Space } from "../../../Theme"

class CreatePreviewTopic extends Component {

    handleBack = () => {
        this.props.setBackward(true);
        this.props.setStep(2);
    }   

    handleForward = () => {
        this.props.setBackward(false);
        this.props.isFetching();
        this.props.enableGray();

        console.log(this.props.config, this.props.selectedTopic, this.props.postName)
        
        // axios.post("/api/post", {
        //     img: this.props.img.preview,
        //     tags: this.props.tags,
        //     topicName: this.props.topicName,
        // })
        // .then(res => {
        //     this.onExit()
        // })

    };

    onExit = () => {
        this.props.history.push("/")
        this.props.endFetching();
        this.props.disableGray();
        this.props.resetCategory();
        localStorage.clear();
        this.props.setCategory("home");
        setTimeout(() => this.props.updateMessage("success", `トピック「${this.props.postName}」を下書きに追加しました。`),1000);
        this.props.nudgeAdd("draft")
        setTimeout(() => this.props.resetMessage(), 5000)
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
                        <PreviewTitle>{this.props.selectedTopic.name}</PreviewTitle>
                        <PreviewUnderline/>

                        <PreviewSection>
                            <div/>
                            <p>ポスト名</p>
                        </PreviewSection>
                        <PreviewTitle>{this.props.postName}</PreviewTitle>
                        <PreviewUnderline/>
                        
                        <form className="topic-form-area-middle">
                            <PreviewSection>
                                <div/>
                                <p>承認無しに変更を許可する</p>
                            </PreviewSection>
                            <PreviewConfig config={this.props.config}>
                                <PreviewTitle>{this.props.config ? "許可" : "許可しない"}</PreviewTitle>
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