import React, { Component } from "react"
import styled from "styled-components"

class List extends Component {
    render() {
        return(
            <div>
                <Info>
                    <div>ユーザー名が入ります</div>
                    <div>・</div>
                    <div>１日前</div>
                </Info>
                <Content>
                ここにトークのタイトルが入ります。長いことも短いこともあります。ここにトークのタイトルが入ります。長いことも短いこともあります。ここにトークのタイトルが入ります。長いことも短いこともあります。
                </Content>
            </div>
        )
    }
}

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


export default List