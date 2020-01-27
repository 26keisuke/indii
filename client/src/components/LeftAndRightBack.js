// 左と右に分けるやつ（Back付き）

import React, { Component } from "react"
import { Link } from "react-router-dom"

import back_arrow from "../images/back-arrow.png"

class LeftAndRightBack extends Component {

    // props [url, backName, title, left, right]
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="content">
                <div className="content-left">
                    <div className="content-space-header">
                        <Link to={this.props.url} className="content-back-wrapper">
                            <img src={back_arrow} className="content-back"/>
                            <p className="content-back-to">{this.props.backName}</p>
                        </Link>
                        <p className="content-header-title">
                            {this.props.title}
                        </p>
                    </div>

                    {this.props.left}

                </div>
                <div className="content-right">
                    <div className="content-right-card">
                        
                        {this.props.right}

                    </div>
                </div>
            </div>
        )
    }
}

export default LeftAndRightBack