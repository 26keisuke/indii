import React, {Component} from "react"
import axios from "axios"

import ActionProgress from "../../Progress/Progress"
import CreateConfigurationPost from "./Configuration"
import CreatePreviewPost from "./Preview"
import Back from "../../../Util/Back";

import Select from "../../Controller/Select"
import topics from "../../../__Mock__/data/topic"
import posts from "../../../__Mock__/data/post"

import { FormWrapper, FormMount, BackWrapper } from "../../Form/Form"

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
                // return <ActionDecideTopic 
                //         back={this.state.back} 
                //         setBackward={this.setBackward} 
                //         storage="editPostTopic"
                //         setTopic={this.setTopic}
                //         setStep={this.setStep}
                //         />
                return  <Select
                        placeholder="トピックを入力..."
                        index="1"
                        title="トピックを選択してください"
                        subTitle="トピック名"
                        type="Match"
                        content="Topic"
                        data={topics}
                        searchByVariable="name"
                        storage="editPostTopic"
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        setValue={this.setTopic} 
                        setStep={this.setStep}
                        />
            case 1:
                // return <CreateDecidePost
                //         back={this.state.back} 
                //         setBackward={this.setBackward} 
                //         storage="editPostPost"
                //         setPost={this.setPost}
                //         setStep={this.setStep}
                //         />
                return  <Select
                        placeholder="ポスト名を入力..."
                        index="2"
                        title="ポスト名を入力してください"
                        subTitle="ポスト名"
                        type="Unique"
                        content="Post"
                        data={posts}
                        transition={true}
                        searchByVariable="title"
                        storage="editPostPost"
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        setValue={this.setPost} 
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
        const url = "/api/topic/" + topic.id
        axios.get(url)
        .then(res => {
            console.log(res)
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
                    <p>新しいポストを作成する</p>
                    <FormMount/>
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
            </FormWrapper>
        )
    }
}

export default CreatePost