import React, { Component } from "react"

import star_pressed from "../../images/star-pressed.png"
import feedback from "../../images/comment.png"

class SearchResultTalk extends Component {

    constructor(props) {
        super(props)
    }

    tagRender(tag) {
        switch(tag){
            case "question":
                return "Question"
        }
    }

    render() {
        return (
            <div className="search-result-talk">
                <div className="search-result-talk-top">
                    <p className="search-result-talk-topic">{this.props.topic}</p>
                    <p className="search-result-talk-date">{this.props.date}</p>
                    <div className="search-result-talk-tag">
                        <p>{this.tagRender(this.props.tag)}</p>
                    </div>
                </div>
                <p className="search-result-talk-title">{this.props.title}</p>
                <p className="search-result-talk-content">{this.props.content}</p>
                <div className="search-result-talk-bottom">
                    <img src={star_pressed} className="search-result-talk-star"/>
                    <p className="search-result-talk-star-count">12</p>
                    <img src={feedback} className="search-result-talk-comment"/>
                    <p className="search-result-talk-comment-count">12</p>
                </div>
            </div>
        )
    }
}

export default SearchResultTalk