import React, { Component } from "react";

import sample from "../../images/sample0.jpg"
import sample1 from "../../images/sample1.png";

import PostFeed from "./PostFeed";
import PeopleFeed from "./PeopleFeed";
import Post from "../Post"

class Feed extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){

    }

    render() {
        return(
            <div className="content">
                <div className="content-left">
                    <div className="content-space"/>
                    <PostFeed
                        id={"1"}
                        name={"飯塚　啓介"}
                        action={"CREATE_POST"}
                        date={"January 2, 2018 5:46 PM"}
                        topic={"Apache Kafka"}
                        title={"Apache Kafkaとは？"}
                        content={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．公式のトップページに掲載されているセールスポイントは以下の4つ．Fast とにかく大量のメッセージを扱うことができる。Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールすることができる。Durable メッセージはディスクにファイルとして保存され，かつクラスタ内でレプリカが作成されるためデータの損失を防げる（パフォーマンスに影響なくTBのメッセージを扱うことができる）。Distributed by Design クラスタは耐障害性のある設計になっている。Use Casesをあげると，メッセージキューやウェブサイトのアクティビティのトラッキング（LinkedInのもともとのUse Case），メトリクスやログの収集，StormやSamzaを使ったストリーム処理などがあげられる．。利用している企業は例えばTwitterやNetflix，Square，Spotify，Uberなどがある（cf. Powered By"}
                    />
                    <div className="content-space"/>
                    <div className="content-inside-header no-border-top">
                        <p>データベース関連のライター</p>
                    </div>
                    <div className="content-people-wrapper">
                        <PeopleFeed 
                            id={"123"}
                            img={sample} 
                            name={"飯塚　啓介"} 
                            job={"Chief株式会社 CEO"} 
                            intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．"}
                        />
                        <PeopleFeed 
                            id={"123"}
                            img={sample} 
                            name={"飯塚　啓介"} 
                            job={"Chief株式会社 CEO"} 
                            intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．"}
                        />
                        <PeopleFeed
                            id={"123"} 
                            img={sample} 
                            name={"飯塚　啓介"} 
                            job={"Chief株式会社 CEO"} 
                            intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．"}
                        />
                    </div>
                    <div className="content-space"/>
                    <PostFeed
                        id={"123"}
                        name={"飯塚　啓介"}
                        action={"CREATE_POST"}
                        date={"January 2, 2018 5:46 PM"}
                        topic={"Apache Kafka"}
                        title={"Apache Kafkaとは？"}
                        content={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．公式のトップページに掲載されているセールスポイントは以下の4つ．Fast とにかく大量のメッセージを扱うことができる。Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールすることができる。Durable メッセージはディスクにファイルとして保存され，かつクラスタ内でレプリカが作成されるためデータの損失を防げる（パフォーマンスに影響なくTBのメッセージを扱うことができる）。Distributed by Design クラスタは耐障害性のある設計になっている。Use Casesをあげると，メッセージキューやウェブサイトのアクティビティのトラッキング（LinkedInのもともとのUse Case），メトリクスやログの収集，StormやSamzaを使ったストリーム処理などがあげられる．。利用している企業は例えばTwitterやNetflix，Square，Spotify，Uberなどがある（cf. Powered By"}
                    />
                    <div className="content-bottom-space"/>
                </div>
                <div className="content-right">
                    <div className="content-right-card">
                        <div className="content-right-card-title">
                            <p>トレンド</p>
                        </div>
                        <div className="post-wrapper">
                            <Post
                                id={"123"} 
                                topic={"Apache Kafka"} 
                                title={"Stream Processingとの関係"} 
                                content={"とにかく大量のメッセージを扱うことができる Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールできる。 "} 
                                count={202} 
                                date={"August 21, 2013 5:36 AM"} 
                                img={sample1}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Feed;