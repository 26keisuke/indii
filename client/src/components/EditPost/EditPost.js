import React, {Component} from "react"
import axios from "axios"

import ActionProgress from "../Action/Progress/Progress"
import Back from "../Util/Back";
import EditPreviewPost from "./EditPreviewPost"

import Select from "../Action/Controller/Select"
import topics from "../__Mock__/data/topic"
import posts from "../__Mock__/data/post"

import { FormWrapper, FormMount, BackWrapper } from "../Action/Form/Form"

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
                // return <ActionDecideTopic 
                //         back={this.state.back} 
                //         setBackward={this.setBackward} 
                //         storage="editPostTopic"
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
                        storage="editPostTopic"
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        setValue={this.setTopic} 
                        setStep={this.setStep}
                        />
            case 1:
                // return <ActionDecidePost
                //         back={this.state.back} 
                //         setBackward={this.setBackward} 
                //         posts={this.state.posts}
                //         storage="editPostPost"
                //         setPost={this.setPost}
                //         setStep={this.setStep}
                //         />
                return <Select
                        placeholder="ポスト名を入力..."
                        index="2"
                        title="ポストを選択してください"
                        subTitle="ポスト名"
                        type="Match"
                        content="Post"
                        data={posts}
                        helper="owner"
                        transition={true}
                        searchByVariable="title"
                        storage="editPostPost"
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        setValue={this.setPost} 
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
            <FormWrapper>
                <div>
                    <BackWrapper>
                        <Back
                            url="/action"
                            name="編集・作成一覧に戻る"
                        />
                    </BackWrapper>
                    <p>既存のポストを編集する</p>
                    <FormMount/>
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
            </FormWrapper>
        )
    }
}

export default EditPost