import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import Screen from "../Util/Screen"

import * as actions from "../../actions"

import upload from "../../images/upload.png"
import { MdDelete } from "react-icons/md"

import Draft from "./Element/DraftElement"
import { Border } from "../Theme"

const DraftTop = styled.div`
    position: relative;

    & > p {
        font-size: 16px;
        color: #434343;
    }
`

const DraftDelete = styled.div`
    position: absolute;
    width: 90px;
    border: 1px solid #646380;
    font-size: 10px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding: 3px;
    color: #646380;
    border-radius: 4px;
    align-items: center;
    top:2px;
    right: -380px;
    cursor: pointer;

    & > svg {
        width: 15px;
        height: 15px;
        margin-left: 2px;
    }
`

const DraftUpload = styled.div`
    position: absolute;
    width: 90px;
    border: 1px solid #646380;
    font-size: 10px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding: 3px;
    color: #646380;
    border-radius: 4px;
    align-items: center;
    top:2px;
    right: -500px;
    cursor: pointer;

    & > img {
        width: 15px;
        height: 15px;
        margin-left: 2px;
    }
`

class DraftNavigation extends Component {

    deleteDraft = () => {
        const id = "1";
        const action = "DELETE_DRAFT";
        const title = "下書きを削除";
        const message = "削除する下書きを選択してください";
        const caution = "* 複数選択できます";
        const buttonMessage = "確認画面へ";
        const next = "DELETE_DRAFT"
        this.props.showConfirmation(id, action, title, caution, message, buttonMessage, next);
        this.props.enableGray();
    }

    uploadDraft = () => {
        const id = "1";
        const action = "UPLOAD_DRAFT";
        const title = "下書きをアップロードする";
        const message = "アップロードする下書きを選択してください";
        const caution = "* 複数選択できます";
        const buttonMessage = "次の画面へ";
        const next = "UPLOAD_DRAFT"
        this.props.showConfirmation(id, action, title, caution, message, buttonMessage, next);
        this.props.enableGray();
    }

    renderTopContent = () => {
        return(
            <DraftTop>
                <p>下書き</p>
                <DraftDelete onClick={this.deleteDraft}>
                    <p>削除</p>
                    <MdDelete/>
                </DraftDelete>
                <DraftUpload　onClick={this.uploadDraft}>
                    <p>アップロード</p>
                    <img src={upload}/>
                </DraftUpload>
            </DraftTop>
        )
    }

    renderLeftContent = () => {
        return (
            <div>
                <Border bottom={true}/>
                <Draft
                    id={"111"}
                    topic={"Recurrent Neural Network"}
                    title={"Transformer Network"}
                    content={"本紙は RNN や CNN を使わず Attention のみ使用したニューラル機械翻訳 Transformer を提案している．わずかな訓練で圧倒的な State-of-the-Art を達成し，華麗にタイトル回収した．また注意を非常にシンプルな数式に一般化したうえで，加法注意・内積注意・ソースターゲット注意・自己注意に分類した．このうち自己注意はかなり汎用的かつ強力な手法であり他のあらゆるニューラルネットに転用できる．"}
                    date={"August 21, 2013 5:36 AM"}
                    type={"edit"}
                />
            </div>
        )
    }

    renderRightContent() {
        return (
            <div></div>
        )
    }

    render(){
        return(
            <Screen>
                {this.renderTopContent()} 
                {this.renderLeftContent()} 
                {this.renderRightContent()}
            </Screen>
        )
    }
}

export default connect(null, actions)(DraftNavigation)