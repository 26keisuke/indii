import React, {Component} from "react"
import axios from "axios"

import ActionProgress from "../ActionProgress"
import ActionDecideTopic from "../ActionDecideTopic"
import CreateDecidePost from "./CreateDecidePost"
import CreateConfigurationPost from "./CreateConfigurationPost"
import CreatePreviewPost from "./CreatePreviewPost"
import Back from "../Back";

class CreatePost extends Component {

    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            back: false,
            selectedTopic: {}, 
            config: {
                editWo: true,
            },
            postName: ""
        }
    }

    renderStep = () => {
        switch (this.state.step) {
            case 0:
                return <ActionDecideTopic 
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        storage="editPostTopic"
                        setTopic={this.setTopic}
                        setStep={this.setStep}
                        />
            case 1:
                return <CreateDecidePost
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        storage="editPostPost"
                        setPost={this.setPost}
                        setStep={this.setStep}
                        />
            case 2:
                return <CreateConfigurationPost
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        setConfig={this.setConfig}
                        setStep={this.setStep}
                        />
            case 3:
                return <CreatePreviewPost
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        postName={this.state.postName}
                        selectedTopic={this.state.selectedTopic}
                        config={this.state.config.editWo}
                        setTags={this.setTags} 
                        setStep={this.setStep}
                        max={6}
                        />
        }
    }

    setStep = (step) => {
        this.setState({
            step
        })
    }

    setBackward = (back) => {
        this.setState({
            back
        })
    }

    setPost = (post) => {
        this.setState({
            postName: post
        })
    }

    setConfig = (config) => {
        this.setState({
            config: {
                editWo: config.editWo.on
            }
        })
    }

    setTopic = (topic) => {
        this.setState({
            selectedTopic: topic
        })
        const url = "/api/post/" + topic.id
        axios.get(url)
        .then(res => {
            this.setState({
                posts: res.posts
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render () {
        return (
            <div className="topic-form-wrapper">
                <div className="topic-form">
                    <div className="topic-form-back-wrapper">
                        <Back
                            url="/action"
                            name="編集・作成一覧に戻る"
                        />
                    </div>
                    <p　className="topic-form-title">新しいポストを作成する</p>
                    <div className="topic-form-progress-mount"/>
                    <ActionProgress
                        step={this.state.step}
                        stepName={
                            [
                                "トピックを選択",
                                "ポストを選択",
                                "初期設定",
                                "プレビュー"
                            ]
                        }
                    />

                    {this.renderStep()}

                </div>
            </div>
        )
    }
}

export default CreatePost