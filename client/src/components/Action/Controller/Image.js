// Radio buttonのpropsが汚い

import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import styled, { css } from "styled-components"

import * as actions from "../../../actions"

import Upload from "../../Util/Upload"
import { Box, BoxTransition } from "../Element/Element"
import TwoButtons from "../Element/TwoButtons"
import { Space } from "../../Theme"
import Crop from "../../Util/Crop"
import { Radio } from "../../Filter/Filter"

import { sendMessage } from "../../Util/util"

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

    const [file1, setFile1] = useState({preview: null})
    const [file2, setFile2] = useState({preview: null})
    const [file3, setFile3] = useState({preview: null})
    const [url1, setUrl1] = useState(localStorage.getItem(props.storage1) || null)
    const [url2, setUrl2] = useState(localStorage.getItem(props.storage2) || null)
    const [url3, setUrl3] = useState(localStorage.getItem(props.storage3) || null)
    const [toggle, setToggle] = useState("mobile")

    const flag1 = ((url1 === null) || (url1 === undefined))
    const display1 = flag1 ? props.initialVal1 : url1

    const flag2 = ((url2 === null) || (url2 === undefined))
    const display2 = flag2 ? props.initialVal2 : url2

    const flag3 = ((url3 === null) || (url3 === undefined))
    const display3 = flag3 ? props.initialVal3 : url3

    useEffect(() => {
        if(props.image.revert){
            setUrl1(null)
            setFile1({preview: null})
            setUrl2(null)
            setFile2({preview: null})
            setUrl3(null)
            setFile3({preview: null})
            props.revertImg(false)
            sendMessage("success", "変更を元に戻しました。", 4000, props)
        }
    }, [props.image.revert])

    useEffect (() => {
        if(!flag1 && props.storage1){
            localStorage.setItem(props.storage1, url1)
        }
    }, [url1, props.storage1])

    useEffect (() => {
        if(!flag2 && props.storage2){
            localStorage.setItem(props.storage2, url2)
        }
    }, [url2, props.storage2])

    useEffect (() => {
        if(!flag3 && props.storage3){
            localStorage.setItem(props.storage3, url3)
        }
    }, [url3, props.storage3])

    const handleBack = () => {
        props.setBackward(true);
        props.setStep(0);
    };

    const handleRevert = () => {
        const id = "1"; // falseじゃなければなんでもいい
        const action = "REVERT_IMG";
        const title = "変更を元に戻す";
        const message = "全ての画像を元に戻しますか？";
        const caution = "";
        const buttonMessage = "元に戻す";
        props.showConfirmation(id, action, title, caution, message, buttonMessage);
        props.enableGray();
    }

    const handleForward = () => {

        if(!display1 || !display2 || !display3){
            console.log("Illegal attempt to bypass sending a file");
        }

        const mobile = flag1 ? props.initialVal1 : url1
        const square = flag2 ? props.initialVal2 : url2
        const rectangle = flag3 ? props.initialVal3 : url3

        props.setImage(mobile, square, rectangle)

        props.setBackward(false)
        props.setStep(2);

    };

    const getConfig = (name) => {
        switch(name) {
            case "mobile":
                return {
                    aspect: 57/30,
                    height: 285,
                    x: 0,
                    y: 0,
                }
            case "topic":
                return {
                    aspect: 1,
                    height: 250,
                    x: 0,
                    y: 0,
                }
            case "post":
                return {
                    aspect: 19/10,
                    height: 200,
                    x: 0,
                    y: 0,
                }
            default:
                return null
        }
    }

    return (
        <Box>
            <BoxTransition back={props.back} transition={true}>
                <div> 
                    <p>2. アイコンと背景用の写真を選択</p>
                    {   (props.initialVal1 || props.initialVal2 || props.initialVal3)
                        ? <RevertBtn　onClick={handleRevert}>元に戻す</RevertBtn>
                        : ""
                    }
                </div> 
                <Upload
                    message="このボックスに画像をドラッグするか、ボックスをクリックしてください"
                    caution="(*.jpegと*.pngのみ)"
                    file={toggle === "mobile" ? file1 : toggle === "topic" ? file2 : file3}
                    setFile={toggle === "mobile" ? setFile1 : toggle === "topic" ? setFile2 : setFile3}
                    baseStyle={baseStyle}
                    activeStyle={activeStyle}
                    acceptStyle={acceptStyle}
                    rejectStyle={rejectStyle}
                />
                <RadioWrapper>
                    <div>
                        <Radio 
                            paddingLeft={"25px"}
                            boxTop={"0px"}
                            boxLeft={"0px"}
                            btnTop={"4px"}
                            btnLeft={"4px"}
                            type="radio" 
                            id="mobile" 
                            name="preview" 
                            onClick={() => setToggle("mobile")} 
                            defaultChecked={toggle === "mobile"}
                        />
                        <label htmlFor="mobile">モバイルでの表示</label>
                    </div>
                    <div>
                        <Radio 
                            paddingLeft={"25px"}
                            boxTop={"0px"}
                            boxLeft={"0px"}
                            btnTop={"4px"}
                            btnLeft={"4px"}
                            type="radio" 
                            id="topic" 
                            name="preview" 
                            onClick={() => setToggle("topic")} 
                            defaultChecked={toggle === "topic"}
                        />
                        <label htmlFor="topic">トピック画面での表示</label>
                    </div>
                    <div>
                        <Radio 
                            paddingLeft={"25px"}
                            boxTop={"0px"}
                            boxLeft={"0px"}
                            btnTop={"4px"}
                            btnLeft={"4px"}
                            type="radio" 
                            id="post" 
                            name="preview" 
                            onClick={() => setToggle("post")} 
                            defaultChecked={toggle === "post"}
                        />
                        <label htmlFor="post">ポスト画面での表示</label>
                    </div>
                </RadioWrapper>
                <PreviewBox>
                    { toggle === "mobile" &&
                    <PreviewImg mobile={true} hide={!display1}>
                        <p>モバイルでの表示</p>
                        <div/>
                        <img 
                            src={display1} 
                            alt={"モバイル用のトピックの画像プレビュー"}/>
                    </PreviewImg>
                    }
                    { toggle === "topic" &&
                    <PreviewImg topic={true} hide={!display2}>
                        <p>トピック画面での表示</p>
                        <div/>
                        <img 
                            src={display2} 
                            alt={"ウェブ用のトピックの画像プレビュー"}
                        />
                    </PreviewImg>
                    }
                    { toggle === "post" &&
                    <PreviewImg hide={!display3}>
                        <p>ポスト画面での表示</p>
                        <div/>
                        <img 
                            src={display3} 
                            alt={"ウェブ用のトピックの画像プレビュー"}
                        />
                    </PreviewImg>
                    }
                </PreviewBox>
                <Crop
                    file={toggle === "mobile" ? file1 : toggle === "topic" ? file2 : file3}
                    setUrl={toggle === "mobile" ? setUrl1 : toggle === "topic" ? setUrl2 : setUrl3}
                    crop={getConfig(toggle)}
                    config={toggle}
                />
                <TwoButtons
                    handleBack={handleBack}
                    handleForward={handleForward}
                    text={["戻る", "次へ進む"]}
                    disabled={ !display1 || !display2 || !display3 }
                />
                <Space height="220px"/>
            </BoxTransition>
        </Box>
    );
};

const RadioWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 15px 0px;
    & > div {
        margin-right: 15px;
    }
`

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
    width: 445px;
    margin-bottom: 50px;
`

export const PreviewImg = styled.div`
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
            width: 380px;
            height: 200px;
            border-bottom-right-radius: 35px;
            border-bottom-left-radius: 35px;
        `
        : props => props.topic 
        ? css`
            width: 250px;
            height: 250px;
        `
        : css`
            width: 380px;
            height: 200px;
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
            min-width: 380px;
            min-height: 200px;
            max-width: 380px;
            max-height: 200px;
            border-bottom-right-radius: 45px;
            border-bottom-left-radius: 45px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        `
        : props => props.topic 
        ? css`
            min-width: 250px;
            min-height: 250px;
            max-width: 250px;
            max-height: 250px;
        ` 
        : css`
            min-width: 380px;
            min-height: 200px;
            max-width: 380px;
            max-height: 200px;
        `}

        ${props => props.hide && css`
            opacity: 0;
        `}
    }
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

function mapStateToProps({image}){
    return {
        image
    }
}

export default connect(mapStateToProps, actions)(ActionImage);