// SearchのHOC
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { IoIosAddCircleOutline } from "react-icons/io";

import * as actions from "../../../actions"

import Search from "../Search"
import Post from "../Suggestion/Post"
import Topic from "../Suggestion/Topic"
import New from "../Suggestion/New"
import UniqueUI from "../UI/Unique"

class Unique extends Component {
    constructor(props){
        super(props)
        this.state = {
            blur: true,
            jpTheme: this.props.theme === "TOPIC" ? "トピック" : this.props.theme === "POST" ? "ポスト" : "",
            showWarning: false,
            warningId: "",
            showMark: "", // GREENかRED
            value: localStorage.getItem(this.props.storageId) || "",
        }
    }

    componentDidMount() {
        const initVal = localStorage.getItem(this.props.storageId)
        if(initVal){
            if(this.props.theme === "TOPIC"){
                this.props.searchFetching("ACTION", true)
                this.props.searchTopic("UNIQUE", initVal)  
            } else if(this.props.theme === "POST"){
                this.props.searchFetching("ACTION", true)
                this.props.searchPost("UNIQUE", initVal, this.props.topicId) 
            }
        }
    }

    componentWillUnmount(){
        this.props.searchTopic("RESET");
        this.props.searchPost("RESET");
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps._post !== this.props._post) { this.renderWarning(); this.renderMark(); }
        if(prevProps._topic !== this.props._topic) { this.renderWarning(); this.renderMark(); }

        // valueがゼロの時もprevState.suggestions === this.state.suggestionsなので直接setstateする必要がある
        if(prevState.value && !this.state.value) { 
            this.setState({ 
                showWarning: false,
                showMark: ""
            })
        }
    }

    topicFlag = () => {
        if(this.props.theme === "TOPIC" && (this.props._topic.length === 0 || typeof(this.props._topic[0]) === "string")){
            return true
        }
        return false
    }

    postFlag = () => {
        if(this.props.theme === "POST" && (this.props._post.length === 0 || typeof(this.props._post[0]) === "string")){
            return true
        }
        return false
    }

    handleChange = (value) => { this.setState({ value: value }) }

    handleClick = (suggestionName) => {
        if(this.state.value && (this.topicFlag() || this.postFlag())){
            this.props.postAction(suggestionName);
        }
    }

    // これsuggestionが出る前にsubmitしたら仮にduplicateであったとしても許可されてしまう
    handleUniqueSubmit = (e) => {
        e.preventDefault();

        if (
            this.props.theme === "POST" && 
            this.state.value !== this.props._post[0]
        ) return

        if (
            this.props.theme === "TOPIC" && 
            this.state.value !== this.props._topic[0]
        ) return

        if(this.state.value) {
            if(this.topicFlag()) {
                this.handleClick(this.state.value);
                return
            } 
            if(this.postFlag()) {
                this.handleClick(this.state.value);
                return
            }
        };
    }

    getTopicSuggestions = (value) => {
        this.props.searchFetching("ACTION", true)
        this.props.searchTopic("UNIQUE", value)  
    }

    getPostSuggestions = (value) => {
        this.props.searchFetching("ACTION", true)
        this.props.searchPost("UNIQUE", value, this.props.topicId)  // topicIdがある場合はtopic内で検索される
    }

    renderUniqueSuggestion = (suggestion, index, cursor) => {
        if (typeof(suggestion) === "string") { // もし、なにもresultがなかった場合は、そのままsearched termを返す
            return (
                <New
                    key={index+suggestion}
                    onHover={index === cursor}
                    handleClick={this.handleClick}
                    message={`新しい${this.state.jpTheme}"${suggestion}"を追加する`}
                    value={suggestion}
                    icon={<IoIosAddCircleOutline/>}
                />
            );
        } else if (this.props.theme === "TOPIC") {
            return (
                <Topic
                    key={index+suggestion._id}
                    onHover={index === cursor}
                    handleClick={this.handleClick}
                    suggestion={suggestion}
                />
            );
        } else if (this.props.theme === "POST") {
            return (
                <Post
                    key={index+suggestion._id}
                    onHover={index === cursor}
                    handleClick={this.handleClick}
                    suggestion={suggestion}
                />
            );
        }
    };

    renderMark = () => {
        if(this.state.blur) return
        if(this.state.value){
            if(this.topicFlag()){
                this.setState({ showMark: "GREEN" })
                return
            }
            if(this.postFlag()){
                this.setState({ showMark: "GREEN" })
                return
            }
            this.setState({ showMark: "RED" })
        }
    }

    renderWarning = () => {
        if(this.state.blur) return
        if(this.topicFlag()) return
        if(this.postFlag()) return

        const id = this.props.theme === "TOPIC" ? this.props._topic[0]._id : this.props._post[0]._id

        this.setState({ 
            showWarning: true,
            warningId: id
        })
    }

    handleFocus = () => { this.setState({ blur: false })}
    handleBlur = () => { this.setState({ blur: true }) }

    render () {

        const ISTOPIC = this.props.theme === "TOPIC"

        return(
            <UniqueUI
                title={this.props.title}
                message={this.props.message}
                theme={this.props.theme}
                value={this.state.value}
                showHelper={this.props.showHelper}
                showMark={this.state.showMark}
                showWarning={this.state.showWarning}
                warningId={this.state.warningId}
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
                    handleSubmit={this.handleUniqueSubmit}
                    handleBlur={this.handleBlur}
                    handleFocus={this.handleFocus}
                    getSuggestions={ISTOPIC ? this.getTopicSuggestions : this.getPostSuggestions}
                    renderSuggestion={this.renderUniqueSuggestion}
                />
            </UniqueUI>
        )
    }
}

Unique.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    theme: PropTypes.string,
    placeholder: PropTypes.string,
    postAction: PropTypes.func,
    storageId: PropTypes.string,
    topicId: PropTypes.string,
}

const suggestionStyle = {
    boxShadow: "1px 1px 10px #d2d2d2",
    borderRadius: "2px",
    width: "441px",
    backgroundColor: "white",
    // maxHeight: "280px", firefoxだとおかしくなる（box-shadowが影響）
    // overflow: "scroll",
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

export default connect(mapStateToProps, actions)(Unique)