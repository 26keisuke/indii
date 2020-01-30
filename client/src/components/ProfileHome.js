import React, { Component } from "react"
import { connect } from "react-redux"

class ProfileHome extends Component {

    render() {
        return (
            <div className="profile-home">
                <div className="profile-home-left">

                </div>
                <div className="profile-home-right">

                </div>
            </div>
        )
    }
}

function mapStateToProps({auth}) {
    return {
        auth
    }
}

export default connect(mapStateToProps, null)(ProfileHome)