import React, { Component } from "react"

import Autosuggest from "react-autosuggest";
import { IoIosClose } from "react-icons/io"

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
]

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
  }
  
  return suggestions;
}

class CreateTagTopic extends Component {

    constructor(props){
        super(props)
        this.state = {
            value: "",
            suggestions: [],
            end: false,
            tags: JSON.parse(localStorage.getItem("tags")) || [],
            flag: ""
        };
    };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        this.checkForDuplicate(newValue);
    };

    getSuggestionValue = suggestion => {
        if (suggestion.added) {
          return this.state.value;
        }
        return suggestion.name;
    };

    renderSuggestion = suggestion => {
        if (suggestion.added) {
          return false;
        }
        return (
            <div className="search-result-wrapper">
                <div className="search-result">
                    {suggestion.name}
                </div>
            </div>
        )
    };

    renderWarning = (flag) => {
        switch(flag){
            case "limit":
                return (
                    <div className="topic-form-area-top-warning">
                        <div className="topic-form-area-top-warning-circle"/>
                        <p>
                            選択できるタグの上限は五つまでです。
                        </p>
                    </div>
                )
            case "sameVal":
                return (
                    <div className="topic-form-area-top-warning">
                        <div className="topic-form-area-top-warning-circle"/>
                        <p>
                            既に同じタグが追加されています。
                        </p>
                    </div>
                )
            default:
                return false;
        }
    }

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
        this.setState({
            value: suggestion.name
        });
    };

    // simply checking for lowercase duplicates might not be the best idea.
    // some terms may have different meanings based on capitalization.
    // Also this function is reaking the immutability constraint!!
    deleteTag = (e) => {
        const html = e.target.innerHTML;
        const res = this.state.tags.filter((tag) => 
            tag.toLowerCase() !== html.toLowerCase()
        );
        this.setState({
            tags: res
        });
    };

    checkForDuplicate = (term) => {
        const res = this.state.tags.filter((tag) => 
            tag.toLowerCase() === term.toLowerCase()
        );
        if(res.length > 0){
            this.setState({ flag: "sameVal" });
            return true;
        };
        this.setState({ flag: "" });
        return false;
    };

    renderTags = () => {
        const tagItems = this.state.tags.map(tag => 
            <div className="topic-form-tags-box" key={tag} onClick={this.deleteTag}>
                <p>{tag}</p>
                <IoIosClose className="topic-form-tags-icon"/>
            </div>  
        )   
        return tagItems;
    }

    handleBack = () => {
        localStorage.setItem("tags",JSON.stringify(this.state.tags))
        this.props.setBackward(true);
        this.props.setStep(1);
    }   

    handleForward = () => {
        localStorage.setItem("tags",JSON.stringify(this.state.tags))
        if(!this.state.tags.length){
            console.log("Illegal attempt to bypass sending a file");
        }
        this.setState({
            end: true,
        })
        this.props.setBackward(false);
        this.props.setStep(3);
        this.props.setTags(this.state.tags);
    }

    formSubmit = (e) => {
        e.preventDefault();
        const res = this.checkForDuplicate(this.state.value);
        if(res) {
            return false;
        }
        this.setState({
            tags: [...this.state.tags, this.state.value],
            value: ""
        })
    }

    render() {

        const inputProps = {
            placeholder: "タグを入力...",
            value: this.state.value,
            onChange: this.onChange,
        };

        return (
            <div className="topic-form-area">
                <div className={this.props.back ? "topic-form-area-wrapper-enter" : "topic-form-area-wrapper-show"}>
                    <div className="topic-form-area-top"> 
                        {this.state.tags.length < 5 && this.state.flag ? this.renderWarning("sameVal"): ""}
                        {this.state.tags.length > 4 ? this.renderWarning("limit") : ""}
                        <p className="topic-form-area-top-title">3. トピックに関するタグを追加</p>
                    </div> 
                    <form onSubmit={this.formSubmit} className="topic-form-area-middle">
                        <div className="topic-form-tags">
                            {this.renderTags()}
                        </div>
                        <p className="topic-form-area-input-title">タグ</p>
                        <Autosuggest
                            className="topic-form-area-search" 
                            suggestions={this.state.suggestions}
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
                        <button 
                            className={!this.state.tags.length || this.state.tags.length > 4 ? "topic-form-button-right disable" : "topic-form-button-right"} 
                            onClick={this.handleForward}
                        >
                                次へ進む
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateTagTopic;