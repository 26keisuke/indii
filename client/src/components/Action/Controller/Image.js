//全てに大してdefault valueを適用したらfakeの点線のやつはいらなくなる

import React, {useState, useMemo, useEffect} from "react"
import axios from "axios"
import Dropzone, { useDropzone } from "react-dropzone"
import styled, { css } from "styled-components"

import { Box, BoxTransition, ButtonWrapper, ButtonLeft, ButtonRight } from "../Element/Box"

// For uploading on Cloudinary
// const CLOUDINARY_UPLOAD_PRESET = 'glgcswc0';
// const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dgc4swpmv/upload';

// Styling
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

    const [file, setFile] = useState({preview: localStorage.getItem(props.storage)} || {});

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragAccept, 
        isDragActive, 
        isDragReject
    } = useDropzone({
        accept: "image/jpeg, image/png",
        maxSize: 5242880,
        multiple: false,
        onDropAccepted: (acceptedFiles) => {

            const promise = new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(acceptedFiles[0])
                reader.onload = () => {
                    if(!!reader.result) {
                        resolve(reader.result)
                    } else {
                        reject(Error("Failed converting to base64"))
                    }
                }
            })
            promise.then(result => {
                setFile({preview: result})
            }, err => {
                console.log(err)
            })

            // setFiles(acceptedFiles.map(file => Object.assign(file, {
            //     preview: URL.createObjectURL(file)
            // })));

            // const uploader = acceptedFiles.map(file => {
            //     const formData = new FormData();
            //     formData.append("file", file);
            //     formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            //     formData.append("timestamp", (Date.now()));
            //     return axios.post(CLOUDINARY_UPLOAD_URL, formData, {
            //         headers: { "X-Requested-With": "XMLHttpRequest" },
            //     }).then(response => {
            //         const data = response.data;
            //         const fileURL = data.secure_url // Have to store this URL for future references
            //         console.log(data);
            //     })
            // })
        }
    });

    useEffect (() => {
        if(file !== "undefined" || file === undefined){
            localStorage.setItem(props.storage, file.preview)
        }
    },[props.storage, file])

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
        ...(isDragActive ? activeStyle : {})
    }), [
        isDragActive,
        isDragReject
    ]);

    const handleBack = () => {
        props.setBackward(true);
        props.setStep(0);
    };

    const handleRevert = () => {
        setFile({
            ...file,
            preview: "null"
        })
    }

    const handleForward = () => {
        if(!file.preview && !props.initialVal){
            console.log("Illegal attempt to bypass sending a file");
        }
        props.setBackward(false)
        props.setStep(2);
        if((file.preview === "null") || (file.preview === "") || (file.preview === null)) {
            props.setImage(props.initialVal)
        } else if(props.initialVal) {
            props.setImage(file.preview)
        }
    };

    const display = ((file.preview === "null") || (file.preview === "") || (file.preview === null)) ? props.initialVal : file.preview

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
                <div>
                    <div {...getRootProps({style})}>
                        <input {...getInputProps()} />
                        <p>このボックスに画像をドラッグするか、ボックスをクリックしてください</p>
                        <em>(*.jpegと*.pngのみ)</em>
                    </div>
                    <div>
                    <PreviewBox>
                        <PreviewElement mobile={true} hide={!file.preview && !props.initialVal}>
                            <p>モバイルでの表示</p>
                            <div/>
                            <img 
                                src={display} 
                                alt={"モバイル用のトピックの画像プレビュー"}/>
                        </PreviewElement>
                        <PreviewElement hide={ !file.preview && !props.initialVal}>
                            <p>PCでの表示</p>
                            <div/>
                            <img 
                                src={display} 
                                alt={"ウェブ用のトピックの画像プレビュー"}
                            />
                        </PreviewElement>
                    </PreviewBox>
                    </div>
                </div>
                <ButtonWrapper>
                    <ButtonLeft onClick={handleBack}>戻る</ButtonLeft>
                    <ButtonRight disabled={!file.preview && !props.initialVal} onClick={handleForward}>次へ進む</ButtonRight>
                    {/* <ButtonRight disabled={!file.preview && !props.initialVal ? "topic-form-button-right disable" : "topic-form-button-right"} onClick={handleForward}>次へ進む</ButtonRight> */}
                </ButtonWrapper>
                <div className="space"/>
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

const PreviewElement = styled.div`
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
            width: 285px;
            height: 150px;
            border-bottom-right-radius: 35px;
            border-bottom-left-radius: 35px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        `
        : css`
            width: 120px;
            height: 120px;
        `}

        ${props => props.hide && css`
            opacity: 0;
        `}
    }
`

export default ActionImage;