import React, { Component } from "react";

import Autosuggest from "react-autosuggest";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline, IoMdCheckmark, IoMdClose } from "react-icons/io";

import TopicSuggestion from "./TopicSuggestion";

//ここは全てのデータをとってくる。idとかimgだけにこだわらず。そして最後にコントローラーに送ることで後々楽になると思う
const topics = [
    {
        id: "123",
        imgUrl: "",
        name: "C",
        likes: 123132,
        posts: 123,
        tags: ["Computer Science"],
    },
    {
        id: "123",
        imgUrl: "",
        name: "C0",
        likes: 123132,
        posts: 123,
        tags: ["Computer Science"],
    },
    {
        id: "123",
        imgUrl: "",
        name: "C00",
        likes: 123132,
        posts: 123,
        tags: ["Computer Science"],
    },
    {
        id: "123",
        imgUrl: "",
        name: "C000",
        likes: 123132,
        posts: 123,
        tags: ["Computer Science"],
    },
    {
        id: "123",
        imgUrl: "",
        name: "C0000",
        likes: 123132,
        posts: 123,
        tags: ["Computer Science"],
    }
];

const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  const suggestions = topics.filter(topic => regex.test(topic.name));
  
  if (suggestions.length === 0) {
    return [];
  };
  
  return suggestions;
};

class ActionDecideTopic extends Component {

    constructor(props){
        super(props)
        this.state = {
            value: localStorage.getItem(this.props.storage) || "",
            suggestions: [],
            blur: true,
            end: false,
        };
    };

    handleClick = (suggestion) => {
        this.setState({
            blur: true,
            end: true,
        });
        this.props.setBackward(false);
        this.props.setStep(1);
        this.props.setTopic(suggestion);
    };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        localStorage.setItem(this.props.storage, newValue);
    };

    getSuggestionValue = suggestion => {
        return suggestion.name;
    };

    renderSuggestion = suggestion => {
        return (
            <TopicSuggestion
                suggestion={suggestion}
            />
        )
    };

    renderWarning = () => {
        if(!this.state.value || this.state.blur) { // linkがblurのためクリックできない
            return false;
        } else {
            const success = () => {return false}
            const fail = () => {
                return (
                    <div className="topic-form-area-top-warning">
                        <div className="topic-form-area-top-warning-circle"/>
                        <p>
                            トピック「{this.state.value}」はまだ作られていません。<Link to={"/action/topic/create"}>新しく作成しますか？</Link>
                        </p>
                    </div>
                )
            };
            if(this.state.value) {
                if(this.state.suggestions.length > 0){ 
                    return success();
                } else {
                    return fail();
                };
            };
        };
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {
        if(this.state.suggestions.length > 0){ 
            this.handleClick(suggestion)
        } 
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
    }

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
            <div className="topic-form-area">
                <div className={this.props.back ? "topic-form-area-wrapper-enter" : "topic-form-area-wrapper"}>
                    <div className="topic-form-area-top"> 
                        {this.renderWarning()}
                        <p className="topic-form-area-top-title">1. トピックを選択してください</p>
                    </div> 
                    <form onSubmit={(e) => this.formSubmit(e)} className="topic-form-area-middle">
                        <p className="topic-form-area-input-title">トピック名</p>
                        <Autosuggest
                            className="topic-form-area-search" 
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            onSuggestionSelected={this.onSuggestionSelected}
                            inputProps={inputProps} 
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default ActionDecideTopic;