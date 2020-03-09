import React, { Component } from "react"
import styled from "styled-components"
import { GoComment } from "react-icons/go"
import { AiOutlineLike } from "react-icons/ai"

import CommentBox from "./Comment/Comment"
import Element from "./Element/Element"

import { Space } from "../../../Theme"

class Content extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return(
            <Wrapper>
                <Box>
                    <UserName>ここにトピック名 / ユーザー名が入ります</UserName>
                    <Title>ここにトークのタイトルが入ります。長いことも短いこともあります。</Title>
                    <Description>ここにトークのタイトルが入ります。長いことも短いこともあります。ここにトークのタイトルが入ります。長いことも短いこともあります。ここにトークのタイトルが入ります。長いことも短いこともあります。</Description>
                    <Bottom>
                        <div>
                            <GoComment/>
                            10
                        </div>
                        <div>
                            <AiOutlineLike/>
                            120
                        </div>
                    </Bottom>

                    <Space height={"30px"}/>

                    <MessageWrapper>
                        <Element/>
                        <Element/>
                        <Element/>
                        <Element/>
                        <Element/>
                    </MessageWrapper>

                    

                    <Space height={"300px"}/>
                </Box>
                <CommentBox/>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    position: relative;
`

const MessageWrapper = styled.div`

`

const UserName = styled.p`
    margin-bottom: 5px;
`

const Description = styled.h4`
    font-size: 12px;
    color: #555555;
    margin-top: 15px;
    margin-bottom: 20px;
`

const Box = styled.div`
    box-shadow: 1px 1px 10px #d2d2d2;
    background-color: white;
    width: 100%;
    margin-right: 60px;
    min-width: 581px;
    max-width: 581px;
    padding: 40px;
    position: relative;
    overflow: scroll;

    max-height: 575px;
    min-height: 575px;
`

const Title = styled.h2`
    
`

const Bottom = styled.div`
    display: flex;
    margin-top: 10px;
    margin-right: 20px;
    margin-left: 3px;
    font-size: 12px;

    & > div {

        display: flex;
        align-items: center;
        margin-right: 30px;

        & > svg {
            transform: scale(1.2);
            margin-right: 6px;
        }
    }
`

export default Content