import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios"

import * as actions from "../../../../actions"

import { Box, BoxTransition,
         FinalCheck } from "../../Element/Element"
import { Space } from "../../../Theme"

import Section from "../../Element/Section"
import TwoButtons from "../../Element/TwoButtons"

class EditPreviewTopic extends Component {

    handleBack = () => {
        this.props.setBackward(true);
        this.props.setStep(1);
    }   

    handleForward = () => {
        this.props.setBackward(false);
        this.props.isFetching();
        this.props.enableGray();

        const url = "/api/post/" + this.props.selectedPost._id + "/edit"

        axios.post(url)
        .then(res => {
            this.onExit()
        })
    };

    onExit = () => {
        this.props.endFetching();
        this.props.disableGray();
        localStorage.clear();
        this.props.setCategory("draft");
        this.props.updateMessage("success", `ポスト「${this.props.selectedPost.postName}」を下書きに追加しました。`)       
        this.props.history.push("/draft")
    }

    render(){
        return (
            <Box scroll={true}>
                <BoxTransition back={this.props.back} transition={true}>
                    <div> 
                        <p>プレビュー</p>
                    </div> 
                    <div>
                        <Section title={"トピック名"} content={this.props.selectedTopic.topicName} width={440}/>
                        <Section title={"ポスト名"} content={this.props.selectedPost.postName} width={440}/>
                        
                        <FinalCheck>このポストを編集しますか？<span></span></FinalCheck>
                        <TwoButtons
                            handleBack={this.handleBack}
                            handleForward={this.handleForward}
                            text={["戻る", "次へ進む"]}
                        />
                        <Space height="220px"/>
                    </div>
                </BoxTransition>
            </Box>
        )
    }

}

export default connect(null, actions)(withRouter(EditPreviewTopic))