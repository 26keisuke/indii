import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import styled, {css, keyframes} from "styled-components"

import sample from "../../images/sample1.png"
import question from "../../images/question.png"
import post from "../../images/post.png"

import "./Topic.css"
import Back from "./../Util/Back"

class TopicPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toggle: {
                topic: true,
                talk: false,
                activity: false,
            }
        }
    }

    toggleState = (name) => {
        this.setState({
            toggle: {
                topic: false,
                talk: false,
                activity: false,
            } 
        })
        this.setState({
            toggle: {
                [name]: true,
            }
        })
    }

    toggleBar = (name) => {
        if(this.state.toggle[name] === true) {
            return ""
        } 
        return "hide"
    }

    toggleText = (name) => {
        if(this.state.toggle[name] === true) {
            return "topic-top-toggle-selected"
        } 
        return "topic-top-toggle-unselected"
    }

    render() {
 
        return (
            <TopicBox>
                <TopicTop>
                    <div>
                        <BackWrapper>
                            <div>
                                <Back
                                    back={() => this.props.history.goBack()}
                                    name="戻る"
                                />
                            </div>
                        </BackWrapper>
                        <TopicTags>
                            <p># Apache</p>
                            <p># Open Source</p>
                            <p># Computer Science</p>
                        </TopicTags>
                        <TopicTitle>
                            Apache Kafka
                        </TopicTitle>
                        <TopicContent>
                        2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．公式のトップページに掲載されているセールスポイントは以下の4つ．
    Fast とにかく大量のメッセージを扱うことができる
    Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールすることができる
    Durable メッセージはディスクにファイルとして保存され，かつクラスタ内でレプリカが作成されるためデータの損失を防げる（パフォーマンスに影響なくTBのメッセージを扱うことができる）
    Distributed by Design クラスタは耐障害性のある設計になっている。Use Casesをあげると，メッセージキューやウェブサイトのアクティビティのトラッキング（LinkedInのもともとのUse Case），メトリクスやログの収集，StormやSamzaを使ったストリーム処理などがあげられる．
    利用している企業は例えばTwitterやNetflix，Square，Spotify，Uberなどがある（cf. Powered By）
                        </TopicContent>
                        <TopicTimeStamp>Last Edited: 2019/2/12 9:20PM</TopicTimeStamp>
                        <TopicOption>
                            <div>
                                <PostRequestIcon src={question} alt="ポストリクエストのボタン"/>
                            </div>
                            <div>
                                <PostCreateIcon src={post} alt="ポスト作成のボタン"/>
                            </div>
                        </TopicOption>
                        <TopicToggle>
                            <TopicToggleElement selected={this.state.toggle["topic"]} onClick={() => this.toggleState("topic")}>
                                <p>トピック</p>
                                <div/>
                            </TopicToggleElement>
                            <TopicToggleElement selected={this.state.toggle["talk"]} onClick={() => this.toggleState("talk")}>
                                <p>フリートーク</p>
                                <div/>
                            </TopicToggleElement>
                            <TopicToggleElement selected={this.state.toggle["activity"]} onClick={() => this.toggleState("activity")}> 
                                <p>アクティビティー </p>
                                <div/>
                            </TopicToggleElement>
                        </TopicToggle>
                    </div>
                    <img src={sample} alt="トピックを代表する写真"/>
                </TopicTop>
                <Gap/>
                <TopicBottom>
                    <div className="topic-bottom-left"> 
                        {/* <div className="topic-summary-table">
                            <div className="topic-summary-table-header">
                                <p>Quick Summary</p>
                            </div>
                            <div className="topic-summary-table-content">
        
                            </div>
                        </div> */}
                        <div className="topic-contents">
                            {/*ここにポストが入る*/}
                        </div>
                    </div>
                    <div className="topic-bottom-right">
                        <div className="topic-table-of-contents">
                            <div className="topic-table-of-contents-header">
                                <p>Contents</p>
                            </div>
                        </div>
                    </div>
                </TopicBottom>
            </TopicBox>
        )
    }
}

const TopicBox = styled.div`
    width:100%;
    height: 100%;
    overflow-y: scroll;
`

const TopicTop = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: 1px solid #d2d2d2;
    padding-top: 40px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 50px;

    & > div {
        display: flex;
        flex-direction: column;
        position: relative;
    }

    & > img {
        height: 250px;
        width: 250px;
        padding-right: 60px;
        object-fit: contain;
        flex-shrink: 0;
    }
`

const TopicTags = styled.div`
    display: flex;
    flex-direction: row;

    & > p {
        color: #5a5a5a;
        font-size: 13px;
        margin-bottom: 7px;
        margin-right: 8px;
        flex-shrink: 0;
    }
`

const TopicTitle = styled.p`
    color: #1C1C1C;
    font-size: 23px;
    font-weight: bold;
    margin-bottom:15px;
`

const TopicTimeStamp = styled.p`
    font-size: 11px;
    color: #5a5a5a;
`

const TopicBottom = styled.div`
    display: flex;
    flex-direction: row;
    width:100%;
    height: 100%;
    background-color: #f9f9f9;
`

const TopicContent = styled.p`
    color: #2B2B2b;
    margin-bottom: 30px;
    margin-right:30px;
`

const TopicOption = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    right:38px;
    bottom: 0px;

    & > div {
        width:28px;
        height:28px;
        border: 0.5px solid #636480;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        cursor: pointer;
        margin-left: 30px;
    }
`

const PostRequestIcon = styled.img`
    width: 22px;
    height: 22px;
`

const PostCreateIcon = styled.img`
    width: 18px;
    height: 18px;
`

const TopicToggle = styled.div`
    display: flex;
    position: absolute;
    bottom:-45px;
`

const extend = keyframes`
    from {
        width: 0px;
    } to {
        width: 80%;
    }
`

const TopicToggleElement = styled.div`
    padding: 10px;
    padding-bottom: 0px;
    margin-right:70px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    flex-shrink: 0;
    align-items: center;
    position: relative;

    & > p {
        color: ${props => props.selected ? "#000000" : "#8D8D8D"}
    }

    & > div {
        ${props => props.selected && css`
            background-color: #636480;
            width:100%;
            height:1px;
            animation-name: ${extend};
            animation-duration: 250ms;
            animation-timing-function: ease-in-out;
        `}
    }
`

const BackWrapper = styled.div`
    position: relative;
    margin-top: 6px;

    & > div {
        position: absolute;
        width: 300px;
        top: -32px;
        left: -11px;
    }
`

const Gap = styled.div`
    height:10px;
    border-bottom: 1px solid #d2d2d2;
    background-color: #F9F9F9;
`

export default withRouter(TopicPage);