import React, {Component} from "react"
import CreateConfigurationPost from "./Configuration"
import CreatePreviewPost from "./Preview"
import Form from "../../Form/Form"

import Select from "../../Controller/Select"

class CreatePost extends Component {

    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            back: false,
            selectedTopic: {}, 
            config: {
                allowEdit: true,
            },
            postName: ""
        }
    }

    componentWillUnmount() {
        localStorage.clear()
    }

    renderStep = () => {
        switch (this.state.step) {
            case 0:
                return  <Select
                        placeholder="トピックを入力..."
                        index="1"
                        title="トピックを選択してください"
                        subTitle="トピック名"
                        type="Match"
                        content="Topic"
                        // data={topics}
                        searchByVariable="topicName"
                        storage="editPostTopic"
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        setValue={this.setTopic} 
                        setStep={this.setStep}
                        />
            case 1:
                return  <Select
                        placeholder="ポスト名を入力..."
                        index="2"
                        title="ポスト名を入力してください"
                        subTitle="ポスト名"
                        type="Unique"
                        content="Post"
                        // data={posts}
                        transition={true}
                        searchByVariable="postName"
                        storage="editPostPost"
                        back={this.state.back} 
                        setBackward={this.setBackward} 
                        setValue={this.setPost} 
                        setStep={this.setStep}
                        topicId={this.state.selectedTopic._id}
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
                        config={this.state.config}
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
                allowEdit: config.allowEdit.on
            }
        })
    }

    setTopic = (topic) => {
        this.setState({
            selectedTopic: topic
        })
    }

    render () {
        return (
            <Form
                step={this.state.step}
                stepNames={[
                    "トピックを選択",
                    "ポストを選択",
                    "初期設定",
                    "プレビュー"
                ]}
                title="既存のポストを編集する"
            >
                {this.renderStep()}
            </Form>
            // <FormWrapper>
            //     <div>
            //         <BackWrapper>
            //             <Back
            //                 url="/action"
            //                 name="編集・作成一覧に戻る"
            //             />
            //         </BackWrapper>
            //         <p>新しいポストを作成する</p>
            //         <FormMount/>
            //         <ActionProgress
            //             step={this.state.step}
            //             stepName={
            //                 [
            //                     "トピックを選択",
            //                     "ポストを選択",
            //                     "初期設定",
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