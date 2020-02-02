import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import * as actions from "../../actions"

class EditPreviewTopic extends Component {
    constructor(props){
        super(props)
    }

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
            <div className="topic-form-area y-scrollable">
                <div className={this.props.back ? "topic-form-area-wrapper-enter" : "topic-form-area-wrapper-show"}>
                    <div className="topic-form-area-top"> 
                        <p className="topic-form-area-top-title">プレビュー</p>
                    </div> 
                    <div className="topic-form-area-middle">
                        <div className="topic-form-area-top-wrapper">
                            <div className="topic-form-area-top-circle"/>
                            <p className="topic-form-area-input-title">トピック名</p>
                        </div>
                        <p className="topic-form-area-preview-input-title">{this.props.selectedTopic.name}</p>
                        <div className="topic-form-preview-input"/>

                        <div className="topic-form-area-top-wrapper">
                            <div className="topic-form-area-top-circle"/>
                            <p className="topic-form-area-input-title">ポスト名</p>
                        </div>
                        <p className="topic-form-area-preview-input-title">{this.props.selectedPost.title}</p>
                        <div className="topic-form-preview-input"/>
                        
                        <p className="topic-form-preview-check">このポストを編集しますか？<span className="topic-form-preview-check-help"></span></p>
                        <div className="tiny-space"/>
                        <div className="topic-form-button">
                            <button className="topic-form-button-left" onClick={this.handleBack}>戻る</button>
                            <button 
                                className={"topic-form-button-right"} 
                                onClick={this.handleForward}
                            >
                                    作成する
                            </button>
                        </div>
                        <div className="space"/>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(null, actions)(withRouter(EditPreviewTopic))