import React, { Component } from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import {Collapse} from 'react-collapse';

import response from "../../images/response.png";
import response_pressed from "../../images/response-pressed.png";
import star_pressed from "../../images/star-pressed.png";
import star from "../../images/star.png";
import more from "../../images/more.png";
import down from "../../images/down.png";
import sample from "../../images/sample0.jpg";
import dissapointed from "../../images/dissapointed.png";
import love from "../../images/love.png";
import good from "../../images/good.png";
import nerd from "../../images/nerd.png";
import hmm from "../../images/hmm.png";

import "./PostFeed.css";

import * as actions from "../../actions";

const message = [
    "さんが、ポストを投稿しました。",
    "さんが、ポストを編集しました。",
    "さんが、ポストにスターを付けました。" ,
]

class PostFeed extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpened: true, btnClass: "post-feed-down",
            star: star,
            response: response,
            showEmoji: false,
            showMore: false,
        }

        this.handleCollapseClick = this.handleCollapseClick.bind(this)
        this.handleStarClick = this.handleStarClick.bind(this)
        this.handleResponseClick = this.handleResponseClick.bind(this)
        this.handleEmojiClick = this.handleEmojiClick.bind(this)
        this.handleMoreClick = this.handleMoreClick.bind(this)
    }

    componentDidMount() {
        this.checkForStars()
        this.checkForFeedbacks()
    }

    checkForStars(){}

    checkForFeedbacks(){}

    handleCollapseClick(e) {
        e.preventDefault()
        this.setState({showMore: false})
        this.setState({showEmoji: false})
        const rotate = !this.state.isOpened ? "rotate-1" : "rotate"
        const btnClass = "post-feed-down" + " " + rotate
        this.setState({
            isOpened: !this.state.isOpened,
            btnClass: btnClass
        })
    }

    handleStarClick(e) {
        e.preventDefault()
        this.setState({showMore: false})
        this.setState({showEmoji: false})
        if (this.state.star == star) {
            this.props.starOn(this.props.id)
            this.setState({
                star: star_pressed
            })
        } else {
            this.props.starOff(this.props.id)
            this.setState({
                star
            })
        }
    }

    handleResponseClick(e) {
        e.preventDefault()
        this.setState({showMore: false})
        if (this.state.response != response_pressed){
            this.setState({
                showEmoji: !this.state.showEmoji
            })
        }
    }

    handleEmojiClick(e) {
        e.preventDefault()
        this.setState({
            response: response_pressed
        })
        this.setState({
            showEmoji: false
        })
    }

    handleMoreClick(e) {
        e.preventDefault()
        this.setState({showEmoji: false})
        this.setState({
            showMore: !this.state.showMore
        })
    }

    actionRender(action) {
        switch(action){
            case "CREATE_POST":
                return message[0]
            case "EDIT_POST":
                return message[1]
            case "STAR_POST":
                return message[2]
        }
    }

    render() {

        const responseClicked = this.state.response == response_pressed

        return (
                <Link to={"/topic/" + this.props.id} className="post-feed">
                    <div className="post-feed-top">
                        <div className="post-feed-profile">
                            <img src={sample} className="post-feed-profile-img"/>
                            <div className="post-feed-profile-desc">
                                <span className="post-feed-profile-top">
                                    <p className="post-feed-profile-name">{this.props.name}</p>
                                    <p className="post-feed-profile-action">
                                        {this.actionRender(this.props.action)}
                                    </p>
                                </span>
                                <p className="post-feed-profile-bottom">
                                    {this.props.date}
                                </p>
                            </div>
                        </div>
                        <div className="post-feed-fake">
                            <p onClick={this.handleCollapseClick}></p>
                            <img 
                                src={down} 
                                className={this.state.btnClass}
                            />
                        </div>
                    </div>
                    
                    <div className="post-feed-middle">
                        <Link to={"/topic/" + this.props.id}>
                            <p className="post-feed-topic">{this.props.topic}</p>
                        </Link>
                        <p className="post-feed-title">{this.props.title}</p>
                        <Collapse isOpened={this.state.isOpened}>
                        <p className="post-feed-content">
                        {this.props.content}
                        </p>
                        </Collapse>
                    </div>
                    <Collapse isOpened={this.state.isOpened}>
                    <div className="post-feed-bottom">
                        <div className="post-feed-bottom-wrapper">
                            <p className="post-feed-bottom-fake" onClick={this.handleStarClick}></p>
                            <img className="post-feed-star"　src={this.state.star}/>
                        </div>
                        <div className={responseClicked ? "post-feed-bottom-wrapper no-events" : "post-feed-bottom-wrapper"}>
                            <p className="post-feed-bottom-fake" onClick={this.handleResponseClick}></p>
                            <div className={ this.state.showEmoji ? "post-feed-bottom-emoji show-flex" : "post-feed-bottom-emoji"}>
                                <img src={love} onClick={this.handleEmojiClick}/>
                                <img src={good} onClick={this.handleEmojiClick}/>
                                <img src={nerd} onClick={this.handleEmojiClick}/>
                                <img src={hmm} onClick={this.handleEmojiClick}/>
                                <img src={dissapointed} onClick={this.handleEmojiClick}/>
                            </div>
                            <img className="post-feed-response"　src={this.state.response}/>
                        </div>
                        <div className="post-feed-bottom-wrapper">
                            <p className="post-feed-bottom-fake" onClick={this.handleMoreClick}></p>
                            <div className={this.state.showMore ? "post-feed-bottom-action show-flex" : "post-feed-bottom-action"}>
                                <p>レポートする</p>
                                <p>この投稿を削除する</p>
                            </div>
                            <img className="post-feed-more"　src={more}/>
                        </div>
                    </div>
                    </Collapse>
                </Link>
        )
    }
}

function mapStateToProps(state) {
    return {
        response: state.response
    }
}

export default connect(mapStateToProps, actions)(PostFeed);