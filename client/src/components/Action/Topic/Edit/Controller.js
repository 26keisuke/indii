import React, { Component } from "react"
import axios from "axios"

import EditIndexTopic from "./Index"
import EditPreviewTopic from "./Preview"

import ActionProgress from "../../Progress/Progress"
import Image from "../../Controller/Image"
import Tag from "../../Tag/Tag"

import Select from "../../Controller/Select"
// import topics from "../../../__Mock__/data/topic"

import "./EditTopic.css"

import Back from "../../../Util/Back";

import { FormWrapper, FormMount, BackWrapper } from "../../Form/Form"

class CreatePost extends Component {

    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            back: false,
            topic: {},
            original: {
                rectangleImg: "",
                mobileImg: "",
                squareImg: "",
                tags: [],
                posts: [],
                column: [],
                order: [],
            },
            edited: {
                rectangleImg: "",
                mobileImg: "",
                squareImg: "",
                tags: [],
                posts: [],
                column: [],
                order: [],
            },
        }
    }

    renderStep = () => {
        switch (this.state.step) {
            case 0:
                return <Select
                        placeholder="トピックを入力..."
                        index="1"
                        title="トピックを選択してください"
                        subTitle="トピック名"
                        type="Match"
                        content="Topic"
                        // data={topics}
                        searchByVariable="topicName"
                        storage="editTopicName"
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        setValue={this.setTopic} 
                        setStep={this.setStep}
                        />
            case 1:
                return <Image
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        
                        initialVal1={this.state.original.mobileImg}
                        initialVal2={this.state.original.squareImg}
                        initialVal3={this.state.original.rectangleImg}

                        setImage={this.setImage} 
                        setStep={this.setStep}
                        />
            case 2:

                return <Tag
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        initialVal={this.state.original.tags}
                        storage="editTopicTags"
                        setTags={this.setTags} 
                        setStep={this.setStep}
                        max={6}
                        />
            case 3:

                return <EditIndexTopic
                        back={this.state.back} 
                        setBackward={this.setBackward} 

                        initialVal1={this.state.original.posts}
                        initialVal2={this.state.original.column}
                        initialVal3={this.state.original.order}

                        setIndex={this.setIndex} 
                        setStep={this.setStep}
                        />
            case 4:

                return <EditPreviewTopic
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        topicName={this.state.topic.topicName}

                        originalSquareImg={this.state.original.squareImg}
                        originalRectangleImg={this.state.original.rectangleImg}
                        originalMobileImg={this.state.original.mobileImg}
                        
                        editedMobileImg={this.state.edited.mobileImg}
                        editedRectangleImg={this.state.edited.rectangleImg}
                        editedSquareImg={this.state.edited.squareImg}

                        originalPost={this.state.original.posts}
                        originalColumns={this.state.original.columns}
                        originalOrder={this.state.original.order}

                        editedPosts={this.state.edited.posts}
                        editedColumns={this.state.edited.columns}
                        editedOrder={this.state.edited.order}
                        
                        originalTags={this.state.original.tags}
                        editedTags={this.state.edited.tags}
                        
                        setStep={this.setStep}
                        />
            default:
                return;
        }
    }

    setImage = (mobile, square, rectangle) => {
        this.setState({
            ...this.state,
            edited: {
                ...this.state.edited,
                mobileImg: mobile,
                squareImg: square,
                rectangleImg: rectangle,
            }
        })
    }

    // setImage = (img, type) => {
    //     const name = String(type) + "Img"
    //     this.setState({
    //         ...this.state,
    //         edited: {
    //             ...this.state.edited,
    //             [name]: img
    //         }
    //     })
    // }

    setTags = (tags) => {
        this.setState({
            ...this.state,
            edited:{
                ...this.state.edited,
                tags
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
        const url = "/api/topic/" + topic._id + "/ALL"
        axios.get(url)
        .then(res => {
            this.setState({
                ...this.state,
                original: {
                    ...this.state.original,
                    rectangleImg: res.data.rectangleImg.image,
                    mobileImg: res.data.mobileImg.image,
                    squareImg: res.data.squareImg.image,
                    tags: res.data.tags,
                    posts: res.data.posts,
                    column: res.data.column,
                    order: res.data.order,
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    setIndex = (posts, columns, order) => {
        this.setState({
            edited: {
                ...this.state.edited,
                posts,
                columns,
                order,
            }
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