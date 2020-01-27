import React, { Component } from "react"
import { Link } from "react-router-dom"

import sample from "../../images/sample1.png"

import "./Draft.css"

class Draft extends Component {

    renderType(type){
        switch(type){
            case "edit":
                return "編集"
            case "new":
                return "新規作成 "
        }
    }

    render(){
        return(
            <Link to={"/draft/edit/" + this.props.id} id={this.props.id} className="draft">
                <div className="draft-left">
                    <div className="draft-left-top">
                        <p>ポスト ></p>
                        <p>{this.renderType(this.props.type) + " >"}</p>
                        <p>{this.props.topic}</p>
                    </div>
                    <p className="draft-left-title">{this.props.title}</p>
                    <p className="draft-left-content">{this.props.content}</p>
                    <p className="draft-left-date">前回の編集日: {this.props.date}</p>
                </div>
                <img src={sample} className="draft-right"/>
            </Link>
        )
    }
}

export default Draft