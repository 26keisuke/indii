import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import * as actions from "../../actions"

class CreatePreviewTopic extends Component {
    constructor(props){
        super(props)
    }

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
                        <p className="topic-form-area-preview-input-title">{this.props.postName}</p>
                        <div className="topic-form-preview-input"/>

                        
                        
                        <form className="topic-form-area-middle">
                            <div className="topic-form-area-top-wrapper">
                                <div className="topic-form-area-top-circle"/>
                                <p className="topic-form-area-input-title">承認無しに変更を許可する</p>
                            </div>
                            <div className="topic-form-config-box">
                                <p className="topic-form-area-preview-input-title">{this.props.config ? "許可" : "許可しない"}</p>
                                <div className="topic-form-config-button">
                                    <input type="button" className={this.props.config ? "topic-form-config-toggle-on"  : "topic-form-config-toggle-off"}/>
                                    <div className="topic-form-config-layer"/>
                                </div>
                            </div>
                            <div className="topic-form-config-input"/>
                        </form>





                        <p className="topic-form-preview-check">この内容で下書きを作成してよろしいですか？<span className="topic-form-preview-check-help"></span></p>
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

export default connect(null, actions)(withRouter(CreatePreviewTopic))