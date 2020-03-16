import React, { Component } from "react"
import styled from "styled-components"
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

// import star_pressed from "../../images/star-pressed.png";
// import star from "../../images/star.png";

import HoverIcon from "./HoverIcon"

class Star extends Component {

    render () {

        const { handleClick, shadow, show } = this.props

        return (
            <StarHover shadow={shadow}>
                <p onClick={handleClick}></p>
                {/* <img className="post-feed-star"　src={show ? star_pressed : star} alt={"星マーク"}/> */}
                { show 
                ? <StarIcon className="post-feed-star"/>
                : <StarBorderIcon className="post-feed-star"/>
                }
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

    & svg {
        width: 20px;
        height: 20px;
        color: ${props => props.theme.secondary};
    }

`

export default Star