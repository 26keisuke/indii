// 現時点では戻るボタンが使えない状況

import React, { Component } from "react"
import styled, { css } from "styled-components"
import { connect } from "react-redux"
// import equal from "deep-equal"
import update from "immutability-helper"
import { Transition } from 'react-transition-group';

import * as actions from "../../actions"

import Report from "../Feed/Action/Report"
import AddColumn from "../Util/AddColumn"
import Action from "../Draft/Action/Action"
import Preview from "../Draft/Action/Preview"
import Index from "../Draft/Action/Index"
import TextArea from "../Profile/Info/TextArea/TextArea"
import Thumb from "../Profile/Info/Thumb/Thumb"

import { IoMdClose } from "react-icons/io"

import { arrObjLookUp } from "../Util/util"

const defaultStyle = {
    transition: "all 100ms ease-in-out",
    top: "50%",
    opacity: 0,
}

const transitionStyle = {
    entering: { top: "60%", opacity: 0, pointerEvents: "none" },
    entered:  { top: "50%", opacity: 1 },
    exiting:  { top: "50%", opacity: 1 },
    exited:  { top: "60%", opacity: 0, pointerEvents: "none" },
}

class Confirm extends Component {

    constructor(props) {
        super(props)

        // こいつらは本来APP全体のstateだからreduxで管理すべき

        this.state = {
            // transparent: false,

            // Selectされたdraftを保存: [{_: true}, {_: false}]の形
            // draftId: [],

            //Index用のstate
            // index: {},
                                
            currentStep: 0, // 全体のステップ数を把握する。これらは、仮にdynamicにformをつなげる必要がある場合に役立つ。 
            counter: 0,
                                
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.update.confirmation.on === true && this.props.update.confirmation.on === false){
            this.setState({
                currentStep: 0,
                counter: 0,
            })
            setTimeout(() => this.props.resetConfirmation(), 200)
        }
    } 

    extractTrueValues = () => {
        var cleanedIds = []
        var newObj = this.props.update

        const { draftId, selected } = this.props.update.confirmation

        if(!draftId || draftId.length === 0){
            for (const [key, val] of Object.entries(selected)) {
                if(val === true){
                    cleanedIds.push(key)
                }
            }

            newObj = update(this.props.update, {confirmation: {draftId: {$set: cleanedIds}}})
        }

        return newObj;
    }

    // reduxは一回で全てまとめておくらないといけない。別々に送ったら、sequentialにprocessされるからthis.propsの値がstaleになる
    parseNext = () => {

        var data;
        var newObj;

        newObj = this.extractTrueValues();

        switch(this.props.update.confirmation.next) {
            case "DELETE_DRAFT":

                data = {
                    action: "DRAFT_DELETE_CHECK",
                    title: "確認",
                    message: "これらの下書きを削除してもよろしいですか？",
                    caution: "*一度削除された下書きを元に戻すことはできません。",
                    buttonMessage: "削除する",
                    next: "",
                }

                newObj = update(newObj, {confirmation: {$merge: data}})
                return this.props.updateConfirmation(newObj)

            case "UPLOAD_DRAFT":

                var next = "";
                var obj = arrObjLookUp(this.props.draft.onEdit, "_id", newObj.confirmation.draftId[this.state.currentStep])

                if(obj.type !== "New") {

                    const newIdx = { [obj._id]: { draftId: obj._id }}
                    const newIdxObj = update(newObj.confirmation.index, {$merge: newIdx})

                    if (this.state.counter <= (this.state.currentStep + 2)) {

                        data = {
                            action: "DRAFT_UPLOAD_CHECK",
                            title: "下書きをアップロード",
                            message: "これらの下書きをアップロードしてもよろしいですか？",
                            caution: "",
                            buttonMessage: "完了する",
                            next: "",
                            index: newIdxObj,
                        }

                        newObj = update(newObj, {confirmation: {$merge: data}})

                        this.props.updateConfirmation(newObj)

                    } else {
                        this.setState({ currentStep: this.state.currentStep + 2 })

                        data = {
                            action: "DRAFT_UPLOAD_SELECT",
                            title: "挿入位置の決定",
                            message: "",
                            caution: "",
                            buttonMessage: "次の画面へ",
                            next: next,
                            index: newIdxObj,
                        }

                        newObj = update(newObj, {confirmation: {$merge: data}})

                        this.props.updateConfirmation(newObj)
                    }
                    return
                }

                if (this.state.counter === (this.state.currentStep + 1)) { // 1を var counterに
                    next = "UPLOAD_DRAFT_1"
                } else {
                    next = "UPLOAD_DRAFT"
                }

                this.setState({ currentStep: this.state.currentStep + 1, })

                data = {
                    action: "DRAFT_UPLOAD_SELECT",
                    title: "挿入位置の決定",
                    message: "",
                    caution: "",
                    buttonMessage: "次の画面へ",
                    next: next,
                }

                newObj = update(newObj, {confirmation: {$merge: data}})

                return this.props.updateConfirmation(newObj)

            case "UPLOAD_DRAFT_1":

                data = {
                    action: "DRAFT_UPLOAD_CHECK",
                    title: "下書きをアップロード",
                    message: "これらの下書きをアップロードしてもよろしいですか？",
                    caution: "",
                    buttonMessage: "完了する",
                    next: "",
                }


                newObj = update(newObj, {confirmation: {$merge: data}})

                return this.props.updateConfirmation(newObj)

            default:
                return;
        }
    }

    setValue = (value, name) => {
        if(!name) {
            this.setState({ value: value })
        } else {
            this.setState({ 
                ...this.state,
                value: {
                    ...this.state.value,
                    [name]: value,
                }
            })
        }
    }

    setCounter = (number) => {
        this.setState({ counter: number })
    }

    setMessage = (name) => {
        this.setState({ message: name })
    }

    setIndex = (topicId, draftId, idx, title, forcedOn) => {
        if(this.state.index[draftId] !== undefined) { // toggle
            this.setState({
                ...this.state,
                index :{
                    ...this.state.index,
                    [draftId]: {
                        ...this.state.index[draftId],
                        draftId: draftId,
                        index: idx,
                        title: title,
                        topicId: topicId,
                        addColumn: forcedOn ? true : this.state.index[draftId].addColumn
                    }
                }
            })
        } else { // adding new draft 
            const newIdxObj =
                Object.assign({}, 
                    {   [draftId]: {
                            index: idx,
                            title: title, 
                            topicId: topicId, 
                            draftId: draftId,
                            addColumn: forcedOn,
                        }
                    }, this.state.index)
            this.setState({
                index: newIdxObj
            })
        }
    }

    // setColumn = (draftId, addColumn) => {
    //     if(this.state.index[draftId] !== undefined) {
    //         this.setState({
    //             ...this.state,
    //             index: {
    //                 ...this.state.index,
    //                 [draftId]: {
    //                     ...this.state.index[draftId],
    //                     addColumn: addColumn
    //                 }
    //             }
    //         })
    //     } else {
    //         const newIdxObj = Object.assign({}, {[draftId]: { addColumn: addColumn }}, this.state.index)
    //         this.setState({
    //             index: newIdxObj
    //         })
    //     }
    // }

    renderContent = (id, action) => {
        switch(action){
            case "SELF_INTRO":
                return (
                    <TextArea
                        value={this.state.value}
                        handleChange={(e) => this.setState({ value: e.target.value })}
                    />
                )
            case "SELF_IMAGE":
                return (
                    <Thumb
                        value={this.state.value}
                        handleChange={(img) => this.setState({ value: img })}
                    />
                )
            case "GIVE_FEEDBACK":
                return (
                    <Report
                        setValue={this.setValue}
                        value={this.state.value}
                    />
                )
            case "ADD_COLUMN":
                return (
                    <AddColumn
                        id={id}
                        action={action}
                        postAction={this.props.postAction}
                        setValue={this.setValue}
                        value={this.state.value}
                    />
                )
            case "DELETE_DRAFT":
                return (
                    <Action
                        type="delete"
                        setCounter={this.setCounter}
                    />
                )
            case "UPLOAD_DRAFT":
                return (
                    <Action
                        type="upload"
                        setCounter={this.setCounter}
                    />
                )
            case "DRAFT_DELETE_CHECK":
                return (
                    <Preview
                        action={action}
                    />
                    )
            case "DRAFT_UPLOAD_CHECK":
                return (
                    <Preview
                        action={action}
                        // index={this.state.index}
                    />
                )
            case "DRAFT_UPLOAD_SELECT":
                return (
                    <Index
                        // id={this.state.id[this.state.currentStep-1]}
                        counter={this.state.currentStep-1}
                        setMessage={this.setMessage}
                        setIndex={this.setIndex}
                        setColumn={this.setColumn}
                    />
                )
            default:
                return;
        }
    }

    render () {

        const { confirmation } = this.props.update
        const { id, action, title, caution, message, buttonMessage, next, value, transparent } = this.props.update.confirmation
        const { innerRef, postAction, update } = this.props


        //
        //  postActionもtrueかfalseだけかにして、valueは全部reduxでとってくればいい
        //

        return (
            //本来はonExitedでresetConfirmationをしたいところだが、なぜかexitingの時に呼ばれてしまう
            <Fade in={update ? confirmation.on : false} onExited={this.props.resetConfirmation}> 
                <div ref={innerRef}>
                    <ConfirmIcon onClick={() => postAction(action)}/>
                    <p>{title}</p>
                    <p>{message}</p>
                    <p>{caution}</p>
                    {this.renderContent(id, action)}
                    <ConfirmButton transparent={transparent}>
                        {!transparent
                        ?   next 
                            ?
                                <button onClick={() => this.parseNext()}>{buttonMessage}</button>
                            :
                                <button onClick={() => postAction(action, id, value)}>{buttonMessage}</button>
                        :
                        <button>{buttonMessage}</button>
                        }
                        <button onClick={() => postAction(action)}>キャンセル</button>
                    </ConfirmButton>
                </div>
            </Fade>
            
        )
    }
}

const Fade = ({in: inProps, children, onExited, ...otherProps}) => {
    return (
        <Transition in={inProps} timeout={100} { ...otherProps }>
            {(state) => (
                <ConfirmBox 
                    style={{
                        ...defaultStyle,
                        ...transitionStyle[state]
                    }}
                >
                    { children }
                </ConfirmBox>
            )}
        </Transition>
    )
}

const ConfirmButton = styled.div`
    align-self: flex-end;

    & > :nth-child(1){
        font-family: ${props => props.theme.font};
        background-color: #636480;
        color: white;
        border: none;
        height:30px;
        padding: 0px 20px;
        border-radius: 3px;
        margin-right: 20px;
        cursor: pointer;

        ${props => props.transparent && css`
            opacity: 0.2;
        `}

        &:focus {
            outline: none;
        }
    }

    & > :nth-child(2){
        font-family: ${props => props.theme.font};
        border: 0.5px solid #838383;
        height:30px;
        width: 80px;
        border-radius: 3px;
        cursor: pointer;

        &:focus {
            outline: none;
        }
    }

`

const ConfirmBox = styled.div`
    position: absolute;
    width: 500px;
    padding: 20px 30px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
    background-color: #ffffff;
    border-radius: 3px;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;

    & > div {
        position: relative;
        display: flex;
        flex-direction: column;

        & > p:nth-child(2){
            font-size: 15px;
            margin-bottom: 15px;
            font-weight: bold;
        }

        & > p:nth-child(3){
            margin-bottom: 15px;
        }

        & > p:nth-child(4){
            margin-top: -10px;
            margin-bottom: 5px;
            font-size: 10px;
            color: #838383
        }
    }
`

const ConfirmIcon = styled(IoMdClose)`
    position: absolute;
    right: -13px;
    top: -13px;
    transform: scale(1.2);
    padding: 13px;
    cursor: pointer;
`

function mapStateToProps({update, auth, draft}) {
    return {
        update,
        auth,
        draft,
    }
}

export default connect(mapStateToProps, actions)(Confirm)