// 将来的には以下のリンクを参考にして、もっとAutosuggestを簡潔にする
// https://github.com/moroshko/react-autosuggest/blob/master/FAQ.md#how-do-i-get-the-input-element
// https://codepen.io/moroshko/pen/WryOMP

import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"

import * as actions from "../actions"

import search from "../images/search.png";
import searchClick from "../images/search-click.png";

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

class SearchBox extends Component {

    constructor(props){
        super(props)
        this.state = {
            value: "",
            suggestions: [],
            // selected: ""
        }
        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
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
                [+] <span>"{this.state.value}"</span>を検索する
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

    // onSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {
    //     this.setState({
    //         selected: suggestion.name
    //     })
    // }

    handleFocus() {
        this.props.onSearch()
    }

    handleBlur() {
        this.props.offSearch()
    }

    formSubmit = (e) => {
        e.preventDefault()
        this.handleClick(this.state.value); 
        this.props.history.push("/search/from_form")
    }

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Indiiで検索",
            value,
            onChange: this.onChange,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
        };

        return (
            <form onSubmit={this.formSubmit} className="search-box">
                <img 
                    src={this.props.search.onSearch ? searchClick : search}  
                    className="search-icon"
                />
                <Autosuggest
                    className="search-input" 
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    // onSuggestionSelected={this.onSuggestionSelected}
                    inputProps={inputProps} 
                />
            </form>
        )
    }
}

function mapStateToProps(state){
    return{
        search: state.search
    }
}

// Routerから離れたnested componentsのため、propsをwithRouterで獲得しなくてはいけない
export default connect(mapStateToProps, actions)(withRouter(SearchBox))