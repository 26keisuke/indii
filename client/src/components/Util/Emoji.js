import React, { Component } from "react"
import styled from "styled-components"

// import response from "../../images/response.png";
import dissapointed from "../../images/dissapointed.png";
import love from "../../images/love.png";
import good from "../../images/good.png";
import nerd from "../../images/nerd.png";
import hmm from "../../images/hmm.png";

import { getEmoji } from "./util"

import HoverIcon from "./HoverIcon"

const Emoji = React.forwardRef((props, ref) => (
    <EmojiWrapped innerRef={ref} {...props}/>
))

class EmojiWrapped extends Component {
    render () {

        const { innerRef, handleResponseClick, handleEmojiClick, showEmoji, shadow } = this.props

        return (
            <EmojiHover ref={innerRef} shadow={shadow}>
                <p onClick={handleResponseClick}></p>
                <EmojiRow show={showEmoji}>
                    <img alt={"ものすごく良い"} src={love} onClick={(e) => handleEmojiClick(e,5)}/>
                    <img alt={"とても良い"} src={good} onClick={(e) => handleEmojiClick(e,4)}/>
                    <img alt={"かなり良い"} src={nerd} onClick={(e) => handleEmojiClick(e,3)}/>
                    <img alt={"まぁまぁ"} src={hmm} onClick={(e) => handleEmojiClick(e,2)}/>
                    <img alt={"残念"} src={dissapointed} onClick={(e) => handleEmojiClick(e,1)}/>
                </EmojiRow>
                {getEmoji(this.props.chosenEmoji)}
            </EmojiHover>
        )
    }
}

const EmojiHover = styled(HoverIcon)`
    & > p:hover ~ .post-feed-response{
        animation-name: bounce;
        animation-duration: 300ms;
        animation-fill-mode: forwards;
    }

    & img {
        width:17px;
        height:17px;
    }
`

const EmojiRow = styled.div`
    background-color: white;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
    display: ${props => props.show ? "flex" : "none"};
    padding: 2px;
    border-radius: 18px;;
    align-items: center;
    position: absolute;
    top:-40px;
    left: -86px;
    animation-name: bounce;
    animation-duration: 300ms;
    animation-fill-mode: forwards;
    z-index:1;

    & > img {
        margin: 0px 5px !important;
        padding:5px;
        cursor: pointer;

        &:hover {
            animation-name: bounce;
            animation-duration: 300ms;
            animation-fill-mode: forwards;
            background-color: rgba(158, 175, 229, 0.3);
            border-radius: 100%;
        }
    }
`

export default Emoji