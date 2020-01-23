import React, { Component } from "react"

import sample from "../../images/sample0.jpg"
import follow from "../../images/add.png"

class SearchResultPeople extends Component {
    render() {
        return (
            <div className="search-people">
                <img src={sample} className="people-img"/>
                <div className="people-middle">
                    <p className="people-name">飯塚　啓介</p>
                    <p className="people-job">Chief株式会社 CEO</p>
                    <p className="search-people-intro">2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなど...</p>
                </div>
                <div className="search-people-follow">
                    <img src={follow} className="search-people-follow-icon"/>
                    <p>Follow</p>
                </div>
            </div>
        )
    }
}

export default SearchResultPeople