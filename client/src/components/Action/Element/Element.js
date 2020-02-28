import React, { Component } from "react"
import styled, { keyframes, css } from "styled-components"
import { IoMdCheckmark, IoMdClose, IoIosClose } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa"

export class Section extends Component {
    render() {
        return (
            <div>   
                <Title title={this.props.title}/>
                <PreviewTitle>{this.props.content}</PreviewTitle>
                <PreviewUnderline/>
            </div>
        )
    }
}

export class Title extends Component {
    render() {
        return (
            <PreviewSection>
                <div/>
                <p>{this.props.title}</p>
            </PreviewSection>
        )
    }
}

const enter = keyframes`
    0%{opacity: 0; padding-left: 0%}
    100%{opacity: 1; padding-left: 22.5%}
`

const show = keyframes`
    0%{opacity: 0; padding-left: 45%}
    100%{opacity: 1; padding-left: 22.5%}
`

const keep = keyframes`
    0%{opacity: 0; padding-left: 22.5%}
    100%{opacity: 1; padding-left: 22.5%}
`

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 140px;
    width: 800px;
    ${props => props.scroll && css`
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            width: 0px !important;
        }
    `};
`

export const BoxTitle = styled.p`
    color: #333333;
    font-size: 14px;
    margin-bottom: 15px;
    white-space: nowrap;

    & > span {
        color: #333333;
        font-size: 9px;
        margin-left: 20px;
    }
`

export const BoxTransition = styled.div`
    ${props => props.transition
    ? css`
        width: 600px;
        animation-name: ${show};
        animation-duration: 1s;
        animation-fill-mode: forwards;
    `
    : css `
        width: 600px;
        animation-name: ${keep};
        animation-duration: 1s;
        animation-fill-mode: forwards;
    `}
    ${props => props.back && css`
        width: 600px;
        animation-name: ${enter};
        animation-duration: 1s;
        animation-fill-mode: forwards;
    `};

    & > div:nth-child(1) {
        position: relative;
        display: flex;
        align-items: center;

        & > p {
            color: #333333;
            font-size: 14px;
            margin-bottom: 15px;
            white-space: nowrap;

            & > span {
                color: #333333;
                font-size: 9px;
                margin-left: 20px;
            }
        }
    }

    & > form {
        position: relative;

        & > p {
            color: #585858;
            font-size: 10px;
            margin-left: 9px;
            pointer-events: none;
        }

        & .react-autosuggest__input {
            width: 435px;
            height: 36px;
            border: none;
            border-bottom: 0.5px solid #838383;
            padding-left: 5px;
            font-size: 14px;
            margin-top: 4px;
            font-family: "Gennokaku Gothic";
        }

        & .react-autosuggest__container {
            position: relative;
            width: 100%;
        }

        & .react-autosuggest__suggestions-container--open {
            margin-top: 1px;
            display: block;
            position: absolute;
            width: 442px;
            background-color: #fff;
            box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
            font-size: 12px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            z-index: 2;
            overflow-x: hidden;
        }

        & .react-autosuggest__suggestions-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
        }

        & .react-autosuggest__suggestion {
            cursor: pointer;
        }

        & .react-autosuggest__suggestion--highlighted {
            background-color: rgba(62,62,62,0.1);
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }

        & .react-autosuggest__input--focused {
            outline: none;
            border-bottom: 0.5px solid #9EAEE6;
        }

    }

    & > div:nth-child(2) {
        position: relative;
    }
`

export const GreenMark = styled(IoMdCheckmark)`
    width: 25px;
    height: 25px;
    position: absolute;
    left: 413px;
    top: 27px;
    cursor: pointer;
    color: #4CD964;
`

export const RedMark = styled(IoMdClose)`
    width: 25px;
    height: 25px;
    position: absolute;
    left: 413px;
    top: 27px;
    cursor: pointer;
    color: #FF5F5F;
`

export const Owner = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: -17px;
    & > p {
        font-size: 10px;
        color: #585858
    }
`

export const OwnerIcon = styled(FaUserCheck)`
    color: #9EAEE6;
    transform: scale(1.2);
    margin-left: 86px;
    margin-right: 10px;
`


export const ButtonWrapper = styled.div`
    width: 444px;
    display: flex;
    justify-content: space-between;
    margin-top:30px;
`

export const ButtonLeft = styled.button`
    width: 90px;
    height:34px;
    cursor: pointer;
    background-color: #ffffff;
    border: 0.5px solid #636480;
    font-family: "Gennokaku Gothic";
    outline:0;
`

export const ButtonRight = styled.button`
    width: 90px;
    height:34px;
    cursor: pointer;
    border: none;
    background-color: #636480;
    color: #ffffff;
    font-family: "Gennokaku Gothic";
    outline:0;

    ${props => props.disabled && css`
        opacity: 0.2;
        pointer-events: none;
    `}
`

export const PreviewSection = styled.div`

    position: relative;

    & > div {
        background-color: #9EAEE6;
        width: 6px;
        height: 6px;
        border-radius: 100%;
        position: absolute;
        top: 4px;
    }

    & > p {
        color: #585858;
        font-size: 10px;
        margin-left: 9px;
        pointer-events: none;
    }
`

export const PreviewTitle = styled.p`
    margin-top: 22px;
    margin-bottom: 7px;
    font-size: 14px;
`

export const PreviewUnderline = styled.div`
    width: 440px;
    border-bottom: 1px solid #838383;
    margin-bottom: 30px;
`

export const FinalCheck = styled.p`
    font-size: 15px;
    & > span {
        margin-left: 10px;
        font-size: 10px;
        color:#838383;
    }
`

export const PreviewList = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 40px;
    margin-left:3px;
    width: 440px;
`

/* export const PreviewImgWrapper = styled.div`
    margin-bottom:40px;
`

export const PreviewImg = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 444px;
` */
/* 
export const ImgBox = styled.div`
    position: relative;
    margin: 0px 15px;
    margin-top: 25px;

    & > p {
        margin-bottom:10px;
        color: #585858;
        font-size: 10px;
        margin-left: 5px;
    }

    & > img {
        ${props => props.type == "mobile" 
        ? css`
            width: 285px;
            height: 150px;
            border-bottom-right-radius: 35px;
            border-bottom-left-radius: 35px;
            object-fit: contain;
            border: 1px solid #d2d2d2;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        `
        : css`
            width: 120px;
            height: 120px;
            border: 1px solid #d2d2d2;
            object-fit: contain;
        `}
    }
` */

export const PreviewIndex = styled.div`

    width: 444px;

    & > div:nth-child(1) {
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        & > p:nth-child(1) {
            color: #585858;
            font-size: 10px;
            margin-right: 50px;
        }

        & > p:nth-child(2) {
            color: #585858;
            font-size: 10px;
            margin-left: 50px;
        }

    }

    & > hr {
        height:1px;
        border: none;
        border-bottom: 1px solid #d2d2d2;
    }
`

export const IndexBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 12px;
    margin-top: 20px;
    margin-bottom: 40px;
    align-items: baseline;

    & p {
        line-height: 25px;
    }

    & > div:nth-child(1) {
        text-align: left;
        margin-left: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;

        & > div:nth-child(1) {
            font-weight: bold;
            color: #555555;
        }

        & > div:nth-child(2) {
            margin-left: 10px;
        }

    }

    & > div:nth-child(2) {
        text-align: end;
        margin-right: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;

        & > div:nth-child(1) {
            margin-right: 10px;
        }

        & > div:nth-child(2) {
            font-weight: bold;
            color: #555555;
            margin-right: -15px;
        }
    }
`

export const FriendWrapper = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
    margin: 10px;
    & > img {
        width: 42px;
        height: 42px;
        border-radius: 5px;
        object-fit: cover;
        cursor: pointer;
    }
`

export const FriendNone = styled.p`
    font-size: 11px;
`

export const TagElement = styled.p`
    padding: 2px 5px;
    border: 0.5px solid #646380;
    border-radius: 3px;
    margin-right: 10px;
    font-size: 11px;
    cursor: pointer;
    color: #646380;
`

export const PreviewConfig = styled.div`
    display: flex;
    flex-direction: row;
    width: 433px;
    align-items: center;
    justify-content: space-between;

    & > div {
        position: relative;

        & > input {
            position:absolute;
            top: -10px;
            width: 27px;
            height: 27px;
            margin-top: 12px;
            cursor: pointer;
            border: none;
            border-radius: 100%;
            box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);

            ${props => props.config
            ? css`
                right: 3px; 
                background-color: #9EAEE6;
            `
            : css`
                right: 20px; 
                background-color: #d2d2d2;
            `};
        }

        & > div {
            border: 1px solid #d2d2d2;
            width: 48px;
            height: 30px;
            cursor: pointer;
            border-radius: 50px;
        }

    }

`

export const RevertBtn = styled.p`
    margin-left: 185px;
    text-decoration: underline;
    color: #747474 !important;
    cursor: pointer;
    white-space: nowrap;
    font-size: 11px !important;
    margin-bottom: 0px !important;
`

export const ConfigUnderline = styled.div`
    width: 440px;
    border-bottom: 1px solid #838383;
    margin-bottom: 30px;
`

export const AddBtn = styled.div`
    border: none;
    font-size: 11px;
    width: 85px;
    color: #333333;
    margin-left: 28px;
    cursor: pointer;
    white-space: nowrap;
    background-color: #ffffff;
    outline:none;
`

export const TagList = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    left: 0px;
    top: -2px;
`

export const TagBox = styled.div`
    position: relative;   

    & > p {
        padding: 2px;
        height: 15px;
        border: 0.5px solid #636480;
        border-radius: 3px;
        padding-right: 15px;
        margin-right: 10px;
        font-size: 10px;
        padding-left:4px;
        cursor: pointer;
        color: #646380;
    }
`

export const TagIcon = styled(IoIosClose)`
    position: absolute;
    pointer-events: none;
    top: 4px;
    right: 13px;
`