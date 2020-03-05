import React, { Component } from "react"
import styled, { css } from "styled-components"
import { TiFlowSwitch } from "react-icons/ti"
import { MdFeedback } from "react-icons/md"
import { FiMinus } from "react-icons/fi"
import { connect } from "react-redux"
import axios from "axios";

import * as actions from "../../actions"

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField"

import sample from "../../images/sample1.png"
import sample1 from "../../images/sample0.jpg"
import close from "../../images/close-red.png"
import tick from "../../images/tick.png"

import { Space } from "../Theme"
import Back from "../Util/Back"
import Edit from "../Notif/Confirm/Edit/Edit"
import Feedback from "../Notif/Feedback/Feedback"
import Recommend from "../Util/Recommend"
import TopicRecommend from "../Util/TopicRecommend"

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

            currentStep: 0,
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.fetchConfirm(id, this.state.id) // notifId (DraftIdではない)
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

    handleFocus = () => {
        this.setState({
            textareaFocus: true
        })
    }

    handleSubmit = (accept) => {

        const text = accept ? "承認" : "拒否"

        const id = "1";
        const action = "CONFIRM_DRAFT";
        const title = `編集リクエストを${text}}する`
        const message = `編集リクエストを${text}}してよろしいですか？`;
        const caution = "";
        const buttonMessage = "送信する";
        const value = this.state.feedback
        this.props.showConfirmation(id, action, title, caution, message, buttonMessage, "", value);
        this.props.enableGray();

    }


    render() {

        var user = this.props.auth.info.notif.user || {}
        var draft = this.props.auth.info.notif.draft || {}
        var post = this.props.auth.info.notif.post || {}

        if(user && draft && post) {
            var { photo, userName, comment } = user
            var { topicName, topic, editLastEdited, editLastEditedAuthor, editUploadedDate, content } = draft

            var beforePostName = post.postName
            var afterPostName = draft.postName

            var beforeContent = post.content
            var afterContent = draft.content
        }

        const steps = getSteps();
        const disableNext = this.disableBtn()

        return(
            <Wrapper>

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

                <BackWrapper>
                    <Back
                        url="/notification"
                        name="通知一覧へ戻る"
                    />
                </BackWrapper>
                <Space height={"30px"}/>
                <Title>ポストのタイトルが入ります</Title>
                <Space height={"10px"}/>
                <Top>
                    <TopicRecommend/>
                    <Recommend
                        title="タイトルが入ります"
                        content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                        authorImg={sample1}
                        author="飯塚啓介"
                        editDate="作成日が入ります"
                        postImg={sample}
                    />
                </Top>
                <Bottom>
                    <EditBox>
                        <h2>今回の編集</h2>

                        <PostInfo>
                            <Edit
                                title={"編集者"}
                                date={"January 1, 2014 9:59 PM"}
                                photo={sample}
                                userName={"沖田 政勝"}
                                comment={"Chief株式会社 CTO"}
                                intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．"}
                                followBtn={true}
                            />

                            <ChangeSection>
                                <ChangeTitle>変更前のポスト名</ChangeTitle>
                                <ChangeContent>Apache Kafkaの長所</ChangeContent>
                                <ChangeUnderline/>
                            </ChangeSection>

                        </PostInfo>

                        <h2>変更後の内容</h2>

                        <Content>
                            
                        </Content>
                    </EditBox>
                    
                    <Divider>
                        <div/>
                        <section>
                            <TiFlowSwitch/>
                        </section>
                        <div/>
                    </Divider>
                    <EditBox>
                        <h2>前回の編集</h2>

                        <PostInfo>
                            <Edit
                                title={"編集者"}
                                date={"January 1, 2014 9:59 PM"}
                                photo={sample1}
                                userName={"沖田 政勝"}
                                comment={"Chief株式会社 CTO"}
                                intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．"}
                                followBtn={true}
                            />
                        
                            <ChangeSection>
                                <ChangeTitle>変更前のポスト名</ChangeTitle>
                                <ChangeContent>Apache Kafkaの長所</ChangeContent>
                                <ChangeUnderline/>
                            </ChangeSection>

                        </PostInfo>

                        <h2>変更前の内容</h2>

                        <Content>
                            
                        </Content>

                    </EditBox>
                    
                </Bottom>
                <Space height={"300px"}/>
            </Wrapper>
        )
    }
}

const Title = styled.h1`
    font-size: 16px;
`

const StepperFakeWrapper = styled.div`
    position: fixed;
    box-shadow: 1px 1px 10px #d2d2d2;
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
    box-shadow: 1px 1px 10px #d2d2d2;
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
`

const Top = styled.div`
    display: flex;
`

const PostInfo = styled.div`
    box-shadow: 1px 1px 3px #d2d2d2;
    padding: 15px;

    & > div {
        margin-bottom: 20px;
    }
`

const Divider = styled.div`

    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 30px 20px;
    margin-top: 50px;
    height: inherit;
    justify-content: space-around;

    & > div {
        border-left: 1px solid #d2d2d2;
        height: 40%;
    }

    & > section {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 1px 1px 5px #d2d2d2;
        margin: 10px 0px;
    }
`

const Bottom = styled.div`
    display: flex;
    flex-direction: row;
`

const Content = styled.div`
    box-shadow: 1px 1px 5px #d2d2d2;
    min-height: 300px;
    padding: 37px;
`

const EditBox = styled.div`
    min-width: 480px;
    max-width: 480px;

    & > h2 {
        font-size: 15px;
        margin-bottom: 10px;
        margin-top: 20px;
    }
`

const ChangeSection = styled.div`
    margin-bottom:20px;
    position: relative;
`

const ChangeTitle = styled.p`
    color: #4B4B4B;
    font-size: 13px;
    margin-bottom: 12px;

    & > span {
        font-size: 10px;
        color: #747474;
        margin-left: 10px;
    }
`

const ChangeContent = styled.p`
    color: #333333;
    font-size: 13px;
    margin-bottom: 5px;
`

const ChangeUnderline = styled.div`
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

export default connect(mapStateToProps, actions)(Setting)