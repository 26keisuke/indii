import React, { useEffect } from "react";
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import * as actions from "../../actions"

import { checkAuth } from "../Util/util"
import List from "./List/List"

const Navigation = ({ display, category, nudge, ...props}) => {

    useEffect(() => {
        setIcon()
    }, [])

    useEffect(() => {
        setIcon()
    }, [props.location.pathname])

    const handleNavClick = (e, id, loggedIn) => {
        const toggleIcon = (id) => {
            props.setCategory(id)
            props.nudgeCheck(id)
        }
    
        if((id === "draft") || (id === "notification")) {
            const isAuthenticated = checkAuth(e, props, loggedIn)
            if(isAuthenticated) {
                toggleIcon(id)
            }
            return
        }
        toggleIcon(id)
    }

    const setIcon = () => { // こいつはdisplay noneでも呼ばれるからexportしなくていい
        const url = props.location.pathname
    
        if(url.includes("action")){
            props.setCategory("action")
            props.nudgeCheck("action")
        } else if (url.includes("draft")) {
            props.setCategory("draft")
            props.nudgeCheck("draft")
        } else if (url.includes("notification")) {
            props.setCategory("notification")
            props.nudgeCheck("notification")
        } else if (url.includes("setting")) {
            props.setCategory("setting")
            props.nudgeCheck("setting")
        } else if (url.includes("talk")) {
            props.setCategory("talk")
            props.nudgeCheck("talk")
        } else {
            props.setCategory("home")
            props.nudgeCheck("home")
        }
    }

    return (
        <List
            handleClick={handleNavClick}
            category={category}
            nudge={nudge}
        />
    );
}

function mapStateToProps(state) {
    return{
        category: state.category,
        nudge: state.nudge
    }
}


export default connect(mapStateToProps, actions)(withRouter(Navigation));