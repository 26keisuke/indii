import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios"

import * as actions from "../../../../actions"

import {Box, BoxTransition, FinalCheck, } from "../../Element/Element"
        
import TwoButtons from "../../Element/TwoButtons"
import Section from "../../Element/Section"
import Config from "../../Preview/Config"

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
        localStorage.clear();
        this.props.setCategory("draft");
        this.props.updateMessage("success", `トピック「${this.props.postName}」を下書きに追加しました。`, 5000)       
        // 後でやらないと、メッセージが表示されない
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
                        <Section title={"ポスト名"} content={this.props.postName} width={440}/>
                        
                        <Config
                            title={"承認無しに変更を許可する"}
                            on={this.props.config.allowEdit}
                            text={["許可","許可しない"]}
                        />

                        <FinalCheck>この内容で下書きを作成してよろしいですか？<span></span></FinalCheck>
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

export default connect(null, actions)(withRouter(CreatePreviewTopic))