import React, { Component } from "react";

import "./TopicSuggestion.css"

class TopicSuggestion extends Component {
    render () {

        const suggestion = this.props.suggestion

        const tags = suggestion.tags.map(tag => 
            <p className="topic-action-search-tag">#{tag}</p>
        )

        return (
            <div key={suggestion.id} className="topic-action-search-wrapper">
                <img src={suggestion.imgUrl} className="topic-action-search-img"/>
                <div className="topic-action-search-text">
                    {suggestion.name}
                </div>
                <div className="topic-action-search-info">
                    <div className="topic-action-search-tag-row">
                        {tags}
                    </div>
                    <div className="topic-action-search-stats-row">
                        <p className="topic-action-search-stats">{suggestion.posts.toLocaleString()} Posts</p>
                        <p className="topic-action-search-stats">{suggestion.likes.toLocaleString()} Favorites</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopicSuggestion