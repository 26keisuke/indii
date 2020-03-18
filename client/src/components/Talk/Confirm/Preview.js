import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import Section from "../../Action/Element/Section"
import Title from "../../Action/Element/Title"

class TalkConfirm extends Component {
    render() {

        var fetched, type, name, img, imgSub;

        const { confirmation } = this.props.update

        if(confirmation.type === "post"){
            fetched = this.props.post.fetched
            name = fetched.postName
            type = "post"
            img = fetched.postImg && fetched.postImg.image
            imgSub = fetched.topic && fetched.topic.squareImg.image
        } else if(confirmation.type === "topic"){
            fetched = this.props.topic.fetched
            type = "topic"
            name = fetched.topicName
            img = fetched.squareImg && fetched.squareImg.image
        }

        return (
            <Wrapper>
                <Section title="トーク名" content={confirmation.talkTitle}/>

                { name && 
                <Title title={`参照${type === "post" ? "ポスト" : type === "topic" ? "トピック" : ""}`}/> 
                }
                { name &&
                <RefPreview>
                    <img src={img || imgSub}/>
                    <h2>{name}</h2>
                    <div/>
                </RefPreview>
                }
                <SectionWrapper>
                    <Section title="トーク概要" content={confirmation.talkDesc}/>
                </SectionWrapper>
            </Wrapper>
        )
    }
}

const SectionWrapper = styled.div`
    & > div {
        & > p {
            font-size: 11px;
        }
    }
`

const RefPreview = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 15px;
    margin-bottom: 20px;

    & > img {
        width: 50px;
        height: 50px;
        margin-right: 20px;
    }

    & > div:last-child{
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: -6px;
        background-color: #838383;
    }
`

const Wrapper = styled.div`
    padding-top: 20px;
    padding-bottom: 40px;
`

function mapStateToProps({update, post, topic}){
    return {
        update,
        post,
        topic
    }
}

export default connect(mapStateToProps)(TalkConfirm)