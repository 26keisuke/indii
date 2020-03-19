import React, { Component } from "react"
import axios from "axios"
import { Helmet } from "react-helmet"

import Index from "./Index/Index"
import EditPreviewTopic from "./Preview"

import Image from "../../Controller/Image"
import Tag from "../../Tag/Tag"
import Form from "../../Form/Form"
import Match from "../../../Search/Controller/Match"
import { Box, BoxTransition } from "../../Element/Element"

// import Select from "../../Controller/Select"

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
                columns: [],
                order: [],
            },
            edited: {
                rectangleImg: "",
                mobileImg: "",
                squareImg: "",
                tags: [],
                posts: [],
                columns: [],
                order: [],
            },
        }
    }

    componentWillUnmount() {
        localStorage.clear()
    }

    renderStep = () => {
        switch (this.state.step) {
            case 0:

                const postAction = (topic) => {
                    // めっちゃ早くsuggestionを押した場合はtopicがundefinedになる
                    if(topic){
                        this.setBackward(false);
                        this.setStep(1);
                        this.setTopic(topic);
                    }
                }

                return (
                    <Box>
                        <BoxTransition back={this.state.back} transition={false}>
                            <Match
                                title="1. トピックを選択してください"
                                message="トピック名"
                                theme="TOPIC"
                                placeholder="トピックを入力..."
                                postAction={postAction}
                                storageId="editTopicName"
                            />
                        </BoxTransition>
                    </Box>
                )
            case 1:
                return <Image
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        
                        initialVal1={this.state.original.mobileImg}
                        initialVal2={this.state.original.squareImg}
                        initialVal3={this.state.original.rectangleImg}

                        storage1="editTopicImg1"
                        storage2="editTopicImg2"
                        storage3="editTopicImg3"

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
                return <Index
                        back={this.state.back} 
                        setBackward={this.setBackward} 

                        initialVal1={this.state.original.posts}
                        initialVal2={this.state.original.columns}
                        initialVal3={this.state.original.order}

                        setIndex={this.setIndex} 
                        setStep={this.setStep}
                        />
            case 4:
                return <EditPreviewTopic
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        topicId={this.state.topic._id}
                        topicName={this.state.topic.topicName}

                        originalSquareImg={this.state.original.squareImg}
                        originalRectangleImg={this.state.original.rectangleImg}
                        originalMobileImg={this.state.original.mobileImg}
                        
                        editedMobileImg={this.state.edited.mobileImg}
                        editedRectangleImg={this.state.edited.rectangleImg}
                        editedSquareImg={this.state.edited.squareImg}

                        originalPosts={this.state.original.posts}
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
                    columns: res.data.column,
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
            <div>
                <Helmet>
                    <title>トピックの編集 | Indii</title>
                    <meta name="description" content="トピックの編集をします。あなたの理想とする形に自由にカスタマイズしましょう。"/>
                    <meta name="keywords" content="編集,トピック"/>
                </Helmet>
                <Form
                    step={this.state.step}
                    stepNames={[
                        "トピックを選択",
                        "写真を変更",
                        "タグを編集",
                        "目次を編集",
                        "プレビュー"
                    ]}
                    title="既存のトピックを編集する"
                >
                    {this.renderStep()}
                </Form>
            </div>
            // <FormWrapper>
            //     <div>
            //         <BackWrapper>
            //             <Back
            //                 url="/action"
            //                 name="編集・作成一覧に戻る"
            //             />
            //         </BackWrapper>
            //         <p>既存のトピックを編集する</p>
            //         <FormMount/>
            //         <ActionProgress
            //             step={this.state.step}
            //             stepName={
            //                 [
            //                     "トピックを選択",
            //                     "写真を変更",
            //                     "タグを編集",
            //                     "目次を編集",
            //                     "プレビュー"
            //                 ]
            //             }
            //         />
            //         {this.renderStep()}
            //     </div>
            // </FormWrapper>
        )
    }
}

export default CreatePost