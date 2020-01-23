import React, { Component } from "react"

import star_pressed from "../../images/star-pressed.png"
import feedback from "../../images/comment.png"

class SearchResultTalk extends Component {
    render() {
        return (
            <div className="search-result-talk">
                <div className="search-result-talk-top">
                    <p className="search-result-talk-topic">Apache Kafka</p>
                    <p className="search-result-talk-date">September 29, 2014</p>
                    <div className="search-result-talk-tag">
                        <p>Question</p>
                    </div>
                </div>
                <p className="search-result-talk-title">
                    なぜApache KafkaはApache Flinkよりも使われているのですか？
                </p>
                <p className="search-result-talk-content">
                例えば保存期間を2日間に設定すれば配信後2日間のみデータは保持されその後削除される． このためConsumerサイドがメッセージをどこまで読んだがを自らが管理する（Brokerが管理する必要がない）．とにかく大量のメッセージを扱うことができる Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールできる。
                </p>
                <div className="search-result-talk-bottom">
                    <img src={star_pressed} className="search-result-talk-star"/>
                    <p className="search-result-talk-star-count">12</p>
                    <img src={feedback} className="search-result-talk-comment"/>
                    <p className="search-result-talk-comment-count">12</p>
                </div>
            </div>
        )
    }
}

export default SearchResultTalk