import React, { Component } from "react";

import Autosuggest from "react-autosuggest";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import Topic from "../Header/Search/Suggestion/Topic";
import New from "../Header/Search/Suggestion/New"
import Warning from "../Header/Search/Warning/Warning"

import { Box, BoxTransition, GreenMark, RedMark } from "../Action/Element/Box"

import topics from "../__Mock__/data/topic"
import getSuggestions from "../__Mock__/method/getSuggestions"

class CreateDecideTopic extends Component {

    constructor(props){
        super(props)
        this.state = {
            value: localStorage.getItem(this.props.storage) || "",
            suggestions: [],
            blur: true,
            end: false,
        };
    };

    handleClick = (term) => {
        if(this.state.suggestions.length === 0 || !this.state.suggestions[0].added){ 
            return null;
        }
        this.setState({
            blur: true,
            end: true,
        });
        this.props.setBackward(false);
        this.props.setStep(1);
        this.props.setTopicName(term);
    };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        localStorage.setItem(this.props.storage, newValue);
    };

    getSuggestionValue = suggestion => {
        if (suggestion.added) {
          return this.state.value;
        }
        return suggestion.name;
    };

    renderSuggestion = suggestion => {
        if (suggestion.added) {
            return (
                <New
                    handleClick={this.handleClick}
                    text={["新しいトピック","を追加する"]}
                    value={this.state.value}
                >
                    <IoIosAddCircleOutline/>
                </New>
            );
        };
        return (
            <Topic
                handleClick={this.handleClick}
                suggestion={suggestion}
                target="name"
            />
        );
    };

    renderMark = () =>{
        if(!this.state.value || this.state.blur) {
            return null;
        } else {
            const success = () => {return <GreenMark/>}
            const fail = () => {return <RedMark/>}
            if(this.state.value) {
                if(this.state.suggestions.length > 0 && this.state.suggestions[0].added){ 
                    return success();
                } else {
                    return fail();
                };
            };
        };
    };

    renderWarning = () => {
        if(!this.state.value || this.state.blur) {
            return null;
        } else {
            const success = () => { return null; }
            const fail = () => {
                return (
                    <Warning>
                        <p>
                            既にトピック名<Link to={"/topic/1123"}>"{this.state.value}"</Link>は存在しています。代わりに<Link to={"/action/post/create"}>新しいポスト</Link>を追加しますか？
                        </p>
                    </Warning>
                )
            };
            if(this.state.value) {
                if(this.state.suggestions.length > 0 && this.state.suggestions[0].added){ 
                    return success();
                } else {
                    return fail();
                };
            };
        };
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: getSuggestions(value, "Unique", topics, "name")
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {
        if(this.state.suggestions.length > 0 && this.state.suggestions[0].added){ 
            this.handleClick(this.state.value);
        } else {
            this.setState({
                value: suggestion.name,
            });
        };   
    };
    
    handleBlur = () => {
        this.setState({
            blur: true
        });
    };

    handleFocus = () => {
        this.setState({
            blur: false
        });
    };

    formSubmit = (e) => {
        e.preventDefault();
        const success = () => this.handleClick(this.state.value);
        const fail = () => { return null; }

        if(this.state.value) {
            if(this.state.suggestions.length > 0 && this.state.suggestions[0].added){ 
                return success();
            } else {
                return fail();
            };
        };
    };

    render() {

        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "トピック名を入力...",
            value,
            onChange: this.onChange,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
        };

        return (
            <Box>
                <BoxTransition back={this.props.back}>
                    <div> 
                        {this.renderWarning()}
                        <p>1. トピック名を入力してください</p>
                    </div> 
                    <form onSubmit={(e) => this.formSubmit(e)}>
                        <p>トピック名</p>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            onSuggestionSelected={this.onSuggestionSelected}
                            inputProps={inputProps} 
                        />
                        {this.renderMark()}
                    </form>
                </BoxTransition>
            </Box>
        )
    }
}

export default CreateDecideTopic;