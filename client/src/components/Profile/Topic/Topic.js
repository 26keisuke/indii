import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import TopicElement from "../../Topic/Element/Element"

class ProfileTopic extends Component {

    render() {
        return (
            <Wrapper>
                <Box>
                    <TopicElement
                        title={"Apache Kafka"}
                        content={"BrokerはConsumerがメッセージを購読したかに関わらず設定された期間のみ保持してその後削除する．これはKafkaの大きな特徴の1つである．例えば保存期間を2日間に設定すれば配信後2日間のみ。"}
                        likes={212233}
                        tags={["Computer Science", "Open Source", "Batch Processing"]}
                    />
                </Box>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    height: 100%;
    background-color: #fafafa;
    padding: 30px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Box = styled.div`
    box-shadow: 1px 1px 10px #eaeaea;
    width: 600px;
    margin-bottom: 12px;
`

function mapStateToProps({auth}) {
    return {
        auth
    }
}

export default connect(mapStateToProps, null)(ProfileTopic)