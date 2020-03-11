import React, { Component } from "react"
import styled from "styled-components"

const ProgressBox = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    top: 30px;
`

const StepName = styled.p`
    position: absolute;
    font-size: 10px;
    color: #585858;
    width: 100px;
    z-index: 5;
    bottom: -20px;
    left: -27px;
    text-align: center;
`

const Circle = styled.div`
    position: relative;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    z-index: 5;
    opacity: 1;
    background-color: #c4c4c4;

    & > p {
        position: absolute;
        color: #ffffff;
        top:10px;
        left:17px;
        font-size: 17px;
    }
`

const CircleDone = styled.div`
    position: relative;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    z-index: 2;
    opacity: 0;
    background-color: #c4c4c4;
`

const CircleFake = styled.div`
    position: absolute;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    z-index: 4;
    background-color: ${props => props.theme.secondary};

    & > p {
        position: absolute;
        color: #ffffff;
        top:10px;
        left:17px;
        font-size: 17px;
    }
`


const CircleFakeWrapper = styled.div`
    position: relative;
    z-index: 5;
`

const BarFakeWrapper = styled.div`
    position: relative;
    z-index: 3;
`

const Bar = styled.div`
    z-index: 2;
    width: 55px;
    height: 8px;
    margin-left: -2px;
    margin-right: -2px;
    background-color: #c4c4c4;
`

const BarFake = styled.div`
    position: absolute;
    z-index: 3;
    height: 8px;
    background-color: ${props => props.theme.secondary};
    left: -2px;
    top: 0px;
`

const BarDone = styled.div`
    position: absolute;
    width:55px;
    height: 8px;
    background-color: ${props => props.theme.secondary};
    left: -2px;
    top: 0px;
`

// input => currentStep: Int, stepName: []
class Progress extends Component {

    setCircle = (idx) => {
        const now = this.props.step
        if(now === idx){
            return (
                <Circle className="topic-form-progress-circle-animation">
                    <p>{idx+1}</p>
                </Circle>
            )
        } else if (now > idx) {
            return (
                <CircleDone>
                    <p>{idx+1}</p>
                </CircleDone>
            )
        } else if (now < idx) {
            return (
                <Circle>
                    <p>{idx+1}</p>
                </Circle>
            )
        }
    }

    setBar = (idx) => {
        const now = this.props.step
        const target = idx + 1
        if(now === target){
            return (
                <BarFake className="topic-form-progress-bar-fake-animation"/>
            )
        } else if (now > target) {
            return (
                <BarDone/>
            )
        } else if (now < target) {
            return (
                <BarFake/>
            )
        }
    }

    renderOneStep = () => {
        const len = this.props.stepName.length
        const lastStep = this.props.stepName[len-1]
        const html = this.props.stepName.map((step,idx) => {
            return ([
            <CircleFakeWrapper key={"c" + step + String(idx)}>
                <CircleFake>
                    <p>{idx+1}</p>
                </CircleFake>
                {this.setCircle(idx)}
                <StepName>{step}</StepName>
            </CircleFakeWrapper>,
            <BarFakeWrapper key={"b" + step + String(idx)}>
                {step !== lastStep ? <Bar/> : ""}
                {step !== lastStep ? this.setBar(idx) : ""}
            </BarFakeWrapper>
            ])
        })
        return html;
    }


    render() {
        return (
            <ProgressBox>
                {this.renderOneStep()}
            </ProgressBox>
        )
    }

}

export default Progress