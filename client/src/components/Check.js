import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FaPencilAlt } from 'react-icons/fa';

import sample from "../images/sample0.jpg"
import love from "../images/love.png"
import good from "../images/good.png"
import nerd from "../images/nerd.png"
import happy from "../images/happy.png"
import dissapointed from "../images/dissapointed.png"
import close_gray from "../images/close-gray.png"
import tick_gray from "../images/tick-gray.png"
import close from "../images/close-red.png"
import tick from "../images/tick.png"
import down from "../images/down.png";

import PeopleFollow from "./PeopleFollow"
import Back from "./Back"

import "./Check.css"

class Check extends Component {

    constructor(props){
        super(props)
        this.state = {
            textareaValue: "",
            textareaFocus: false,
            feedbackSelected: false,
            feedback: {
                0: false,
                1: false,
                2: false,
                3: false,
                4: false
            },
            feedbackPressed: false,
            btnClass: "check-collapse-btn",
            collapseClass: "check-left",
            isClosed: false,
        }
    }

    handleFeedback = (id) => {
        this.setState({
            feedback: {
                0: false,
                1: false,
                2: false,
                3: false,
                4: false
            },
        })
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
        const rotate = !this.state.isClosed ? "rotate-3" : "rotate-2"
        const shrink = !this.state.isClosed ? "check-left-hide" : "check-left-show"
        const btnClass = "check-collapse-btn" + " " + rotate
        const collapseClass = "check-left" + " " + shrink
        this.setState({
            isClosed: !this.state.isClosed,
            btnClass,
            collapseClass
        })
    }

    render() {
        return (
            <div className="content-full">
                <div className="content-space-header">
                    <Back
                        url="/notification"
                        name="通知一覧へ戻る"
                    />
                </div>
                <div className="content-space"/>
                <div className="check-box">
                    <div className="check-collapse-wrapper">
                        <div className="check-collapse-fake">
                            <p onClick={this.handleCollapseClick}></p>
                            <img 
                                src={down} 
                                className={this.state.btnClass}
                            />
                        </div>
                        <p onClick={this.handleCollapseClick} className="check-collapse-text">
                            {this.state.isClosed ?  "基本情報を表示する" : "基本情報を隠す"}
                        </p>
                    </div>
                    <div className="check-header-wrapper">
                        <p className="check-header-title">
                            <span className="check-header-title-bold">
                                "Apache Kafkaの長所"
                            </span>
                            への編集リクエスト
                        </p>
                    </div>
                    <div className={this.state.collapseClass}>
                        <p className="check-top-title">基本情報</p>
                        <p className="check-top">編集者</p>
                        <div className="check-people">
                            <img src={sample} className="people-img"/>
                            <div className="people-middle">
                                <p className="people-name">飯塚　啓介</p>
                                <p className="people-job">Chief株式会社 CEO</p>
                            </div>
                            <div className="check-people-follow-wrapper">
                                <PeopleFollow/>
                            </div>
                        </div>
                        <div className="check-change">
                            <p className="check-change-title">トピック名</p>
                            <p className="check-change-content">Apache Kafka</p>
                            <div className="check-change-underline"/>
                        </div>
                        <div className="check-change">
                            <div className="check-change-mark-before"/>
                            <p className="check-change-title">変更前のポスト名</p>
                            <p className="check-change-content">Apache Kafkaの長所</p>
                            <div className="check-change-underline"/>
                        </div>
                        <div className="check-change">
                            <div className="check-change-mark-after"/>
                            <p className="check-change-title">変更後のポスト名</p>
                            <p className="check-change-content">Apache Kafkaの長所</p>
                            <div className="check-change-underline"/>
                        </div>
                        <div className="check-change">
                            <p className="check-change-title">前回の編集</p>
                            <p className="check-change-date">January 1, 2014 9:59 PM</p>
                            <div className="check-change-people">
                                <img src={sample} className="people-img"/>
                                <div className="people-middle">
                                    <p className="people-name">沖田 政勝</p>
                                    <p className="people-job">Chief株式会社 CTO</p>
                                </div>
                            </div>
                            <div className="check-change-underline"/>
                        </div>
                        <div className="check-change">
                            <p className="check-change-title">フィードバック</p>
                            <div className="check-change-feedback">
                                <img 
                                    src={love} 
                                    className={this.state.feedback[0] ? "check-change-feedback-pressed" : "check-change-feedback-unpressed"} 
                                    onClick={()=>this.handleFeedback(0)}
                                />
                                <img 
                                    src={good} 
                                    className={this.state.feedback[1] ? "check-change-feedback-pressed" : "check-change-feedback-unpressed"} 
                                    onClick={()=>this.handleFeedback(1)}
                                />
                                <img 
                                    src={nerd} 
                                    className={this.state.feedback[2] ? "check-change-feedback-pressed" : "check-change-feedback-unpressed"} 
                                    onClick={()=>this.handleFeedback(2)}
                                />
                                <img 
                                    src={happy} 
                                    className={this.state.feedback[3] ? "check-change-feedback-pressed" : "check-change-feedback-unpressed"} 
                                    onClick={()=>this.handleFeedback(3)}
                                />
                                <img 
                                    src={dissapointed} 
                                    className={this.state.feedback[4] ? "check-change-feedback-pressed" : "check-change-feedback-unpressed"} 
                                    onClick={()=>this.handleFeedback(4)}
                                />
                            </div>
                        </div>
                        <div className="check-change">
                            <FaPencilAlt className={this.state.textareaFocus ? "check-pen-focus" : "check-pen"}/>
                            <p className="check-change-title">コメント<span>*必須ではありません</span></p>
                            <textarea 
                                onFocus={this.handleFocus} 
                                onChange={(e) => this.handleChange(e)}
                                onBlur={this.handleBlur}
                                value={this.state.textareaValue}
                                className="check-comment" 
                                placeholder="ここにコメントを入力"
                            />
                        </div>
                        <div className="check-change">
                            <div className="check-change-button">
                                <p className="check-change-confirm">この編集を承認しますか？</p>
                                {this.state.feedbackPressed ? "" : <p className="check-change-warning">フィードバックが選択されていません。</p>}
                            </div>
                            <div className="check-change-result">
                                <div 
                                    className={this.state.feedbackPressed ? "check-change-result-circle-green check-change-result-circle" : "check-change-result-circle"}  
                                    onClick={this.state.feedbackPressed ? () => this.handleSubmit(true) : ""}
                                >
                                    <img 
                                        className="check-confirm"
                                        src={this.state.feedbackPressed ? tick : tick_gray}
                                    />
                                </div>
                                <div 
                                    className={this.state.feedbackPressed ? "check-change-result-circle-red check-change-result-circle" : "check-change-result-circle"}
                                    onClick={this.state.feedbackPressed ? () => this.handleSubmit(false) : ""}
                                >
                                    <img 
                                        className="check-reject" 
                                        src={this.state.feedbackPressed ? close : close_gray}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="check-middle">
                        <div className="check-change-mark-before-content"/>
                        <p className="check-top-title">編集前</p>
                        <div className="check-change-content-text">
                            <p>
                            フォールトトレラントシステムで管理され、複数マシンのクラスタに分散されたデータ項目の読み取り専用多重集合であるRDD（resilient distributed dataset）と呼ばれるデータ構造を中心とするアプリケーションプログラミングインターフェイスを備えている。MapReduceは、分散プログラム上で特定の線形データフロー構造を強制するクラスタコンピューティングプログラミングパラダイムの制限に対応して開発された。MapReduceは、ディスクから入力データを読み込み、データ全体に関数をマップし、削減結果をディスクに格納する。SparkのRDDは、 分散共有メモリの （意図的に）制限された形式で提供する分散プログラムのワーキングセットとして機能する[3]。

RDDの可用性は、ループ内で複数回データセットを参照する反復法アルゴリズム、および対話型/探索型データ分析、データ反復のデータベースクエリの両方の実装を容易にする。このようなアプリケーションのレイテンシ（Apache Hadoopスタックでは一般的であったMapReduce実装と比較して）は、桁違いに低下する可能性がある。反復アルゴリズムのクラスの中には、 機械学習のための訓練アルゴリズムがあり、Apache Sparkを開発の初期の刺激となった。RDDの可用性は、ループ内で複数回データセットを参照する反復法アルゴリズム、および対話型/探索型データ分析、データ反復のデータベースクエリの両方の実装を容易にする。このようなアプリケーションのレイテンシ（Apache Hadoopスタックでは一般的であったMapReduce実装と比較して）は、桁違いに低下する可能性がある。反復アルゴリズムのクラスの中には、 機械学習のための訓練アルゴリズムがあり、Apache Sparkを開発の初期の刺激となった
                            </p>
                        </div>
                    </div>
                    <div className="check-right">
                        <div className="check-change-mark-after-content"/>
                        <p className="check-top-title">編集後</p>
                        <div className="check-change-content-text">
                            <p>
                            フォールトトレラントシステムで管理され、複数マシンのクラスタに分散されたデータ項目の読み取り専用多重集合であるRDD（resilient distributed dataset）と呼ばれるデータ構造を中心とするアプリケーションプログラミングインターフェイスを備えている。MapReduceは、分散プログラム上で特定の線形データフロー構造を強制するクラスタコンピューティングプログラミングパラダイムの制限に対応して開発された。MapReduceは、ディスクから入力データを読み込み、データ全体に関数をマップし、削減結果をディスクに格納する。SparkのRDDは、 分散共有メモリの （意図的に）制限された形式で提供する分散プログラムのワーキングセットとして機能する[3]。

RDDの可用性は、ループ内で複数回データセットを参照する反復法アルゴリズム、および対話型/探索型データ分析、データ反復のデータベースクエリの両方の実装を容易にする。このようなアプリケーションのレイテンシ（Apache Hadoopスタックでは一般的であったMapReduce実装と比較して）は、桁違いに低下する可能性がある。反復アルゴリズムのクラスの中には、 機械学習のための訓練アルゴリズムがあり、Apache Sparkを開発の初期の刺激となった。RDDの可用性は、ループ内で複数回データセットを参照する反復法アルゴリズム、および対話型/探索型データ分析、データ反復のデータベースクエリの両方の実装を容易にする。このようなアプリケーションのレイテンシ（Apache Hadoopスタックでは一般的であったMapReduce実装と比較して）は、桁違いに低下する可能性がある。反復アルゴリズムのクラスの中には、 機械学習のための訓練アルゴリズムがあり、Apache Sparkを開発の初期の刺激となった
                            </p>
                        </div>
                    </div>
                </div>
                {/* <div className="check-change-bottom-space">
                    <img src={absurd} className="just-for-fun-1"/>
                </div> */}
            </div>
        )
    }
}

export default Check