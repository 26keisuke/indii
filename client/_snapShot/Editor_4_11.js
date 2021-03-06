import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import * as actions from "../../../actions"

import Screen from "../../Util/Screen"
import TextArea from "../../Util/TextArea/TextArea"
import Tool from "./Tool/Tool"
import Back from "../../Util/Back"

import { renderType } from "../../Util/util"

const BackWrapper = styled.div`
    top: 9px;
    position: absolute;
`

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
    box-shadow: 1px 1px 10px #d2d2d2;
    padding: 20px 0px;
    margin-top: 13px;
    margin-bottom: 100px;

    & > div:nth-child(1) {

    }

    & > div:nth-child(2) {
        display: flex;
        justify-content: center;
    }

    & > div:nth-child(3) {
        margin: 10px 0px;
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

const Hopper = ( props ) => {
    return (
        <div>
            <Breadcrumbs>
                <p>ポスト</p>
                <p>{props.type}</p>
                <Link to={props.link}>{props.name}</Link>
            </Breadcrumbs>
        </div>
    )
}

class Editor extends Component {

    // retrieve draft and check for ownership
    componentDidMount() {
        this.fetchTargetDraft(true)
    }

    componentDidUpdate(prevProps) {
        if(this.props.draft.isUpdated) {
            // これdraft全部を取得しているから時間かかるし無駄
            this.props.fetchDraft(Math.random().toString(36).substring(2, 15))
        }
        // ↑が呼ばれた後に↓が呼ばれる
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
                        this.props.selectDraft(draft.onEdit[key])
                        return;
                    }
                } else {
                    this.props.selectDraft(draft.onEdit[key])
                    return;
                }
            }
        }
        
        history.push('/')
    }

    renderLeft() {

        const { selected } = this.props.draft

        return (
           
            <EditorTop>
                <BackWrapper>
                    <Back
                        back={this.props.history.goBack}
                        name="下書き一覧へ戻る"
                    />
                </BackWrapper>
                <div>
                    <EditorNavi>
                        <Hopper type={renderType(selected.type)} name={selected.topicName} link={`/topic/${selected.topic}`}/>
                    </EditorNavi>
                </div>
                <div>
                    <div>
                        <p>{selected.postName}</p>
                    </div>
                </div>
                <TextArea updateContentArr={this.props.updateContentArr}/>
            </EditorTop>
        )
    }

    renderRight() {
        return (
            <div>
                <Tool/>
            </div>
        )
    }

    render() {

        const { selected } = this.props.draft

        return(
            <div>
                <Helmet>
                    <title>{'"' + selected.postName + "\"の編集"} | Indii</title>
                    <meta name="description" content={`"${selected.postName}"の${renderType(selected.type)}をします。`}/>
                    <meta name="keywords" content={`${selected.postName},${renderType(selected.type)},ポスト,下書き`}/>
                </Helmet>
                <Screen withBack={true} space={false} post={true} noHeader={true} noHeaderSpace={true} noBorder={true}>
                    {this.renderLeft()}
                    {this.renderRight()}
                </Screen>
            </div>
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