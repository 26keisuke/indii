import React, { Component } from "react";
import axios from "axios";
import styled, { css, keyframes } from "styled-components"

import { FaPencilAlt } from 'react-icons/fa';

import sample from "../../../images/sample0.jpg"
import love from "../../../images/love.png"
import good from "../../../images/good.png"
import nerd from "../../../images/nerd.png"
import happy from "../../../images/happy.png"
import dissapointed from "../../../images/dissapointed.png"
import close_gray from "../../../images/close-gray.png"
import tick_gray from "../../../images/tick-gray.png"
import close from "../../../images/close-red.png"
import tick from "../../../images/tick.png"
import down from "../../../images/down.png";

import PeopleFollow from "../../PeopleFollow"
import Back from "../../Util/Back"

import { Space } from "../../Theme"

import "./Confirm.css"

class Confirm extends Component {

    constructor(props){
        super(props)
        this.state = {
            textareaValue: "",
            textareaFocus: false,
            feedback: {
                0: false,
                1: false,
                2: false,
                3: false,
                4: false
            },
            feedbackPressed: false,
            feedbackChanged: false,
            btnChanged: false,
            isClosed: false,
        }
    }
    
    // Warning: mutating states!!
    handleFeedback = (id) => {
        const prevState = this.state.feedback[id]
        this.setState({
            feedback: {
                [id]: !prevState
            },
            feedbackPressed: prevState ? false : true,
        })
    }

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
        const url = "/api/post/" + this.props.id + "/edit";
        axios.post(url, {accept});
    }

    handleCollapseClick = () => {
        this.setState({
            isClosed: !this.state.isClosed,
            feedbackChanged: true,
            btnChanged: true,
        })
    }

    render() {
        console.log(this.state.feedback[0])
        return (
            <ConfirmWrapper>
                <ConfirmHeader>
                    <div>
                        <Back
                            url="/notification"
                            name="通知一覧へ戻る"
                        />
                    </div>
                </ConfirmHeader>
                <Space height="10px" backgroundColor="#f9f9f9"/>
                <ConfirmBox>
                    <CollapseWrapper>
                        <div>
                            <p onClick={this.handleCollapseClick}></p>
                            <CollapseBtn 
                                src={down} 
                                changed={this.state.btnChanged}
                                isClosed={this.state.isClosed}
                            />
                        </div>
                        <p onClick={this.handleCollapseClick}>
                            {this.state.isClosed ?  "基本情報を表示する" : "基本情報を隠す"}
                        </p>
                    </CollapseWrapper>
                    <ConfirmTitle>
                        <p><span>"Apache Kafkaの長所"</span>への編集リクエスト</p>
                    </ConfirmTitle>
                    <ConfirmLeft hide={this.state.isClosed} changed={this.state.feedbackChanged}>
                        <p>基本情報</p>
                        <p>編集者</p>
                        <Editor followBtn={true}>
                            <img src={sample} alt={"編集者のアイコン"}/>
                            <div>
                                <p>飯塚　啓介</p>
                                <p>Chief株式会社 CEO</p>
                            </div>
                            <FollowWrapper>
                                <PeopleFollow/>
                            </FollowWrapper>
                        </Editor>
                        <Section>
                            <Title>トピック名</Title>
                            <Content>Apache Kafka</Content>
                            <Underline/>
                        </Section>
                        <Section>
                            <Title>変更前のポスト名</Title>
                            <Content>Apache Kafkaの長所</Content>
                            <Underline/>
                            <Mark left="125px" top="6px" type={"before"}/>
                        </Section>
                        <Section>
                            <Title>変更後のポスト名</Title>
                            <Content>Apache Kafkaの長所</Content>
                            <Underline/>
                            <Mark left="125px" top="6px"/>
                        </Section>
                        <Section>
                            <Title>前回の編集</Title>
                            <p>January 1, 2014 9:59 PM</p>
                            <Editor>
                                <img src={sample} alt={"前回の編集者の写真"}/>
                                <div>
                                    <p>沖田 政勝</p>
                                    <p>Chief株式会社 CTO</p>
                                </div>
                            </Editor>
                            <Underline/>
                        </Section>
                        <Section>
                            <Title>フィードバック</Title>
                            <Feedback>
                                <FeedbackIcon 
                                    src={love} 
                                    pressed={this.state.feedback[0]} 
                                    onClick={()=>this.handleFeedback(0)}
                                />
                                <FeedbackIcon 
                                    src={good} 
                                    pressed={this.state.feedback[1]} 
                                    onClick={()=>this.handleFeedback(1)}
                                />
                                <FeedbackIcon 
                                    src={nerd} 
                                    pressed={this.state.feedback[2]} 
                                    onClick={()=>this.handleFeedback(2)}
                                />
                                <FeedbackIcon 
                                    src={happy} 
                                    pressed={this.state.feedback[3]} 
                                    onClick={()=>this.handleFeedback(3)}
                                />
                                <FeedbackIcon 
                                    src={dissapointed} 
                                    pressed={this.state.feedback[4]} 
                                    onClick={()=>this.handleFeedback(4)}
                                />
                            </Feedback>
                        </Section>
                        <Section>
                            <PencilIcon focused={this.state.textareaFocus}/>
                            <Title>編集者へのコメント<span>*必須ではありません</span></Title>
                            <Comment
                                onFocus={this.handleFocus} 
                                onChange={(e) => this.handleChange(e)}
                                onBlur={this.handleBlur}
                                value={this.state.textareaValue}
                                placeholder="ここにコメントを入力"
                            />
                        </Section>
                        <Section>
                            <FinalConfirm>
                                <p className="check-change-confirm">この編集を承認しますか？</p>
                                {this.state.feedbackPressed ? "" : <p className="check-change-warning">フィードバックが選択されていません。</p>}
                            </FinalConfirm>
                            <SubmitBtn>
                                <Btn 
                                    color="green"
                                    pressed={this.state.feedbackPressed}
                                    onClick={this.state.feedbackPressed ? () => this.handleSubmit(true) : ""}
                                >
                                    <Yes 
                                        src={this.state.feedbackPressed ? tick : tick_gray}
                                    />
                                </Btn>
                                <Btn 
                                    color="red"
                                    pressed={this.state.feedbackPressed}
                                    onClick={this.state.feedbackPressed ? () => this.handleSubmit(false) : ""}
                                >
                                    <No
                                        src={this.state.feedbackPressed ? close : close_gray}
                                    />
                                </Btn>
                            </SubmitBtn>
                        </Section>
                    </ConfirmLeft>
                    <ConfirmText type="middle">
                        <p>編集前</p>
                        <div>
                            <p>
                            フォールトトレラントシステムで管理され、複数マシンのクラスタに分散されたデータ項目の読み取り専用多重集合であるRDD（resilient distributed dataset）と呼ばれるデータ構造を中心とするアプリケーションプログラミングインターフェイスを備えている。MapReduceは、分散プログラム上で特定の線形データフロー構造を強制するクラスタコンピューティングプログラミングパラダイムの制限に対応して開発された。MapReduceは、ディスクから入力データを読み込み、データ全体に関数をマップし、削減結果をディスクに格納する。SparkのRDDは、 分散共有メモリの （意図的に）制限された形式で提供する分散プログラムのワーキングセットとして機能する[3]。RDDの可用性は、ループ内で複数回データセットを参照する反復法アルゴリズム、および対話型/探索型データ分析、データ反復のデータベースクエリの両方の実装を容易にする。このようなアプリケーションのレイテンシ（Apache Hadoopスタックでは一般的であったMapReduce実装と比較して）は、桁違いに低下する可能性がある。反復アルゴリズムのクラスの中には、 機械学習のための訓練アルゴリズムがあり、Apache Sparkを開発の初期の刺激となった。RDDの可用性は、ループ内で複数回データセットを参照する反復法アルゴリズム、および対話型/探索型データ分析、データ反復のデータベースクエリの両方の実装を容易にする。このようなアプリケーションのレイテンシ（Apache Hadoopスタックでは一般的であったMapReduce実装と比較して）は、桁違いに低下する可能性がある。反復アルゴリズムのクラスの中には、 機械学習のための訓練アルゴリズムがあり、Apache Sparkを開発の初期の刺激となった
                            </p>
                        </div>
                        <Mark left="55px" top="5px" type={"before"}/>
                    </ConfirmText>
                    <ConfirmText>
                        <p>編集後</p>
                        <div>
                            <p>
                            フォールトトレラントシステムで管理され、複数マシンのクラスタに分散されたデータ項目の読み取り専用多重集合であるRDD（resilient distributed dataset）と呼ばれるデータ構造を中心とするアプリケーションプログラミングインターフェイスを備えている。MapReduceは、分散プログラム上で特定の線形データフロー構造を強制するクラスタコンピューティングプログラミングパラダイムの制限に対応して開発された。MapReduceは、ディスクから入力データを読み込み、データ全体に関数をマップし、削減結果をディスクに格納する。SparkのRDDは、 分散共有メモリの （意図的に）制限された形式で提供する分散プログラムのワーキングセットとして機能する[3]。RDDの可用性は、ループ内で複数回データセットを参照する反復法アルゴリズム、および対話型/探索型データ分析、データ反復のデータベースクエリの両方の実装を容易にする。このようなアプリケーションのレイテンシ（Apache Hadoopスタックでは一般的であったMapReduce実装と比較して）は、桁違いに低下する可能性がある。反復アルゴリズムのクラスの中には、 機械学習のための訓練アルゴリズムがあり、Apache Sparkを開発の初期の刺激となった。RDDの可用性は、ループ内で複数回データセットを参照する反復法アルゴリズム、および対話型/探索型データ分析、データ反復のデータベースクエリの両方の実装を容易にする。このようなアプリケーションのレイテンシ（Apache Hadoopスタックでは一般的であったMapReduce実装と比較して）は、桁違いに低下する可能性がある。反復アルゴリズムのクラスの中には、 機械学習のための訓練アルゴリズムがあり、Apache Sparkを開発の初期の刺激となった
                            </p>
                        </div>
                        <Mark left="55px" top="5px"/>
                    </ConfirmText>
                </ConfirmBox>
                <Space height="400px"/>
            </ConfirmWrapper>
        )
    }
}


const ConfirmWrapper = styled.div`
    width:100%;
    height: 100%;
    overflow-y: scroll;
`

const ConfirmHeader = styled.div`
    height:40px;
    background-color: #ffffff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${props => props.theme.borderColor};
    margin-left: -1px;
    width: 100%;

    & > div {
        margin-top:-19px;
    }
`

const ConfirmBox = styled.div`
    padding: 20px 20px;
    padding-top:60px;
    display: flex;
    border-top: 1px solid ${props => props.theme.borderColor};
    flex-direction: row;
    overflow-x: hidden;
    position: relative;
`

const CollapseWrapper = styled.div`
    position: absolute;
    top: 21px;
    display: flex;
    flex-direction: row;
    align-items: center;
    & > div {
        position: relative;

        & > p {
            position: absolute;
            right:-8px;
            top: -13px;
            width: 40px;
            height: 40px;
            display: block;
            cursor: pointer;
        }

        & > p::before {
            content: "";
            display: none;
            background-color: #1C1C1C;
            opacity: 0.1;
            border-radius: 100%;
            width: 40px;
            height: 40px;
        }

        & > p:hover::before {
            display: block;
        }
    }

    & > p {
        margin-left: 10px;
        cursor: pointer;
    }
`

const ConfirmTitle = styled.div`
    position: absolute;
    top: 17px;
    left: 50%;
    transform: translate(-50%, 0);

    & > p {
        color: #878787;

        & > span {
            color: #464646;
            font-size: 14px;
            margin: 0px 10px;
        }

    }
`

const hide = keyframes`
    0% {width: 250px}
    100% {width: 0px}
`

const show = keyframes`
    0% {width: 0px}
    100% {width: 250px}
`

const ConfirmLeft = styled.div`
    width: 250px;
    margin-right: 15px;
    flex-shrink: 0;
    overflow: hidden;
    ${
    props => props.changed
    ?
    props => props.hide 
    ? css`
        animation-name: ${hide};
        animation-duration: 300ms;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
    `
    : css`
        animation-name: ${show};
        animation-duration: 300ms;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
    `
    : css`
    `}

    & p {
        white-space: nowrap
    }

    & > p:nth-child(1) {
        font-size:14px;
        font-weight: bold;
        margin-bottom: 12px;
    }

    & > p:nth-child(2) {
        font-size:13px;
        color: #4B4B4B;
    }
`

const Section = styled.div`
    margin-bottom:20px;
    position: relative;
`

const Title = styled.p`
    color: #4B4B4B;
    font-size: 13px;
    margin-bottom: 12px;

    & > span {
        font-size: 10px;
        color: #747474;
        margin-left: 10px;
    }
`

const Content = styled.p`
    color: #333333;
    font-size: 13px;
    margin-bottom: 5px;
`

const Underline = styled.div`
    border: 0.5px solid #838383;
`

const Editor = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 0px;
    background-color: #ffffff;
    position: relative;

    ${props => props.followBtn && css`
        height: 100px;
    `}

    & > img {
        width: 37px;
        height: 37px;
        border-radius: 5px;
        object-fit: cover;
        flex-shrink: 0;
        margin-right: 10px;
    }

    & > div {
        & > p:nth-child(1) {
            font-size:12px;
        }

        & > p:nth-child(2) {
            color: #747474;
            font-size: 11px;
            margin-bottom: 5px;
        }
    }
`

const FollowWrapper = styled.div`
    position: absolute;
    top: 63px;
    left: -40px;
`

const Mark = styled.div`
    background-color: ${props => props.type ? "#9EAEE5" : "#B1FF9D"};
    width: 8px;
    height: 8px;
    position: absolute;
    left: ${props => props.left};
    top: ${props => props.top};
    border-radius: 4px;
`

const Feedback = styled.div`
    background-color: white;
    display: flex;
    padding: 2px;
    width: 200px;
    border-radius: 18px;
    margin-left: 18px;
    align-items: center;
    animation-name: bounce;
    animation-duration: 300ms;
    animation-fill-mode: forwards;
    z-index:1;
`

const FeedbackIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-right:20px;
    cursor: pointer;
    padding:5px;
    margin: 0px 5px !important;

    ${props => props.pressed
    ? css`        
        opacity: 1;
        transform: scale(1.08);
        background-color: rgba(154, 174, 230, 0.7);
        border-radius: 100%;
    `
    : css`
        &:hover {
            animation-name: bounce;
            animation-duration: 300ms;
            animation-fill-mode: forwards;
            background-color: rgba(158, 175, 229, 0.3);
            border-radius: 100%;
        }
    `}
`

const ConfirmText = styled.div`
    width: 50%;
    min-width:300px;
    position: relative;

    ${props=> props.type === "middle" && css`
        margin-right:20px;
    `}

    & > p {
        font-size:14px;
        font-weight: bold;
        margin-bottom: 12px;
    }

    & > div:nth-child(2) {
        margin-top:10px;
        border: 0.5px solid #838383;
        height:76.5%;
        overflow: scroll;

        & > p {
            padding: 5px 10px;
        }
    }
`

const spin_1 = keyframes`
    from {
        transform: rotate(270deg)
    }
    to {
        transform: rotate(90deg)
    }
`

const spin_2 = keyframes`
    from {
        transform: rotate(90deg)
    }
    to {
        transform: rotate(270deg)
    }
`

const CollapseBtn = styled.img`
    width: 13px;
    height: 13px;
    margin-right: 6px;
    transform: rotate(90deg);
    pointer-events: none;
    top:0px;
    right:0px;

    ${props => props.changed
    ? !props.isClosed
    ? css`
    animation-name: ${spin_1};
    animation-duration: 400ms;
    animation-fill-mode: forwards;
    `
    : css`
    animation-name: ${spin_2};
    animation-duration: 400ms;
    animation-fill-mode: forwards;
    `
    : css`
    `}
`

const SubmitBtn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 250px;
`

const Btn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.5px solid #dbdbdb;
    border-radius: 100%;
    width: 80px;
    height:80px;
    margin: 0px 20px;
    cursor: pointer;
    ${props=>props.pressed 
    ?
    props=>props.color === "green" 
    ? css`
        border: 0.5px solid #4CD964
    `
    : css`
        border: 0.5px solid #FF5F5F
    `
    : css`
    `}
`

const Yes = styled.img`
    height: 50px;
    width: 50px;
`

const No = styled.img`
    height: 45px;
    width: 40px;
`

const Comment = styled.textarea`
    width: 221px;
    height: 120px;
    padding-left: 25px;
    border: 0.5px solid #838383;
    font-size: 12px;
    padding-top: 4px;
    font-family: "Gennokaku Gothic";

    &:focus {
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        outline: 0;
        border: 0.5px solid #9EAEE5;
    }
`

const PencilIcon = styled(FaPencilAlt)`
    position: absolute;
    top: 39px;
    left:7px;
    width:14px;
    height:14px;
    ${props=>props.focused && css`
        color: #9EAEE5;
    `}
`

const FinalConfirm = styled.div`
    position: relative;

    & > p:nth-child(1) {
        color: #4B4B4B;
        font-weight: bold;
        font-size: 13px;
        margin-bottom: 22px;
        margin-top:45px;
    }

    & > p:nth-child(2) {
        position: absolute;
        color: #747474;
        width: 180px;
        font-size: 10px;
        top: -19px;
        left: 13px;

        &::before {
            content: "";
            background-color: #FF5F5F;
            width: 8px;
            height: 8px;
            border-radius: 100%;
            display: block;
            position: absolute;
            left: -12px;
            top: 3px;
        }
    }
`

export default Confirm