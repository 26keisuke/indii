import React, { Component } from "react";
import styled from "styled-components"
import { connect } from "react-redux"

import * as actions from "../../actions"

import sample from "../../images/sample0.jpg"

import PostFeed from "./Post/Post";
import People from "./People/People";
import Trend from "./Trend/Trend"

import Screen, { FeedSpace } from "../Util/Screen"
import { Space } from "../Theme"

const FeedInsideHeader = styled.div`
    height: 40px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    padding-left: 35px;
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;

    & > p {
        font-size: 14px;
    }
`

const PeopleWrapper = styled.div`
    border-bottom: 1px solid #eaeaea;
    background-color: #ffffff;
`

const TrendWrapper = styled.div`
    margin-left: 5px;
`

class Feed extends Component {

    componentDidMount() {
        this.props.fetchFeed()
        this.props.fetchRecommend()
    }

    renderLeft = () => {
        return(
            <div>
                <div style={{borderBottom: "1px solid #eaeaea"}}/>
                {Object.keys(this.props.feed.feed).length > 0
                ?
                    this.props.feed.feed.map(elem => 
                        <PostFeed
                            key={elem._id}
                            id={elem._id}
                            userId={elem.creator._id}
                            photo={elem.creator.photo}
                            name={elem.creator.userName}
                            action={"CREATE_POST"}
                            date={elem.lastEdited}
                            topicId={elem.topic}
                            topicName={elem.topicName}
                            title={elem.postName}
                            content={elem.content}
                            star={elem.star.lookUp}
                            rating={elem.rating}
                        />
                    )
                :
                    ([
                    <PostFeed key={"s1"} skeleton={true}/>
                    ,
                    <PostFeed key={"s2"} skeleton={true}/>
                    ,
                    <PostFeed key={"s3"} skeleton={true}/>
                    ])
                }
                <FeedSpace/>
                {/* <FeedInsideHeader>
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
                </PeopleWrapper> */}
                <FeedSpace/>
                {/* <PostFeed
                    id={"123"}
                    name={"飯塚　啓介"}
                    action={"CREATE_POST"}
                    date={"January 2, 2018 5:46 PM"}
                    topic={"Apache Kafka"}
                    title={"Apache Kafkaとは？"}
                    content={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．公式のトップページに掲載されているセールスポイントは以下の4つ．Fast とにかく大量のメッセージを扱うことができる。Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールすることができる。Durable メッセージはディスクにファイルとして保存され，かつクラスタ内でレプリカが作成されるためデータの損失を防げる（パフォーマンスに影響なくTBのメッセージを扱うことができる）。Distributed by Design クラスタは耐障害性のある設計になっている。Use Casesをあげると，メッセージキューやウェブサイトのアクティビティのトラッキング（LinkedInのもともとのUse Case），メトリクスやログの収集，StormやSamzaを使ったストリーム処理などがあげられる．。利用している企業は例えばTwitterやNetflix，Square，Spotify，Uberなどがある（cf. Powered By"}
                /> */}
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

function mapStateToProps({feed}) {
    return {
        feed
    }
}

export default connect(mapStateToProps, actions)(Feed)