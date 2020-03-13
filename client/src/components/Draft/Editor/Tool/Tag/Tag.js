import React, { Component } from "react";
import styled from "styled-components"
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux"

import * as actions from "../../../../../actions"

import { RevertBtn } from "../Info/Info"
import { Space } from "../../../../Theme"

class Tag extends Component {

    constructor(props){
        super(props)
        this.state = {
            value: "",
            tags: this.props.tags || [],
            warning: false,
            limit: false,
            duplicate: false,
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.tags !== this.props.tags){
            this.setState({ tags: this.props.tags })
        }
    }

    handleDelete = (selectedTag) => {
        this.setState(state => {
            return {
                tags: state.tags.filter(tag => tag !== selectedTag)
            }
        }, () => {
            this.props.changeTag(this.props.id, this.state.tags, false)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const res = this.state.tags.filter(tag => tag === this.state.value)

        if(this.state.tags.length > 3){
            this.setState({ limit: true })
            return
        }
        if(res.length > 0){
            this.setState({ duplicate: true })
            return
        }
        if(!this.state.value){
            this.setState({ warning: true })
            return
        }
        this.setState(state => {
            return {
                value: "",
                limit: false,
                duplicate: false,
                warning: false,
                tags: state.tags.concat(this.state.value)
            }
        }, () => {
            this.props.changeTag(this.props.id, this.state.tags, false)
        })    
    }

    render () {
        return (
            <Wrapper>
                { this.props.edit &&
                <RevertWrapper>
                    <RevertBtn onClick={this.props.revertClick}>最初の状態に戻す</RevertBtn>
                </RevertWrapper>
                }
                <ChipWrapper>
                    {   
                    this.state.tags.map((tag,index) => 
                        <Chip
                            key={index+tag}
                            label={tag}
                            onDelete={() => this.handleDelete(tag)}
                        />
                    )
                    }
                </ChipWrapper>
                <TextWrapper onSubmit={this.handleSubmit}>
                    <TextField
                        id="standard-basic" 
                        label="タグを追加"
                        value={this.state.value}
                        onChange={(e) => this.setState({value: e.target.value, warning: false})}    
                    />
                </TextWrapper>
                <Space height={"10px"}/>
                { this.state.warning ? 
                <Message>
                    <div/>
                    <p>文字が入力されていません。</p>
                </Message>
                : this.state.limit ?
                <Message>
                    <div/>
                    <p>入力できる上限を超えています。</p>
                </Message>
                : this.state.duplicate ?
                <Message>
                    <div/>
                    <p>既に同じタグが存在します。</p>
                </Message>
                :""}
                <Space height={"30px"}/>
            </Wrapper>
        )
    }
}

const RevertWrapper = styled.div`
    position: relative;
    margin-right: 9px;
    margin-top: 5px;
`

const TextWrapper = styled.form`
    padding: 0px 8px;
    width: 100%;
    box-sizing: border-box;

    & > div {
        width: 100%;
    }
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const ChipWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin: 20px 0px;

    & > div {
        height: 23px;
        margin: 5px;
        font-size: 10px;
        & svg {
            width: 15px;
        }
    }
`

const Message = styled.div`
    display: flex;
    align-items: center;
    font-size: 10px;
    color: #333333;
    margin-left: 8px;

    & > div {
        width: 7px;
        height: 7px;
        margin-right: 5px;
        border-radius: 100%;
        background-color: #FF5F5F;
    }
`

export default connect(null, actions)(Tag)