import React, { useState } from "react"
import styled, { css } from "styled-components"

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';

const Image = ({ readOnly, attributes, children, element }) => {

    const [float, setFloat] = useState("middle")

    return (
        <div {...attributes}>
            <Wrapper 
                contentEditable={false}
            >
                <ImageWrapper float={float} readOnly={readOnly}>
                    <img src={element.url}/>
                    {/* <div>
                        <IconWrapper selected={float === "left"}>
                            <Tooltip title="左寄せ">
                                <IconButton aria-label="insert" size="small" onClick={() => setFloat("left")}>
                                    <FormatAlignLeftIcon/>
                                </IconButton>
                            </Tooltip>
                        </IconWrapper>
                        <IconWrapper selected={float === "middle"}>
                            <Tooltip title="中央寄せ">
                                <IconButton aria-label="insert" size="small" onClick={() => setFloat("middle")}>
                                    <FormatAlignCenterIcon/>
                                </IconButton>
                            </Tooltip>
                        </IconWrapper>
                        <IconWrapper selected={float === "right"}>
                            <Tooltip title="右寄せ">
                                <IconButton aria-label="insert" size="small" onClick={() => setFloat("right")}>
                                    <FormatAlignRightIcon/>
                                </IconButton>
                            </Tooltip>
                        </IconWrapper> */}
                        {/* <IconWrapper>
                            <Tooltip title="サイズ変更">
                                <IconButton aria-label="insert" size="small">
                                    <CropFreeIcon/>
                                </IconButton>
                            </Tooltip>
                        </IconWrapper> */}
                    {/* </div> */}
                </ImageWrapper>
            </Wrapper>
            {children}
        </div>
    )
}

const Wrapper = styled.div`
    user-select: none;

    &:after{
        content: " ";
        display: block;
        clear: both;
        height: 0px;
    }
`


const IconWrapper = styled.div`
    &  svg {
        color: ${props => props.selected && "rgb(150,150,150) !important"};
    }
`


const ImageWrapper = styled.div`

    position: relative;
    width: fit-content;

    ${props => props.float === "middle" && css`
        margin: 20px auto;
    `}

    ${props => props.float === "left" && css`
        float: left;
        margin: 20px;
        margin-left: 0px;
    `}

    ${props => props.float === "right" && css`
        float: right;
        margin: 20px;
        margin-right: 0px;
    `}

    & > div {
        display: none;
        transition: 250ms;
        background-color: ${props => props.theme.secondary};
        width: fit-content;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0%);
        padding: 0px 15px;
        bottom: 20px;
        border-radius: 2px;
        box-shadow: 1px 1px 10px #d2d2d2;

        &:before {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translate(-50%, 0);
            border-right: 10px solid transparent;
            border-top: 10px solid ${props => props.theme.secondary};
            border-left: 10px solid transparent;
        }

        & svg {
            padding: 10px;
            color: white;

            &:hover{
                color: rgb(200,200,200);
            }
        }
    }

    & div:hover {
        display: flex;
    }

    & > img {
        max-width: 100%;
    }

    & > img:hover + div {
        display: flex;
    }

    & > img:hover {
        outline: ${props => props.readOnly && "-webkit-focus-ring-color auto 5px"};
    }
`


export default Image