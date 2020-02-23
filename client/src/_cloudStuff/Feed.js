import React, { Component } from "react";

import PostFeed from "./PostFeed";
import PeopleFeed from "./PeopleFeed";
import TrendFeed from "./TrendFeed";

class Feed extends Component {
    render() {
        return(
            <div className="content">
                <div className="content-left">
                    <div className="content-space"/>
                    <PostFeed/>
                    <PostFeed/>
                    <PostFeed/>
                    <div className="content-space"/>
                    <div className="content-inside-header no-border-top">
                        <p>データベース関連のライター</p>
                    </div>
                    <div className="content-people-wrapper">
                        <PeopleFeed/>
                        <PeopleFeed/>
                        <PeopleFeed/>
                    </div>
                    <div className="content-space"/>
                    <PostFeed/>
                    <PostFeed/>
                    <PostFeed/>
                    <div className="content-bottom-space"/>
                </div>
                <div className="content-right">
                    <div className="content-right-card">
                        <div className="content-right-card-title">
                            <p>トレンド</p>
                        </div>
                    <TrendFeed/>
                    <TrendFeed/>
                    <TrendFeed/>
                    <TrendFeed/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Feed;