import React, { Component } from "react";

import Autosuggest from "react-autosuggest";
import { Link } from "react-router-dom";
import { FaUserCheck } from "react-icons/fa"

import PostSuggestion from "./PostSuggestion";

const topics = [
    {
        id: "123",
        imgUrl: "",
        index: [1,2,3],
        permission: true,
        likes: "2141",
        editLevel: "red",
        title: "C",
        lastEdited: "Auguest 2019-11-1 10:22PM"
    },
    {
        id: "123",
        imgUrl: "",
        index: [1,2,3],
        permission: true,
        likes: "2141",
        editLevel: "red",
        title: "Ccccsf",
        lastEdited: "Auguest 2019-11-1 10:22PM"
    },
    {
        id: "123",
        imgUrl: "",
        index: [1,2,3],
        permission: false,
        likes: "2141",
        editLevel: "red",
        title: "Ccc3sfas",
        lastEdited: "Auguest 2019-11-1 10:22PM"
    },
    {
        id: "123",
        imgUrl: "",
        index: [1,2,3],
        permission: false,
        likes: "2141",
        editLevel: "red",
        title: "Cc",
        lastEdited: "Auguest 2019-11-1 10:22PM"
    }
];

const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  const suggestions = topics.filter(topic => regex.test(topic.title));
  
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
        localStorage.setItem(this.props.storage,this.state.value)
        this.props.setBackward(false);
        this.props.setStep(2);
        this.props.setPost(suggestion);
    };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        localStorage.setItem(this.props.storage, newValue);
    };

    getSuggestionValue = suggestion => {
        return suggestion.title;
    };

    renderSuggestion = suggestion => {
        return (
            <PostSuggestion
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
                            ポスト「{this.state.value}」はまだ作られていません。<Link to={"/action/post/create"}>新しく作成しますか？</Link>
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

    handleBack = () => {
        this.props.setBackward(true);
        this.props.setStep(0);
    }   

    formSubmit = (e) => {
        e.preventDefault();
    }

    render() {

        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "ポスト名を入力...",
            value,
            onChange: this.onChange,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
        };

        return (
            <div className="topic-form-area">
                <div className={this.props.back ? "topic-form-area-wrapper-enter" : "topic-form-area-wrapper-show"}>
                    <div className="topic-form-area-top"> 
                        {this.renderWarning()}
                        <p className="topic-form-area-top-title">2. ポストを選択してください</p>
                        <div className="topic-form-helper">
                            <FaUserCheck　className="topic-form-helper-icon"/>
                            <p className="topic-form-helper-text">: オーナーが最終確認するポスト</p>
                        </div>
                    </div> 
                    <form onSubmit={(e) => this.formSubmit(e)} className="topic-form-area-middle">
                        <p className="topic-form-area-input-title">ポスト名</p>
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
                    <div className="topic-form-button">
                        <button className="topic-form-button-left" onClick={this.handleBack}>戻る</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ActionDecideTopic;