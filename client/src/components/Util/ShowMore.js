import React, { Component } from "react"
import { IoIosMore } from "react-icons/io"
import styled, { css } from "styled-components"

import HoverIcon from "./HoverIcon"

const MoreBtn = styled(IoIosMore)`
    transform: scale(1.7);
    color: ${props => props.theme.primary};

    pointer-events: none;
`

const Action = styled.div`
    display: ${props => props.show ? "flex" : "none"};
    position: absolute;
    width:180px;
    background-color: white;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
    flex-direction: column; 
    left: ${props => props.left};
    bottom: ${props => props.bottom}; 
    border-radius: 5px;

    & p {
        padding: 12px 20px;
        border-bottom: 0.5px solid #eaeaea;
        cursor: pointer;

        &:hover {
            background-color: rgba(28,28,28,0.1);
        }

        &:first-child{
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
        }

        &:last-child {
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
            border-bottom: none;
        }
    }

`

const ShowBox = styled(HoverIcon)`
    & > p {
        top: -12px;
        left: -14px;

        ${props => props.hover && css`
            &:hover ~ ${MoreBtn}{
                animation-name: inflate;
                animation-duration: 300ms;
                animation-fill-mode: forwards;
            }  
        `}
    }

`

const ShowMore = React.forwardRef((props, ref) => (
    <ShowMoreWrapped innerRef={ref} {...props}/>
))

class ShowMoreWrapped extends Component {
    render () {

        const { innerRef, handleClick, show, left, bottom, action, actionName, shadow, hover } = this.props

        return (
            <ShowBox ref={innerRef} shadow={shadow} hover={hover}>
                <p onClick={handleClick}></p>
                <Action show={show} left={left} bottom={bottom}>
                    { action.map((elem, index) => 
                        <p key={elem} onClick={(e) => {e.preventDefault(); action[index]();}}>{actionName[index]}</p>
                    )
                    }
                </Action>
                <MoreBtn/>
            </ShowBox>
        )
    }
}

ShowMore.defaultProps = {
    shadow: true,
    hover: true,
}

export default ShowMore