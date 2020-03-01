import React, { Component } from "react"
import styled from "styled-components"
import ActionProgress from "../Progress/Progress"
import Back from "../../Util/Back";

class Form extends Component {
    render() {
        return (
            <FormWrapper>
                <div>
                    <BackWrapper>
                        <Back
                            url="/action"
                            name="編集・作成一覧に戻る"
                        />
                    </BackWrapper>
                    <p>{this.props.title}</p>
                    <FormMount/>
                    <ActionProgress
                        step={this.props.step}
                        stepName={this.props.stepNames}
                    />
                    {this.props.children}
                </div>
            </FormWrapper>
        )
    }
}


export const FormWrapper = styled.div`
    height: 100%;
    padding-top:40px;

    &::-webkit-scrollbar {
        width: 10px;  
    }

    & > div {
        position: relative;
        display: flex;
        justify-content: center;
        height: 100%;

        & > p {
            z-index: 10;
            position: absolute;
            font-size: 16px;
            top: -23px;
        }
    }
`

export const FormMount = styled.div`
    height: 110px;
    width: 100%;
    position: absolute;
    background-color: #ffffff;
    z-index:2;
`

export const BackWrapper = styled.div`
    margin-top:-18px;
`

export default Form