import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios"

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

        axios.post("/api/topic", {
            img: this.props.img.preview,
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
                <p className="topic-form-tags-preview-tags">{tag}</p>  
            );
        }; 
        return res;
    };

    renderFriends = () => {
        if(this.props.friends.length > 0){
            var res = this.props.friends.map(friend => 
                <div className="topic-form-friends-wrapper">
                    <img src={friend.imgUrl} className="topic-form-friends-person"/>
                </div>    
            )
        } else {
            var res = <p className="topic-form-friends-none">誰も招待リストに追加されていません</p>
        }
        return res;
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
                                    <img src={this.props.img.preview} className="thumb-preview-mobile"/>
                                </div>
                                <div className="thumb-preview-wrapper">
                                    <p className="thumb-preview-title">　</p>
                                    <img src={this.props.img.preview} className="thumb-preview-web"/>
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
                            <p className="topic-form-area-input-title">このトピックに招待するフォロワー</p>
                        </div>
                        <div className="topic-form-preview-tags">
                            {this.renderFriends()}
                        </div>
                        <p className="topic-form-preview-check">この内容でよろしいですか？<span className="topic-form-preview-check-help">(作成後はいつでもトピックを消すことができます。)</span></p>
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