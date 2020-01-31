import React, { Component } from "react"

import sample from "../images/sample1.png"

import "./TopicElement.css"

class TopicElement extends Component {
    render() {
        return (
            <div className="topic-elem">
                <img src={sample} className="topic-elem-img"/>
                <div className="topic-elem-right">
                    <p className="topic-elem-title">{this.props.title}</p>
                    <p className="topic-elem-content">{this.props.content}</p>
                    <div className="topic-elem-bottom">
                        <p className="topic-elem-likes">{this.props.likes.toLocaleString()} Favorites</p>
                        <div className="topic-elem-tags-wrapper">
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

export default TopicElement