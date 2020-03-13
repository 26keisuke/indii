import React, { Component } from "react"
import styled from "styled-components"
import { IoIosAddCircleOutline } from "react-icons/io"
import { connect } from "react-redux"
import { Helmet } from "react-helmet"

import * as actions from "../../actions"

import TalkFeed from "./Element/Element"
import Content from "./Content/Content"
import { Space } from "../Theme"

import { checkAuth, fmtDate } from "../Util/util"

class Talk extends Component {

    componentDidUpdate(prevProps) {
        if(!prevProps.talk.fetched[0] && this.props.talk.fetched[0]){
            this.props.selectTalk(this.props.talk.fetched[0])
        }
    }

    componentDidMount() {
        this.props.fetchTalks();
    }

    handleClick = (e) => {

        const isAuthenticated = checkAuth(e, this.props)

        if(isAuthenticated){
            const id = "1";
            const action = "ADD_TALK";
            const title = "新しいトークを作成"
            const message = "トークのタイトルを入力してください。";
            const caution = "";
            const buttonMessage = "次へ";
            this.props.enableGray();
            this.props.showConfirmation(id, action, title, caution, message, buttonMessage, "ADD_TALK_REF");
        }
    }

    handleTalkClick = (e, talk) => {
        e.preventDefault();
        this.props.selectTalk(talk)
    }

    render() {
        return (
            <Wrapper>
                <Helmet>
                    <title>{"トーク | Indii"}</title>
                    <meta name="description" content="Indii上のユーザー同士で交流することができます。力を合わして日本一のデータベースを作り上げましょう！"/>
                    <meta name="keywords" content={"コミュニティー,コンピューターサイエンス,ギーク,オタク"}/>
                </Helmet>
                <TalkBox>
                    <Feed>
                        <TalkHeader>
                            <h2>トーク一覧</h2>
                            <div>
                                <AddTalk onClick={this.handleClick}/>
                            </div>
                        </TalkHeader>
                        <div>
                            {   
                            this.props.talk.fetched[0]
                            ? 
                            this.props.talk.fetched.map(talk => 
                                <TalkFeed
                                    key={"feed"+talk._id}
                                    creator={talk.creator}
                                    date={fmtDate(talk.timeStamp)}
                                    title={talk.title}
                                    description={talk.description}
                                    counter={talk.msgCounter}
                                    handleClick={(e) => {this.handleTalkClick(e, talk)}}
                                    selected={talk._id === this.props.talk.selected._id}
                                />
                            )
                            :
                            <div>
                                <TalkFeed/>
                                <TalkFeed/> 
                                <TalkFeed/>   
                                <TalkFeed/>
                                <TalkFeed/> 
                                <TalkFeed/>   
                                <TalkFeed/>
                            </div>
                            }
                        </div>
                        <BottomSpace/>
                    </Feed>

                    <Content
                        talk={this.props.talk.selected}
                    />

                </TalkBox>

                <Space height={"200px"} backgroundColor={"#f9f9f9"}/>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    padding: 25px 0px;
    background-color: #f9f9f9;
`

const BottomSpace = styled.div`
    box-shadow: 0px -1px 4px #d2d2d2;
    height: 30px;
`

const Feed = styled.div`
    min-width: 320px;
    max-width: 320px;
    background-color: white;
    box-shadow: 1px 1px 10px #d2d2d2;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    margin-right: 20px;
`

const TalkHeader = styled.div`
    display: flex;
    padding: 10px 27px;
    position: relative;
    box-shadow: 0px 1px 4px #d2d2d2;
    
    & > h2 {
        font-size: 14px !important;
    }

    & > div:nth-child(2) {
        position: relative;
        margin-left: auto;
    }
`

const AddTalk = styled(IoIosAddCircleOutline)`
    position: absolute;
    color: ${props => props.theme.primary};
    transform: scale(2.2);
    top: 5px;
    left: -17px;
    cursor: pointer;
`

const TalkBox = styled.div`
    display: flex;
    width:100%;
    padding: 0px 30px;
    background-color: #f9f9f9;
`

function mapStateToProps({ auth, talk }){
    return {
        auth,
        talk,
    }
}

export default connect(mapStateToProps, actions)(Talk)