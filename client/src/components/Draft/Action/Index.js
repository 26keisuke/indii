import React, { Component } from "react"
import styled, { css } from "styled-components"
import { connect } from "react-redux"

import * as actions from "../../../actions"

import indent from "../../../images/indent.png"

class Index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedId: "",
            selectedTitle: "",
            selectedIndex: "",
            showBtn: false,
            forcedOn: false,
            addColumn: false,

            draft: {},
            topic: {},
        }
    }

    fetchDraft = () => {
        this.props.isFetching()
        this.props.unVisible()
        const draftList = this.props.draft.onEdit

        for (var key in  draftList) {
            if( draftList[key]._id === this.props.id) {
                this.props.fetchTopic(draftList[key].topic, "INDEX")
                this.setState({
                    draft: draftList[key]
                })
            }
        }
    }

    // idが一致する下書きをとってくる
    componentDidMount() {
        this.fetchDraft();
    }

    // ↑の後に↓が呼ばれる
    
    
    componentDidUpdate(prevProps) {
        // draftの対象となるトピックをとってくる
        if (prevProps.topic.fetched !== this.props.topic.fetched) {
            this.props.endFetching()
            this.setState({
                topic: this.props.topic.fetched
            })
            this.props.setMessage(`「${this.state.draft.postName}」をトピック「${this.props.topic.fetched.topicName}」のどこに挿入しますか？`)
        } else if (prevProps.id !== this.props.id) {
            // ２回以上連続でrenderされた場合はcomponentDidMountが呼ばれない
            this.setState({
                selectedId: "",
                selectedTitle: "",
                selectedIndex: "",
                showBtn: false,
                forcedOn: false,
                addColumn: false,
            }, () => {
                this.fetchDraft();
            })
        }
    }

    handleClick = (id, idx, title, isLastIdx, forcedOn) => {
        this.setState({
            ...this.state,
            selectedId: id, // to ensure everything is unique
            selectedTitle: title,
            selectedIndex: idx,
            showBtn: forcedOn ? false : isLastIdx,
            forcedOn: forcedOn,
            addColumn: forcedOn ? true : !isLastIdx && false
        }, () => {
            if(forcedOn) {
                this.props.setIndex(this.props.topic.fetched._id, this.props.id, idx, title, true)
            } else {
                this.props.setIndex(this.props.topic.fetched._id, this.props.id, idx, title)
            }
        })
        this.props.visible();
    }

    handleToggle = () => {
        this.setState({
            addColumn: !this.state.addColumn,
        }, () => {
            this.props.setColumn(this.props.id, this.state.addColumn)
        })
    }
    
    renderIndex = () => {
        var result = []
        const { topic } = this.state

        if(topic.posts) {
            for (const k in topic.order) {
                const column = topic.column.find(elem => elem._id === topic.order[k])
                const id = column._id
                const title = column.title
                const isFirst = k === "0"
                result.push(
                    <IndexElement 
                        key={id}
                        indent={false} 
                        selected={this.state.selectedId === id} 
                        onClick={() => this.handleClick(id, [parseInt(k)], title, isFirst, isFirst)}
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
                            selected={this.state.selectedId === id} 
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

        return (
            <IndexBox>
                {!!this.state.selectedId &&
                <IndexPreview top="2px" right="20px">
                    <div/>
                    <p>{this.state.selectedIndex.join(".")}</p>
                    <p>{this.state.selectedTitle}</p>
                    <p>の後</p>
                </IndexPreview>
                }
                <IndexElementWrapper>
                    {this.renderIndex()}
                </IndexElementWrapper>
                <AddColumn show={this.state.showBtn}>
                    { this.state.forcedOn
                    ?
                        <input checked={true} type="checkbox" id="0" name="addColumn"/>
                    :
                        this.state.showBtn
                        ?
                        <input onChange={this.handleToggle} checked={this.state.addColumn} type="checkbox" id="0" name="addColumn"/>
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
        background-color: #9EAEE5;
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

function mapStateToProps(state) {
    return {
        draft: state.draft,
        topic: state.topic,
    }
}

export default connect(mapStateToProps, actions)(Index)