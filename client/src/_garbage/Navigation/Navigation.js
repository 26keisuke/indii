import React from "react"
import { connect } from "react-redux"

import * as actions from "../../../actions"

import { handleNavClick } from "../../Navigation/Navigation"
import List from "../../Navigation/List/List"

const Navigation = ({ category, nudge }) =>  {
    return (
        <List
            handleClick={handleNavClick}
            category={category}
            nudge={nudge}
            display="header"
        />
    )
}

function mapStateToProps(state) {
    return{
        category: state.category,
        nudge: state.nudge
    }
}

export default connect(mapStateToProps, actions)(Navigation);