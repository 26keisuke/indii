import React, { Component } from "react"
import BraftEditor from 'braft-editor'
import { Link } from "react-router-dom"
import styled from "styled-components"

const DraftBox = styled(Link)`
    border-bottom: 1px solid #d2d2d2;   
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
    align-items: center;
    margin-left:-1px;
    cursor: pointer;

    &:hover{
        background-color: rgba(233, 233, 238, 0.25);
    }

    & > img {
        width: 60px;
        height: 60px;
        object-fit: contain;
        flex-shrink: 0;
    }
`

const DraftLeft = styled.div`
    & > div {
        display: flex;
        flex-direction: row;
        align-items: center;

        & > p {
            font-size: 10px;
            color: #767676;
            margin-right:5px;
            margin-bottom:5px;
        }
    }
`

const Title = styled.p`
    font-size: 15px;
    color: #1C1C1C;
    margin-bottom: 5px;
    font-weight: bold;
`

const Content = styled.p`
    color: #2B2B2b;
    margin-bottom: 10px;
    margin-right:50px;
    width: 510px; 
    height: 32px;
    overflow: hidden;
`

const Date = styled.div`
    font-size: 10px;
    color: #8F8B8B;
    & > span {
        width: 30px;
        border-bottom: 1px solid #d2d2d2;
        margin-left: 10px;
    }
`

class Draft extends Component {

    renderType(type){
        switch(type){
            case "Edit":
                return "編集 "
            case "New":
                return "新規作成 "
        }
    }

    render(){

        const { _id, type, postName, topicName, content, editDate, topicImg, postImg } = this.props.draft

        return(
            <DraftBox to={"/draft/edit/" + _id} id={_id}>
                <DraftLeft>
                    <div>
                        <p>ポスト ></p>
                        <p>{this.renderType(type) + " >"}</p>
                        <p>{topicName}</p>
                    </div>
                    <Title>{postName}</Title>
                    <Content>
                        {BraftEditor.createEditorState(content).toText().replace(/[a\s]+/, "").substring(0, 100)}
                    </Content>
                    <Date>前回の編集日: {editDate[editDate.length-1] === undefined ? <span/> : editDate[editDate.length-1]}</Date>
                </DraftLeft>
                <img src={postImg || topicImg}/>
            </DraftBox>
        )
    }
}

export default Draft