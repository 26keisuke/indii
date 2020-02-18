import React, { Component } from "react"
import styled from "styled-components"

import sample from "../../../images/sample0.jpg"
import sample1 from "../../../images/sample1.png";

import Recommend from "../../Util/Recommend"

class Trend extends Component {

    renderElement = () => {
        return
    }

    render () {
        return (
            <div>
                <SlashTitle>
                    <p>トレンド</p>
                    <p>/////////////////////////////////////</p>
                </SlashTitle>
                {/* {this.renderElement()} */}
                <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample1}
                />
                <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample1}
                />
                <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample1}
                />
                <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample1}
                />
            </div>
        )
    }
}

export const SlashTitle = styled.div`

    display: flex;
    flex-direction: row;
    margin-bottom: 15px;

    & > p:nth-child(1) {
        margin-right: 10px;
        font-size: 14px;
    }

    & > p:nth-child(2) {
        color: #d2d2d2;
        font-size: 14px;
        letter-spacing: 2.5px;
    }
`

export default Trend