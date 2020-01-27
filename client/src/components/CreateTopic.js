import React, { Component } from "react"
import Autosuggest from "react-autosuggest";
import { Link, withRouter } from "react-router-dom"
import { IoIosArrowRoundBack, IoIosAdd} from "react-icons/io"

import "./CreateTopic.css"

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

// '\\$&'は文字列全体を意味する
const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  // 先頭の文字から比べて、testでtrueかfalseを出す
  const regex = new RegExp('^' + escapedValue, 'i');
  const suggestions = topics.filter(topic => regex.test(topic.name));
  
  if (suggestions.length === 0) {
    return [
      { added: true } 
    ];
  }
  
  return suggestions;
}

class CreateTopic extends Component {

    constructor(props){
        super(props)
        this.state = {
            value: "",
            suggestions: [],
            selected: ""
        }
    }

    handleClick = (term) => {
        this.props.searchTerm(term)
    }

    // Mostly from 
    // https://codepen.io/moroshko/pen/vpBzMr
    // https://codepen.io/moroshko/pen/OXwgqg?editors=0010

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        })
    }

    getSuggestionValue = suggestion => {
        if (suggestion.added) {
          return this.state.value;
        }
        return suggestion.name;
    };

    renderSuggestion = suggestion => {
        if (suggestion.added) {
          return (
            //　一見すると、何も変化がないように思えるがurlを変えてみると、ちゃんと動いてるのがわかる
            <Link to={"/search/from_direct"} onClick={() => this.handleClick(this.state.value)} className="search-result-wrapper">
                <div className="search-result">
                <IoIosAdd/> <span>"{this.state.value}"</span>を追加する
                </div>
            </Link>
          );
        }
        return (
            <Link to={"/search/from_suggestion"} onClick={() => this.handleClick(suggestion.name)} className="search-result-wrapper">
                <div className="search-result">
                    {suggestion.name}
                </div>
            </Link>
        )
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
        this.setState({
            selected: suggestion.name
        })
    }

    formSubmit = (e) => {
        e.preventDefault()
        this.handleClick(this.state.value); 
        this.props.history.push("/search/from_form")
    }


    render() {

        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "トピック名を入力...",
            value,
            onChange: this.onChange,
        };


        return (
            <div className="topic-form-wrapper">
                <div className="topic-form">
                    <div className="topic-form-progress">
                        <div className="topic-form-progress-circle topic-form-circle-1">
                            <p>1</p>
                        </div>
                        <div className="topic-form-progress-bar topic-form-bar-1"></div>
                        <div className="topic-form-progress-circle topic-form-circle-2">
                            <p>2</p>
                        </div>
                        <div className="topic-form-progress-bar topic-form-bar-2"></div>
                        <div className="topic-form-progress-circle topic-form-circle-3">
                            <p>3</p>
                        </div>
                        <div className="topic-form-progress-bar topic-form-bar-3"></div>
                        <div className="topic-form-progress-circle topic-form-circle-4">
                            <p>4</p>
                        </div>
                        <div className="topic-form-progress-bar topic-form-bar-4"></div>
                        <div className="topic-form-progress-circle topic-form-circle-5">
                            <p>5</p>
                        </div>
                    </div>
                    <div className="topic-form-area">
                        <div className="topic-form-area-wrapper">
                            <div className="topic-form-area-top"> 
                                <p>1. トピック名を入力してください</p>
                            </div> 
                            <div className="topic-form-area-middle">
                                <p>トピック名</p>
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
                                <IoIosArrowRoundBack className="topic-form-area-middle-icon"/>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateTopic;