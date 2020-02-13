import React, { Component } from "react"
import styled from "styled-components"

import { Box, BoxTransition, ButtonWrapper, ButtonLeft, ButtonRight, ConfigUnderline } from "../../Element/Box"
import ToggleBtn from "../../../Util/ToggleBtn"

class CreateConfigurationPost extends Component {

    constructor(props){
        super(props)
        this.state = {
            allowEdit: {   // edit without
                on: true, 
            },
        }
    }

    handleBack = () => {
        this.props.setBackward(true);
        this.props.setStep(1);
    }   

    handleForward = () => {
        this.props.setBackward(false);
        this.props.setStep(3);
        this.props.setConfig(this.state);
    }

    toggleButton = (configName) => {
        this.setState({
            [configName]: {
                on: !this.state[configName].on
            }
        })
    }

    render() {
        return (
            <Box>
                <BoxTransition back={this.props.back} transition={true}>
                    <div> 
                        <p>3. 初期設定</p>
                    </div> 

                    <form onSubmit={this.formSubmit}>
                        <ConfigInput>承認無しに変更を許可する</ConfigInput>
                        <ConfigBox>
                            <div>
                                <p>{this.state.allowEdit.on ? "許可" : "許可しない"}</p>
                                <span>{this.state.allowEdit.on && "(推奨)"}</span>
                            </div>
                            <ToggleBtn
                                on={this.state.allowEdit.on}
                                handleClick={() => this.toggleButton("allowEdit")}
                            />
                        </ConfigBox>
                        <ConfigUnderline/>
                    </form>


                    <ButtonWrapper>
                        <ButtonLeft onClick={this.handleBack}>戻る</ButtonLeft>
                        <ButtonRight onClick={this.handleForward}>次へ進む</ButtonRight>
                    </ButtonWrapper>
                </BoxTransition>
            </Box>
        )
    }
}


const ConfigBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 433px;
    align-items: center;
    justify-content: space-between;

    & > div:nth-child(1) {

        display: flex;
        align-items: center;

        & > p {
            margin-top: 15px;
            margin-left: 9px;
            margin-bottom: 7px;
            font-size: 14px;
        }

        & > span {
            color: #666666;
            font-size: 10px;
            margin-top: 10px;
            margin-left: 7px;
        }
    }
`


const ConfigInput = styled.p`
    color: #333333 !important;
    font-size: 11px !important;
`

export default CreateConfigurationPost