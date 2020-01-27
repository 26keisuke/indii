import React, {Component} from "react"
import { Link } from "react-router-dom"

import PeopleFollow from "../PeopleFollow"

import "../People.css"

class PeopleFeed extends Component {

    render() {
        return (
            <Link to={"/profile/" + this.props.id} className="people">
                <img src={this.props.img} className="people-img"/>
                <div className="people-middle">
                <p className="people-name">{this.props.name}</p>
                    <p className="people-job">{this.props.job}</p>
                    <p className="people-intro">{this.props.intro}</p>
                </div>
                <PeopleFollow/>
            </Link>
        )
    }
}

export default PeopleFeed