import React, { Component } from "react"
import styled, { css } from "styled-components"
import { connect } from "react-redux"
import update from "immutability-helper"
import equal from "deep-equal"

import * as actions from "../../../../actions"

import indent from "../../../../images/indent.png"

class Index extends Component {

    componentDidMount() {
        this.fetch(); // idが一致する下書きをとってくる
    }

    fetch = () => {
        this.props.isFetching()

        const newObj = update(this.props.update, {confirmation: {transparent: {$set: true}}})
        this.props.updateConfirmation(newObj)
        this.props.fetchOneDraft(this.props.update.confirmation.draftId[this.props.counter])
    }

    // fetch()の後に呼ばれる
    componentDidUpdate(prevProps) {
        // draftの対象となるトピックをとってくる

        var flag = false;
        var newObj = this.props.update

        if (!equal(prevProps.draft.fetched, this.props.draft.fetched)){
            this.props.fetchTopic(this.props.draft.fetched.topic, "INDEX")
        }

        if (!equal(prevProps.topic.fetched, this.props.topic.fetched)) {
            flag = true;

            this.props.endFetching()
            newObj = update(newObj, {confirmation: {message: {$set: `「${this.props.draft.fetched.postName}」をトピック「${this.props.topic.fetched.topicName}」のどこに挿入しますか？`}}})
        }
        
        if (prevProps.counter !== this.props.counter) {
            // ２回以上連続でrenderされた場合はcomponentDidMountが呼ばれない

            const id = this.props.update.confirmation.draftId[this.props.counter]

            if(!id) return; // previewに行く前にもcounterが++されるのでこのbranchが呼ばれる。この時idはundefined

            flag = true;

            const data = {
                selectedId: "",
                selectedTitle: "",
                selectedIndex: "",
                showBtn: false,
                forcedOn: false,
                addColumn: false,
            }
            
            newObj = update(newObj, {confirmation: {$merge: data}})
            this.props.fetchOneDraft(id)
        }

        if(flag){this.props.updateConfirmation(newObj)}
    }

    handleClick = (id, idx, title, isLastIdx, forcedOn) => {
        const draftId = this.props.update.confirmation.draftId[this.props.counter]
        const thisIdx = this.props.update.confirmation.index[draftId]

        const idxData = {
            draftId: draftId,
            index: idx,
            title: title,
            topicId: this.props.topic.fetched._id,
            addColumn: forcedOn ? true : thisIdx ? idx.addColumn : false
        }

        const idxObj = update(this.props.update.confirmation.index, {$merge: {[draftId]: idxData}})

        const data = {
            selectedId: id, // to ensure everything is unique
            selectedTitle: title,
            selectedIndex: idx,
            showBtn: forcedOn ? false : isLastIdx,
            forcedOn: forcedOn,
            addColumn: forcedOn ? true : !isLastIdx && false,
            
            transparent: false,
            index: idxObj,
        }

        const newObj = update(this.props.update, {confirmation: {$merge: data}})
        
        this.props.updateConfirmation(newObj)
    }

    handleToggle = () => {

        var newObj;

        const { addColumn, draftId } = this.props.update.confirmation
        const id = draftId[this.props.counter]

        const newIdx = {addColumn: !addColumn}
        newObj = update(this.props.update, {confirmation: {addColumn: {$set: !addColumn}}})
        newObj = update(newObj, {confirmation: {index: {[id]: {$merge: newIdx}}}})

        this.props.updateConfirmation(newObj)
    }
    
    renderIndex = () => {
        var result = []
        const topic = this.props.topic.fetched
        const { selectedId } = this.props.update.confirmation

        if(topic.posts) {
            for (const k in topic.order) {
                const column = topic.column.find(elem => elem._id === topic.order[k])
                const id = column._id
                const title = column.title
                const isFirst = k === "0"
                const noPosts = column.posts.length === 0
                result.push(
                    <IndexElement 
                        key={id}
                        indent={false} 
                        selected={selectedId === id} 
                        onClick={() => this.handleClick(id, [parseInt(k)], title, isFirst || noPosts, isFirst)}
                    >
                        <p>{k}</p>
                        <p>{title}</p>
                        <img src={indent} alt={"一段階階層下のポストを示すアイコン"}/>
                    </IndexElement>
                )

                if(k === "0"){ continue }

                for (var l in column.posts) {
                    const post = column.posts[l]
                    const id = post._id
                    const idx = post.index.join(".")
                    const postName = post.postName
                    const isLastIdx = l === (String(column.posts.length - 1))
                    result.push(
                        <IndexElement 
                            key={id}
                            indent={true}
                            selected={selectedId === id} 
                            onClick={() => this.handleClick(id, post.index, postName, isLastIdx)}
                        >
                            <p>{idx}</p>
                            <p>{postName}</p>
                            <img src={indent} alt={"一段階階層下のポストを示すアイコン"}/>
                        </IndexElement>
                    )
                }
            }
        }
        return result
    }


    render () {

        const { selectedId, selectedIndex, selectedTitle, showBtn, forcedOn, addColumn } = this.props.update.confirmation

        return (
            <IndexBox>
                {!!selectedId &&
                <IndexPreview top="50px" right="40px">
                    <div/>
                    <p>{selectedIndex.join(".")}</p>
                    <p>{selectedTitle}</p>
                    <p>の後</p>
                </IndexPreview>
                }
                <IndexElementWrapper>
                    {this.renderIndex()}
                </IndexElementWrapper>
                <AddColumn show={showBtn}>
                    { forcedOn
                    ?
                        <input checked={true} type="checkbox" id="0" name="addColumn"/>
                    :
                        showBtn
                        ?
                        <input onChange={this.handleToggle} defaultChecked={addColumn} type="checkbox" id="0" name="addColumn"/>
                        :
                        <input checked={false} type="checkbox" id="0" name="addColumn"/>
                    }
                    <label htmlFor="0">新しいコラムを追加する</label>
                </AddColumn>
            </IndexBox>
        )
    }
}

const IndexBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 300px;
    margin-bottom: 15px;
    border: 1px solid #eaeaea;
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
    border-bottom: 1px solid #eaeaea;
    cursor: pointer;
    transition: 100ms;

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
        background-color: ${props => props.edit ? "#4CD964" : "#9EAEE5"};
    }

    & p:nth-child(2) {   
        margin-right: 10px;
        color: #444444;
    }

    & p:nth-child(3) {
        margin-top: 0px;
        margin-right: 5px;
        color: #444444;
    }

    & p:nth-child(4) {
        margin-top: 3px;
        font-size: 10px;
        color: #777777;
    }
`

const AddColumn = styled.div`
    position: absolute;
    bottom: 9px;
    left: 0px;
    opacity: ${props => props.show ? 1 : 0.3};

    & > input {
        margin-right: 10px;
    }

    & > label {
        cursor: ${props => !props.show && "default !important"};
    }
`

function mapStateToProps({draft, topic, update}) {
    return {
        draft,
        topic,
        update,
    }
}

export default connect(mapStateToProps, actions)(Index)