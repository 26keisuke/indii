import React, { Component } from "react"
import styled, { keyframes, css } from "styled-components"
import axios from "axios"

import { IoMdCheckmark, IoMdClose } from "react-icons/io"
import sample from "../../../images/sample1.png"

class DraftAction extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            drafts: {},
            selected: {},
            counter: 0,
        }
    }

    componentDidUpdate(prepProps, prevState) {
        if(prevState.counter !== this.state.counter) {
            return this.state.counter === 0 ? this.props.unVisible() : this.props.visible()
        }
    }

    componentDidMount() {
        // user idを元にdraft一覧を取得する
        // const url = ""
        // axios.get(url)
        console.log(this.props)
        this.props.unVisible()
    }

    renderDraft = () => {

        //将来的にはここのindexをpostのidにする

        const mapped = this.state.drafts.map((draft, index) => 
            <DraftElement key={index} onClick={() => this.selectDraft(index)}>
                <img src={sample} alt={"ドラフトが傘下となっているトピックの写真"}/>
                <div>
                    <p>ポスト名</p>
                    <p>前回の編集日： </p>
                </div>
                <DraftSelect type={this.props.type} selected={this.state.selected[index]}/>
                { 
                this.state.selected[index] ? 
                (this.props.type === "delete")
                ? <Close/> : <Check/> : ""
                }
            </DraftElement>
        )

        return mapped;
    }

    selectDraft = (idx) => {
        var counter = 0

        if ((this.state.selected[idx] === false) || (this.state.selected[idx] === undefined)) {
            counter = this.state.counter + 1
        } else {
            counter = this.state.counter - 1
        }

        this.setState({
            ...this.state,
            selected: {
                ...this.state.selected,
                [idx]: !this.state.selected[idx],
            },
            counter: counter
        }, () => {
            this.props.setCounter(counter);
            this.props.setId(this.state.selected)
        })
    }

    render () {

        return (

            <DraftBox>

                <Separator top="84px"/>



                {/* {this.renderDraft();} */}


                <DraftElement onClick={() => this.selectDraft(1)} >
                    <img src={sample} alt={"ドラフトが傘下となっているトピックの写真"}/>
                    <div>
                        <p>ポスト名</p>
                        <p>前回の編集日： </p>
                    </div>
                    <DraftSelect type={this.props.type} selected={this.state.selected[1]}/>
                    { 
                    this.state.selected[1] ? 
                    (this.props.type === "delete")
                    ? <Close/> : <Check/> : ""
                    }
                </DraftElement>
                <DraftElement onClick={() => this.selectDraft(2)}>
                    <img src={sample} alt={"ドラフトが傘下となっているトピックの写真"}/>
                    <div>
                        <p>ポスト名</p>
                        <p>前回の編集日： </p>
                    </div>
                    <DraftSelect type={this.props.type} selected={this.state.selected[2]}/>
                    { 
                    this.state.selected[2] ?
                    (this.props.type === "delete")
                    ? <Close/> : <Check/> : ""
                    }
                </DraftElement>
                <DraftElement onClick={() => this.selectDraft(3)}>
                    <img src={sample} alt={"ドラフトが傘下となっているトピックの写真"}/>
                    <div>
                        <p>ポスト名</p>
                        <p>前回の編集日： </p>
                    </div>
                    <DraftSelect type={this.props.type} selected={this.state.selected[3]}/>
                    { 
                    this.state.selected[3] ? 
                    (this.props.type === "delete")
                    ? <Close/> : <Check/> : ""
                    }
                </DraftElement>
                <DraftElement onClick={() => this.selectDraft(4)}>
                    <img src={sample} alt={"ドラフトが傘下となっているトピックの写真"}/>
                    <div>
                        <p>ポスト名</p>
                        <p>前回の編集日： </p>
                    </div>
                    <DraftSelect type={this.props.type} selected={this.state.selected[4]}/>
                    { 
                    this.state.selected[4] ?
                    (this.props.type === "delete")
                    ? <Close/> : <Check/> : ""
                    }
                </DraftElement>
                <DraftElement onClick={() => this.selectDraft(5)}>
                    <img src={sample} alt={"ドラフトが傘下となっているトピックの写真"}/>
                    <div>
                        <p>ポスト名</p>
                        <p>前回の編集日： </p>
                    </div>
                    <DraftSelect type={this.props.type} selected={this.state.selected[5]}/>
                    { 
                    this.state.selected[5] ? 
                    (this.props.type === "delete")
                    ? <Close/> : <Check/> : ""
                    }
                </DraftElement>
                <DraftElement onClick={() => this.selectDraft(6)}>
                    <img src={sample} alt={"ドラフトが傘下となっているトピックの写真"}/>
                    <div>
                        <p>ポスト名</p>
                        <p>前回の編集日： </p>
                    </div>
                    <DraftSelect type={this.props.type} selected={this.state.selected[6]}/>
                    { 
                    this.state.selected[6] ?
                    (this.props.type === "delete")
                    ? <Close/> : <Check/> : ""
                    }
                </DraftElement>

                <Separator bottom="48px"/>

            </DraftBox>
        )
    }
}


export const Separator = styled.div`
    width: 460px;
    left: -30px;
    border-bottom: 1px solid #d2d2d2;
    position: absolute;
    top: ${props => props.top};
    bottom: ${props => props.bottom};
`

const DraftBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 230px;
    overflow: scroll;
    margin-top: 5px;
    margin-bottom: 13px;
    padding: 5px 10px;
    padding-top: 2px;

    &::-webkit-scrollbar {
        width: 0px !important;
    }
`

export const DraftElement = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #d2d2d2;
    padding: 3px 0px;
    padding-left: 5px;
    cursor: pointer;

    ${props => props.preview && css`
        cursor: default !important;
    `}

    ${props => props.indexPreview && css`
        cursor: default !important;
        padding-top: 35px;
    `}
    

    & > img {
        width: 50px;
        height: 50px;
        object-fit: contain;
        margin-right: 10px;
    }

    & > div:nth-child(2) {
        display: flex;
        flex-direction: column;

        & > p:nth-child(1) {
            font-size: 11px;
            color: #2B2B2b;
            margin-bottom: 3px;
        }

        & > p:nth-child(2) {
            font-size: 10px;
            color: #8B8B8B;
        }
    }
`

const Check = styled(IoMdCheckmark)`
    position: absolute;
    transform: scale(1.5);
    color: #4CD964;
    right: 21px;
    pointer-events: none;
`

const Close = styled(IoMdClose)`
    position: absolute;
    transform: scale(1.5);
    color: #FF5F5F;
    right: 21px;
    pointer-events: none;
`

const DraftSelect = styled.div`
    border-radius: 100%;
    width: 21px;
    height: 21px;
    border: ${props => props.selected ? props.type === "delete" ? "1px solid #FF5F5F" : "1px solid #4CD964" : "1px solid #d2d2d2"};
    position: absolute;
    right: 15px;
`

export default DraftAction