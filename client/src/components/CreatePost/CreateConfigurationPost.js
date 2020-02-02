import React, { Component } from "react"

class CreateConfigurationPost extends Component {

    constructor(props){
        super(props)
        this.state = {
            editWo: {   // edit without
                on: true, 
                button: "topic-form-config-toggle"
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
        if(this.state[configName].on){
            this.setState({
                [configName]: {
                    button: "topic-form-config-toggle" + " " + "config-right-to-left",
                    on: false
                }
            })
        } else {
            this.setState({
                [configName]: {
                    button: "topic-form-config-toggle" + " " + "config-left-to-right",
                    on: true
                }
            })
        }
    }

    render() {
        return (
            <div className="topic-form-area">
                <div className={this.props.back ? "topic-form-area-wrapper-enter" : "topic-form-area-wrapper-show"}>
                    <div className="topic-form-area-top"> 
                        <p className="topic-form-area-top-title">3. 初期設定</p>
                    </div> 

                    <form onSubmit={this.formSubmit} className="topic-form-area-middle">
                        <p className="topic-form-area-input-title">承認無しに変更を許可する</p>
                        <div className="topic-form-config-box">
                            <p className="topic-form-config-text">{this.state.editWo.on ? "許可" : "許可しない"}</p>
                            <div className="topic-form-config-button" onClick={() => this.toggleButton("editWo")}>
                                <input type="button" className={this.state.editWo.button}/>
                                <div className="topic-form-config-layer"/>
                            </div>
                        </div>
                        <div className="topic-form-config-input"/>
                    </form>


                    <div className="topic-form-button">
                        <button className="topic-form-button-left" onClick={this.handleBack}>戻る</button>
                        <button onClick={this.handleForward} className="topic-form-button-right">
                            次へ進む
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}

export default CreateConfigurationPost