// 将来的には以下のリンクを参考にして、もっとAutosuggestを簡潔にする
// https://github.com/moroshko/react-autosuggest/blob/master/FAQ.md#how-do-i-get-the-input-element
// https://codepen.io/moroshko/pen/WryOMP

// 初めて使う場合はこれを参考にすべき
// https://codepen.io/moroshko/pen/vpBzMr
// https://codepen.io/moroshko/pen/OXwgqg?editors=0010

import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import * as actions from "../../actions"

import topics from "../__Mock__/data/topic"
import getSuggestions from "../__Mock__/method/getSuggestions"

import { IoIosSearch } from "react-icons/io";
import search from "../../images/search.png";
import searchClick from "../../images/search-click.png";

import Topic from "./Suggestion/Topic";
import New from "./Suggestion/New"

class Search extends Component {

    constructor(props){
        super(props)
        this.state = {
            value: "",
            suggestions: [],
        }
    }

    handleClick = (term) => {
        this.props.searchTerm(term)
    }

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
            <New
                url="/search/from_direct"
                text={["", "を検索する"]}
                value={this.state.value}
                handleClick={this.handleClick}
            >
                <IoIosSearch/>
            </New>
          );
        }
        return (
            <Topic
                url="/search/from_suggestion"
                handleClick={this.handleClick}
                suggestion={suggestion}
                target="name"
            />
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

    handleFocus = () =>{
        this.props.onSearch()
    }

    handleBlur = () =>{
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
                    alt={"検索バーにある検索アイコン"}
                />
                <Autosuggest
                    className="search-input" 
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
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

export default connect(mapStateToProps, actions)(withRouter(Search))