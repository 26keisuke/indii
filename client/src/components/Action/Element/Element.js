import styled, { keyframes, css } from "styled-components"
import { IoMdCheckmark, IoMdClose, IoIosClose } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa"

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
            border-radius: 2px;
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
            border-radius: 2px;
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
    max-height: 50px;
    /* overflow: scroll; */
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
        border-bottom: 1px solid #eaeaea;
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
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            margin-right: -12px;
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
    padding: 2px 9px;
    height: 23px;
    background-color: #e0e0e0;
    margin: 5px;
    font-size: 10px;
    border-radius: 16px;
    color: rgba(0, 0, 0, 0.87);
    cursor: default;
    display: flex;
    align-items: center;

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

const eclipse = keyframes`
    0% { transform: rotate(0deg) }
    50% { transform: rotate(180deg) }
    100% { transform: rotate(360deg) }
`

export const EclipseWrapper = styled.div`
    width: 38px;
    height: 38px;
    display: inline-block;
    overflow: hidden;
    background: #ffffff;
    position: absolute;
    left: 398px;
    top: 18px;
`

export const Eclipse = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(0.38);
    backface-visibility: hidden;
    transform-origin: 0 0;

    & > div {
        position: absolute;
        animation: ${eclipse} 1s linear infinite;
        width: 62px;
        height: 62px;
        top: 19px;
        left: 19px;
        border-radius: 50%;
        box-shadow: 0 3.7px 0 0 #636480;
        transform-origin: 31px 32.85px;
        box-sizing: content-box;
    }
`

