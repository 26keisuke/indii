import _ from "lodash";

import React, { Component } from "react"
import { reduxForm, Field } from "redux-form"
import SurveyField from "./SurveyField"
import { Link } from "react-router-dom"

const FIELDS = [
    {label:"Survey Title",name:"title"},
    {label:"Subject Line",name:"subject"},
    {label:"Email Body", name:"body"},
    {label:"Recipient Lists", name:"email"}
]

class SurveyForm extends Component {

    renderFields() {
        return FIELDS.map(({label,name}) => {
            return (
            <Field 
                key={name}
                component={SurveyField} 
                type="text" 
                label={label} 
                name={name}
            />
            )
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                {this.renderFields()}
                <Link to="/" className="red btn-flat white-text">
                    Cancel
                </Link>
                <button type="submit" className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">done</i>
                </button>
                </form>
            </div>
        )
    }
}

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function validate(values) {
    const errors = {}

    errors.emails = validateEmail(values.emails || "");

    FIELDS.filter(({name}) => {
        if (!values[name]){
            errors[name] = "You Must Provide a Value"
        }
    })

    return errors;
}

function validateEmail(emails) {
    const invalid = emails.split(",").map(email => email.trim()).filter(email => re.test(email) === false)
    if (invalid.length){
        return `These emails are invalid: ${invalid}`;
    }
    return null;
}


export default reduxForm({
    validate, 
    form: "surveyForm",
    destroyOnUnmount: false
})(SurveyForm);