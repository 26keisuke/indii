import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import { Helmet } from "react-helmet"

import sample from "../../images/sample1.png"

import Post from "../Post/Element/Element"
import Screen from "../Util/Screen"
import Topic from "./Topic/Topic"

const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 11px;

    & p:nth-child(1){
        color: #464646;
        font-size: 12px;
        margin: 0px 10px;
    }
`

const Wrapper = styled.div`
    padding: 15px 0px;
`

class SearchResult extends Component {

    renderLeft = () => {
        return (
            <Wrapper>
                <Title>
                    <p>"Neural Networks"</p>
                    <p>の検索結果</p>
                </Title>
                <div>
                    <Post
                        search={true}
                        topic={"Apache Kafka"}
                        title={"Stream Processingとの関係"}
                        count={202}
                        date={"August 21, 2013 5:36 AM"}
                        img={sample}
                    />
                    <Post
                        search={true}
                        topic={"Apache Kafka"}
                        title={"Stream Processingとの関係"}
                        count={202}
                        date={"August 21, 2013 5:36 AM"}
                        img={sample}
                    />
                    <Post
                        search={true}
                        topic={"Apache Kafka"}
                        title={"Stream Processingとの関係"}
                        count={202}
                        date={"August 21, 2013 5:36 AM"}
                        img={sample}
                    />
                </div>
            </Wrapper> 
        )
    }

    renderRight = () => {
        return (
            <div>
                <Topic
                    img={sample}
                    tags={["飯塚", "飯塚啓介", "なのか"]}
                    topicName={"Apache Kafka"}
                    description={"私はネットワークセキュリティのトレンドについてよく質問を受ける。ネットワークセキュリティを"}
                    likes={"211,000"}
                />
            </div>
        )
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>{"Neural Networks" + "の検索結果 | Indii"}</title>
                    <meta name="description" content=""/>
                    <meta name="keywords" content=""/>
                </Helmet>
                <Screen space={false} noHeader={true} noBorder={true} noHeaderSpace={true}>
                    {this.renderLeft()}
                    {this.renderRight()}
                </Screen>
            </div>
        )
    }
}


export default withRouter(SearchResult)