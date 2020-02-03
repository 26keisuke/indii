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
        const tags = this.initializeTags()
        this.state = {
            value: "",
            suggestions: [],
            tags: tags,
            duplicate: false,
            illegal: false,
            limit: false,
        };
    };

    initializeTags = () => {
        const cache = localStorage.getItem(this.props.storage)
        if (cache === null){
            console.log("1")
            return []
        } else if (cache != "undefined"){
            console.log("2")
            return []
        } else {
            console.log("3")
            return JSON.parse(cache)
        }
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        this.checkForDuplicate(newValue);
        this.checkForIllegalValue(newValue);
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
                            選択できるタグの上限は{this.props.max}つまでです。
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
            case "illegal":
                return (
                    <div className="topic-form-area-top-warning">
                        <div className="topic-form-area-top-warning-circle"/>
                        <p>
                            タグに無効な文字が含まれています。
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

    // This function is reaking the immutability constraint!!
    deleteTag = (e) => {
        const res = this.state.tags.filter((tag) => 
            tag.toLowerCase() !== e
        );
        this.setState({
            tags: res,
            limit: false
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
        const tagItems = this.state.tags.map(tag => 
            <div className="topic-form-tags-box" key={tag} onClick={() => this.deleteTag(tag)}>
                <p className="topic-form-tags-tags">{tag}</p>
                <IoIosClose className="topic-form-tags-icon"/>
            </div>  
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
        this.props.setStep(3);
        this.props.setTags(this.state.tags);
    }

    formSubmit = (e) => {
        e.preventDefault();

        if(this.state.value === ""){
            return false;
        }
        if(this.state.duplicate || this.state.illegal) {
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

    render() {

        const inputProps = {
            placeholder: "決定キーで追加されます...",
            value: this.state.value,
            onChange: this.onChange,
        };

        const max = this.props.max

        return (
            <div className="topic-form-area">
                <div className={this.props.back ? "topic-form-area-wrapper-enter" : "topic-form-area-wrapper-show"}>
                    <div className="topic-form-area-top"> 
                        {this.state.tags.length < max && this.state.duplicate ? this.renderWarning("sameVal"): ""}
                        {this.state.limit ? this.renderWarning("limit") : ""}
                        {this.state.tags.length < max && this.state.illegal ? this.renderWarning("illegal"): ""}
                        <p className="topic-form-area-top-title">3. トピックに関するタグを追加</p>
                    </div> 
                    <form onSubmit={this.formSubmit} className="topic-form-area-middle">
                        <div className="topic-form-tags">
                            {this.renderTags()}
                        </div>
                        <p className="topic-form-area-input-title zero-opacity">タグ</p>
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
                            className={!this.state.tags.length ? "topic-form-button-right disable" : "topic-form-button-right"} 
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