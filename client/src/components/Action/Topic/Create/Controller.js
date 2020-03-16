import React, { Component } from "react"
import { Helmet } from "react-helmet"

import CreateFriendsTopic from "./Friend"
import CreatePreviewTopic from "./Preview"

// import Select from "../../Controller/Select"

import Image from "../../Controller/Image"
import Tag from "../../Tag/Tag"
import Form from "../../Form/Form"
import Unique from "../../../Search/Controller/Unique"
import { Box, BoxTransition } from "../../Element/Element"

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

    componentWillUnmount() {
        localStorage.clear()
    }

    renderStep = () => {
        switch (this.state.step) {
            case 0:
                // return  <Select
                //             placeholder="トピックを入力"
                //             index="1"
                //             title="トピック名を入力してください"
                //             subTitle="トピック名"
                //             type="Unique"
                //             content="Topic"
                //             // data={topics}
                //             searchByVariable="topicName"
                //             storage="createTopicName"
                //             back={this.state.back} 
                //             setBackward={this.setBackward} 
                //             setValue={this.setTopicName} 
                //             setStep={this.setStep}
                //         />

                const postAction = (topicName) => {
                    this.setBackward(false);
                    this.setStep(1);
                    this.setTopicName(topicName);
                }

                return (
                    <Box>
                        <BoxTransition back={this.state.back} transition={false}>
                            <Unique
                                title="1. トピック名を入力してください"
                                message="トピック名"
                                theme="TOPIC"
                                placeholder="トピックを入力..."
                                postAction={postAction}
                                storageId="createTopicName"
                            />
                        </BoxTransition>
                    </Box>
                )
            case 1:
                return <Image
                        back={this.state.back} 
                        setBackward={this.setBackward} 
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

    setImage = (mobile, square, rectangle) => {
        this.setState({
            mobileImg: mobile,
            squareImg: square,
            rectangleImg: rectangle,
        })
    }


    render() {
         
        return (
            <div>
                <Helmet>
                    <title>トピックの作成 | Indii</title>
                    <meta name="description" content="トピックの編集をします。あなたの理想とする形に自由にカスタマイズしましょう。"/>
                    <meta name="keywords" content="新規作成,トピック"/>
                </Helmet>
                <Form
                    step={this.state.step}
                    stepNames={[
                        "トピック名を決定",
                        "写真を選択",
                        "タグを追加",
                        "友達を招待する",
                        "プレビュー"
                    ]}
                    title="新しいトピックを作成する"
                >
                    {this.renderStep()}
                </Form>
            </div>
        )
    }
}

export default CreateTopic