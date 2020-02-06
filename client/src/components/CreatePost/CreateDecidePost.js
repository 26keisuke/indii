import React, { Component } from "react";

import Autosuggest from "react-autosuggest";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline, IoMdCheckmark, IoMdClose } from "react-icons/io";
import Post from "../Header/Search/Suggestion/Post";
import Warning from "../Header/Search/Warning/Warning"

import posts from "../__Mock__/data/post"

const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  const suggestions = posts.filter(post => regex.test(post.title));
  
  if (suggestions.length === 0) {
    return [
      { added: true } 
    ];
  };
  
  return suggestions;
};

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
        this.setState({
            blur: true,
            end: true,
        });
        this.props.setBackward(false);
        this.props.setStep(2);
        this.props.setPost(term);
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
        return suggestion.title;
    };

    renderSuggestion = suggestion => {
        if (suggestion.added) {
            return (
                <div onClick={() => this.handleClick(this.state.value)} className="search-result-wrapper">
                    <div className="search-result">
                    <IoIosAddCircleOutline/> 新しいポスト<span>"{this.state.value}"</span>を追加する
                    </div>
                </div>
            );
        };
        return (
            <Post
                suggestion={suggestion}
            />
        );
    };

    renderMark = () =>{
        if(!this.state.value || this.state.blur) {
            return ""
        } else {
            const success = () => {return <IoMdCheckmark className="topic-form-area-middle-icon green"/>}
            const fail = () => {return <IoMdClose className="topic-form-area-middle-icon red"/>}
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
            return false;
        } else {
            const success = () => {return false}
            const fail = () => {
                return (
                    <Warning>
                        <p>
                            既にポスト名<Link to={"/topic/1123"}>"{this.state.value}"</Link>は存在しています。代わりに<Link to={"/action/post/create"}>新しいポスト</Link>を追加しますか？
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
          suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {
        if(this.state.suggestions.length > 0 && this.state.suggestions[0].added){ 
            this.handleClick(this.state.value)
        } else {
            this.setState({
                value: suggestion.title,
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

    handleBack = () => {
        this.props.setBackward(true);
        this.props.setStep(0);
    }   

    formSubmit = (e) => {
        e.preventDefault();
        const success = () => this.handleClick(this.state.value);
        const fail = () => console.log("Duplicate");

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
                        <p className="topic-form-area-top-title">2. ポスト名を入力してください</p>
                    </div> 
                    <form onSubmit={this.formSubmit} className="topic-form-area-middle">
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
                        {this.renderMark()}
                    </form>
                    <div className="topic-form-button">
                        <button className="topic-form-button-left" onClick={this.handleBack}>戻る</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateDecideTopic;