import React, { Component } from "react"
import styled, { css } from "styled-components"
import { connect } from "react-redux"
import update from "immutability-helper"

import { IoMdCheckmark, IoMdClose } from "react-icons/io"
import { FaUserCheck } from "react-icons/fa"

import * as actions from "../../../actions"

import { renderType, fmtDate } from "../../Util/util"

class DraftAction extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            counter: 0,
        }
    }

    componentDidMount() {
        this.props.setTransparent(true)
    }

    renderDraft = () => {
        const mapped = this.props.draft.onEdit
            .filter(elem => (!elem.isDeleted) && (!elem.isUploaded))
            .map((elem) => {

                var date;
                
                if(!elem.editDate || elem.editDate.length === 0){
                    date = <span/>
                } else {
                    date = fmtDate(elem.editDate[elem.editDate.length-1])
                }

                const selected = this.props.update.confirmation.selected[elem._id]

                return (
                    <DraftElement key={elem._id} onClick={() => this.selectDraft(elem._id, elem.topic)}>
                        <img src={elem.postImg ? elem.postImg.image : elem.topicSquareImg.image} alt={"ドラフトが傘下となっているトピックの写真"}/>
                        <div>
                            <p>{elem.postName}</p>
                            <div>
                                <p>{elem.topicName}</p>
                                <p>・</p>
                                <p>{renderType(elem.type)}</p>
                                <p>・</p>
                                <p>前回の編集日： {date}</p>
                            </div>
                        </div>
                        { elem.editCreator && (elem.config.allowEdit === false) && (elem.editCreator !== this.props.auth.info._id) &&
                        <PermissionImg/>
                        }
                        <DraftSelect type={this.props.type} selected={selected}/>
                        { 
                        selected ?
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

        var flag = false;
        const target = this.props.update.confirmation.selected

        if(target[idx] === true) { return false; }

        const res = Object.keys(target)
            .filter(key => target[key] === true)
            .map(key => {
                // console.log(key)
                for(var l=0; l < this.props.draft.onEdit.length; l++){
                    // console.log(this.props.draft.onEdit[l]._id, key, this.props.draft.onEdit[l].topic, topicId)
                    if(this.props.draft.onEdit[l]._id === key){
                        if(this.props.draft.onEdit[l].topic === topicId){
                            flag = true
                            return;
                        }
                    }
                }
            })

        return flag;
    }

    selectDraft = (idx, topicId) => {
        var counter = 0

        var target = this.props.update.confirmation.selected

        if(this.props.type === "upload") {
            const res = this.topicLookup(idx, topicId)
            if(res) { return }
        }

        if (!target[idx]) {
            counter = this.state.counter + 1
        } else {
            counter = this.state.counter - 1
        }

        const data = update(target, {$merge: {[idx]: !target[idx]}})

        this.props.setCounter(counter)
        this.setState({ counter }, () => {
            const flag = this.state.counter === 0

            var newObj = update(this.props.update, {confirmation: {selected: {$merge: data}}})
            newObj = update(newObj, {confirmation: {transparent: {$set: flag}}})

            this.props.updateConfirmation(newObj)
        })
    }

    render () {
        return (
            <DraftBox>
                <Separator top="132px"/>
                {this.renderDraft()}
                <Separator bottom="48px"/>
            </DraftBox>
        )
    }
}

const PermissionImg = styled(FaUserCheck)`
    position: absolute;
    transform: scale(1.1);
    color: #9EAEE5;
    right: 60px;
`


export const Separator = styled.div`
    width: 560px;
    left: -30px;
    border-bottom: 1px solid #eaeaea;
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
    border-bottom: 1px solid #eaeaea;
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
            display: flex;
            color: #8B8B8B;
            position: relative;

            & p {
                margin-right: 6px;
            }

            & span {
                width: 30px;
                border-bottom: 1px solid #eaeaea;
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
    border: ${props => props.selected ? props.type === "delete" ? "1px solid #FF5F5F" : "1px solid #4CD964" : "1px solid #eaeaea"};
    position: absolute;
    right: 15px;
`

function mapStateToProps({draft, auth, update}) {
    return {
        draft,
        auth,
        update
    }
}

export default connect(mapStateToProps, actions)(DraftAction)