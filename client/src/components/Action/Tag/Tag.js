import React, { Component } from "react"
import styled from "styled-components"

import Chip from '@material-ui/core/Chip';
import Autosuggest from "react-autosuggest";

import { Box, BoxTransition, BoxTitle, RevertBtn } from "../Element/Element"
import { Space } from "../../Theme"
import Warning from "../../Search/Warning/Warning"
import TwoButtons from "../Element/TwoButtons"


class ActionTag extends Component {

    constructor(props){
        super(props)
        this.state = {
            value: "",
            suggestions: [],
            tags: this.initializeTags() || this.props.initialVal || [],
            duplicate: false,
            illegal: false,
            limit: false,
        };
    };

    initializeTags = () => {
        const cache = localStorage.getItem(this.props.storage)
        if ((cache === null) || (cache === "undefined")){
            return false
        } else {
            return JSON.parse(cache)
        }
    }

    getSuggestionValue = suggestion => {};
    renderSuggestion = suggestion => {};
    onSuggestionsFetchRequested = ({ value }) => {};
    onSuggestionsClearRequested = () => {};
    onSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {};

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        this.checkForDuplicate(newValue);
        this.checkForIllegalValue(newValue);
    };

    renderWarning = (flag) => {
        switch(flag){
            case "limit":
                return (
                    <Warning>
                        <p>選択できるタグの上限は{this.props.max}つまでです。</p>
                    </Warning>
                )
            case "sameVal":
                return (
                    <Warning>
                        <p>既に同じタグが追加されています。</p>
                    </Warning>
                )
            case "illegal":
                return (
                    <Warning>
                        <p>タグに無効な文字が含まれています。</p>
                    </Warning>
                )
            default:
                return false;
        }
    }

    handleDelete = (name) => {
        this.setState(state => {
            const tags = state.tags.filter(tag => 
                tag.toLowerCase() !== name
            )
            return {
                tags,
                limit: false
            }
        });
    };

    checkForIllegalValue = (term) => {
        if(term.match(/[[.*<>?^${}()|\]^,;:^_~="']/g) || term[0] === " "){
            this.setState({
                illegal: true
            })
        } else {
            this.setState({
                illegal: false
            })
        }
    }

    checkForDuplicate = (term) => {
        const res = this.state.tags.filter((tag) => 
            tag.toLowerCase() === term.toLowerCase()
        );
        if(res.length > 0){
            this.setState({ duplicate: true });
        } else {
            this.setState({ duplicate: false });
        }
    };

    renderTags = () => {
        const tagItems = this.state.tags.map((tag,index) => 
            <Chip
                key={index+tag}
                label={tag}
                onDelete={() => this.handleDelete(tag)}
            />
        )   
        return tagItems;
    }

    handleBack = () => {
        localStorage.setItem(this.props.storage,JSON.stringify(this.state.tags))
        this.props.setBackward(true);
        this.props.setStep(1);
    }   

    handleForward = () => {
        localStorage.setItem(this.props.storage,JSON.stringify(this.state.tags))
        if(!this.state.tags.length){
            console.log("Illegal attempt to bypass sending a file");
        };
        this.props.setBackward(false);
        this.props.setTags(this.state.tags);
        this.props.setStep(3);
    }

    formSubmit = (e) => {
        e.preventDefault();

        if((this.state.value === "") || this.state.duplicate || this.state.illegal) {
            return false;
        };
        if(this.state.tags.length >= this.props.max){
            this.setState({ limit: true})
            return false
        };
        this.setState({
            limit: false,
            tags: [...this.state.tags, this.state.value],
            value: ""
        });
    }

    handleRevert = () => {
        this.setState({
            tags: this.props.initialVal
        })
    }

    render() {

        const inputProps = {
            placeholder: "決定キーで追加されます...",
            value: this.state.value,
            onChange: this.onChange,
        };

        const { tags, duplicate, illegal, limit, suggestions } = this.state
        const { max, back, initialVal } = this.props

        return (
            <Box>
                <BoxTransition back={back} transition={true}>
                    <div> 
                        {tags.length < max && duplicate ? this.renderWarning("sameVal"): ""}
                        {limit ? this.renderWarning("limit") : ""}
                        {tags.length < max && illegal ? this.renderWarning("illegal"): ""}
                        <BoxTitle>3. トピックに関するタグを追加</BoxTitle>
                        {   initialVal
                        ? <RevertBtn　onClick={this.handleRevert}>元に戻す</RevertBtn>
                        : ""
                        }
                    </div> 
                    <form onSubmit={this.formSubmit}>
                        <TagList>
                            {this.renderTags()}
                        </TagList>
                        <Space height={"35px"}/>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            onSuggestionSelected={this.onSuggestionSelected}
                            inputProps={inputProps} 
                        />
                    </form>
                    <TwoButtons
                        handleBack={this.handleBack}
                        handleForward={this.handleForward}
                        text={["戻る", "次へ進む"]}
                        disabled={this.state.tags.length === 0}
                    />
                </BoxTransition>
            </Box>
        )
    }
}

const TagList = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    left: 0px;
    top: -2px;


    & > div {
        height: 23px;
        margin: 5px;
        font-size: 10px;
        & svg {
            width: 15px;
        }
    }
`

export default ActionTag;