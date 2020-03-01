import React, { Component } from "react"
import { connect } from "react-redux"

import * as actions from "../../../actions"

import List from "../../Navigation/List/List"

class Navigation extends Component {

    handleClick = (id) => {
        this.props.setCategory(id)
        this.props.nudgeCheck(id)
    }

    render() {
        return (
            <List
                handleClick={this.handleClick}
                category={this.props.category}
                nudge={this.props.nudge}
                display="header"
            />
        )
    }
}

function mapStateToProps(state) {
    return{
        category: state.category,
        nudge: state.nudge
    }
}

export default connect(mapStateToProps, actions)(Navigation);