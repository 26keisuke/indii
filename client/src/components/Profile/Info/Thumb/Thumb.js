import React, { Component } from "react"
import styled, { css } from "styled-components"

import Upload from "../../../Util/Upload"
import Crop from "../../../Util/Crop"
import { PreviewElement } from "../../../Action/Controller/Image"


class Thumb extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: {preview: null}, // Uploadされた時
        }
    }

    componentDidMount() {
        // 値を初期化 -> 初期の値は{}なので !{}はfalseになってしまう
        this.props.handleChange("")
    }

    setFile = (file) => {
        this.setState({
            file,
        })
    }

    render() {

        const { file } = this.state
        const initialVal = null // cross originのエラーが出るからinitialValはfalseにする

        const display = !this.props.value ? initialVal : this.props.value

        return (
            <div>
                <Wrapper>
                    <PreviewElement hide={!display}>
                        <p>プレビュー</p>
                        <div/>
                        <img 
                            src={display} 
                            alt={"プロフィール画像の画像プレビュー"}
                        />
                    </PreviewElement>
                    <CropWrapper hide={!file.preview}>
                        <Crop
                            file={file}
                            setUrl={this.props.handleChange}
                            crop={{
                                aspect: 1,
                                height: 100,
                                x: 0,
                                y: 0,
                            }}
                            config={"profileImg"}
                            style={{ marginTop: "10px", maxWidth: "300px", maxHeight: "300px", border: "1px solid #d2d2d2", boxSizing: "border-box" }}
                        />
                    </CropWrapper>
                    {
                        !file.preview && <Text>画像がアップロードされていません</Text>
                    }
                </Wrapper>
                <Upload
                    message="このボックスに画像をドラッグするか、ボックスをクリックしてください"
                    caution=""
                    file={file}
                    setFile={this.setFile}
                    baseStyle={baseStyle}
                    activeStyle={activeStyle}
                    acceptStyle={acceptStyle}
                    rejectStyle={rejectStyle}
                />
            </div>
        )
    }
}

const Text = styled.p`
    margin-right: 35px;
`

const CropWrapper = styled.div`
    ${props => props.hide && css`
        display: none;
    `}
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 20px',
    width: "456px",
    marginTop: "25px",
    marginBottom: "20px",
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

export default Thumb