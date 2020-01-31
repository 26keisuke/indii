import React, {Component} from "react"

import ActionProgress from "./ActionProgress"
import Back from "./Back";

class CreatePost extends Component {

    constructor(props){
        super(props)
        this.state = {
            step: 0,
        }
    }

    render () {
        return (
            <div className="topic-form-wrapper">
                <div className="topic-form">
                    <Back
                        url="/action"
                        name="編集・作成一覧に戻る"
                    />
                    <div className="topic-form-progress-mount"/>
                    <ActionProgress
                        step={this.state.step}
                        stepName={
                            [
                                "トピックを選択",
                                "ポストを選択",
                                "プレビュー"
                            ]
                        }
                    />



                </div>
            </div>
        )
    }
}

export default CreatePost