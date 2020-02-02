import React, {Component} from "react"
import axios from "axios"

import ActionProgress from "../ActionProgress"
import ActionDecideTopic from "../ActionDecideTopic"
import ActionDecidePost from "../ActionDecidePost"
import Back from "../Back";
import EditPreviewPost from "./EditPreviewPost"

class EditPost extends Component {

    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            back: false,
            selectedTopic: {},
            posts: [],
            selectedPost: {}
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
                return <ActionDecidePost
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        posts={this.state.posts}
                        storage="editPostPost"
                        setPost={this.setPost}
                        setStep={this.setStep}
                        />
            case 2:
                return <EditPreviewPost
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        selectedPost={this.state.selectedPost}
                        selectedTopic={this.state.selectedTopic}
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
            selectedPost: post
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
                    <p　className="topic-form-title">既存のポストを編集する</p>
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

                    {this.renderStep()}

                </div>
            </div>
        )
    }
}

export default EditPost