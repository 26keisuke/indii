import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import TextField from '@material-ui/core/TextField';

import Upload from "../../Upload"
import Crop from "../../Crop"

class Image extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: {preview: null}, // Uploadされた時
            // width: null,
            // height: null,
        }
    }

    componentDidMount() {
        // 値を初期化 -> 初期の値は{}なので !{}はfalseになってしまう
        this.props.handleChange("")
        this.props.setTransparent(true)
    }

    // このためだけに、updateしてmapstatetopropsするのはもったいなさすぎる
    componentDidUpdate() {
        if(!!this.props.value){
            this.props.setTransparent(false)
        }
    }

    setFile = (file) => {
        this.setState({
            file,
        })
    }

    render () {

        const { file } = this.state
        // const width = this.state.width ? `${this.state.width}px` : "none"
        // const height = this.state.height ? `${this.state.height}px` : "none"

        return(
            <Wrapper>
                <Crop
                    file={file}
                    setUrl={this.props.handleChange}
                    crop={{
                        x: 0,
                        y: 0,
                    }}
                    config={"profileImg"}
                    style={{ marginTop: "10px", border: "1px solid #eaeaea", boxSizing: "border-box" }}
                />
                {/* { file && <p>画像のサイズを調整</p>}
                { file &&
                <TextWrapper>
                    <TextField
                        id="width" 
                        label="長さ" 
                        value={this.state.width}
                        onChange={(e) => this.setState({ width: e.target.value })} 
                    />
                    <TextField
                        id="height" 
                        label="高さ" 
                        value={this.state.height}
                        onChange={(e) => this.setState({ height: e.target.value })} 
                    />
                </TextWrapper>
                } */}
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
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    padding: 0px 2px;
    padding-top: 10px;
    padding-bottom: 35px;
    display: flex;
    flex-direction: column;
    & > div {
        margin-bottom: 10px;
    }

    & > p {
        margin: 10px 0px;
    }
`

const TextWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 20px;

    & > div {
        margin-right: 20px;
    }
`

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 20px',
    width: "456px",
    marginTop: "25px",
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