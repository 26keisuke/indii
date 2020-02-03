import React, { Component } from "react"

import { IoIosArrowDown } from "react-icons/io"

// 将来的にはこれをconfiugrableにして、
// ステップ名とjsxのpairを渡せば完成する感じにする

import CreateDecideTopic from "./CreateDecideTopic";
import CreateFriendsTopic from "./CreateFriendsTopic"
import CreatePreviewTopic from "./CreatePreviewTopic"

import ActionProgress from "../ActionProgress"
import ActionImage from "../ActionImage"
import ActionTag from "../ActionTag"

import "./CreateTopic.css";
import Back from "../Back";

class CreateTopic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            back: false,
            topicName: "",
            img: {},
            tags: [],
            friends: [],
        }
    }

    renderStep = () => {
        switch (this.state.step) {
            case 0:
                return <CreateDecideTopic 
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        storage="createTopicName"
                        setTopicName={this.setTopicName} 
                        setStep={this.setStep}
                        />
            case 1:
                return <ActionImage
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        storage="createTopicImage"
                        setImage={this.setImage} 
                        setStep={this.setStep}
                        />
            case 2:
                return <ActionTag
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        storage="createTopicTag"
                        setTags={this.setTags} 
                        setStep={this.setStep}
                        max={6}
                        />
            case 3:
                return <CreateFriendsTopic
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        setFriends={this.setFriends} 
                        setStep={this.setStep}
                        max={2}
                        />
            case 4:
                return <CreatePreviewTopic
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        topicName={this.state.topicName}
                        img={this.state.img}
                        tags={this.state.tags}
                        friends={this.state.friends}
                        setStep={this.setStep}
                        />
        }
    }

    setTags = (tags) => {
        this.setState({
            tags
        })
    }
    setFriends = (friends) => {
        this.setState({
            friends
        })
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
    setTopicName = (name) => {
        this.setState({
            topicName: name
        })
    }
    setImage = (img) => {
        this.setState({
            img
        })
    }

    render() {
         
        return (
            <div className="topic-form-wrapper">
                <div className="topic-form">

                    <div className="topic-form-back-wrapper">
                        <Back
                            url="/action"
                            name="編集・作成一覧に戻る"
                        />
                    </div>

                    <p className="topic-form-title">新しいトピックを作成する</p>

                    <div className="topic-form-progress-mount"/>
                    
                    <ActionProgress
                        step={this.state.step}
                        stepName={
                            [
                                "トピック名を決定",
                                "写真を選択",
                                "タグを追加",
                                "友達を招待する",
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

export default CreateTopic;