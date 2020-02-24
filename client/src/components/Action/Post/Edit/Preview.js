import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import * as actions from "../../../../actions"

import { Box, BoxTransition,
         Section,
         ButtonWrapper, ButtonLeft, ButtonRight,
         FinalCheck } from "../../Element/Element"
import { Space } from "../../../Theme"

class EditPreviewTopic extends Component {

    handleBack = () => {
        this.props.setBackward(true);
        this.props.setStep(1);
    }   

    handleForward = () => {
        this.props.setBackward(false);
        this.props.isFetching();
        this.props.enableGray();
        setTimeout(() => this.onExit(), 1500);
    };

    onExit = () => {
        this.props.history.push("/")
        this.props.endFetching();
        this.props.disableGray();
        this.props.resetCategory();
        localStorage.clear();
        this.props.setCategory("home");
        setTimeout(() => this.props.updateMessage("success", `ポスト「${this.props.selectedPost.title}」を下書きに追加しました。`),1000);
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
                        <Section title={"トピック名"} content={this.props.selectedTopic.name}/>
                        <Section title={"ポスト名"} content={this.props.selectedPost.title}/>
                        
                        <FinalCheck>このポストを編集しますか？<span></span></FinalCheck>
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

export default connect(null, actions)(withRouter(EditPreviewTopic))