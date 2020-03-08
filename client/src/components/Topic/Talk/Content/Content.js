import React, { Component } from "react"
import styled from "styled-components"
import { GoComment } from "react-icons/go"
import { AiOutlineLike } from "react-icons/ai"

import CommentBox from "./Comment/Comment"
import CommentList from "./List/List"

import { Space } from "../../../Theme"

class Content extends Component {
    render() {
        return(
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

                <CommentList/>


                <CommentBox/>
            </Box>
        )
    }
}

const UserName = styled.p`
    margin-bottom: 5px;
`

const Description = styled.h4`
    font-size: 12px;
    color: #555555;
`

const Box = styled.div`
    box-shadow: 1px 1px 10px #d2d2d2;
    background-color: white;
    width: 100%;
    margin-right: 60px;
    min-width: 600px;
    padding: 40px;
    position: relative;
`

const Title = styled.h2`
    margin-bottom: 5px;
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