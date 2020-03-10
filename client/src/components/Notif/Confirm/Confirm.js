import React, { Component } from "react"
import styled, { css } from "styled-components"
import { MdFeedback } from "react-icons/md"
import { FiMinus } from "react-icons/fi"
import { connect } from "react-redux"
import { withRouter } from "react-router";
import { IoIosDocument } from "react-icons/io"
import { Helmet } from "react-helmet"

import * as actions from "../../../actions"

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField"

import close from "../../../images/close-red.png"
import tick from "../../../images/tick.png"
import account from "../../../images/account.png"

import { Space } from "../../Theme"
import ToggleText from "../../Util/ToggleText"
import Back from "../../Util/Back"
import Feedback from "../Feedback/Feedback"
import Recommend from "../../Util/Recommend"
import Textarea from "../../Post/Textarea/Textarea"
import SkeletonBox from "../../Post/Skeleton/SkeletonBox"
import People from "../../People/People"
import Ribbon from "../../Util/Ribbon"
import List from "../../Draft/Tool/List/List"

import { fmtDate } from "../../Util/util"

const getSteps = () => {
    return ["フィードバックを選択", "編集者へのコメント", "編集リクエストを承認"]
}

class Setting extends Component {

    constructor(props){
        super(props)
        this.state = {
            textareaValue: "",
            feedback: {},
            feedbackPressed: false,

            isOpened: false,

            id: Math.random().toString(36).substring(2, 15),
            notifId: "",

            currentStep: 0,

            before: null,
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.fetchConfirm(id, this.state.id) // notifId (DraftIdではない)

        const indexOfId = findArrObjIndex(this.props.auth.info.notif, "_id", id)
        this.setState({ notifId: indexOfId })
    }

    getContent(step) {
        switch(step){
            case 0:
                return (
                    <FeedbackWrapper>
                        <Feedback
                            feedback={this.state.feedback}
                            handleClick={this.handleFeedbackClick}
                        />
                    </FeedbackWrapper>
                )
            case 1:
                return (
                    <TextFieldWrapper>
                        <TextField
                            id="outlined-multiline-static"
                            label="コメント"
                            multiline
                            rows="5"
                            value={this.state.textareaValue}
                            onChange={(e) => this.handleChange(e)}
                            variant="outlined"
                            placeholder="ここにコメントを入力"
                        />
                    </TextFieldWrapper>
                )
            case 2:
                return (
                    <SubmitBtn>
                        <Btn 
                            color="green"
                            onClick={() => this.handleSubmit(true)}
                        >
                            <Yes 
                                src={tick}
                            />
                        </Btn>
                        <Btn 
                            color="red"
                            onClick={() => this.handleSubmit(false)}
                        >
                            <No
                                src={close}
                            />
                        </Btn>
                    </SubmitBtn>
                )
            default:
                return "Illegal Step"
        }
    }

    disableBtn = () => {
        switch(this.state.currentStep){
            case 0:
                return !this.state.feedbackPressed
            case 1:
                return !this.state.textareaValue
        }
    }

    handleFeedbackClick = (id) => {
        const prevState = this.state.feedback[id]
        this.setState({
            feedback: {
                [id]: !prevState
            },
            feedbackPressed: prevState ? false : true,
        })
    }

    handleNext = () => {
        this.setState({ currentStep: this.state.currentStep + 1 })
    };
    
    handleBack = () => {
        this.setState({ currentStep: this.state.currentStep - 1 })
    };

    handleBlur = () => {
        this.setState({
            textareaFocus: false
        })
    }

    handleChange = (e) => {
        this.setState({
            textareaValue: e.target.value
        })
    }

    handleToggle = () => {
        this.setState({
            before: !this.state.before
        })
    }

    handleFocus = () => {
        this.setState({
            textareaFocus: true
        })
    }

    handleSubmit = (accept) => {

        const text = accept ? "承認" : "拒否"
        const draftId = this.props.auth.info.notif[this.state.notifId].draft._id

        const id = "1";
        const action = "CONFIRM_DRAFT";
        const title = `編集リクエストを${text}する`
        const message = `編集リクエストを${text}してよろしいですか？`;
        const caution = "";
        const buttonMessage = "送信する";
        const value = {draftId, feedback: Object.keys(this.state.feedback)[0], comment: this.state.textareaValue, accept}
        this.props.showConfirmation(id, action, title, caution, message, buttonMessage, "", value);
        this.props.enableGray();
    }


    render() {

        const { before } = this.state

        var notifId = this.props.auth.info.notif[this.state.notifId] || {}

        var user = notifId.user || {}
        var draft = notifId.draft || {}
        var post = notifId.post || {}
        // var topic = post.topic || {}

        var feedback = draft.comment || "仮のvalueを入力しています。後で消してください。"

        var { photo, userName, comment, intro } = user
        var { editLastEditedAuthor, isApproved } = draft
        // var { editLastEdited, editLastEditedAuthor, editUploadedDate } = draft
        // var { topicName, tags, topicContent, postCount, likes } = topic
        var { lastEdited } = post
        var afterReference = draft.ref
        var beforeReference = draft.editRef

        var topicSquareImg = post.topicSquareImg || {}

        var editLastEditedAuthor = draft.editLastEditedAuthor || {}

        // var tags = topic.tags || []

        var nowPostImg = post.postImg || {}
        var beforePostImg = draft.editPostImg || {}
        var afterPostImg = draft.postImg || {}

        var nowPostName = post.postName
        var beforePostName = draft.editPostName
        var afterPostName = draft.postName

        var nowContent = post.content
        var beforeContent = draft.editContent
        var afterContent = draft.content

        var userId = user._id
        var postId = post._id
        // var topicId = topic._id

        var creator = post.creator || {}

        const steps = getSteps();
        const disableNext = this.disableBtn()

        return(
            <Wrapper>
                <Helmet>
                    <title>{'"' + afterPostName + "\"への編集リクエスト" + " | Indii"}</title>
                    <meta name="description" content={`${afterPostName}への編集リクエストを確認します。ポストのオーナーはリクエストを承認か拒否することができます。`}/>
                    <meta name="keywords" content={`${afterPostName},編集リクエスト`}/>
                </Helmet>

                { isApproved === "WAIT" && (creator._id === this.props.auth.info._id) &&
                <div>
                    <StepperFakeWrapper isOpened={this.state.isOpened}>
                        <div onClick={() => this.setState({ isOpened: true })}>
                            <FeedbackIcon/>
                            <h3>フィードバックを返信</h3>
                            <MinusIcon/>
                        </div>
                    </StepperFakeWrapper>

                    <StepperWrapper 
                        isOpened={this.state.isOpened}
                    >
                        <div onClick={() => this.setState({ isOpened: false })}>
                            <FeedbackIcon/>
                            <h3>フィードバックを返信</h3>
                            <MinusIcon/>
                        </div>
                        <Stepper activeStep={this.state.currentStep} orientation="vertical">
                            {steps.map((label, index) => {
                                return(
                                    <Step key={label} completed={index < this.state.currentStep}>
                                        <StepLabel>
                                            {label}
                                        </StepLabel>
                                        <StepContent>
                                            {this.getContent(index)}
                                        </StepContent>
                                    </Step>
                                )   
                            })
                            }
                            <ButtonWrapper>
                                <Button disabled={this.state.currentStep === 0} onClick={this.handleBack}>
                                    戻る
                                </Button>
                                { this.state.currentStep < 2 &&
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    disabled={disableNext}
                                >
                                    次へ
                                </Button>
                                }
                            </ButtonWrapper>
                        </Stepper>
                    </StepperWrapper>
                </div>
                }

                <Box>
                    <div>

                        <BackWrapper>
                            <Back
                                url="/notification"
                                name="通知一覧へ戻る"
                            />
                        </BackWrapper>
                        <ToggleWrapper>
                            <ToggleText
                                on={this.state.before}
                                handleClick={this.handleToggle}
                            />
                        </ToggleWrapper>

                        <Space height={"26px"}/>
                        <Title>編集{before ? "前" : "後"}の内容</Title>

                        <TextWrapper>

                            { isApproved === "APPROVE"
                            ?
                            <Ribbon success={true} content={"承認済み"}/>
                            : isApproved === "REJECT"
                            ?
                            <Ribbon success={false} content={"拒否済み"}/>
                            :
                            ""
                            }                            

                            { !(afterContent && beforeContent) && <SkeletonBox/> }

                            { (afterContent && beforeContent) && before 
                            ?
                            <Textarea
                                postName={beforePostName}
                                content={beforeContent}
                            />
                            :
                            <Textarea
                                postName={afterPostName}
                                content={afterContent}
                            />
                            }

                        </TextWrapper>

                    </div>
                    <div>

                        <SubTitle>編集対象のポスト</SubTitle>

                        <Recommend
                            id={postId}
                            title={nowPostName}
                            content={nowContent}
                            authorImg={creator.photo}
                            author={creator.userName}
                            editDate={fmtDate(lastEdited)}
                            postImg={nowPostImg.image || topicSquareImg.image}
                        />

                        <SubTitle>{before ? "前回の編集者" : "今回の編集者"}</SubTitle>

                        { !before 
                        ?
                        <People
                            id={userId}
                            photo={photo || account}
                            name={userName} 
                            job={comment} 
                            intro={intro}
                            skeleton={!photo}
                        />
                        :
                        <People
                            id={editLastEditedAuthor._id}
                            photo={editLastEditedAuthor.photo || account}
                            name={editLastEditedAuthor.userName} 
                            job={editLastEditedAuthor.comment} 
                            intro={editLastEditedAuthor.intro}
                            skeleton={!editLastEditedAuthor.photo}
                        />
                        }

                    <Space height={"25px"}/>

                    <SubTitle>{before ? "前回の" : "編集後の"}参照一覧</SubTitle>

                    <div>
                        {!before
                        ?
                        <List
                            readOnly={true}
                            reference={afterReference || []}
                        />
                        :
                        <List
                            readOnly={true}
                            reference={beforeReference || []}
                        />
                        }
                    </div>

                    <Space height={"25px"}/>

                    <ImageWrapper>
                        <SubTitle>{before ? "前回の" : "編集後の"}メイン画像</SubTitle>
                        { afterPostImg.image && !before 
                        ?
                        <img src={afterPostImg.image} alt={"編集後のポスト画像"}/>
                        : beforePostImg.image && before 
                        ?
                        <img src={beforePostImg.image} alt={"編集前のポスト画像"}/>
                        :
                        ""
                        }
                    </ImageWrapper>

                    <Space height={"25px"}/>

                    { feedback && 
                    <OwnerComment>
                        <SubTitle>
                            <Document/>
                            オーナーからのコメント
                        </SubTitle>

                        <TextField
                            id="outlined-multiline-flexible"
                            multiline
                            rowsMax="4"
                            defaultValue={feedback}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </OwnerComment>
                    }

                    </div>
                </Box>
                <Space height={"300px"}/>
            </Wrapper>
        )
    }
}

function findArrObjIndex(arr, lookUp, value){
    for(var i=0; i < arr.length; i++){
        if(arr[i][lookUp] === value){
            return i
        }
    }
}

const OwnerComment = styled.div`
    & > div {
        width: 100%;
    }
`

const Document = styled(IoIosDocument)`
    color: #636480;
    margin-right: 8px;
`

const Box = styled.div`
    display: flex;

    & > div:nth-child(1){
        min-width: 725px;
        max-width: 725px;
        padding: 20px 0px;
    }

    & > div:nth-child(2){
        max-width: 300px;
        padding: 20px;
        padding-top: 13px;
    }
`

const ImageWrapper = styled.div`
    & > img {
        min-width: 292px;
        max-width: 292px;
    }
`

const TextWrapper = styled.div`
    padding: 28px 65px;
    background-color: #ffffff;
    box-shadow: 1px 1px 3px #eaeaea;
    position: relative;
    overflow: scroll;
`

const ToggleWrapper = styled.div`
    float: right;
    margin-top: -15px;
`

const Title = styled.h1`
    font-size: 15px;
    position: absolute;
    top: 31px;
    left: 337px;
    text-align: center;
`

const SubTitle = styled.h3`
    color: #4B4B4B;
    font-size: 13px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
`

const StepperFakeWrapper = styled.div`
    position: fixed;
    box-shadow: 1px 1px 10px #eaeaea;
    width: 338px;
    bottom: 0px;
    right: 100px;
    z-index: 4;
    border-radius: 6px;
    transition: 300ms;

    opacity: ${props => props.isOpened ? 0 : 1};

    & > div:nth-child(1){
        height: 40px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background-color: #636480;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: space-around;

        & > h3 {
            color: white;
        }
    }
`

const StepperWrapper = styled.div`
    position: fixed;
    box-shadow: 1px 1px 10px #eaeaea;
    width: 338px;
    z-index: 4;
    border-radius: 6px;
    transition: 300ms;

    opacity: ${props => props.isOpened ? 1 : 0};

    ${props => props.isOpened ? 
    css`
        bottom: 50px;
        right: 100px;
    `
    : css`
        bottom: -450px;
        right: 100px;
    `}

    & > div:nth-child(1){
        height: 40px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background-color: #636480;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: space-around;

        & > h3 {
            color: white;
        }
    }

    & > div:nth-child(2){
        border-radius: 6px;
    }
`

const TextFieldWrapper = styled.div`
    margin: 10px 0px;

    & > * {
        width: 243px;
    }
`

const FeedbackIcon = styled(MdFeedback)`
    color: white;
    transform: scale(1.6);
    margin-left: -5px;
`

const MinusIcon = styled(FiMinus)`
    color: white;
    transform: scale(1.6);
    cursor: pointer;
`

const FeedbackWrapper = styled.div`
    margin-top: 15px;
`

const ButtonWrapper = styled.div`
    margin-left: auto;

    & > button {
        margin-left: 12px;
    }
`

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    padding: 20px;
`

const BackWrapper = styled.div`
    margin-left: -9px;
    position: relative;
    top: -25px;
`

export const ChangeTitle = styled.p`
    color: #4B4B4B;
    font-size: 13px;
    margin-bottom: 12px;

    & > span {
        font-size: 10px;
        color: #747474;
        margin-left: 10px;
    }
`

export const ChangeUnderline = styled.div`
    border: 0.5px solid #838383;
`


const SubmitBtn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: -12px;
    margin-top: 16px;
`

const Btn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.5px solid #dbdbdb;
    border-radius: 100%;
    width: 60px;
    height:60px;
    margin: 0px 20px;
    cursor: pointer;
    ${props=>props.color === "green" 
    ? css`
        border: 0.5px solid #4CD964
    `
    : css`
        border: 0.5px solid #FF5F5F
    `}
`

const Yes = styled.img`
    height: 35px;
    width: 35px;
`

const No = styled.img`
    height: 25px;
    width: 25px;
`

function mapStateToProps({update, auth}){
    return {
        update,
        auth
    }
}

export default connect(mapStateToProps, actions)(withRouter(Setting))