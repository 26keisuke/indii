import React, { Component } from "react"

import CreateFriendsTopic from "./Friend"
import CreatePreviewTopic from "./Preview"

import Select from "../../Controller/Select"
// import topics from "../../../__Mock__/data/topic"

import ActionProgress from "../../Progress/Progress"
import Image from "../../Controller/Image"
import Tag from "../../Tag/Tag"

import "./CreateTopic.css";
import Back from "../../../Util/Back";

import { FormWrapper, FormMount, BackWrapper } from "../../Form/Form"

// import indii from "../../../../images/indii.png"

class CreateTopic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            back: false,
            topicName: "",
            mobileImg: "",
            squareImg: "",
            rectangleImg: "",
            tags: [],
            friends: [],
        }
    }

    renderStep = () => {
        switch (this.state.step) {
            case 0:
                return  <Select
                            placeholder="トピックを入力"
                            index="1"
                            title="トピック名を入力してください"
                            subTitle="トピック名"
                            type="Unique"
                            content="Topic"
                            // data={topics}
                            searchByVariable="topicName"
                            storage="createTopicName"
                            back={this.state.back} 
                            setBackward={this.setBackward} 
                            setValue={this.setTopicName} 
                            setStep={this.setStep}
                        />
            case 1:
                return <Image
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        // initialVal={indii}
                        storage1="createTopicImage1"
                        storage2="createTopicImage2"
                        storage3="createTopicImage3"
                        setImage={this.setImage} 
                        setStep={this.setStep}
                        />
            case 2:
                return <Tag
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
                        mobileImg={this.state.mobileImg}
                        squareImg={this.state.squareImg}
                        rectangleImg={this.state.rectangleImg}
                        tags={this.state.tags}
                        friends={this.state.friends}
                        setStep={this.setStep}
                        />
            default:
                return;
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
    // setImage = (img, type) => {
    //     const name = String(type) + "Img"
    //     this.setState({
    //         [name]: img
    //     })
    // }
    setImage = (mobile, square, rectangle) => {
        this.setState({
            mobileImg: mobile,
            squareImg: square,
            rectanlgeImg: rectangle,
        })
    }


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
                    <p>新しいトピックを作成する</p>
                    <FormMount/>
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
            </FormWrapper>
        )
    }
}

export default CreateTopic