import React, { Component } from "react"
import styled, { css } from "styled-components"

import index from "../../__Mock__/data/index"
import indent from "../../../images/indent.png"

class Index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedId: "",
            selectedContent: "",
            selectedIndex: "",
        }
    }

    componentDidMount() {
        this.props.unVisible()
    }

    handleClick = (id, idx, content) => {
        this.setState({
            ...this.state,
            selectedId: id,
            selectedContent: content,
            selectedIndex: idx
        }, () => {
            this.props.visible();
        })
    }

    render () {

        return (
            <IndexBox>
                {!!this.state.selectedIndex &&
                <IndexPreview top="38px" right="-10px">
                    <div/>
                    <p>{this.state.selectedIndex}</p>
                    <p>{this.state.selectedContent}</p>
                    <p>の後</p>
                </IndexPreview>
                }
                <IndexElementWrapper>
                    { Object.keys(index.tasks).map(task => {
                        const id = index.tasks[task].id
                        const idx = index.tasks[task].index.join(".")
                        const content = index.tasks[task].content
                        const indented = index.tasks[task].index.length > 1
            
                        return (
                            <IndexElement 
                                key={task}
                                indent={indented} 
                                selected={this.state.selectedId === id} 
                                onClick={() => this.handleClick(id, idx, content)}
                            >
                                <p>{idx}</p>
                                <p>{content}</p>
                                <img src={indent}/>
                            </IndexElement>
                        )
                    })}
                </IndexElementWrapper>
            </IndexBox>
        )
    }
}


const IndexBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 300px;
    margin-bottom: 15px;
    border: 1px solid #d2d2d2;
    overflow: scroll;

    &::-webkit-scrollbar {
        width: 0px !important;
    }
`

const IndexElementWrapper = styled.div`
    height: 40px;
`

const IndexElement = styled.div`

    display: flex;
    flex-direction: row;
    position: relative;
    padding: 13px 15px;
    border-bottom: 1px solid #d2d2d2;
    cursor: pointer;

    ${ props => props.selected && css`
        border-left: 2px solid #636480;
        background-color: #f5f5f5;
    `}

    & > p:nth-child(1) {
        padding-left: ${props => props.indent && "23px"};
        font-size: 13px;
        margin-right: 10px;
    }

    & > p:nth-child(2) {
        font-size: 13px;
    }

    & > img {
        display: ${props => props.indent ? "block" : "none"};
        transform: scale(-1, 1) rotate(180deg);
        width: 10px;
        top: 14px;
        left: ${props => props.left};
        position: absolute;
    }
`

export const IndexPreview = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    top: ${props => props.top};
    right: ${props => props.right};
    width: 220px;
    height: 18px;
    font-size: 12px;

    & > div {
        width: 7px;
        height: 7px;
        margin-right: 8px;
        border-radius: 100%;
        background-color: #9EAEE5;
    }

    & p:nth-child(2) {   
        margin-right: 10px;
        color: #444444;
    }

    & p:nth-child(3) {
        margin-top: -2px;
        margin-right: 5px;
        color: #444444;
    }

    & p:nth-child(4) {
        font-size: 10px;
        color: #777777;
    }
`

export default Index