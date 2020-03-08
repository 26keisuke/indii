import React, { Component } from "react"
import styled from "styled-components"

import { GoComment } from "react-icons/go"
import { AiOutlineLike } from "react-icons/ai"

class Element extends Component {
    render() {
        return (
            <Box>
                <UserName>ここにユーザー名が入ります</UserName>
                <Title>ここにコンテンツのタイトルが入ります</Title>
                <Text>ここに参考となる、コンテンツの内容が入ります。ユーザーはこれを見ることで内容を把握できます。</Text>
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
                <Date>二日前</Date>
            </Box>
        )
    }
}

const Date = styled.div`
    color: #777777;
    font-size: 10px;
    top: 11px;
    right: 21px;
    position: absolute;
`

const UserName = styled.h5`
    margin-bottom: 5px;
`

const Text = styled.h3`
    font-size: 11px !important;
    color: #666666;
    margin: 10px 0px;
`

const Box = styled.div`
    display: flex;
    padding: 12px 20px;
    flex-direction: column;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    position: relative;
    cursor: pointer;

    &:hover{
        background-color: rgba(233, 233, 238, 0.25);
    }
`

const Title = styled.h2`

    display: flex;
    font-size: 15px;

`

const Bottom = styled.div`
    display: flex;

    & > div {

        display: flex;
        align-items: center;
        margin-right: 12px;

        & > svg {
            transform: scale(1.2);
            margin-right: 6px;
        }
    }
`

export default Element