import React, { Component } from "react"

import back_arrow from "../../images/back-arrow.png"
import absurd from "../../images/absurd/09.png"

import SearchResultTopic from "./SearchResultTopic"
import SearchResultPost from "./SearchResultPost"
import SearchResultTalk from "./SearchResultTalk"
import SearchFilter from "./SearchFilter"
import SearchResultPeople from "./SearchResultPeople"

import "./SearchResult.css"

class SearchResult extends Component {
    render() {
        return (
            <div className="content">
                <div className="content-left">
                    <div className="content-space-header">
                        <div className="content-back-wrapper">
                            <img src={back_arrow} className="content-back"/>
                            <p className="content-back-to">ホーム</p>
                        </div>
                        <p className="content-header-title">
                            <span className="content-header-title-bold">
                                "Neural Networks"
                            </span>
                            の検索結果
                        </p>
                    </div>
                    <div>
                        <div className="search-res-category">
                            <div className="search-res-space"/>
                            <div className="content-inside-header">
                                <p>トピック</p>
                            </div>
                            <SearchResultTopic/>
                            <SearchResultTopic/>
                        </div>
                            <div className="search-res-category">
                        <div className="search-res-space"/>
                            <div className="content-inside-header">
                                <p>ポスト</p>
                            </div>
                            <SearchResultPost/>
                            <SearchResultPost/>
                        </div>
                        <div className="search-res-category">
                            <div className="search-res-space"/>
                            <div className="content-inside-header">
                                <p>トーク</p>
                            </div>
                            <SearchResultTalk/>
                        </div>
                        <div className="content-bottom-space">
                            <img src={absurd} className="just-for-fun"/>
                        </div>
                    </div>
                </div>
                <div className="content-right">
                    <div className="content-right-card">
                        <div className="content-right-card-title">
                            <p>検索フィルター</p>
                        </div>
                        <SearchFilter/>
                        <div className="content-right-card-title">
                            <p>あなたにおすすめのライター</p>
                        </div>
                        <SearchResultPeople/>
                        <SearchResultPeople/>
                        <SearchResultPeople/>
                        <SearchResultPeople/>
                    </div>
                </div>
            </div>
        )
    }
}


export default SearchResult