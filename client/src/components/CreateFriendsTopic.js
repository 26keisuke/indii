import React, { Component } from "react"

import Autosuggest from "react-autosuggest";
import { IoMdClose } from "react-icons/io"

import sample from "../images/sample0.jpg"

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

class CreateFriendsTopic extends Component {

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
                <IoMdClose className="topic-form-tags-icon"/>
            </div>  
        )   
        return tagItems;
    }

    handleBack = () => {
        localStorage.setItem("tags",JSON.stringify(this.state.tags))
        this.props.setBackward(true);
        this.props.setStep(2);
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
        this.props.setStep(4);
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
            placeholder: "ユーザー名で検索...",
            value: this.state.value,
            onChange: this.onChange,
        };

        return (
            <div className="topic-form-area">
                <div className={this.props.back ? "topic-form-area-wrapper-enter" : "topic-form-area-wrapper-show"}>
                    <div className="topic-form-area-top"> 
                        {this.renderWarning()}
                        <p className="topic-form-area-top-title">4. フォロワーを招待</p>
                    </div> 
                    <form onSubmit={this.formSubmit} className="topic-form-area-middle">
                        <p className="topic-form-area-input-title">フォロワーを検索</p>
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
                            className="topic-form-button-right" 
                            onClick={this.handleForward}
                        >
                                次へ進む
                        </button>
                    </div>
                    <div className="topic-form-friends">
                        <div className="topic-form-friends-wrapper">
                            <div className="topic-form-friends-close">
                                <IoMdClose className="topic-form-friends-close-icon"/>
                            </div>
                            <img src={sample} className="topic-form-friends-person"/>
                        </div>
                        <div className="topic-form-friends-wrapper">
                            <div className="topic-form-friends-close">
                                <IoMdClose className="topic-form-friends-close-icon"/>
                            </div>
                            <img src={sample} className="topic-form-friends-person"/>
                        </div>
                        <div className="topic-form-friends-wrapper">
                            <div className="topic-form-friends-close">
                                <IoMdClose className="topic-form-friends-close-icon"/>
                            </div>
                            <img src={sample} className="topic-form-friends-person"/>
                        </div>
                        <div className="topic-form-friends-wrapper">
                            <div className="topic-form-friends-close">
                                <IoMdClose className="topic-form-friends-close-icon"/>
                            </div>
                            <img src={sample} className="topic-form-friends-person"/>
                        </div>
                        <div className="topic-form-friends-wrapper">
                            <div className="topic-form-friends-close">
                                <IoMdClose className="topic-form-friends-close-icon"/>
                            </div>
                            <img src={sample} className="topic-form-friends-person"/>
                        </div>
                        <div className="topic-form-friends-wrapper">
                            <div className="topic-form-friends-close">
                                <IoMdClose className="topic-form-friends-close-icon"/>
                            </div>
                            <img src={sample} className="topic-form-friends-person"/>
                        </div>
                        <div className="topic-form-friends-wrapper">
                            <div className="topic-form-friends-close">
                                <IoMdClose className="topic-form-friends-close-icon"/>
                            </div>
                            <img src={sample} className="topic-form-friends-person"/>
                        </div>
                        <div className="topic-form-friends-wrapper">
                            <div className="topic-form-friends-close">
                                <IoMdClose className="topic-form-friends-close-icon"/>
                            </div>
                            <img src={sample} className="topic-form-friends-person"/>
                        </div>
                        <div className="topic-form-friends-wrapper">
                            <div className="topic-form-friends-close">
                                <IoMdClose className="topic-form-friends-close-icon"/>
                            </div>
                            <img src={sample} className="topic-form-friends-person"/>
                        </div>
                        <div className="topic-form-friends-wrapper">
                            <div className="topic-form-friends-close">
                                <IoMdClose className="topic-form-friends-close-icon"/>
                            </div>
                            <img src={sample} className="topic-form-friends-person"/>
                        </div>
                        <div className="topic-form-friends-wrapper">
                            <div className="topic-form-friends-close">
                                <IoMdClose className="topic-form-friends-close-icon"/>
                            </div>
                            <img src={sample} className="topic-form-friends-person"/>
                        </div>
                        <div className="topic-form-friends-wrapper">
                            <div className="topic-form-friends-close">
                                <IoMdClose className="topic-form-friends-close-icon"/>
                            </div>
                            <img src={sample} className="topic-form-friends-person"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateFriendsTopic;