import React, { useState } from "react"
import styled, { css } from "styled-components"

import Upload from "../../Util/Upload"
import { Box, BoxTransition, ButtonWrapper, ButtonLeft, ButtonRight } from "../Element/Box"
import { Space } from "../../Theme"

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    width: "400px",
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

function ActionImage(props) {

    // fileは{preview: __}の形
    const [file, setFile] = useState({preview: localStorage.getItem(props.storage)} || {preview: null});

    // const flag = ((file.preview === "null") || (file.preview === null) || (file.preview === "undefined"))
    const flag = ((file.preview === null) || (file.preview === undefined))
    const display = flag ? props.initialVal : file.preview

    const handleBack = () => {
        props.setBackward(true);
        props.setStep(0);
    };

    const handleRevert = () => {
        setFile({
            ...file,
            preview: null
        })
    }

    const handleForward = () => {
        if(!display){
            console.log("Illegal attempt to bypass sending a file");
        }
        props.setBackward(false)
        props.setStep(2);

        if(flag) {
            props.setImage(props.initialVal) 
        } else  {
            props.setImage(file.preview)
        }
    };

    return (
        <Box>
            <BoxTransition back={props.back} transition={true}>
                <div> 
                    <p>2. アイコンと背景用の写真を選択</p>
                    {   props.initialVal
                        ? <RevertBtn　onClick={handleRevert}>元に戻す</RevertBtn>
                        : ""
                    }
                </div> 
                <Upload
                    message="このボックスに画像をドラッグするか、ボックスをクリックしてください"
                    caution="(*.jpegと*.pngのみ)"
                    file={file}
                    storage={props.storage}
                    setFile={setFile}
                    baseStyle={baseStyle}
                    activeStyle={activeStyle}
                    acceptStyle={acceptStyle}
                    rejectStyle={rejectStyle}
                />
                <PreviewBox>
                    <PreviewElement mobile={true} hide={!display}>
                        <p>モバイルでの表示</p>
                        <div/>
                        <img 
                            src={display} 
                            alt={"モバイル用のトピックの画像プレビュー"}/>
                    </PreviewElement>
                    <PreviewElement hide={!display}>
                        <p>PCでの表示</p>
                        <div/>
                        <img 
                            src={display} 
                            alt={"ウェブ用のトピックの画像プレビュー"}
                        />
                    </PreviewElement>
                </PreviewBox>
                <ButtonWrapper>
                    <ButtonLeft onClick={handleBack}>戻る</ButtonLeft>
                    <ButtonRight disabled={!display} onClick={handleForward}>次へ進む</ButtonRight>
                </ButtonWrapper>
                <Space height="220px"/>
            </BoxTransition>
        </Box>
    );
};

const RevertBtn = styled.p`
    margin-left: 185px;
    text-decoration: underline;
    color: #747474 !important;
    font-size: 11px !important;
    cursor: pointer;
    white-space: nowrap;
`

const PreviewBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 444px;
`

export const PreviewElement = styled.div`
    position: relative;
    margin: 0px 15px;
    margin-top: 25px;

    & > p {
        margin-bottom:10px;
        color: #585858;
        font-size: 10px;
        margin-left: 5px;
    }

    & > div {
        position: absolute;
        border: 1px solid black;
        border-style: dashed;
        border-width: 1px;

        ${props => props.mobile 
        ? css`
            width: 285px;
            height: 150px;
            border-bottom-right-radius: 35px;
            border-bottom-left-radius: 35px;
        `
        : css`
            width: 120px;
            height: 120px;
        `}
        
        ${props => !props.hide && css`
            opacity: 0;
        `}
    }

    & > img {

        object-fit: contain;
        border: 1px solid #d2d2d2;

        ${props => props.mobile 
        ? css`
            min-width: 285px;
            min-height: 150px;
            max-width: 285px;
            max-height: 150px;
            border-bottom-right-radius: 35px;
            border-bottom-left-radius: 35px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        `
        : css`
            min-width: 120px;
            min-height: 120px;
            max-width: 120px;
            max-height: 120px;
        `}

        ${props => props.hide && css`
            opacity: 0;
        `}
    }
`

export default ActionImage;