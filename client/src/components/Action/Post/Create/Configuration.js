import React, { Component } from "react"

import { Box, BoxTransition, } from "../../Element/Element"

import Config from "../../Element/Config"
import TwoButtons from "../../Element/TwoButtons"

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

                    <Config
                        width={433}
                        title={"承認無しに変更を許可する"}
                        text={["許可", "許可しない"]}
                        recommend={true}
                        on={this.state.allowEdit.on}
                        handleClick={() => this.toggleButton("allowEdit")}
                    />

                    <TwoButtons
                        handleBack={this.handleBack}
                        handleForward={this.handleForward}
                        text={["戻る", "次へ進む"]}
                    />
                </BoxTransition>
            </Box>
        )
    }
}

export default CreateConfigurationPost