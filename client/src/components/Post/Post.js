import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import BraftEditor from 'braft-editor'
import Skeleton from 'react-loading-skeleton';

import * as actions from "../../actions"

import sample0 from "../../images/sample0.jpg"
import sample from "../../images/sample1.png"

import { SlashTitle } from "../Feed/Trend/Trend"
import People from "../People/People"
import Screen from "../Util/Screen"
import Recommend from "../Util/Recommend"
import List from "../Draft/Tool/List/List"
import { Space } from "../Theme"

class Post extends Component {

    componentDidMount() {
        const url = this.props.location.pathname
        const id = url.substring(url.lastIndexOf('/') + 1)
        this.props.fetchPost("5e49f488a4dd289d38ec0fff")
    }

    renderHeader = () => {
        return(
            <div>
                <HeaderTitle>{this.props.post.fetched.postName || <Skeleton width={200} height={18}/>}</HeaderTitle>
            </div>
        )
    }

    renderLeft = () => {
        return(
            <div>
                { this.props.post.fetched.content
                ?
                <BraftEditor
                    controls={[]}
                    readOnly={true}
                    value={BraftEditor.createEditorState(this.props.post.fetched.content)}
                    contentClassName="post-braft"
                />
                :
                <SkeletonWrapper>
                    <Skeleton count={5} width={600} height={18}/>
                    <Skeleton width={400} height={18}/>
                    <SkeletonWrapper2>
                        <Skeleton width={250} height={320}/>
                        <div>
                            <SkeletonWrapper3>
                                <Skeleton count={3} width={320} height={18}/>
                                <Skeleton width={200} height={18}/>
                            </SkeletonWrapper3>
                            <SkeletonWrapper3>
                                <Skeleton count={5} width={320} height={18}/>
                                <Skeleton width={200} height={18}/>
                            </SkeletonWrapper3>
                        </div>
                    </SkeletonWrapper2>
                    <Skeleton count={5} width={600} height={18}/>
                    <Skeleton width={400} height={18}/>
                </SkeletonWrapper>
                }   
                <Space height={"300px"}/>
            </div>
        )
    }

    renderRight = () => {
        return(
            <div>
                <TopicInfo>
                    <Overlay/>
                    <img src={sample}/>
                    <Tag>
                        <div>
                            <p># タグ1</p>
                        </div>
                        <div>
                            <p># タグ2</p>
                        </div>
                        <div>
                            <p># タグ3</p>
                        </div>
                    </Tag>
                    <Title>タイトルが入ります</Title>
                    <Content>桶狭間の戦い（おけはざまのたたかい）は、日本の戦国時代の永禄3年5月19日（1560年6月12日）に尾張国桶狭間で行われた。</Content>
                </TopicInfo>
                <TitleWrapper>
                    <SlashTitle>
                        <p>このポストの著者</p>
                        <p>//////////////////////////////</p>
                    </SlashTitle>
                </TitleWrapper>
                <People
                    id={"123456789"}
                    name={"飯塚啓介"} 
                    job={"Chief株式会社 CEO"} 
                    intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなど。よろしくお願いします。"}
                />
                <TitleWrapper>
                    <SlashTitle>
                        <p>参照</p>
                        <p>////////////////////////////////////////</p>
                    </SlashTitle>
                </TitleWrapper>
                <List
                    reference={this.props.post.fetched.ref || []}
                />
                <TitleWrapper>
                    <SlashTitle>
                        <p>関連するポスト</p>
                        <p>////////////////////////////////</p>
                    </SlashTitle>
                </TitleWrapper>
                <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample0}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample}
                />
                <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample0}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample}
                />
                <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample0}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample}
                />
            </div>
        )
    }

    render() {
        return (
            <Screen space={false} withBack={true}>
                {this.renderHeader()}
                {this.renderLeft()}
                {this.renderRight()}
            </Screen>
        )
    }
}

const TitleWrapper = styled.div`
    margin-top: 20px;
`

const HeaderTitle = styled.h1`
    color: #222222;
    font-size: 16px;
`

const SkeletonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    height: 100%;
    overflow: inherit;

    & > span {
        display: flex;
        flex-direction: column;
        align-items: center;

        & > span {
            margin-bottom: 10px;
        }

        & > span:last-child{
            align-self: start;
            margin-left: 38px;
        }
    }
`

const SkeletonWrapper2 = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 38px;
    margin-bottom: 20px;
`

const SkeletonWrapper3 = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 4px;

    & > span {
        display: flex;
        flex-direction: column;
        align-items: center;

        & > span {
            margin-bottom: 10px;
            margin-left: 31px;
        }

    }

    & > span:nth-child(2) {
        align-self: start;
    }
`

const TopicInfo = styled.div`
    position: relative;
    width: 360px;
    height: 200px;
    margin-bottom: 20px;

    & > img {
        max-width: 100%;
        height: auto;
        width: auto;
        box-shadow: 1px 1px 10px #d2d2d2;
    }
`

const Overlay = styled.div`
    content: "";
    background-color: #000000;
    opacity: 0.6;
    width: 360px;
    height: 180px;
    position: absolute;
`

const Tag = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    color: #ffffff;
    bottom: 90px;
    left: 20px;
    font-weight: bold;

    & > div {
        margin-right: 10px;
    }
`

const Title = styled.h2`
    position: absolute;
    color: #ffffff;
    font-size: 14px;
    bottom: 55px;
    left: 18px;
    font-weight: bold;
`

const Content = styled.p`
    position: absolute;
    bottom: 30px;
    left: 20px;
    color: white;
    padding-right: 20px;
`


function mapStateToProps(state) {
    return {
        post: state.post
    }
}

export default connect(mapStateToProps, actions)(Post)