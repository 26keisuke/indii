import React, { Component } from "react";
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import * as actions from "../../actions"

import { checkAuth } from "../Util/util"
import List from "./List/List"

class Navigation extends Component {

    componentDidMount() {
        this.setIcon()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.location.pathname !== this.props.location.pathname) { this.setIcon() }
    } 

    setIcon = () => {
        const url = this.props.location.pathname

        if(url.includes("action")){
            this.props.setCategory("action")
            this.props.nudgeCheck("action")
        } else if (url.includes("draft")) {
            this.props.setCategory("draft")
            this.props.nudgeCheck("draft")
        } else if (url.includes("notification")) {
            this.props.setCategory("notification")
            this.props.nudgeCheck("notification")
        } else if (url.includes("setting")) {
            this.props.setCategory("setting")
            this.props.nudgeCheck("setting")
        } else if (url.includes("talk")) {
            this.props.setCategory("talk")
            this.props.nudgeCheck("talk")
        } else {
            this.props.setCategory("home")
            this.props.nudgeCheck("home")
        }
    }

    render() {
        return (
            <List
                handleClick={handleNavClick}
                category={this.props.category}
            />
        );
    }
}

export const handleNavClick = (e, id, context) => {
    const toggleIcon = (id) => {
        context.setCategory(id)
        context.nudgeCheck(id)
    }

    if((id === "draft") || (id === "notification")) {
        const isAuthenticated = checkAuth(e, context)
        if(isAuthenticated) {
            toggleIcon(id)
        }
        return
    }
    toggleIcon(id)
}

export default connect(null, actions)(withRouter(Navigation));