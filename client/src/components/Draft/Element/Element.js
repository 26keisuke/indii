import React, { Component } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const DraftBox = styled(Link)`
    border-bottom: 1px solid #d2d2d2;   
    display: flex;
    flex-direction: row;
    padding: 20px;
    align-items: center;
    margin-left:-1px;
    cursor: pointer;

    &:hover{
        background-color: rgba(233, 233, 238, 0.25);
    }

    & > img {
        width: 100px;
        height: 100px;
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
    font-size: 19px;
    color: #1C1C1C;
    margin-bottom: 5px;
    font-weight: bold;
`

const Content = styled.p`
    color: #2B2B2b;
    margin-bottom: 10px;
    margin-right:25px;
    width: 510px; 
`

const Date = styled.p`
    font-size: 10px;
    color: #8F8B8B;
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
        return(
            <DraftBox to={"/draft/edit/" + this.props.id} id={this.props.id}>
                <DraftLeft>
                    <div>
                        <p>ポスト ></p>
                        <p>{this.renderType(this.props.type) + " >"}</p>
                        <p>{this.props.topic}</p>
                    </div>
                    <Title>{this.props.title}</Title>
                    <Content>{this.props.content}</Content>
                    <Date>前回の編集日: {this.props.date}</Date>
                </DraftLeft>
                <img src={this.props.img}/>
            </DraftBox>
        )
    }
}

export default Draft