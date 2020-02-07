// 左と右に分けるやつ

import React, { Component } from "react"

class LeftAndRight extends Component {

    // props [title, left, right]
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="content">
                <div className="content-left">
                    <div className="content-intro">
                        {this.props.top}
                    </div>
                    <div className="content-space"/>
                    {this.props.left}
                    <div className="content-bottom-space">
                        {this.props.img}
                    </div>
                </div>
                <div className="content-right">
                    <div className="content-right-card">{this.props.right}</div>
                </div>
            </div>
        )
    }
}


export default LeftAndRight