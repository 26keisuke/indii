import React, { Component } from "react"

import { PreviewImgWrapper, PreviewImg, ImgBox } from "../Element/Box"

class Image extends Component {
    render () {
        return (
            <PreviewImgWrapper>
                <PreviewImg>
                    <ImgBox type="mobile">
                        <p>After: </p>
                        <img src={this.props.newImg} alt={"変更が適用された後のモバイルのプレビュー"}/>
                    </ImgBox>
                    <ImgBox>
                        <p>　</p>
                        <img src={this.props.newImg} alt={"変更が適用された後のウェブのプレビュー"}/>
                    </ImgBox>
                </PreviewImg>
                { this.props.originalImg 
                ?
                <PreviewImg>
                    <ImgBox type="mobile">
                        <p>Before: </p>
                        <img src={this.props.originalImg}　alt={"変更が適用される前のモバイルのプレビュー"}/>
                    </ImgBox>
                    <ImgBox>
                        <p>　</p>
                        <img src={this.props.originalImg}　alt={"変更が適用される前のウェブのプレビュー"}/>
                    </ImgBox>
                </PreviewImg>
                : ""
                }
            </PreviewImgWrapper>
        )
    }
}

export default Image