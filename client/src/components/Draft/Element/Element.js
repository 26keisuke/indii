import React, { Component } from "react"
import BraftEditor from 'braft-editor'
import { Link } from "react-router-dom"
import styled from "styled-components"
import Skeleton from "react-loading-skeleton"

import { fmtDate, renderType } from "../../Util/util"

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
        width: 80px;
        height: 80px;
        object-fit: contain;
        flex-shrink: 0;
    }
`

const DraftLeft = styled.div`

    margin-right: 40px;

    & > div {
        display: flex;

        & > p {
            font-size: 11px;
            color: #767676;
            margin-right:5px;
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
    width: 510px; 
    height: 32px;
    overflow: hidden;
`

const Date = styled.div`
    font-size: 11px;
    color: #8F8B8B;
    display: flex;
    align-items: center;
    margin-left: auto;

    & > div {
        margin-left: 10px;
    }
`

const Nil = styled.div`
    width: 30px;
    border-bottom: 1px solid #d2d2d2;
    margin-left: 10px;
`

class Draft extends Component {

    renderType(type){
        switch(type){
            case "Edit":
                return "編集 "
            case "Zero":
                return "編集 "
            case "New":
                return "新規作成 "
        }
    }

    render(){

        const { _id, type, postName, topicName, content, editDate, topicSquareImg, postImg } = this.props.draft
        const flag = this.props.draft._id
        const lastEdited = flag ? editDate[editDate.length-1] : undefined
        const date = lastEdited === undefined ? <Nil/> : fmtDate(lastEdited)

        return(
            <DraftBox to={"/draft/edit/" + _id} id={_id}>
                <DraftLeft>
                    { flag 
                    ? <Title>{postName}</Title>
                    : (
                        <div style={{marginBottom: "5px"}}>
                            <Skeleton height={16} width={250}/>
                        </div>
                    )
                    }
                    { flag
                    ? (
                    <Content>
                        {BraftEditor.createEditorState(content).toText().replace(/a\s/g, "").substring(0, 100)}
                    </Content>
                    )
                    : (
                        <div style={{marginBottom: "10px", display: "flex", flexDirection: "column"}}>
                            <Skeleton width={510} height={14}/>
                            <Skeleton width={450} height={14}/>
                        </div>
                    )
                    }
                    <div>
                        { flag
                        ? <p>{topicName}</p>
                        : (
                            <div style={{marginRight: "5px"}}>
                                <Skeleton width={80} height={12}/>
                            </div>
                        )
                        }
                        <p>・</p>
                        { flag
                        ? <p>{renderType(type)}</p>
                        : (
                            <div style={{marginRight: "5px"}}>
                                <Skeleton width={55} height={12}/>
                            </div>
                        )
                        }
                        <Date>
                            前回の編集日: 
                            { flag 
                            ? <div>{ date }</div> 
                            : <div><Skeleton width={60} height={12}/></div>
                            }
                        </Date>
                    </div>
                </DraftLeft>
                { flag ? <img src={postImg ? postImg.image : topicSquareImg.image}/> : <Skeleton width={80} height={80}/>}
            </DraftBox>
        )
    }
}

export default Draft