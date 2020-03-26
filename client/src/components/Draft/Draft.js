import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Helmet } from "react-helmet"

import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import * as actions from "../../actions"

import Screen from "../Util/Screen"
import Scroll from "../Util/Scroll"
import Draft from "./Element/Element"
import { Border } from "../Theme"

const DraftTop = styled.div`
    position: relative;

    & > p {
        font-size: 16px;
        color: #434343;
    }
`

const DraftUpload = styled.div`
    position: absolute;
    font-size: 10px;
    top:-3px;
    right: -500px;
    display: flex;

    & > button {
        transform: scale(0.9);
        margin-right: 5px;
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
                <DraftUpload>
                    <Button onClick={this.deleteDraft}　variant="outlined" color="primary" endIcon={<DeleteForeverIcon/>}>削除</Button>
                    <Button onClick={this.uploadDraft}　variant="outlined" color="primary" endIcon={<PublishIcon/>}>アップロード</Button>
                </DraftUpload>
            </DraftTop>
        )
    }

    renderLeftContent = () => {

        const counter = this.props.draft.onEdit.filter(elem => (!elem.isDeleted && !elem.isUploaded)).length
 
        return (
            <div>
                <Scroll/>

                <Helmet>
                    <title>下書き一覧 | Indii</title>
                    <meta name="description" content="下書き一覧"/>
                    <meta name="keywords" content="下書き,新規作成,編集,ポスト"/>
                </Helmet>

                
                { ((this.props.draft.nounce === this.state.id) || (counter > 0)) 
                ? "" 
                : 
                <div>
                    <Draft draft={""}/>
                    <Draft draft={""}/>
                    <Draft draft={""}/>
                </div>
                }
                {
                    this.props.draft.onEdit
                        .map((elem,index) => {
                            if(index === 0){
                                return ([
                                    <Border key={"borderTopDraft"} bottom={true}/>,
                                    <Draft
                                        key={elem._id}
                                        draft={elem}
                                    />
                                ])
                            }
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

    renderRightContent() {  return (<div></div>)    }

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