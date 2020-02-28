import React, { Component } from "react"
import styled, { css } from "styled-components"
import { connect } from "react-redux"

import { IoMdCheckmark, IoMdClose } from "react-icons/io"

class DraftAction extends Component {

    constructor(props) {
        super(props) 
        this.state = {
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
        this.props.unVisible()
    }

    renderDraft = () => {

        const mapped = this.props.draft.onEdit
            .filter(elem => (!elem.isDeleted) && (!elem.isUploaded))
            .map((elem) => {
                return (
                    <DraftElement key={elem._id} onClick={() => this.selectDraft(elem._id, elem.topic)}>
                        <img src={elem.postImg ? elem.postImg.image : elem.topicSquareImg.image} alt={"ドラフトが傘下となっているトピックの写真"}/>
                        <div>
                            <p>{elem.postName}</p>
                            <div>前回の編集日： {elem.editDate[elem.editDate.length-1] === undefined ? <span/> : elem.editDate[elem.editDate.length-1]}</div>
                        </div>
                        <DraftSelect type={this.props.type} selected={this.state.selected[elem._id]}/>
                        { 
                        this.state.selected[elem._id] ? 
                        (this.props.type === "delete")
                        ? <Close/> : <Check/> : ""
                        }
                    </DraftElement>
                )
            })

        return mapped;
    }

    // 同じトピックのものは投稿できない
    topicLookup = (idx, topicId) => {

        // 同じ下書きのtoggleはすぐに許可する
        if(this.state.selected[idx] === true) { return [] }

        const res = Object.keys(this.state.selected)
            .filter(key => this.state.selected[key] === true)
            .map(key => {
                for(var l=0; l < this.props.draft.onEdit.length; l++){
                    if(this.props.draft.onEdit[l]._id === key){
                        if(this.props.draft.onEdit[l].topic === topicId){
                            return 1
                        }
                    }
                }
            })

        return res
    }

    selectDraft = (idx, topicId) => {
        var counter = 0

        const res = this.topicLookup(idx, topicId)
        if(res[0]) { return }

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
                {this.renderDraft()}
                <Separator bottom="48px"/>
            </DraftBox>
        )
    }
}


export const Separator = styled.div`
    width: 560px;
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
    padding: 12px 0px;
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
        width: 40px;
        height: 40px;
        object-fit: contain;
        margin-right: 10px;
    }

    & > div:nth-child(2) {
        display: flex;
        flex-direction: column;

        & > p {
            font-size: 11px;
            color: #2B2B2b;
            margin-bottom: 3px;
        }

        & > div {
            font-size: 10px;
            color: #8B8B8B;
            position: relative;

            & > span {
                width: 30px;
                border-bottom: 1px solid #d2d2d2;
                position: absolute;
                top: 7px;
                right: -35px;
            }
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

function mapStateToProps(state) {
    return {
        draft: state.draft
    }
}

export default connect(mapStateToProps, null)(DraftAction)