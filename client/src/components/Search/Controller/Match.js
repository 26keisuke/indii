// SearchのHOC
import React, { Component } from "react"
import { connect } from "react-redux"

import * as actions from "../../../actions"

import Search from "../Search"
import Post from "../Suggestion/Post"
import Topic from "../Suggestion/Topic"
import MatchUI from "../UI/Match"

//title, message, theme, placeholder, postAction, storageId, topicId
class Match extends Component {
        constructor(props){
            super(props)
            this.state = {
                blur: true,
                jpTheme: this.props.theme === "TOPIC" ? "トピック" : this.props.theme === "POST" ? "ポスト" : "",
                showWarning: false,
                value: localStorage.getItem(this.props.storageId) || "",
            }
        }

        componentWillUnmount(){
            this.props.searchTopic("RESET");
            this.props.searchPost("RESET");
        }

        componentDidUpdate(prevProps, prevState){
            if(prevProps._post !== this.props._post) { this.renderWarning(); }
            if(prevProps._topic !== this.props._topic) { this.renderWarning(); }

            // valueがゼロの時もprevState.suggestions === this.state.suggestionsなので直接setstateする必要がある
            if(prevState.value && !this.state.value) { 
                this.setState({ 
                    showWarning: false,
                })
            }
        }

        handleChange = (value) => { this.setState({ value: value }) }

        // Uniqueと違ってsuggestion全部を選択（名前だけではない）
        handleClick = (suggestion) => {
            this.props.postAction(suggestion);
        }

        handleMatchSubmit = (e) => {
            e.preventDefault();
        }

        getTopicSuggestions = (value) => {
            this.props.searchFetching("ACTION", true)
            this.props.searchTopic("MATCH", value)  
        }

        getPostSuggestions = (value) => {
            this.props.searchFetching("ACTION", true)
            this.props.searchPost("MATCH", value, this.props.topicId)  // topicIdがある場合はtopic内で検索される
        }
    
        renderMatchSuggestion = (suggestion, index, cursor) => {
            if (typeof(suggestion) === "string") {
                return
            } else if(this.props.theme === "TOPIC") {
                return (
                    <Topic
                        key={index+suggestion._id}
                        onHover={index === cursor}
                        handleClick={this.handleClick}
                        suggestion={suggestion}
                    />
                )
            } else if (this.props.theme === "POST") {
                return (
                    <Post
                        key={index+suggestion._id}
                        onHover={index === cursor}
                        handleClick={this.handleClick}
                        suggestion={suggestion}
                    />
                )
            }
        };

        renderWarning = () => {
            if(this.state.blur) return
            const topicFound = (this.props.theme === "TOPIC") && (typeof(this.props._topic[0]) === "object")
            const postFound = (this.props.theme === "POST") && (typeof(this.props._post[0]) === "object")
            if((this.props.theme === "TOPIC" && topicFound) || (this.props.theme === "POST" && postFound)){
                if(this.state.showWarning){
                    this.setState({
                        showWarning: false
                    })
                } 
            } else {
                this.setState({
                    showWarning: true
                })
            }
        }

        handleFocus = () => { this.setState({ blur: false })}
        handleBlur = () => { this.setState({ blur: true }) }

        render () {

            const ISTOPIC = this.props.theme === "TOPIC"
            
            return(
                <MatchUI
                    title={this.props.title}
                    message={this.props.message}
                    theme={this.props.theme}
                    value={this.state.value}
                    showWarning={this.state.showWarning}
                >
                    <Search
                        blur={this.state.blur}
                        blurStyle={blurStyle}
                        focusStyle={focusStyle}
                        suggestionStyle={suggestionStyle}
                        storage={this.props.storageId}
                        value={this.state.value}
                        placeholder={this.props.placeholder}                 
                        suggestions={ISTOPIC ? this.props._topic : this.props._post}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleMatchSubmit}
                        handleBlur={this.handleBlur}
                        handleFocus={this.handleFocus}
                        getSuggestions={ISTOPIC ? this.getTopicSuggestions : this.getPostSuggestions}
                        renderSuggestion={this.renderMatchSuggestion}
                    />
                </MatchUI>
            )
        }
}

const suggestionStyle = {
    boxShadow: "1px 1px 10px #d2d2d2",
    borderRadius: "2px",
    width: "441px",
    backgroundColor: "white",
}

const blurStyle = {
    width: "435px",
    height: "36px",
    border: "none",
    borderBottom: "0.5px solid #838383",
    paddingLeft: "5px",
    fontSize: "14px",
    marginTop: "4px"
}

const focusStyle = {
    width: "435px",
    height: "36px",
    border: "none",
    borderBottom: "0.5px solid #9EAEE6",
    paddingLeft: "5px",
    fontSize: "14px",
    marginTop: "4px",
}

function mapStateToProps({ topic, post }){
    return  {
        _topic: topic.search,
        _post: post.search,
    }
}

export default connect(mapStateToProps, actions)(Match)