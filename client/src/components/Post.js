import React, { Component } from "react"
import { Link } from "react-router-dom"

import "./Post.css"

import star_pressed from "../images/star-pressed.png"

class Post extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Link to={"/topic/" + this.props.id} className="post">
                <div className="post-left">
                    <p className="post-topic">{this.props.topic}</p>
                    <p className="post-title">{this.props.title}</p>
                    <p className="post-content">{this.props.content}</p>
                    <div className="post-bottom">
                        <img src={star_pressed} className="post-star"/>
                        <p className="post-star-count">{this.props.count}</p>
                        <p className="post-edit-date">Last Edited: {this.props.date}</p>
                    </div>
                </div>
                <div className="post-right">
                    <img src={this.props.img} className="post-img"/>
                </div>
            </Link>
        )
    }
}

export default Post