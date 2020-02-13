import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components"

import sample from "../../images/sample1.png"

import SearchResultTalk from "../Talk/Element/Element"
import SearchFilter from "./Filter/Filter"
import People from "../People"
import Post from "../Post/Element/Element"
import TopicElement from "../Topic/Element/Element"

import Screen from "../Util/Screen"

import { Space } from "../Theme"

import "./SearchResult.css"

const Title = styled.div`
    display: flex;
    flex-direction: row;
    & p:nth-child(1){
        color: #464646;
        font-size: 14px;
        margin: 0px 10px;
    }
`

const ResultInsideHeader = styled.div`
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

const TopicWrapper = styled.div`
    border-bottom: 1px solid #d2d2d2;
`

const PostWrapper = styled.div`
    border-bottom: 1px solid #d2d2d2;
`

const PeopleWrapper = styled.div`
    border-right:1px solid #d2d2d2;
    border-left:1px solid #d2d2d2;
    border-bottom:1px solid #d2d2d2;
`

const RightInsideTitle = styled.div`
    height:35px;
    padding-left:30px;
    border: 1px solid #d2d2d2;
    font-size: 16px;
    display: flex;
    align-items: center;
`

class SearchResult extends Component {

    renderTitle = () => {
        return (
            <Title>
                <p>"Neural Networks"</p>
                <p>の検索結果</p>
            </Title>
        )
    }

    renderLeft = () => {
        return (
            <div>
                <div>
                    <ResultInsideHeader>
                        <p>トピック</p>
                    </ResultInsideHeader>
                    <TopicWrapper>
                        <TopicElement
                            title={"Apache Kafka"}
                            content={"BrokerはConsumerがメッセージを購読したかに関わらず設定された期間のみ保持してその後削除する．これはKafkaの大きな特徴の1つである．例えば保存期間を2日間に設定すれば配信後2日間のみデータは保持されその後削除される。このためConsumerサイドがメッセージをどこまで読んだがを自らが管理する（Brokerが管理する必要がない）。"}
                            likes={212233}
                            tags={["Computer Science", "Open Source", "Batch Processing"]}
                        />
                    </TopicWrapper>
                </div>
                <Space height="10px" backgroundColor="#f9f9f9"/>
                <div>
                    <ResultInsideHeader>
                        <p>ポスト</p>
                    </ResultInsideHeader>
                    <PostWrapper>
                        <Post
                            topic={"Apache Kafka"}
                            title={"Stream Processingとの関係"}
                            content={"とにかく大量のメッセージを扱うことができる Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールできる。とにかく大量のメッセージを扱うことができる Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールできる。 "}
                            count={202}
                            date={"August 21, 2013 5:36 AM"}
                            img={sample}
                        />
                    </PostWrapper>
                </div>
                <Space height="10px" backgroundColor="#f9f9f9"/>
                <div>
                    <ResultInsideHeader>
                        <p>トーク</p>
                    </ResultInsideHeader>
                    <SearchResultTalk
                        topic={"Apache Kafka"}
                        date={"September 29, 2014"}
                        tag={"question"}
                        title={"なぜApache KafkaはApache Flinkよりも使われているのですか？"}
                        content={"例えば保存期間を2日間に設定すれば配信後2日間のみデータは保持されその後削除される． このためConsumerサイドがメッセージをどこまで読んだがを自らが管理する（Brokerが管理する必要がない）．とにかく大量のメッセージを扱うことができる Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールできる。"}
                        star={12}
                        comment={12}
                    />
                </div>
            </div>
        )
    }

    renderRight = () => {
        return (
            <div>
                <RightInsideTitle>
                    <p>検索フィルター</p>
                </RightInsideTitle>
                <SearchFilter/>
                <RightInsideTitle>
                    <p>あなたにおすすめのライター</p>
                </RightInsideTitle>
                <PeopleWrapper>
                    <People
                        id={"123456789"}
                        name={"飯塚啓介"} 
                        job={"Chief株式会社 CEO"} 
                        intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなど..."}
                    />
                </PeopleWrapper>
            </div>
        )
    }

    render() {
        return (
            <Screen back={true}>
                {this.renderTitle()}
                {this.renderLeft()}
                {this.renderRight()}
            </Screen>
        )
    }
}


export default withRouter(SearchResult)