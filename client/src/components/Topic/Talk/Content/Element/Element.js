import React, { Component } from "react"
import styled from "styled-components"

class Element extends Component {
    render() {
        return(
            <Wrapper>
                <Info>
                    <div>ユーザー名が入ります</div>
                    <div>・</div>
                    <div>１日前</div>
                </Info>
                <div>
                    <Connect/>
                    <Content>
                    ここにトークのタイトルが入ります。長いことも短いこともあります。ここにトークのタイトルが入ります。長いことも短いこともあります。ここにトークのタイトルが入ります。長いことも短いこともあります。
                    </Content>
                </div>
            </Wrapper>
        )
    }
}

const Connect = styled.div`
    display: flex;
    justify-content: center;
    min-height: 100%;
    width: 1px;
    background-color: #d2d2d2;
    margin: 0px 12px;
`

const Wrapper = styled.div`
    margin-bottom: 30px;

    & > div:nth-child(2){
        display: flex;
    }
`

const Info = styled.div`

    display: flex;
    color: #777777;
    margin-bottom: 6px;

    & > div:nth-child(2){
        margin: 0px 6px;
    }
`

const Content = styled.div`
    
`


export default Element