import React, { Component } from "react"
import ReactGA from "react-ga"
import { withRouter } from "react-router-dom"

const trackingId = "UA-129407596-4"
ReactGA.initialize(trackingId)

// 参考
// https://github.com/react-ga/react-ga/issues/122

class GAListener extends Component {
    componentDidMount() {
        this.sendPageView(this.props.history.location);
        this.props.history.listen(this.sendPageView)
    }

    sendPageView(location){
        ReactGA.set({ page: location.pathname })
        ReactGA.pageview(location.pathname)
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(GAListener)