import React, { Component } from "react"
import styled from "styled-components"

import Screen from "../../Util/Screen"
import TextArea from "./TextArea"

import "./Editor.css"

const EditorNavi = styled.div`
    display: flex;
    flex-direction: row;
    & > p {
        font-size: 10px;
        color: #767676;
        margin-right: 10px;
        margin-bottom: 5px;
    }
`

const EditorTop = styled.div`
    height: 100%;
    & > div:nth-child(1) {
        position: absolute;
        height:30px;
        top:40px;
        width: 100%;
        left: -1px;
        background-color: #ffffff;
        border-bottom: 1px solid #d2d2d2;
        display: flex;
        justify-content: center;

        & > div {
            position: relative;
            z-index: 1;

            & p:nth-child(1) {
                font-size: 19px;
                color: #1C1C1C;
                font-weight: bold;
            }

            & p:nth-child(2) {
                position: absolute;
                font-size: 10px;
                color: #767676;
                right: -200px;
                bottom: 9px;
            }
        }
    }
`

const RightInsideTitle = styled.div`
    height:35px;
    padding-left:30px;
    border: 1px solid #d2d2d2;
    font-size: 16px;
    display: flex;
    align-items: center;
`

class Editor extends Component {

    constructor(props) {
        super(props)
        const url = this.props.location.pathname
        const id = url.substring(url.lastIndexOf('/') + 1)
        this.state = {
            id
        }
    }

    renderType(type){
        switch(type){
            case "edit":
                return "編集"
            case "new":
                return "新規作成"
        }
    }

    renderTitle() {
        return (
            <div>
                <EditorNavi>
                    <p>ポスト ></p>
                    <p>新規作成 ></p>
                    <p>Recurrent Neural Network</p>
                </EditorNavi>
            </div>
        )
    }

    renderLeft() {
        return (
            <EditorTop>
                <div>
                    <div>
                        <p>Transformer Netowork</p>
                        <p>* 編集は自動的に保存されます。</p>
                    </div>
                </div>
                <TextArea id={this.state.id}/>
            </EditorTop>
        )
    }

    renderRight() {
        return (
          <div>
            <RightInsideTitle>
              参照を追加
            </RightInsideTitle>
          </div>
            
        )
    }


    render() {
        return(
            <Screen back={true} space={false}>
                {this.renderTitle()}
                {this.renderLeft()}
                {this.renderRight()}
            </Screen>
        )
    }
}



export default Editor