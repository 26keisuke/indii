import React, { Component } from "react"


// 将来的にはこれをconfiugrableにして、
// ステップ名とjsxのpairを渡せば完成する感じにする

import "./CreateTopic.css";
import CreateDecideTopic from "./CreateDecideTopic";
import CreateImageTopic from "./CreateImageTopic";
import CreateTagTopic from "./CreateTagTopic";
import CreateFriendsTopic from "./CreateFriendsTopic"

class CreateTopic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            back: false,
            topicName: "",
            img: [],
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
                        topicName={this.topicName} 
                        setStep={this.setStep}
                        />
            case 1:
                return <CreateImageTopic
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        setImage={this.setImage} 
                        setStep={this.setStep}
                        />
            case 2:
                return <CreateTagTopic
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        setTags={this.setTags} 
                        setStep={this.setStep}
                        />
            case 3:
                return <CreateFriendsTopic
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        setFriends={this.setFriends} 
                        setStep={this.setStep}
                        />
        }
    }

    setTags = (tag) => {
        this.setState({
            tag
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

    topicName = (name) => {
        localStorage.setItem("topicName", name)
        this.setState({
            topicName: name
        })
    }

    setImage = (img) => {
        console.log(img)
        this.setState({
            img
        })
    }

    setCircle = (idx) => {
        const now = this.state.step
        if(now == idx){
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
        const now = this.state.step
        const target = idx + 1
        if(now == target){
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

    render() {
         
        return (
            <div className="topic-form-wrapper">
                <div className="topic-form">
                    <div className="topic-form-progress">

                        <div className="topic-form-progress-fake">
                            <div className="topic-form-progress-circle-fake">
                                <p>1</p>
                            </div>
                            {this.setCircle(0)}
                            <p className="topic-form-progress-name">トピック名を決定</p>
                        </div>

                        <div className="topic-form-progress-fake">
                            <div className="topic-form-progress-bar"/>
                            {this.setBar(0)}
                        </div>

                        <div className="topic-form-progress-fake">
                            <div className="topic-form-progress-circle-fake">
                                <p>2</p>
                            </div>
                            {this.setCircle(1)}
                            <p className="topic-form-progress-name">写真を選択</p>
                        </div>

                        <div className="topic-form-progress-fake">
                            <div className="topic-form-progress-bar"/>
                            {this.setBar(1)}
                        </div>

                        <div className="topic-form-progress-fake">
                            <div className="topic-form-progress-circle-fake">
                                <p>3</p>
                            </div>
                            {this.setCircle(2)}
                            <p className="topic-form-progress-name">タグを追加</p>
                        </div>

                        <div className="topic-form-progress-fake">
                            <div className="topic-form-progress-bar"/>
                            {this.setBar(2)}
                        </div>

                        <div className="topic-form-progress-fake">
                            <div className="topic-form-progress-circle-fake">
                                <p>4</p>
                            </div>
                            {this.setCircle(3)}
                            <p className="topic-form-progress-name">友達を招待する</p>
                        </div>

                        <div className="topic-form-progress-fake">
                            <div className="topic-form-progress-bar"/>
                            {this.setBar(3)}
                        </div>

                        <div className="topic-form-progress-fake">
                            <div className="topic-form-progress-circle-fake">
                                <p>5</p>
                            </div>
                            {this.setCircle(4)}
                            <p className="topic-form-progress-name">プレビュー</p>
                        </div>

                    </div>

                    {this.renderStep()}

                </div>
            </div>
        )
    }
}

export default CreateTopic;