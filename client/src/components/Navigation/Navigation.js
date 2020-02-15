import React, { Component } from "react";
import { connect } from "react-redux"

import * as actions from "../../actions"

import { checkAuth } from "../Util/util"
import List from "./List/List"

class Navigation extends Component {

    toggleIcon = (id) => {
        this.props.resetCategory()
        this.props.setCategory(id)
        this.props.nudgeCheck(id)
    }

    handleClick = (e, id) => {
        if((id === "draft") || (id === "notification")) {
            const isAuthenticated = checkAuth(e, this.props)
            if(isAuthenticated) {
                this.toggleIcon(id)
            }
            return
        }
        this.toggleIcon(id)
    }

    render() {
        return (
            <List
                handleClick={this.handleClick}
                category={this.props.category}
                nudge={this.props.nudge}
            />
        );
    }
}

function mapStateToProps(state) {
    return{
        category: state.category,
        nudge: state.nudge,
        auth: state.auth,
    }
}

export default connect(mapStateToProps, actions)(Navigation);