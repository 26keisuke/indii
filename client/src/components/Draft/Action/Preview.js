import React, { Component } from "react"
import styled from "styled-components"

import { Separator, DraftElement } from "./Action"
import { IndexPreview } from "./Index"

import sample from "../../../images/sample1.png"

const DraftElementWrapper = styled.div`
    margin-bottom: 20px;
    overflow: scroll;
    height: 285px;

    &::-webkit-scrollbar{
        width: 0px !important;
    }
`

class Preview extends Component {

    renderUpload = () => {
        return (
            <DraftElement indexPreview={true}>
                <img src={sample} alt={"ドラフトが傘下となっているトピックの写真"}/>
                <div>
                    <p>ポスト名</p>
                    <p>前回の編集日： </p>
                </div>
                <IndexPreview top="10px" left="7px">
                    <div/>
                    <p>1.0</p>
                    <p>ハンバーガー将軍</p>
                    <p>の後</p>
                </IndexPreview>
            </DraftElement>
        )
    }

    renderDelete = () => {
        return (
            <DraftElement preview={true}>
                <img src={sample} alt={"ドラフトが傘下となっているトピックの写真"}/>
                <div>
                    <p>ポスト名</p>
                    <p>前回の編集日： </p>
                </div>
            </DraftElement>
        )
    }

    render () {

        return (
            <div>

                <Separator/>

                <DraftElementWrapper>
                    

                    { this.props.action === "DRAFT_DELETE_CHECK"

                    ? this.renderDelete()

                    : this.renderUpload()

                    }



                </DraftElementWrapper>

                <Separator bottom="49px"/>

            </div>
        )
    }
}

export default Preview