// 現時点では戻るボタンが使えない状況

import React, { Component } from "react"
import styled, { css } from "styled-components"
import { connect } from "react-redux"
import update from "immutability-helper"
import { Transition } from 'react-transition-group';

import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';

import * as actions from "../../actions"

import ConfirmTextArea from "./TextArea/TextArea"
import TalkPreview from "../Talk/Confirm/Preview"
import Report from "../Feed/Action/Report"
import AddColumn from "../Util/AddColumn"
import Action from "../Draft/Action/Action"
import Preview from "../Draft/Action/Preview/Preview"
import Index from "../Draft/Action/Index/Index"
import TextArea from "../Profile/Info/TextArea/TextArea"
import Thumb from "../Profile/Info/Thumb/Thumb"
import DraftKatex from "../Util/TextArea/Confirm/Katex"
import DraftImage from "../Util/TextArea/Confirm/Image"
import Breakpoint from "../Breakpoint"

import { IoMdClose } from "react-icons/io"

import { arrObjLookUp } from "../Util/util"

const defaultStyle = {
    transition: "all 100ms ease-in-out",
    top: "50%",
    opacity: 0,
}

const defaultMobileStyle = {
    transition: "all 100ms ease-in-out",
    top: "50%",
    opacity: 0,
    width: "80%",
}

const transitionStyle = {
    entering: { top: "60%", opacity: 0, pointerEvents: "none" },
    entered:  { top: "50%", opacity: 1 },
    exiting:  { top: "50%", opacity: 1 },
    exited:  { top: "60%", opacity: 0, pointerEvents: "none" },
}

export class Confirm extends Component {

    constructor(props) {
        super(props)

        this.state = {                                
            currentStep: 0, // 全体のステップ数を把握する。これらは、仮にdynamicにformをつなげる必要がある場合に役立つ。 
            counter: 0,
            skipped: 0,

            value: "", // text field用のvalue
        }
    }

    componentDidUpdate(prevProps) {
        // 初期化
        if(prevProps.update.confirmation.on === true && this.props.update.confirmation.on === false){
            setTimeout(() => {
                this.props.resetConfirmation()
                this.setState({
                    currentStep: 0,
                    counter: 0,
                    skipped: 0,
                    value: "",
                })
            }, 200)
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

        const nextAction = this.props.update.confirmation.next
        var newObj;

        if((nextAction === "DELETE_DRAFT") || (nextAction === "UPLOAD_DRAFT") || (nextAction === "UPLOAD_DRAFT_1")){
            var data;
            newObj = this.extractTrueValues();;
        }

        switch(nextAction) {
            case "ADD_TALK_REF":

                data = {
                    action: "ADD_TALK_REF",
                    message: "関連するポストやトピックのURLを入力してください (任意)",
                    buttonMessage: "次へ",
                    next: "ADD_TALK_DESC",
                    talkTitle: this.state.value,
                }

                this.setState({
                    currentStep: 1,
                    counter: 3,
                    value: "",
                })

                newObj = update(this.props.update, {confirmation: {$merge: data}})
                return this.props.updateConfirmation(newObj)

            case "ADD_TALK_DESC":

                data = {
                    action: "ADD_TALK_DESC",
                    message: "トークの目的及び概要を入力してください。",
                    buttonMessage: "次へ",
                    next: "ADD_TALK_CONFIRM",
                    talkUrl: this.state.value,
                }

                this.setState({
                    currentStep: this.state.currentStep + 1,
                    value: "",
                })

                newObj = update(this.props.update, {confirmation: {$merge: data}})
                return this.props.updateConfirmation(newObj)

            
            case "ADD_TALK_CONFIRM":

                var type, id;
                const url = this.props.update.confirmation.talkUrl

                if(url){
                    id = url.substring(url.lastIndexOf("/") + 1)

                    const subUrl = url.substring(0, url.lastIndexOf("/"))
                    type = subUrl.substring(subUrl.lastIndexOf("/") + 1)

                    if(type === "post"){
                        this.props.fetchPost(id, "DABLET");
                    } else if(type === "topic"){
                        this.props.fetchTopic(id, "IMAGE")
                    }
                }

                this.setState({
                    currentStep: this.state.currentStep + 1,
                    value: "",
                })

                data = {
                    action: "ADD_TALK_CONFIRM",
                    message: "この内容でトークを作成しますか？",
                    caution: "",
                    buttonMessage: "作成する",
                    next: "",
                    type: type,
                    talkId: id,
                    talkDesc: this.state.value,
                }

                newObj = update(this.props.update, {confirmation: {$merge: data}})
                return this.props.updateConfirmation(newObj)
                
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

                this.props.fetchTopic() // RESET
                this.props.fetchOneDraft() // RESET

                var next = "";
                var obj = arrObjLookUp(this.props.draft.onEdit, "_id", newObj.confirmation.draftId[this.state.currentStep])

                if(obj.type !== "New") {

                    const newIdx = { [obj._id]: { draftId: obj._id }}
                    const newIdxObj = update(newObj.confirmation.index, {$merge: newIdx})

                    if (this.state.counter <= (this.state.currentStep + 2)) {
                        this.setState({ currentStep: this.state.counter+1, counter: this.state.counter+1, skipped: this.state.skipped + 1 })

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
                        this.setState({ currentStep: this.state.currentStep + 2, skipped: this.state.skipped + 1  })

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

                this.setState({ currentStep: this.state.currentStep + 1 })

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

    // value, name => array of values
    setValue = (value, name) => {

        // if array (must have corresponding names)
        if(Array.isArray(value)){
            var obj = {};

            for(var i=0; i < value.length; i++){
                obj[name[i]] = value[i]
            }

            const newObj = update(this.state.value, {$set: obj})

            this.setState({
                value: newObj,
            })

            return
        }

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

    // これ後でtransparentするやつ全員にpropsとして付け足す
    setTransparent = (set) => {
        const newObj = update(this.props.update, {confirmation: {transparent: {$set: set}}})
        this.props.updateConfirmation(newObj)
    }

    renderContent = (action) => {
        switch(action){
            case "SELF_EDIT":
                return (
                    <TextArea
                        value={this.props.update.confirmation.value}
                        changedValue={this.state.value}
                        setValue={this.setValue}
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
                    <Report/>
                )
            case "ADD_COLUMN":
                return (
                    <AddColumn
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
                        setTransparent={this.setTransparent}
                    />
                )
            case "UPLOAD_DRAFT":
                return (
                    <Action
                        type="upload"
                        setCounter={this.setCounter}
                        setTransparent={this.setTransparent}
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
                    />
                )
            case "DRAFT_UPLOAD_SELECT":
                return (
                    <Index
                        counter={this.state.currentStep-1}
                        setTransparent={this.setTransparent}
                    />
                )
            case "ADD_TALK_DESC":
            case "ADD_TALK_REF":
            case "ADD_TALK":
                return (
                    <ConfirmTextArea
                        title={action === "ADD_TALK" ? "タイトル" : action === "ADD_TALK_DESC" ? "概要" : "参照を追加"}
                        value={this.state.value}
                        textarea={action === "ADD_TALK_DESC"}
                        handleChange={(e) => this.setState({value: e.target.value})}
                    />
                )
            case "ADD_TALK_CONFIRM":
                return (
                    <TalkPreview/>
                )
            case "DRAFT_ADD_KATEX":
                return (
                    <DraftKatex
                        value={this.state.value}
                        setValue={this.setValue}
                        setTransparent={this.setTransparent}
                    />
                )
            case "DRAFT_ADD_URL":
                return (
                    <DraftImage
                        value={this.state.value}
                        handleChange={this.setValue}
                        setTransparent={this.setTransparent}
                    />
                )
            case "TALK_EDIT":
                return (
                    <ConfirmTextArea
                        title={"トークの説明"}
                        init={() => this.setState({value: this.props.update.confirmation.value})}
                        value={this.state.value}
                        textarea={true}
                        handleChange={(e) => this.setState({value: e.target.value})}
                    />
                )
            default: 
                return;
        }
    }

    render () {

        const { confirmation } = this.props.update
        const { id, action, title, caution, message, buttonMessage, next, transparent } = this.props.update.confirmation
        const { innerRef, postAction, update } = this.props
        
        const steps = getContent(action, this.state.counter, this.state.currentStep, this.state.skipped)

        //  reduxで全部管理するようになったからbackボタンも将来的に追加できる

        return (
            <Fade in={update ? confirmation.on : false} onExited={this.props.resetConfirmation}> 
                <div ref={innerRef}>

                    { steps.length > 0 &&
                    <StepperWrapper>
                        <Stepper nonLinear activeStep={this.state.currentStep} completed={this.state.counter === this.state.currentStep}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </StepperWrapper>
                    }

                    <ConfirmIcon onClick={() => postAction(false)}/>
                    <Title>{title}</Title>
                    <Message>{message}</Message>
                    <Caution>{caution}</Caution>
                    {this.renderContent(action)}
                    { buttonMessage &&
                    <ConfirmButton transparent={transparent}>
                        {!transparent
                        ?   next 
                            ?
                                <button onClick={() => this.parseNext()}>{buttonMessage}</button>
                            : this.state.value 
                            ?
                                <button onClick={() => postAction(true, "", this.state.value)}>{buttonMessage}</button>
                            :
                                <button onClick={() => postAction(true)}>{buttonMessage}</button>
                        :
                        <button>{buttonMessage}</button>
                        }
                        <button onClick={() => postAction(false)}>キャンセル</button>
                    </ConfirmButton>
                    }
                </div>
            </Fade>
            
        )
    }
}

const getContent = (action, step, currentStep, skipped) => {
    switch(action){
        case "UPLOAD_DRAFT":
        case "DRAFT_UPLOAD_CHECK":
        case "DRAFT_UPLOAD_SELECT":
            const showStep = (currentStep > step) ? `${(step - skipped) + "/" + (step - skipped) }` : `${(currentStep - skipped) + "/" + (step - skipped)}`
            return ["下書きを選択", `挿入位置の選択　${showStep}`, "プレビュー"]
        case "DELETE_DRAFT":
        case"DRAFT_DELETE_CHECK":
            return ["下書きを選択", "プレビュー"]
        case "ADD_TALK":
        case "ADD_TALK_REF":
        case "ADD_TALK_DESC":
        case "ADD_TALK_CONFIRM":
            return ["タイトルを入力","参照を追加","トークの概要","プレビュー"]
        default:
            return []
    }
}

const Fade = ({in: inProps, children, onExited, ...otherProps}) => {
    return (
        <Transition in={inProps} timeout={100} { ...otherProps }>
            {(state) => ([
                <Breakpoint key="dablet" name="dablet">
                    <ConfirmBox 
                        style={{
                            ...defaultStyle,
                            ...transitionStyle[state]
                        }}
                    >
                        { children }
                    </ConfirmBox>
                </Breakpoint>,

                <Breakpoint key="mobile" name="mobile">
                    <ConfirmBox 
                        style={{
                            ...defaultMobileStyle,
                            ...transitionStyle[state]
                        }}
                    >
                        { children }
                    </ConfirmBox>
                </Breakpoint>
                
            ])}
        </Transition>
    )
}

const StepperWrapper = styled.div`
    & .MuiStepper-root{
        padding: 15px 24px !important;
    }
`

const ConfirmButton = styled.div`
    align-self: flex-end;

    & > :nth-child(1){
        background-color: ${props => props.theme.primary};
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
        background-color: white;
        border-radius: 3px;
        cursor: pointer;

        &:focus {
            outline: none;
        }
    }

`

const ConfirmBox = styled.div`
    position: fixed;
    width: 500px;
    padding: 20px 30px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
    background-color: #ffffff;
    border-radius: 3px;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 13;
    max-height: 90%;
    overflow: scroll;

    & > div {
        position: relative;
        display: flex;
        flex-direction: column;
    }
`

const Title = styled.h2`
    font-size: 15px;
    margin-bottom: 15px;
`

const Message = styled.h4`
    margin-bottom: 15px;
`

const Caution = styled.p`
    margin-top: -10px;
    margin-bottom: 5px;
    font-size: 10px;
    color: #838383
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
        /* auth, */
        draft,
    }
}

export default connect(mapStateToProps, actions)(Confirm)