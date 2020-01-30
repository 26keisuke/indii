import React, { Component } from "react";

import Autosuggest from "react-autosuggest";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline, IoMdCheckmark, IoMdClose } from "react-icons/io";

const topics = [
    {
        imgUrl: "",
        name: "C"
    },
    {
        imgUrl: "",
        name: "C0"
    },
    {
        imgUrl: "",
        name: "C00"
    },
    {
        imgUrl: "",
        name: "C000"
    },
    {
        imgUrl: "",
        name: "C0000"
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
            value: localStorage.getItem("topicName") || "",
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
        this.props.setStep(1);
        this.props.topicName(term);
    };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        localStorage.setItem("topicName", newValue);

        //==FOR LOGGING (DELETE THIS LATER)==//
        // const suggest = this.state.suggestions
        // const len = this.state.suggestions.length

        // console.log(this.state.suggestions)
        // if (this.state.suggestions.length > 0){
        //     console.log(this.state.suggestions[0])
        // }
        // console.log(len > 0)
        // if(!!suggest[0]){console.log(!!suggest[0].added)}
        
        // // if(len > 0 && !!suggest[0].added){ //inputがある状態 && suggestions[0](addedの場所)がある状態 && addedがある状態
        //     console.log(true)
        // } else {
        //     console.log(false)
        // }
        //===============//
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
                <div onClick={() => this.handleClick(this.state.value)} className="search-result-wrapper">
                    <div className="search-result">
                    <IoIosAddCircleOutline/> 新しいトピック<span>"{this.state.value}"</span>を追加する
                    </div>
                </div>
            );
        };
        return (
            <div className="search-result-wrapper">
                <div className="search-result">
                    {suggestion.name}
                </div>
            </div>
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
                    <div className="topic-form-area-top-warning">
                        <div className="topic-form-area-top-warning-circle"/>
                        <p>
                            既にトピック名<Link to={"/topic/1123"}>"{this.state.value}"</Link>は存在しています。代わりに<Link to={"/create/topic"}>新しいポスト</Link>を追加しますか？
                        </p>
                    </div>
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
                        <p className="topic-form-area-top-title">1. トピック名を入力してください</p>
                    </div> 
                    <form onSubmit={this.formSubmit} className="topic-form-area-middle">
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
                        {this.renderMark()}
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateDecideTopic;