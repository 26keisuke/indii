import React, { Component } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Skeleton from "react-loading-skeleton"

import { fmtDate, renderType, getBraftSummary } from "../../Util/util"

const DraftBox = styled(Link)`
    border-bottom: 1px solid #eaeaea;   
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
    border-bottom: 1px solid #eaeaea;
    margin-left: 10px;
`

const S1Wrapper = styled.div`
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
`

const S2Wrapper = styled.div`
    margin-right: 5px;
`


class Draft extends Component {
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
                        {getBraftSummary(content, 100)}
                    </Content>
                    )
                    : (
                        <S1Wrapper>
                            <Skeleton width={510} height={14}/>
                            <Skeleton width={450} height={14}/>
                        </S1Wrapper>
                    )
                    }
                    <div>
                        { flag
                        ? <p>{topicName}</p>
                        : (
                            <S2Wrapper>
                                <Skeleton width={150} height={12}/>
                            </S2Wrapper>
                        )
                        }
                        { flag && <p>・</p> }
                        { flag && <p>{renderType(type)}</p> }
                        <Date>
                            { flag 
                            ? ([<p key={"text"}>前回の編集日: </p>, <div key={"date"}>{ date }</div> ])
                            : <div><Skeleton width={80} height={12}/></div>
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