import React, { Component } from "react";
import styled from "styled-components"

import sample from "../../images/sample0.jpg"
// import sample1 from "../../images/sample1.png";

import PostFeed from "./Post/Post";
import People from "./People/People";
// import Post from "../Post/Element/Element"
import Trend from "./Trend/Trend"


import Screen, { FeedSpace } from "../Util/Screen"
import { Space } from "../Theme"

const FeedRightHeader = styled.div`
    height:35px;
    padding-left:30px;
    border: 1px solid #d2d2d2;
    font-size: 16px;
    display: flex;
    align-items: center; 
`

const FeedInsideHeader = styled.div`
    height: 40px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    padding-left: 35px;
    border-top: 1px solid #d2d2d2;
    border-bottom: 1px solid #d2d2d2;

    & > p {
        font-size: 14px;
    }
`

const PeopleWrapper = styled.div`
    border-bottom: 1px solid #d2d2d2;
    background-color: #ffffff;
`

const PostWrapper = styled.div`
    border-left: 1px solid #d2d2d2;
    border-right: 1px solid #d2d2d2;
    border-bottom: 1px solid #d2d2d2;
`

const TrendWrapper = styled.div`
    margin-left: 5px;
`

class Feed extends Component {

    renderLeft = () => {
        return(
            <div>
                <PostFeed
                    id={1}
                    name={"飯塚　啓介"}
                    action={"CREATE_POST"}
                    date={"January 2, 2018 5:46 PM"}
                    topic={"Apache Kafka"}
                    title={"Apache Kafkaとは？"}
                    content={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．公式のトップページに掲載されているセールスポイントは以下の4つ．Fast とにかく大量のメッセージを扱うことができる。Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールすることができる。Durable メッセージはディスクにファイルとして保存され，かつクラスタ内でレプリカが作成されるためデータの損失を防げる（パフォーマンスに影響なくTBのメッセージを扱うことができる）。Distributed by Design クラスタは耐障害性のある設計になっている。Use Casesをあげると，メッセージキューやウェブサイトのアクティビティのトラッキング（LinkedInのもともとのUse Case），メトリクスやログの収集，StormやSamzaを使ったストリーム処理などがあげられる．。利用している企業は例えばTwitterやNetflix，Square，Spotify，Uberなどがある（cf. Powered By"}
                />
                <FeedSpace/>
                <FeedInsideHeader>
                    <p>データベース関連のライター</p>
                </FeedInsideHeader>
                <PeopleWrapper>
                    <People 
                        id={"123"}
                        img={sample} 
                        name={"飯塚　啓介"} 
                        job={"Chief株式会社 CEO"} 
                        intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．"}
                    />
                    <People 
                        id={"123"}
                        img={sample} 
                        name={"飯塚　啓介"} 
                        job={"Chief株式会社 CEO"} 
                        intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．"}
                    />
                    <People
                        id={"123"} 
                        img={sample} 
                        name={"飯塚　啓介"} 
                        job={"Chief株式会社 CEO"} 
                        intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．"}
                    />
                </PeopleWrapper>
                <FeedSpace/>
                <PostFeed
                    id={"123"}
                    name={"飯塚　啓介"}
                    action={"CREATE_POST"}
                    date={"January 2, 2018 5:46 PM"}
                    topic={"Apache Kafka"}
                    title={"Apache Kafkaとは？"}
                    content={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．公式のトップページに掲載されているセールスポイントは以下の4つ．Fast とにかく大量のメッセージを扱うことができる。Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールすることができる。Durable メッセージはディスクにファイルとして保存され，かつクラスタ内でレプリカが作成されるためデータの損失を防げる（パフォーマンスに影響なくTBのメッセージを扱うことができる）。Distributed by Design クラスタは耐障害性のある設計になっている。Use Casesをあげると，メッセージキューやウェブサイトのアクティビティのトラッキング（LinkedInのもともとのUse Case），メトリクスやログの収集，StormやSamzaを使ったストリーム処理などがあげられる．。利用している企業は例えばTwitterやNetflix，Square，Spotify，Uberなどがある（cf. Powered By"}
                />
                <Space height="500px" backgroundColor="#f9f9f9"/>
            </div>
        )
    }

    renderRight = () => {
        return (
            <div>
                <TrendWrapper>
                    <Trend/>
                </TrendWrapper>
                {/* <FeedRightHeader>
                    <p>トレンド</p>
                </FeedRightHeader>
                <PostWrapper>
                    <Post
                        id={"123"} 
                        topic={"Apache Kafka"} 
                        title={"Stream Processingとの関係"} 
                        content={"とにかく大量のメッセージを扱うことができる Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールできる。 "} 
                        count={202} 
                        date={"August 21 2013"} 
                        img={sample1}
                    />
                </PostWrapper> */}
            </div>
        )
    }

    render() {
        return(
            <Screen noHeader={true}>
                {this.renderLeft()}
                {this.renderRight()}
            </Screen>
        )
    }
}

export default Feed;