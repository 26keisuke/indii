import React, { Component } from "react"
import styled, { keyframes } from "styled-components"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { MdCheck } from "react-icons/md"

import * as actions from "../../../actions"

import Screen from "../../Util/Screen"
import TextArea from "../TextArea/TextArea"
import Tool from "../Tool/Tool"

import { renderType } from "../../Util/util"

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
        }
    }
`

const fadeIn = keyframes`
    0% {
        opacity: 0;
        bottom: -10px;
    } 10% {
        opacity: 1;
        bottom: 3px;
    } 90% {
        opacity: 1;
        bottom: 3px;
    } 100% {
        opacity: 0;
        bottom: 3px;
    }
`

const CheckBox = styled.div`
    animation-name: ${fadeIn};
    animation-duration: 5s;
    position: absolute;
    opacity: 0;
    font-size: 10px;
    right: -277px;
    display: flex;
    flex-direction: row;
    align-items: center;

    & > p {
        color: #767676;
    }
`

const Check = styled(MdCheck)`
    color: #ffffff;
    padding: 2px;
    background-color: #4CD964;
    border-radius: 100%;
    margin-right: 7px;
`

class Editor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            draft: {},
            updated: false,
        }
    }

    // retrieve draft and check for ownership
    componentDidMount() {
        this.fetchTargetDraft(true)
    }


    componentDidUpdate(prevProps) {
        if(this.props.draft.isUpdated) {
            this.props.fetchDraft(Math.random().toString(36).substring(2, 15))
            // this.props.draftRead()
        }

        if(prevProps.draft.nounce !== this.props.draft.nounce){
            this.fetchTargetDraft()
        }
    }

    fetchTargetDraft = (initial) => {
        const { draft, auth, history } = this.props

        for (var key in draft.onEdit) {
            if(draft.onEdit[key]._id === this.props.match.params.id) {
                if(initial){
                    if(draft.onEdit[key].user === auth.info._id) {
                        this.setState({
                            draft: draft.onEdit[key]
                        })
                        return;
                    }
                } else {
                    this.setState({
                        draft: draft.onEdit[key]
                    })
                    return;
                }
            }
        }
        
        history.push('/')
    }

    setUpdate = () => {
        this.setState({ updated: true })
        setTimeout(() => {
            this.setState({ updated: false })
        }, 5000)
    }

    renderTitle() {
        return (
            <div>
                <EditorNavi>
                    <p>ポスト ></p>
                    <p>{renderType(this.state.draft.type)} ></p>
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
                        { this.state.updated &&
                        <CheckBox>
                            <Check/>
                            <p>編集内容を保存しました。</p>
                        </CheckBox>
                        }
                    </div>
                </div>
                <TextArea draft={this.state.draft} setUpdate={this.setUpdate}/>
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

export default connect(mapStateToProps, actions)(withRouter(Editor))