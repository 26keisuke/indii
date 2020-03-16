// SearchのHOC
import React, { Component } from "react"
import { connect } from "react-redux"

import * as actions from "../../../actions"

import Search from "../Search"
import Post from "../Suggestion/Post"
import Topic from "../Suggestion/Topic"

// type => enum { FEED, UNIQUE, MATCH }
// theme => enum { TOPIC, POST }

class Match extends Component {
        constructor(props){
            super(props)
            this.state = {
                blur: true,
                jpTheme: theme === "TOPIC" ? "トピック" : theme === "POST" ? "ポスト" : "",
                showWarning: true,
                value: localStorage.getItem(this.props.storageId) || "",
            }
        }

        handleClick = (suggestionName) => {
            if(type === "FEED") {
                return this.props.searchTerm(suggestionName)
            } else if(type === "Unique"){
                if(theme === "TOPIC" && (this.props._topic.length === 0 || typeof(this.props._topic) === "string")){
                    return
                } else if(theme === "POST" && (this.props._post.length === 0 || typeof(this.props._post) === "string")){
                    return
                }
            }

            this.props.postAction();
        }

        handleUniqueSubmit = () => {

        }

        handleMatchSubmit = () => {

        }

        handleFeedSubmit = () => {

        }

        getTopicSuggestions = () => {
            this.props.searchFetching("ACTION", true)
            this.props.searchTopic(type, value)  
        }

        getPostSuggestions = () => {
            this.props.searchFetching("ACTION", true)
            this.props.searchPost(type, value, this.props.topicId)  // topicIdがある場合はtopic内で検索される
        }

        renderUniqueSuggestion = (suggestion, index, cursor) => {
            if (typeof(suggestion) === "string") { // もし、なにもresultがなかった場合は、そのままsearched termを返す
                return (
                    <New
                        onHover={index === cursor}
                        handleClick={this.handleClick}
                        text={`新しい${this.state.jpTheme}"${suggestion}"を追加する`}
                        value={suggestion}
                        icon={<IoIosAddCircleOutline/>}
                    />
                );
            } else if (theme === "TOPIC") {
                return (
                    <Topic
                        onHover={index === cursor}
                        handleClick={this.handleClick}
                        suggestion={suggestion}
                    />
                );
            } else if (theme === "POST") {
                return (
                    <Post
                        onHover={index === cursor}
                        suggestion={suggestion}
                    />
                );
            }
        };
    
        renderMatchSuggestion = (suggestion, index, cursor) => {
            if(theme === "TOPIC") {
                return (
                    <Topic
                        onHover={index === cursor}
                        handleClick={this.handleClick}
                        suggestion={suggestion}
                    />
                )
            } else if (theme === "POST") {
                return (
                    <Post
                        onHover={index === cursor}
                        suggestion={suggestion}
                    />
                )
            }
        };

        handleFocus = () => { this.setState({ blur: false })}
        handleBlur = () => { this.setState({ blue: true }) }

        render () {

            const ISTOPIC = theme === "TOPIC"

            const { theme, placeholder, postAction, storageId, topicId } = this.props

            return(
                <WrappedComponent
                    type={type}
                    theme={theme}

                    blur={this.state.blur}
                    showWarning={this.state.showWarning}
                    isFetching
                    {...this.props}
                >
                    { type === "MATCH"
                    ?
                    <Search
                        value={this.state.value}
                        placeholder={placeholder}                 
                        suggestions={ISTOPIC ? this.props._topic : this.props._post}
                        handleSubmit={handleSubmit}
                        handleBlur={this.handleBlur}
                        handleFocus={this.handleFocus}
                        getSuggestions={ISTOPIC ? this.getTopicSuggestions : this.getPostSuggestions}
                        renderSuggestion={this.renderMatchSuggestion}
                    />
                    : type === "UNIQUE"
                    ?
                    <Search
                        value={this.state.value}
                        placeholder={placeholder}                 
                        suggestions={ISTOPIC ? this.props._topic : this.props._post}
                        handleSubmit={handleSubmit}
                        handleBlur={this.handleBlur}
                        handleFocus={this.handleFocus}
                        getSuggestions={ISTOPIC ? this.getTopicSuggestions : this.getPostSuggestions}
                        renderSuggestion={this.renderUniqueSuggestion}
                    />
                    :
                    ""
                    }
                </WrappedComponent>
            )
        }
}

Match.propTypes = {
    theme: PropTypes.string,
    placeholder: PropTypes.string,
    postAction: PropTypes.func,
    storageId: PropTypes.string,
    topicId: PropTypes.string,
}

function mapStateToProps({ topic, post }){
    return  {
        _topic: topic.search,
        _post: post.search,
    }
}

export default connect(mapStateToProps, actions)(Match)