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

    toggleIcon = (id) => {
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
            />
        );
    }
}

function mapStateToProps({auth}) {
    return{
        auth,
    }
}

export default connect(mapStateToProps, actions)(withRouter(Navigation));