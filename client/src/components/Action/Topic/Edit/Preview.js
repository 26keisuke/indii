import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import * as actions from "../../../../actions"

import {Box, BoxTransition,
        Title, Section,
        ButtonWrapper, ButtonLeft, ButtonRight,
        FinalCheck,
        TagElement,
        PreviewList,
        PreviewIndex, IndexBox } from "../../Element/Element"

import { Space } from "../../../Theme"
import Image from "../../Preview/Image"

class CreatePreviewTopic extends Component {

    handleBack = () => {
        this.props.setBackward(true);
        this.props.setStep(3);
    }   

    handleForward = () => {
        this.props.setBackward(false);
        this.props.isFetching();
        this.props.enableGray();
        setTimeout(() => this.onExit(), 1500);
    };

    onExit = () => {
        this.props.history.push("/")
        this.props.endFetching();
        this.props.disableGray();
        this.props.resetCategory();
        localStorage.clear();
        this.props.setCategory("home");
        setTimeout(() => this.props.updateMessage("success", `トピック「${this.props.topic.name}」を編集しました。`),1000);
        setTimeout(() => this.props.resetMessage(), 5000)
    }

    renderTags = () => {
        if(this.props.tags && this.props.tags.length > 0){
            var res = this.props.tags.map((tag) => 
                <TagElement key={tag}>{tag}</TagElement>  
            );
        }; 
        return res;
    };

    renderIndex = () => {
        console.log(this.props.editedOrder)
        console.log(this.props.editedPosts)
        return(
            <PreviewIndex>
                <div>
                    <p>Before</p>
                    <p>After</p>
                </div>
                <hr/>
                <IndexBox>
                    <div>
                        <div>
                            <p>1</p>
                            <p>1.1</p>
                            <p>1.2</p>
                        </div>
                        <div>
                            <p>コンテンツ</p>
                            <p>コンテンツ</p>
                            <p>コンテンツ</p>
                        </div>
                    </div> 
                    <div>
                        <div>
                            <p>コンテンツ</p>
                            <p>コンテンツ</p>
                            <p>コンテンツ</p>
                        </div>
                        <div>
                            <p>1</p>
                            <p>1.1</p>
                            <p>1.2</p>
                        </div>
                    </div> 
                </IndexBox>
            </PreviewIndex>
        )
    }


    render(){

        return (
            <Box scroll={true}>
                <BoxTransition back={this.props.back} transition={true}>
                    <div> 
                        <p>プレビュー</p>
                    </div> 
                    <div>
                        <Section title={"トピック名"} content={this.props.topicName}/>

                        <Title title={"トピックの画像"}/>
                        <Image
                            originalSquareImg={this.props.originalSquareImg}
                            originalRectangleImg={this.props.originalRectangleImg}
                            originalMobileImg={this.props.originalMobileImg}
                            
                            mobileImg={this.props.editedMobileImg}
                            rectangleImg={this.props.editedRectangleImg}
                            squareImg={this.props.editedSquareImg}
                        />

                        <Title title={"このトピックに関連するタグ"}/>
                        <PreviewList>
                            {this.renderTags()}
                        </PreviewList>

                        <Title title={"目次"}/>
                        {this.renderIndex()}
                        
                        <FinalCheck>この内容で編集を反映してよろしいですか？<span></span></FinalCheck>
                        <ButtonWrapper>
                            <ButtonLeft onClick={this.handleBack}>戻る</ButtonLeft>
                            <ButtonRight onClick={this.handleForward}>作成する</ButtonRight>
                        </ButtonWrapper>
                        <Space height="220px"/>
                    </div>
                </BoxTransition>
            </Box>
        )
    }

}

export default connect(null, actions)(withRouter(CreatePreviewTopic))