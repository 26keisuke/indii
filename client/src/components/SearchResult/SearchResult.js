import React, { Component } from "react"

import absurd from "../../images/absurd/09.png"

import sample from "../../images/sample1.png"

import SearchResultTopic from "./SearchResultTopic"
import SearchResultTalk from "./SearchResultTalk"
import SearchFilter from "./SearchFilter"
import SearchResultPeople from "./SearchResultPeople"
import Post from "../Post"

import LeftAndRightBack from "../LeftAndRightBack"

import "./SearchResult.css"

class SearchResult extends Component {

    constructor(props) {
        super(props)

        this.renderLeft = this.renderLeft.bind(this)
        this.renderRight = this.renderRight.bind(this)
        this.renderTitle = this.renderTitle.bind(this)
    }

    renderTitle() {
        return (
            <div>
                <span className="content-header-title-bold">
                    "Neural Networks"
                </span>
                の検索結果
            </div>
        )
    }

    renderLeft() {
        return (
            <div>
                <div className="search-res-category">
                    <div className="search-res-space"/>
                    <div className="content-inside-header">
                        <p>トピック</p>
                    </div>
                    <SearchResultTopic
                        title={"Apache Kafka"}
                        content={"BrokerはConsumerがメッセージを購読したかに関わらず設定された期間のみ保持してその後削除する．これはKafkaの大きな特徴の1つである．例えば保存期間を2日間に設定すれば配信後2日間のみデータは保持されその後削除される。このためConsumerサイドがメッセージをどこまで読んだがを自らが管理する（Brokerが管理する必要がない）。"}
                        likes={212233}
                        tags={["Computer Science", "Open Source", "Batch Processing"]}
                    />
                </div>
                <div className="search-res-category">
                    <div className="search-res-space"/>
                    <div className="content-inside-header">
                        <p>ポスト</p>
                    </div>
                    <Post
                        topic={"Apache Kafka"}
                        title={"Stream Processingとの関係"}
                        content={"とにかく大量のメッセージを扱うことができる Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールできる。とにかく大量のメッセージを扱うことができる Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールできる。 "}
                        count={202}
                        date={"August 21, 2013 5:36 AM"}
                        img={sample}
                    />
                </div>
                <div className="search-res-category">
                    <div className="search-res-space"/>
                    <div className="content-inside-header">
                        <p>トーク</p>
                    </div>
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
                <div className="content-bottom-space">
                    <img src={absurd} className="just-for-fun"/>
                </div>
            </div>
        )
    }

    renderRight() {
        return (
            <div>
                <div className="content-right-card-title">
                    <p>検索フィルター</p>
                </div>
                <SearchFilter/>
                <div className="content-right-card-title">
                    <p>あなたにおすすめのライター</p>
                </div>
                <SearchResultPeople 
                    id={"123456789"}
                    name={"飯塚啓介"} 
                    job={"Chief株式会社 CEO"} 
                    intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなど..."}
                />
            </div>
        )
    }


    render() {
        return (
            <LeftAndRightBack
                url="/"
                backName="ホーム"
                title={this.renderTitle()}
                left={this.renderLeft()}
                right={this.renderRight()}
            />
        )
    }
}


export default SearchResult