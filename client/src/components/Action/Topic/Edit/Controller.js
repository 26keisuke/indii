import React, { Component } from "react"
import axios from "axios"

import EditIndexTopic from "./Index"
import EditPreviewTopic from "./Preview"

import ActionProgress from "../../Progress/Progress"
import ActionImage from "../../../ActionImage"
import Tag from "../../Tag/Tag"

import Select from "../../Controller/Select"
import topics from "../../../__Mock__/data/topic"

import "./EditTopic.css"

import Back from "../../../Util/Back";

import sample from "../../../../images/sample1.png"

import { FormWrapper, FormMount, BackWrapper } from "../../Form/Form"

class CreatePost extends Component {

    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            back: false,
            topic: {},
            original: {
                img: [],
                tags: [],
                index: [],
            },
            edited: {
                img: [],
                tags: [],
                index: [],
            },
        }
    }

    renderStep = () => {
        switch (this.state.step) {
            case 0:
                // return <ActionDecideTopic 
                //         back={this.state.back} 
                //         setBackward={this.setBackward} 
                //         storage="editTopicName"
                //         setTopic={this.setTopic} 
                //         setStep={this.setStep}
                //         />
                return <Select
                            placeholder="トピックを入力..."
                            index="1"
                            title="トピックを選択してください"
                            subTitle="トピック名"
                            type="Match"
                            content="Topic"
                            data={topics}
                            searchByVariable="name"
                            storage="editTopicName"
                            back={this.state.back} 
                            setBackward={this.setBackward} 
                            setValue={this.setTopic} 
                            setStep={this.setStep}
                        />
            case 1:
                return <ActionImage
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        // initialVal={this.state.original.img} 本来はこっち
                        initialVal={sample}
                        storage="editTopicImage"
                        setImage={this.setImage} 
                        setStep={this.setStep}
                        />
            case 2:
                return <Tag
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        // initialVal={this.state.original.tags} 本来はこっち
                        initialVal={["Hello", "World"]}
                        storage="editTopicTags"
                        setTags={this.setTags} 
                        setStep={this.setStep}
                        max={6}
                        />
            case 3:
                return <EditIndexTopic
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        // initialVal={this.state.original.index} 本来はこっち
                        initialVal={[]}
                        setIndex={this.setIndex} 
                        setStep={this.setStep}
                        />
            case 4:
                return <EditPreviewTopic
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        topic={this.state.topic}
                        originalImg={this.state.original.img}
                        originalTags={this.state.original.tags}
                        originalIndex={this.state.original.index}
                        editedImg={this.state.edited.img}
                        editedTags={this.state.edited.tags}
                        editedIndex={this.state.edited.index}
                        setStep={this.setStep}
                        />
        }
    }

    setImage = (img) => {
        console.log(img)
        this.setState({
            edited: {
                img
            }
        })
    }
    setTags = (tags) => {
        this.setState({
            edited:{
                tags
            }
        })
    }
    setIndex = (index) => {
        this.setState({
            edited: {
                index
            }
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

    setTopic = (topic) => {
        this.setState({
            topic: topic
        })
        const url = "/api/post/" + topic.id
        axios.get(url)
        .then(res => {
            this.setState({
                original: {
                    img: res.img,
                    tags: res.tags,
                    index: res.index,
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render () {
        return (
            <FormWrapper>
                <div>
                    <BackWrapper>
                        <Back
                            url="/action"
                            name="編集・作成一覧に戻る"
                        />
                    </BackWrapper>
                    <p>既存のトピックを編集する</p>
                    <FormMount/>
                    <ActionProgress
                        step={this.state.step}
                        stepName={
                            [
                                "トピックを選択",
                                "写真を変更",
                                "タグを編集",
                                "目次を編集",
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

export default CreatePost