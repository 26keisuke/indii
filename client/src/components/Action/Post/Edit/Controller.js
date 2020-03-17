import React, {Component} from "react"
import { Helmet } from "react-helmet"

import EditPreviewPost from "./Preview"
import Form from "../../Form/Form"
// import Select from "../../Controller/Select"
import Match from "../../../Search/Controller/Match"
import { Box, BoxTransition } from "../../Element/Element"
import { ButtonWrapper, ButtonLeft, } from "../../Element/TwoButtons"

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

    componentWillUnmount() {
        localStorage.clear()
    }

    renderStep = () => {
        switch (this.state.step) {
            case 0:
                // return <Select
                //         placeholder="トピックを入力..."
                //         index="1"
                //         title="トピックを選択してください"
                //         subTitle="トピック名"
                //         type="Match"
                //         content="Topic"
                //         // data={topics}
                //         searchByVariable="topicName"
                //         storage="editPostTopic"
                //         back={this.state.back} 
                //         setBackward={this.setBackward} 
                //         setValue={this.setTopic} 
                //         setStep={this.setStep}
                //         />
                const postAction1 = (topic) => {
                    this.setBackward(false);
                    this.setStep(1);
                    this.setTopic(topic);
                }

                return (
                    <Box>
                        <BoxTransition back={this.state.back} transition={false}>
                            <Match
                                title="1. トピックを選択してください"
                                message="トピック名"
                                theme="TOPIC"
                                placeholder="トピックを入力..."
                                postAction={postAction1}
                                storageId="editPostTopic"
                            />
                        </BoxTransition>
                    </Box>
                )
            case 1:
                // return <Select
                //         placeholder="ポスト名を入力..."
                //         index="2"
                //         title="ポストを選択してください"
                //         subTitle="ポスト名"
                //         type="Match"
                //         content="Post"
                //         // data={posts}
                //         topicId={this.state.selectedTopic._id}
                //         helper="owner"
                //         transition={true}
                //         searchByVariable="postName"
                //         storage="editPostPost"
                //         back={this.state.back} 
                //         setBackward={this.setBackward} 
                //         setValue={this.setPost} 
                //         setStep={this.setStep}
                //         />

                const handleBack = () => {
                    this.setBackward()
                    this.setStep(0)
                }

                const postAction2 = (post) => {
                    this.setBackward(false);
                    this.setStep(2);
                    this.setPost(post);
                }

                return (
                    <Box>
                        <BoxTransition back={this.state.back} transition={true}>
                            <Match
                                title="2. ポストを選択してください"
                                message="ポスト名"
                                theme="POST"
                                placeholder="ポスト名を入力..."
                                postAction={postAction2}
                                storageId="editPostPost"
                                topicId={this.state.selectedTopic._id}
                                showHelper={true}
                            />
                            <ButtonWrapper>
                                <ButtonLeft onClick={handleBack}>戻る</ButtonLeft>
                            </ButtonWrapper>
                        </BoxTransition>
                    </Box>
                )
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
            default:
                return;
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
    }

    render () {
        return (
            <div>
                <Helmet>
                    <title>ポストの編集 | Indii</title>
                    <meta name="description" content="ポストの編集をします。あなたの理想とする形に自由にカスタマイズしましょう。"/>
                    <meta name="keywords" content="編集,ポスト"/>
                </Helmet>
                <Form
                    step={this.state.step}
                    stepNames={[
                        "トピックを選択",
                        "ポストを選択",
                        "プレビュー"
                    ]}
                    title="既存のポストを編集する"
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
            //         <p>既存のポストを編集する</p>
            //         <FormMount/>
            //         <ActionProgress
            //             step={this.state.step}
            //             stepName={
            //                 [
            //                     "トピックを選択",
            //                     "ポストを選択",
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

export default EditPost