import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import Screen from "../../Util/Screen"
import TextArea from "../TextArea/TextArea"
import Tool from "../Tool/Tool"

import "./Editor.css"

const EditorNavi = styled.div`
    display: flex;
    flex-direction: row;
    & > p {
        font-size: 10px;
        color: #767676;
        margin-right: 10px;
        margin-bottom: 5px;
    }
`

const EditorTop = styled.div`
    height: 100%;
    & > div:nth-child(1) {
        position: absolute;
        height:30px;
        top:33px;
        padding-bottom: 5px;
        width: 100%;
        left: -1px;
        background-color: #ffffff;
        border-bottom: 1px solid #d2d2d2;
        display: flex;
        justify-content: center;

        & > div {
            position: relative;
            z-index: 1;

            & p:nth-child(1) {
                font-size: 19px;
                color: #1C1C1C;
                font-weight: bold;
            }

            & p:nth-child(2) {
                position: absolute;
                font-size: 10px;
                color: #767676;
                right: -295px;
                bottom: 5px;
            }
        }
    }
`

class Editor extends Component {

    constructor(props) {
        super(props)
        const url = this.props.location.pathname
        const id = url.substring(url.lastIndexOf('/') + 1)
        this.state = {
            draft: {},
            draftId: id,
        }
    }

    // retrieve draft and check for ownership
    componentDidMount() {
        const { draft, auth, history } = this.props

        for (var key in draft.onEdit) {
            if(draft.onEdit[key]._id === this.state.draftId) {
                if(String(draft.onEdit[key].user) === String(auth.info.id)) {
                    this.setState({
                        draft: draft.onEdit[key]
                    })
                    return;
                }
            }
        }

        history.push('/')
    }

    renderType(type){
        switch(type){
            case "Edit":
                return "編集"
            case "New":
                return "新規作成"
        }
    }

    renderTitle() {
        return (
            <div>
                <EditorNavi>
                    <p>ポスト ></p>
                    <p>{this.renderType(this.state.draft.type)} ></p>
                    <p>{this.state.draft.topicName}</p>
                </EditorNavi>
            </div>
        )
    }

    renderLeft() {
        return (
            <EditorTop>
                <div>
                    <div>
                        <p>{this.state.draft.postName}</p>
                        <p>* 編集は自動的に保存されます。</p>
                    </div>
                </div>
                <TextArea draft={this.state.draft}/>
            </EditorTop>
        )
    }

    renderRight() {
        return (
            <div>
                <Tool
                    draft={this.state.draft}
                />
            </div>
        )
    }


    render() {
        return(
            <Screen withBack={true} space={false}>
                {this.renderTitle()}
                {this.renderLeft()}
                {this.renderRight()}
            </Screen>
        )
    }
}

function mapStateToProps(state) {
    return {
        draft: state.draft,
        auth: state.auth,
    }
}

export default connect(mapStateToProps, null)(withRouter(Editor))