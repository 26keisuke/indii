import React, { Component } from "react"


// input => currentStep: Int, stepName: []
class Progress extends Component {

    setCircle = (idx) => {
        const now = this.props.step
        if(now === idx){
            return (
                <div className="topic-form-progress-circle topic-form-progress-circle-animation">
                    <p>{idx+1}</p>
                </div>
            )
        } else if (now > idx) {
            return (
                <div className="topic-form-progress-circle-done">
                    <p>{idx+1}</p>
                </div>
            )
        } else if (now < idx) {
            return (
                <div className="topic-form-progress-circle">
                    <p>{idx+1}</p>
                </div>
            )
        }
    }

    setBar = (idx) => {
        const now = this.props.step
        const target = idx + 1
        if(now === target){
            return (
                <div className="topic-form-progress-bar-fake topic-form-progress-bar-fake-animation"/>
            )
        } else if (now > target) {
            return (
                <div className="topic-form-progress-bar-fake-done"/>
            )
        } else if (now < target) {
            return (
                <div className="topic-form-progress-bar-fake"/>
            )
        }
    }

    renderOneStep = () => {
        const len = this.props.stepName.length
        const lastStep = this.props.stepName[len-1]
        const html = this.props.stepName.map((step,idx) => {
            return ([
            <div className="topic-form-progress-fake-for-circle">
                <div className="topic-form-progress-circle-fake">
                    <p>{idx+1}</p>
                </div>
                {this.setCircle(idx)}
                <p className="topic-form-progress-name">{step}</p>
            </div>,
            <div className="topic-form-progress-fake-for-bar">
                {step !== lastStep ? <div className="topic-form-progress-bar"/> : ""}
                {step !== lastStep ? this.setBar(idx) : ""}
            </div>
            ])
        })
        return html;
    }


    render() {
        return (
            <div className="topic-form-progress">
                {this.renderOneStep()}
            </div>
        )
    }

}

export default Progress