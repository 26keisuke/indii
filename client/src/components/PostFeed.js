import React, { Component } from "react";

import "./PostFeed.css";

import {Collapse} from 'react-collapse';

import response from "../images/response.png";
import star_pressed from "../images/star-pressed.png";
import star from "../images/star.png";
import more from "../images/more.png";
import down from "../images/down.png";
import sample from "../images/sample0.jpg";

class PostFeed extends Component {

    constructor(props) {
        super(props)
        this.state = {isOpened: true, btnClass: "post-feed-down"}
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const rotate = !this.state.isOpened ? "rotate-1" : "rotate"
        const btnClass = "post-feed-down" + " " + rotate
        this.setState({
            isOpened: !this.state.isOpened,
            btnClass: btnClass
        })
    }

    render() {

        return (
                <div className="post-feed">
                    <div className="post-feed-top">
                        <div className="post-feed-profile">
                            <img src={sample} className="post-feed-profile-img"/>
                            <div className="post-feed-profile-desc">
                                <span className="post-feed-profile-top">
                                    <p className="post-feed-profile-name">
                                        飯塚　啓介
                                    </p>
                                    <p className="post-feed-profile-action">
                                        さんが新しいポストを投稿しました。
                                    </p>
                                </span>
                                <p className="post-feed-profile-bottom">
                                    January 2, 2018 5:46 PM
                                </p>
                            </div>
                        </div>
                        <img 
                            src={down} 
                            className={this.state.btnClass}
                            onClick={this.handleClick}
                        />
                    </div>
                    
                    <div className="post-feed-middle">
                        <p className="post-feed-topic">Apache Kafka</p>
                        <p className="post-feed-title">Apache Kafkaとは？</p>
                        <Collapse isOpened={this.state.isOpened}>
                        <p className="post-feed-content">
                        2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．公式のトップページに掲載されているセールスポイントは以下の4つ．
    Fast とにかく大量のメッセージを扱うことができる
    Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールすることができる
    Durable メッセージはディスクにファイルとして保存され，かつクラスタ内でレプリカが作成されるためデータの損失を防げる（パフォーマンスに影響なくTBのメッセージを扱うことができる）
    Distributed by Design クラスタは耐障害性のある設計になっている。Use Casesをあげると，メッセージキューやウェブサイトのアクティビティのトラッキング（LinkedInのもともとのUse Case），メトリクスやログの収集，StormやSamzaを使ったストリーム処理などがあげられる．
    利用している企業は例えばTwitterやNetflix，Square，Spotify，Uberなどがある（cf. Powered By）
                        </p>
                        </Collapse>
                    </div>
                    <Collapse isOpened={this.state.isOpened}>
                    <div className="post-feed-bottom">
                        <img src={star}/>
                        <img src={response}/>
                        <img src={more}/>
                    </div>
                    </Collapse>
                </div>
        )
    }
}

export default PostFeed;