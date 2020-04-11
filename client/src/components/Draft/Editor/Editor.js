import React, { useState, useEffect, useMemo, useCallback } from "react"
import styled, { keyframes } from "styled-components"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

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
`

const EditorTop = styled.div`
    height: 100%;
    box-shadow: 1px 1px 10px #d2d2d2;
    padding: 20px 0px;
    margin-top: 13px;
    margin-bottom: 100px;
    position: relative;

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

        & > p {
            position: relative;
            z-index: 1;
            font-size: 19px;
            color: #1C1C1C;
            font-weight: bold;
        }
    }
`

const fade = keyframes`
    0%, 100% { opacity: 0; margin-top: 10px; }
    20%, 90% { opacity: 1; margin-top: 0px; }
`

const UpdateIcon = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    top: 55px;
    right: 20px;
    opacity: 0;
    animation-name: ${fade};
    animation-duration: 2500ms;
    margin-top: 0px;

    & svg {
        color: ${props => props.theme.green};
    }

    & > span {
        margin-left: 5px;
        color: #333333;
        font-size: 11px;
    }
`

const Editor = ({ selected, onEdit, nounce, isUpdated, userId, updatedCt, setUpdatedCt, updateContentArr, ...props }) => {

    const [showUpdate, setShowUpdate] = useState(false)

    // retrieve draft and check for ownership
    useEffect(() => {
        fetchTargetDraft(true)
        return () => {
            clearTimeout(timeId)
        }
    }, [])

    useEffect(() => {
        if(isUpdated) {
            // これdraft全部を取得しているから時間かかるし無駄
            props.fetchDraft(Math.random().toString(36).substring(2, 15))
        }
        
    }, [isUpdated])

    // ↑が呼ばれた後に↓が呼ばれる

    useEffect(() => {
        if(nounce){ fetchTargetDraft() }
    }, [nounce])

    const fetchTargetDraft = (initial) => {
        for (var key in onEdit) {
            if(onEdit[key]._id === props.match.params.id) {
                if(initial){
                    if(onEdit[key].user === userId) {
                        props.selectDraft(onEdit[key])
                        return;
                    }
                } else {
                    props.selectDraft(onEdit[key])
                    return;
                }
            }
        }
        props.history.push('/')
    }

    const back = useMemo(() => {
        return (
            <BackWrapper>
                <Back
                    back={props.history.goBack}
                    name="下書き一覧へ戻る"
                />
            </BackWrapper>
        )
    }, [props.history.goBack])

    const hopper = useMemo(() => {
        return (
            <div>
                <EditorNavi>
                    <Breadcrumbs>
                        <p>ポスト</p>
                        <p>{selected.type}</p>
                        <Link to={`/topic/${selected.topic}`}>{selected.topicName}</Link>
                    </Breadcrumbs>
                </EditorNavi>
            </div>
        )
    }, [selected.type, selected.topic, selected.topicName])

    const title = useMemo(() => {
        return (
            <div>
                <p>{selected.postName}</p>
            </div>
        )
    }, [selected.postName])

    var timeId;

    useEffect(() => {
        if(updatedCt){
            setShowUpdate(true)
            timeId = setTimeout(() => {
                setShowUpdate(false)
            }, 3000)
        }
    }, [updatedCt])

    const update = useMemo(() => {
        if(showUpdate){
            return (
                <UpdateIcon>
                    <CheckCircleOutlineIcon/>
                    <span>内容を保存しました。</span>
                </UpdateIcon>
            )
        }
        return null
    }, [showUpdate])

    const renderLeft = () => (
        <EditorTop>
            { back }
            { hopper }    
            { title }
            <TextArea updateContentArr={updateContentArr}/>
            { update }
        </EditorTop>
    )

    const renderRight = () => (
        <div>
            <Tool/>
        </div>
    )

    return(
        <div>
            <Helmet>
                <title>{'"' + selected.postName + "\"の編集"} | Indii</title>
                <meta name="description" content={`"${selected.postName}"の${renderType(selected.type)}をします。`}/>
                <meta name="keywords" content={`${selected.postName},${renderType(selected.type)},ポスト,下書き`}/>
            </Helmet>
            <Screen withBack={true} space={false} post={true} noHeader={true} noHeaderSpace={true} noBorder={true}>
                {renderLeft()}
                {renderRight()}
            </Screen>
        </div>
    )
}

function mapStateToProps({ auth, draft }) {
    return {
        isUpdated: draft.isUpdated,
        selected: draft.selected,
        onEdit: draft.onEdit,
        nounce: draft.nounce,
        userId: auth.info._id,
    }
}

export default connect(mapStateToProps, actions)(withRouter(Editor))