import React, { Component } from "react"

import sample from "../images/sample1.png"
import question from "../images/question.png"
import post from "../images/post.png"

import "./Topic.css"

class Topic extends Component {
    render() {
        return (
            <div className="content-full">
                <div className="topic">
                    <div className="topic-top">
                        <div className="topic-top-left">
                            <div className="topic-top-tags">
                                <p># Apache</p>
                                <p># Open Source</p>
                                <p># Computer Science</p>
                            </div>
                            <p className="topic-top-title">
                                Apache Kafka
                            </p>
                            <p className="topic-top-desc">
                            2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．公式のトップページに掲載されているセールスポイントは以下の4つ．
        Fast とにかく大量のメッセージを扱うことができる
        Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールすることができる
        Durable メッセージはディスクにファイルとして保存され，かつクラスタ内でレプリカが作成されるためデータの損失を防げる（パフォーマンスに影響なくTBのメッセージを扱うことができる）
        Distributed by Design クラスタは耐障害性のある設計になっている。Use Casesをあげると，メッセージキューやウェブサイトのアクティビティのトラッキング（LinkedInのもともとのUse Case），メトリクスやログの収集，StormやSamzaを使ったストリーム処理などがあげられる．
        利用している企業は例えばTwitterやNetflix，Square，Spotify，Uberなどがある（cf. Powered By）
                            </p>
                            <p className="topic-top-edited">Last Edited: 2019/2/12 9:20PM</p>
                            <div className="topic-top-options">
                                <div className="topic-top-icon-box">
                                    <img className="topic-top-icon-request" src={question}/>
                                </div>
                                <div className="topic-top-icon-box">
                                    <img className="topic-top-icon-create" src={post}/>
                                </div>
                            </div>
                            <div className="topic-top-toggle">
                                <div className="topic-top-toggle-box">
                                    <p className="topic-top-toggle-selected">トピック</p>
                                    <div className="topic-top-underline"/>
                                </div>
                                <div className="topic-top-toggle-box">
                                    <p className="topic-top-toggle-unselected">トーク</p>
                                    <div className="topic-top-underline no-show"/>
                                </div>
                                <div className="topic-top-toggle-box"> 
                                    <p className="topic-top-toggle-unselected">アクティビティー </p>
                                    <div className="topic-top-underline no-show"/>
                                </div>
                            </div>
                        </div>
                        <img src={sample} className="topic-top-right"/>
                    </div>
                    <div className="content-space"/>
                    <div className="topic-bottom">
                        <div className="topic-bottom-left">
                            <div className="topic-summary-table">
                                <div className="topic-summary-table-header">
                                    <p>Quick Summary</p>
                                </div>
                                <div className="topic-summary-table-content">

                                </div>
                            </div>
                            <div className="topic-contents">
                                {/* ここにコンテンツが入る */}
                            </div>
                        </div>
                        <div className="topic-bottom-right">
                            <div className="topic-table-of-contents">
                                <div className="topic-table-of-contents-header">
                                    <p>Contents</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Topic;