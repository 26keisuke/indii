import React, { Component } from "react"

import sample from "../images/sample0.jpg"
import { Link } from "react-router-dom"

import PeopleFollow from "./PeopleFollow"

import "./People.css"

class People extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <Link to={"/profile/" + this.props.id}>
                <div className="people-elem">
                    <div className="people-top">
                        <img src={sample} className="people-img"/>
                        <div className="people-middle">
                            <p className="people-name">{this.props.name}</p>
                            <p className="people-job">{this.props.job}</p>
                        </div>
                        <div className="people-follow-button-wrapper">
                            <PeopleFollow/>
                        </div>
                    </div>
                    <p className="people-intro">{this.props.intro}</p>
                </div>
            </Link>
        )
    }
}

export default People