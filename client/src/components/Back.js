import React, { Component } from "react"
import { Link } from "react-router-dom"

import back from "../images/back-arrow.png"

import "./Back.css"

class Back extends Component {
    render() {
        return (
            <Link to={this.props.url} className="back">
                <img src={back} className="back-img"/>
                <p className="back-text">{this.props.name}</p>
            </Link>
        )
    }
}

export default Back