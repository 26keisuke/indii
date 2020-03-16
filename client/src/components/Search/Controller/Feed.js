import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import * as actions from "../../../actions"

import Search from "../Search"
import Topic from "../Suggestion/Topic"
import New from "../Suggestion/New"
import FeedUI from "../UI/Feed"

// placeholder

class Feed extends Component {

    constructor(props){
        super(props)
        this.state = {
            blur: true,
            value: "",
        }
    }

    componentWillUnmount(){
        this.props.searchTopic("RESET");
    }

    handleChange = (value) => { this.setState({ value: value }) }

    handleClick = (suggestion) => {
        if(typeof(suggestion) === "string"){
            this.props.searchTerm(suggestion)
            return
        }
        this.props.searchTerm(suggestion.topicName)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleClick(this.state.value); 
        this.props.history.push("/search/from_form")
    }

    getSuggestions = (value) => {
        this.props.searchFetching("ACTION", true)
        this.props.searchTopic("TOPIC", value)  
    }

    renderSuggestion = (suggestion, index, cursor) => {
        if (typeof(suggestion) === "string") {
            return (
                <New
                    key={suggestion + index}
                    onHover={index === cursor}
                    url="/search/from_direct"
                    message={`${suggestion} を検索する`}
                    value={suggestion}
                    handleClick={this.handleClick}
                    icon={<SearchOutlinedIcon color="primary" fontSize="small"/>}
                />
            );
        }
        return (
            <Topic
                key={suggestion._id}
                onHover={index === cursor}
                url="/search/from_suggestion"
                handleClick={this.handleClick}
                suggestion={suggestion}
            />
        )
    }

    handleFocus = () => { this.setState({ blur: false }) }
    handleBlur = () => { this.setState({ blur: true }) }

    render () {
        return(
            <FeedUI
                blur={this.state.blur}
            >
                <Search
                    blur={this.state.blur}
                    blurStyle={blurStyle}
                    focusStyle={focusStyle}
                    suggestionStyle={suggestionStyle}
                    value={this.state.value}
                    placeholder={this.props.placeholder}                 
                    suggestions={this.props._topic}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handleBlur={this.handleBlur}
                    handleFocus={this.handleFocus}
                    getSuggestions={this.getSuggestions}
                    renderSuggestion={this.renderSuggestion}
                />
            </FeedUI>
        )
    }
}

const focusStyle = {
    borderRadius: "2px",
    width: "100%",
    maxWidth: "550px",
    height: "39px",
    fontSize: "13px",
    boxSizing: "border-box",
    padding: "0px 40px",
    border: "0.5px solid #9EAEE6",
    backgroundColor: "white",
}

const blurStyle = {
    border: "none",
    borderRadius: "2px",
    backgroundColor: "rgba(64, 64, 64, 0.1)",
    width: "100%",
    maxWidth: "550px",
    height: "39px",
    fontSize: "13px",
    boxSizing: "border-box",
    padding: "0px 40px",
}

const suggestionStyle = {
    boxShadow: "1px 1px 10px #d2d2d2",
    borderRadius: "2px",
    width: "100%",
    backgroundColor: "white",
}

function mapStateToProps({ topic }){
    return  {
        _topic: topic.search,
    }
}

export default connect(mapStateToProps, actions)(withRouter(Feed))