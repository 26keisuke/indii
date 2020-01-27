import React, { Component } from "react"

import sample from "../../images/sample1.png"

class SearchResultTopic extends Component {
    render() {
        return (
            <div className="search-res-topic">
                <img src={sample} className="search-res-topic-img"/>
                <div className="search-res-topic-right">
                    <p className="search-res-topic-title">{this.props.title}</p>
                    <p className="search-res-topic-content">{this.props.content}</p>
                    <div className="search-res-topic-bottom">
                        <p className="search-res-topic-likes">{this.props.likes} Favorites</p>
                        <div className="search-res-topic-tags-wrapper">
                            {this.props.tags.map(tag => {
                                return <p>#{tag}</p>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchResultTopic