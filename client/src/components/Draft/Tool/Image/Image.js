import React, { Component } from "react"
import styled from "styled-components"

import Upload from "../../../Util/Upload"
import { PreviewElement } from "../../../Action/Controller/Image"
import Crop from "../../../Util/Crop"

class Image extends Component {
    render () {

        const { display, file, setFile, onDropped, setUrl, crop, config } = this.props

        return (
            <Wrapper>
                <UploadWrapper>
                    <PreviewWrapper>
                        <PreviewElement hide={!display}>
                            <p>プレビュー</p>
                            <div/>
                            <img 
                                src={display} 
                                alt={"ウェブ用のトピックの画像プレビュー"}
                            />
                        </PreviewElement>
                    </PreviewWrapper>
                    <Upload
                        message="ここに画像をドラッグするか、ボックスをクリックしてください"
                        caution=""
                        file={file}
                        setFile={setFile}
                        baseStyle={baseStyle}
                        activeStyle={activeStyle}
                        acceptStyle={acceptStyle}
                        rejectStyle={rejectStyle}
                        onDropped={onDropped}
                    />
                </UploadWrapper>
                <CropWrapper>
                    <Crop
                        file={file}
                        setUrl={setUrl}
                        crop={crop}
                        config={config}
                        style={{ marginTop: "10px", width: "323px", border: "1px solid #d2d2d2", boxSizing: "border-box" }}
                        imageStyle={{ width: "324px" }}
                    />
                </CropWrapper>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const UploadWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    
`

const CropWrapper = styled.div`
    margin-left: 19px;
    margin-bottom: 25px;
`

const PreviewWrapper = styled.div`
    margin-left: -15px;
`

const baseStyle = {
    display: 'flex',
    marginTop: "27px",
    flexDirection: 'column',
    textAlign: "center",
    alignItems: 'center',
    padding: '45px 10px',
    width: "160px",
    maxHeight: "56px",
    minHeight: "56px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    transition: 'border .24s ease-in-out'
};
const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default Image