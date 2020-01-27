import React, { Component } from "react"

import SurveyFormReview from "./SurveyFormReview"
import SurveyForm from "./SurveyForm"

class SurveyNew extends Component {
    state = { showFormReview: false}

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview/>
        }

        return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})}/>
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default SurveyNew 