import React, { Component } from "react"
import styled from "styled-components"

import star_pressed from "../../images/star-pressed.png";
import star from "../../images/star.png";

import HoverIcon from "./HoverIcon"

class Star extends Component {

    render () {

        const { handleClick, icon, shadow } = this.props

        return (
            <StarHover shadow={shadow}>
                <p onClick={handleClick}></p>
                <img className="post-feed-star"　src={!icon ? star : star_pressed} alt={"星マーク"}/>
            </StarHover>
        )   
    }
}

const StarHover = styled(HoverIcon)`
    & > p:hover ~ .post-feed-star{
        animation-name: bounce;
        animation-duration: 300ms;
        animation-fill-mode: forwards;
    }

    & img {
        width:17px;
        height:17px;
    }
`


export default Star