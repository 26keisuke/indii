import React, { Component } from "react"
import { Link } from "react-router-dom"

import LeftAndRightBack from "../LeftAndRightBack"
import DraftArea from "./DraftArea"

import absurd from "../../images/absurd/04.png"

import "./DraftEdit.css"
import Draft from "./Draft"

class DraftEdit extends Component {

    constructor(props) {
        super(props)
        const url = this.props.location.pathname
        const id = url.substring(url.lastIndexOf('/') + 1)
        this.state = {
            id
        }
    }

    renderType(type){
        switch(type){
            case "edit":
                return "編集"
            case "new":
                return "新規作成"
        }
    }

    renderTitle() {
        return (
            <div>
                <div className="draft-edit-navi">
                    <p>ポスト ></p>
                    <p>新規作成 ></p>
                    <p>Recurrent Neural Network</p>
                </div>
            </div>
        )
    }

    renderLeft() {
        return (
            <div className="draft-edit">
                <div className="draft-edit-header">
                    <div className="draft-edit-wrapper">
                        <p className="draft-edit-title">Transformer Netowork</p>
                        <p className="draft-edit-note">* 編集は自動的に保存されます。</p>
                    </div>
                </div>
                <DraftArea id={this.state.id}/>
            </div>
        )
    }

    renderRight() {
        return (
          <div>
            <div className="content-right-card-title">
              クイックアクセス
            </div>
            <Link to={"/draft/edit/" + "123123"} className="draft-right-wrapper">
                <Draft
                    id={"111"}
                    topic={"Recurrent Neural Network"}
                    title={"Transformer Network"}
                    content={"本紙は RNN や CNN を使わず Attention のみ使用したニューラル機械翻訳 Transformer を提案している．"}
                    date={"August 21, 2013 5:36 AM"}
                    type={"edit"}
                />
            </Link>
          </div>
            
        )
    }


    render() {
        return(
            <LeftAndRightBack
                url="/draft"
                backName="下書き一覧"
                title={this.renderTitle()}
                left={this.renderLeft()}
                right={this.renderRight()}
            />
        )
    }
}



export default DraftEdit