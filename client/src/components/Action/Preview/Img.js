import React, { Component } from "react"

import { PreviewImgWrapper, PreviewImg, ImgBox } from "../Element/Box"

class Img extends Component {
    render () {
        return (
            <PreviewImgWrapper>
                <PreviewImg>
                    <ImgBox type="mobile">
                        <p>After: </p>
                        <img src={this.props.newImg}/>
                    </ImgBox>
                    <ImgBox>
                        <p>　</p>
                        <img src={this.props.newImg}/>
                    </ImgBox>
                </PreviewImg>
                { this.props.originalImg 
                ?
                <PreviewImg>
                    <ImgBox type="mobile">
                        <p>Before: </p>
                        <img src={this.props.originalImg}/>
                    </ImgBox>
                    <ImgBox>
                        <p>　</p>
                        <img src={this.props.originalImg}/>
                    </ImgBox>
                </PreviewImg>
                : ""
                }
            </PreviewImgWrapper>
        )
    }
}

export default Img