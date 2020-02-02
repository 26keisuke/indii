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
        this.props.setStep(3);
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
        setTimeout(() => this.props.updateMessage("success", `トピック「${this.props.topic.name}」を編集しました。`),1000);
        setTimeout(() => this.props.resetMessage(), 5000)
    }

    renderTags = () => {
        if(this.props.tags && this.props.tags.length > 0){
            var res = this.props.tags.map((tag) => 
                <p className="topic-form-tags-preview-tags">{tag}</p>  
            );
        }; 
        return res;
    };

    renderIndex = () => {
        console.log(this.props)
        return(
            <div className="topic-form-index">
                <div className="topic-form-index-top">
                    <p className="topic-form-index-top-left-text">Before</p>
                    <p className="topic-form-index-top-right-text">After</p>
                </div>
                <hr className="topic-form-preview-hr"/>
                <div className="topic-form-index-box">
                    <div className="topic-form-index-left">
                        <div className="topic-form-index-left-number">
                            <p>1</p>
                            <p>1.1</p>
                            <p>1.2</p>
                        </div>
                        <div className="topic-form-index-left-content">
                            <p>コンテンツ</p>
                            <p>コンテンツ</p>
                            <p>コンテンツ</p>
                        </div>
                    </div> 
                    <div className="topic-form-index-right">
                        <div className="topic-form-index-right-content">
                            <p>コンテンツ</p>
                            <p>コンテンツ</p>
                            <p>コンテンツ</p>
                        </div>
                        <div className="topic-form-index-right-number">
                            <p>1</p>
                            <p>1.1</p>
                            <p>1.2</p>
                        </div>
                    </div> 
                </div>
            </div>
        )
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
                        <p className="topic-form-area-preview-input-title">{this.props.topicName}</p>
                        <div className="topic-form-preview-input"/>
                        <div className="topic-form-area-top-wrapper">
                            <div className="topic-form-area-top-circle"/>
                            <p className="topic-form-area-input-title">トピックの画像</p>
                        </div>
                        <div className="thumb-preview-box">
                            <div className="thumb-preview">
                                <div className="thumb-preview-wrapper">
                                    <p className="thumb-preview-title">After: </p>
                                    <img src={this.props.img} className="thumb-preview-mobile"/>
                                </div>
                                <div className="thumb-preview-wrapper">
                                    <p className="thumb-preview-title">　</p>
                                    <img src={this.props.img} className="thumb-preview-web"/>
                                </div>
                            </div>
                            <div className="thumb-preview">
                                <div className="thumb-preview-wrapper">
                                    <p className="thumb-preview-title">Before: </p>
                                    <img src={this.props.img} className="thumb-preview-mobile"/>
                                </div>
                                <div className="thumb-preview-wrapper">
                                    <p className="thumb-preview-title">　</p>
                                    <img src={this.props.img} className="thumb-preview-web"/>
                                </div>
                            </div>
                        </div>
                        <div className="topic-form-area-top-wrapper">
                            <div className="topic-form-area-top-circle"/>
                            <p className="topic-form-area-input-title">このトピックに関連するタグ</p>
                        </div>
                        <div className="topic-form-preview-tags">
                            {this.renderTags()}
                        </div>

                        <div className="topic-form-area-top-wrapper">
                            <div className="topic-form-area-top-circle"/>
                            <p className="topic-form-area-input-title">目次</p>
                        </div>

                        {this.renderIndex()}
                        
                        <p className="topic-form-preview-check">この内容で編集を反映してよろしいですか？<span className="topic-form-preview-check-help"></span></p>
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