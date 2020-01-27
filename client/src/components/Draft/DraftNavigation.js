import React, { Component } from "react"

import LeftAndRight from "../LeftAndRight"

import absurd from "../../images/absurd/01.png"
import upload from "../../images/upload.png"
import {MdDelete} from "react-icons/md"

import Draft from "./Draft"

class DraftNavigation extends Component {

    constructor(props) {
        super(props)

        this.renderLeftContent = this.renderLeftContent.bind(this)
        this.renderRightContent = this.renderRightContent.bind(this)
    }

    renderTopContent() {
        return(
            <div className="draft-navi-title-wrapper">
                <p className="content-intro-title">下書き</p>
                <div className="draft-navi-upload-icon-left">
                    <p>削除</p>
                    <MdDelete className="draft-navi-upload-icon-img"/>
                </div>
                <div className="draft-navi-upload-icon-right">
                    <p>アップロード</p>
                    <img src={upload} className="draft-navi-upload-icon-img"/>
                </div>
            </div>
        )
    }

    renderLeftContent() {
        return (
            <Draft
                id={"111"}
                topic={"Recurrent Neural Network"}
                title={"Transformer Network"}
                content={"本紙は RNN や CNN を使わず Attention のみ使用したニューラル機械翻訳 Transformer を提案している．わずかな訓練で圧倒的な State-of-the-Art を達成し，華麗にタイトル回収した．また注意を非常にシンプルな数式に一般化したうえで，加法注意・内積注意・ソースターゲット注意・自己注意に分類した．このうち自己注意はかなり汎用的かつ強力な手法であり他のあらゆるニューラルネットに転用できる．"}
                date={"August 21, 2013 5:36 AM"}
                type={"edit"}
            />
        )
    }

    renderRightContent() {
        return (
            <div>
                <div className="content-right-card-title">
                    <p>ここはMVPに必要ない</p>
                </div>
            </div>
        )
    }

    renderImgContent() {
        return(
            <img src={absurd} className="just-for-fun2"/>
        )
    }

    render(){
        return(
            <LeftAndRight 
                img={this.renderImgContent()}
                top={this.renderTopContent()} 
                left={this.renderLeftContent()} 
                right={this.renderRightContent()}
            />
        )
    }
}

export default DraftNavigation