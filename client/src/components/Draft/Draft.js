import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import Screen from "../Util/Screen"

import * as actions from "../../actions"

import upload from "../../images/upload.png"
import { MdDelete } from "react-icons/md"

import Draft from "./Element/Element"
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

    constructor(props){
        super(props)
        this.state = {
            id: Math.random().toString(36).substring(2, 15)
        }
    }

    componentDidMount() {
        // Every fetch needs unique id. => reduxで{fetched: true}とかにするとfalseにしなくちゃいけないから面倒
        this.props.fetchDraft(this.state.id)
    }

    componentDidUpdate() {
        if(this.props.draft.isUpdated) {
            this.props.fetchDraft(this.state.id)
            this.props.draftRead()
        }
    }

    deleteDraft = () => {
        const id = "";
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
        const id = "";
        const action = "UPLOAD_DRAFT";
        const title = "下書きをアップロードする";
        const message = "アップロードする下書きを選択してください";
        const caution = "* 同じトピックに属する下書きは同時にアップロードできません";
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
                    <img src={upload} alt={"アップロード画面へと移行するボタン"}/>
                </DraftUpload>
            </DraftTop>
        )
    }

    renderLeftContent = () => {

        const counter = this.props.draft.onEdit.filter(elem => (!elem.isDeleted && !elem.isUploaded)).length
 
        return (
            <div>
                { counter > 0 ? <Border bottom={true}/> : "" }
                { ((this.props.draft.nounce === this.state.id) || (counter > 0)) ? "" : <Draft draft={""}/>}
                {
                    this.props.draft.onEdit
                        .filter(elem => ((!elem.isDeleted) && (!elem.isUploaded)))
                        .map(elem => {
                            return (
                                <Draft
                                    key={elem._id}
                                    draft={elem}
                                />
                            )
                        })
                }
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

function mapStateToProps(state) {
    return {
        draft: state.draft
    }
}

export default connect(mapStateToProps, actions)(DraftNavigation)