// 左と右に分けるやつ（Back付き）

import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import Back from "./Back"

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
                        <div className="content-back-arrow-wrapper">
                            <Back
                                back={() => this.props.history.goBack()}
                                name="戻る"
                            />
                        </div>
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

export default withRouter(LeftAndRightBack)