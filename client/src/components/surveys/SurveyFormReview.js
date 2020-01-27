import React from "react"
import { connect } from "react-redux"

const SurveyReview = ({formValues}) => {
    return (
        <div>
            {formValues.title}
            Please Confirm
        </div>
    )
}

function mapStateToProps(state){
    return {
        formValues: state.form.surveyForm.values
    }
}

export default connect(mapStateToProps)(SurveyReview) 