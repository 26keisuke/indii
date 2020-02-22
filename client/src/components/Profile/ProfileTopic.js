import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import TopicElement from "../Topic/Element/Element"


class ProfileTopic extends Component {

    render() {
        return (
            <div className="profile-wrapper">
                <div className="profile-topic-wrapper">
                    <TopicElement
                        title={"Apache Kafka"}
                        content={"BrokerはConsumerがメッセージを購読したかに関わらず設定された期間のみ保持してその後削除する．これはKafkaの大きな特徴の1つである．例えば保存期間を2日間に設定すれば配信後2日間のみ。"}
                        likes={212233}
                        tags={["Computer Science", "Open Source", "Batch Processing"]}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps({auth}) {
    return {
        auth
    }
}

export default connect(mapStateToProps, null)(ProfileTopic)