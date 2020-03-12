import React, { Component } from "react"
import styled from "styled-components"
import { IoIosAddCircleOutline } from "react-icons/io"

import TalkFeed from "./Element/Element"
import Content from "./Content/Content"

import { Space } from "../../Theme"

class Talk extends Component {
    render() {
        return (
            <TalkBox>
                <Feed>
                    <TalkHeader>
                        <h2>トーク一覧</h2>
                        <div>
                            <AddTalk/>
                        </div>
                    </TalkHeader>
                    <div>
                        <TalkFeed/>
                        <TalkFeed/>
                        <TalkFeed/>
                        <TalkFeed/>
                        <TalkFeed/>
                        <TalkFeed/>
                        <TalkFeed/>
                        <TalkFeed/>
                    </div>
                    <BottomSpace/>
                </Feed>

                <Content/>

            </TalkBox>
        )
    }
}

const BottomSpace = styled.div`
    box-shadow: 0px -1px 4px #d2d2d2;
    height: 30px;
`

const Feed = styled.div`
    min-width: 360px;
    max-width: 360px;
    background-color: white;
    box-shadow: 1px 1px 10px #d2d2d2;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;

    & > div:nth-child(2){
        max-height: 584px;
        min-height: 584px;
        overflow: scroll;
    }
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
    color: #636480;
    transform: scale(2.2);
    top: 5px;
    left: -17px;
`

const TalkBox = styled.div`
    display: flex;
    width:100%;
    padding: 0px 30px;
    background-color: #f9f9f9;
`


export default Talk