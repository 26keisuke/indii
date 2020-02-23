import React, { Component } from "react";
import { Link } from "react-router-dom";

import back_arrow from "../images/back-arrow.png"
import follow from "../images/add.png"
import sample from "../images/sample0.jpg"
import pen from "../images/pen.png"
import love from "../images/love.png"
import good from "../images/good.png"
import nerd from "../images/nerd.png"
import happy from "../images/happy.png"
import dissapointed from "../images/dissapointed.png"
import close_gray from "../images/close-gray.png"
import tick_gray from "../images/tick-gray.png"
import absurd from "../images/absurd/07.png"

import "./Check.css"

class Check extends Component {
    render() {
        return (
            <div className="content-full">
                <div className="content-space-header">
                    <Link to={"/notification"} className="content-back-wrapper">
                        <img src={back_arrow} className="content-back"/>
                        <p className="content-back-to">通知</p> 
                    </Link>
                    <p className="content-header-title">
                        <span className="content-header-title-bold">
                            "Apache Kafkaの長所"
                        </span>
                        への編集リクエスト
                    </p>
                </div>
                <div className="content-space"/>
                <div className="check-box">
                    <div className="check-left">
                        <p className="check-top">編集者</p>
                        <div className="check-people">
                            <img src={sample} className="people-img"/>
                            <div className="people-middle">
                                <p className="people-name">飯塚　啓介</p>
                                <p className="people-job">Chief株式会社 CEO</p>
                                <p className="search-people-intro">2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなど。</p>
                            </div>
                            <div className="check-people-follow">
                                <img src={follow} className="search-people-follow-icon"/>
                                <p>Follow</p>
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
                                <img src={love}/>
                                <img src={good}/>
                                <img src={nerd}/>
                                <img src={happy}/>
                                <img src={dissapointed}/>
                            </div>
                        </div>
                        <div className="check-change">
                            <img src={pen} className="check-pen"/>
                            <p className="check-change-title">コメント<span>*必須ではありません</span></p>
                            <textarea className="check-comment" placeholder="ここにコメントを入力"></textarea>
                        </div>
                        <div className="check-change">
                        <p className="check-change-title">この編集を承認しますか？</p>
                            <div className="check-change-result">
                                <div className="check-change-result-circle">
                                    <img className="check-confirm" src={tick_gray}/>
                                </div>
                                <div className="check-change-result-circle">
                                    <img className="check-reject" src={close_gray}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="check-middle">
                        <div className="check-change-mark-before-content"/>
                        <p className="check-top">編集前</p>
                        <div className="check-change-content-text">
                            <p>
                            フォールトトレラントシステムで管理され、複数マシンのクラスタに分散されたデータ項目の読み取り専用多重集合であるRDD（resilient distributed dataset）と呼ばれるデータ構造を中心とするアプリケーションプログラミングインターフェイスを備えている。MapReduceは、分散プログラム上で特定の線形データフロー構造を強制するクラスタコンピューティングプログラミングパラダイムの制限に対応して開発された。MapReduceは、ディスクから入力データを読み込み、データ全体に関数をマップし、削減結果をディスクに格納する。SparkのRDDは、 分散共有メモリの （意図的に）制限された形式で提供する分散プログラムのワーキングセットとして機能する[3]。

RDDの可用性は、ループ内で複数回データセットを参照する反復法アルゴリズム、および対話型/探索型データ分析、データ反復のデータベースクエリの両方の実装を容易にする。このようなアプリケーションのレイテンシ（Apache Hadoopスタックでは一般的であったMapReduce実装と比較して）は、桁違いに低下する可能性がある。反復アルゴリズムのクラスの中には、 機械学習のための訓練アルゴリズムがあり、Apache Sparkを開発の初期の刺激となった。RDDの可用性は、ループ内で複数回データセットを参照する反復法アルゴリズム、および対話型/探索型データ分析、データ反復のデータベースクエリの両方の実装を容易にする。このようなアプリケーションのレイテンシ（Apache Hadoopスタックでは一般的であったMapReduce実装と比較して）は、桁違いに低下する可能性がある。反復アルゴリズムのクラスの中には、 機械学習のための訓練アルゴリズムがあり、Apache Sparkを開発の初期の刺激となった
                            </p>
                        </div>
                    </div>
                    <div className="check-right">
                        <div className="check-change-mark-after-content"/>
                        <p className="check-top">編集後</p>
                        <div className="check-change-content-text">
                            <p>
                            フォールトトレラントシステムで管理され、複数マシンのクラスタに分散されたデータ項目の読み取り専用多重集合であるRDD（resilient distributed dataset）と呼ばれるデータ構造を中心とするアプリケーションプログラミングインターフェイスを備えている。MapReduceは、分散プログラム上で特定の線形データフロー構造を強制するクラスタコンピューティングプログラミングパラダイムの制限に対応して開発された。MapReduceは、ディスクから入力データを読み込み、データ全体に関数をマップし、削減結果をディスクに格納する。SparkのRDDは、 分散共有メモリの （意図的に）制限された形式で提供する分散プログラムのワーキングセットとして機能する[3]。

RDDの可用性は、ループ内で複数回データセットを参照する反復法アルゴリズム、および対話型/探索型データ分析、データ反復のデータベースクエリの両方の実装を容易にする。このようなアプリケーションのレイテンシ（Apache Hadoopスタックでは一般的であったMapReduce実装と比較して）は、桁違いに低下する可能性がある。反復アルゴリズムのクラスの中には、 機械学習のための訓練アルゴリズムがあり、Apache Sparkを開発の初期の刺激となった。RDDの可用性は、ループ内で複数回データセットを参照する反復法アルゴリズム、および対話型/探索型データ分析、データ反復のデータベースクエリの両方の実装を容易にする。このようなアプリケーションのレイテンシ（Apache Hadoopスタックでは一般的であったMapReduce実装と比較して）は、桁違いに低下する可能性がある。反復アルゴリズムのクラスの中には、 機械学習のための訓練アルゴリズムがあり、Apache Sparkを開発の初期の刺激となった
                            </p>
                        </div>
                    </div>
                </div>
                <div className="check-change-bottom-space">
                    <img src={absurd} className="just-for-fun-1"/>
                </div>
                <div className="content-space"/>
            </div>
        )
    }
}

export default Check