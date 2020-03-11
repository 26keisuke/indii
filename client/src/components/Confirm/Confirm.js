// 現時点では戻るボタンが使えない状況

import React, { Component } from "react"
import styled, { css } from "styled-components"
import { connect } from "react-redux"
// import equal from "deep-equal"
import update from "immutability-helper"
import { Transition } from 'react-transition-group';

import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';

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

        this.state = {                                
            currentStep: 0, // 全体のステップ数を把握する。これらは、仮にdynamicにformをつなげる必要がある場合に役立つ。 
            counter: 0,
            skipped: 0,
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.update.confirmation.on === true && this.props.update.confirmation.on === false){
            
            setTimeout(() => {
                this.props.resetConfirmation()
                this.setState({
                    currentStep: 0,
                    counter: 0,
                    skipped: 0,
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

                this.props.clearTopic()

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

    renderContent = (id, action) => {
        switch(action){
            case "SELF_INTRO":
                return (
                    <TextArea
                        value={this.props.update.confirmation.value}
                        handleChange={(e) => this.setState({ value: e.target.value })}
                    />
                )
            case "SELF_IMAGE":
                return (
                    <Thumb
                        value={this.props.update.confirmation.value}
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
                    />
                )
            case "DRAFT_UPLOAD_SELECT":
                return (
                    <Index
                        counter={this.state.currentStep-1}
                        setMessage={this.setMessage}
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

        //
        //  postActionもtrueかfalseだけかにして、valueは全部reduxでとってくればいい（後でやる優先順位的には後）
        //  reduxで全部管理するようになったからbackボタンも将来的に追加できる
        //

        return (
            //本来はonExitedでresetConfirmationをしたいところだが、なぜかexitingの時に呼ばれてしまう
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

                    {/* <ConfirmIcon onClick={() => postAction(action)}/> */}
                    <ConfirmIcon onClick={() => postAction(false)}/>
                    <Title>{title}</Title>
                    <Message>{message}</Message>
                    <Caution>{caution}</Caution>
                    {this.renderContent(id, action)}
                    <ConfirmButton transparent={transparent}>
                        {!transparent
                        ?   next 
                            ?
                                <button onClick={() => this.parseNext()}>{buttonMessage}</button>
                            :
                                // <button onClick={() => postAction(action, id, value)}>{buttonMessage}</button>
                                <button onClick={() => postAction(true)}>{buttonMessage}</button>
                        :
                        <button>{buttonMessage}</button>
                        }
                        {/* <button onClick={() => postAction(action)}>キャンセル</button> */}
                        <button onClick={() => postAction(false)}>キャンセル</button>
                    </ConfirmButton>
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
        default:
            return []
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

const StepperWrapper = styled.div`
    & .MuiStepper-root{
        padding: 15px 24px !important;
    }
`

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
    }
`

const Title = styled.h2`
    font-size: 15px;
    margin-bottom: 15px;
    font-weight: bold;
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
        auth,
        draft,
    }
}

export default connect(mapStateToProps, actions)(Confirm)