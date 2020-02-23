import React, { Component } from "react";

import "./Post.css"

import star_pressed from "../images/star-pressed.png";
import sample from "../images/sample1.png";

class TrendFeed extends Component {
    render() {
        return (
            <div className="post">
                <div className="post-left">
                    <p className="post-topic">Apache Kafka</p>
                    <p className="post-title">Stream Processingとの関係</p>
                    <p className="post-content">
                    とにかく大量のメッセージを扱うことができる Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールできる。 
                    </p>
                    <div className="post-bottom">
                        <img src={star_pressed} className="post-star"/>
                        <p className="post-star-count">202</p>
                        <p className="post-edit-date">Last Edited: August 21, 2013 5:36 AM</p>
                    </div>
                </div>
                <div className="post-right">
                    <img src={sample} className="post-img"/>
                </div>
            </div>
        )
    }
}

export default TrendFeed;