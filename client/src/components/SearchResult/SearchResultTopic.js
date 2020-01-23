import React, { Component } from "react"

import sample from "../../images/sample1.png"

class SearchResultTopic extends Component {
    render() {
        return (
            <div className="search-res-topic">
                <img src={sample} className="search-res-topic-img"/>
                <div className="search-res-topic-right">
                    <p className="search-res-topic-title">Apache Kafka</p>
                    <p className="search-res-topic-content">
                    BrokerはConsumerがメッセージを購読したかに関わらず設定された期間のみ保持してその後削除する．これはKafkaの大きな特徴の1つである．例えば保存期間を2日間に設定すれば配信後2日間のみデータは保持されその後削除される．

このためConsumerサイドがメッセージをどこまで読んだがを自らが管理する（Brokerが管理する必要がない）．
                    </p>
                    <div className="search-res-topic-bottom">
                        <p className="search-res-topic-likes">
                        102,301 Favorites
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchResultTopic