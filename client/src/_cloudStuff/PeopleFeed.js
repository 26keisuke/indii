import React, {Component} from "react"

import sample from "../images/sample0.jpg"
import follow from "../images/add.png"

import "./People.css"

class PeopleFeed extends Component {
    render() {
        return (
            <div className="people">
                <img src={sample} className="people-img"/>
                <div className="people-middle">
                    <p className="people-name">飯塚　啓介</p>
                    <p className="people-job">Chief株式会社 CEO</p>
                    <p className="people-intro">2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなどから発せられる大容量のデータ（e.g., ログやイベント）を高スループット/低レイテンシに収集/配信することを目的に開発されている．</p>
                </div>
                <div className="people-follow">
                    <img src={follow} className="people-follow-icon"/>
                    <p>Follow</p>
                </div>
            </div>
        )
    }
}

export default PeopleFeed