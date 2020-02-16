import React, { Component } from "react"
import { IoIosMore } from "react-icons/io"
import styled, {css} from "styled-components"

const MoreBtn = styled(IoIosMore)`
    transform: scale(1.7);
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
        border-bottom: 0.5px solid #d2d2d2;
        cursor: pointer;

        &:hover {
            background-color: rgba(28,28,28,0.1);
        }

        &:last-child {
            border-bottom: none;
        }
    }
`

const ShowBox = styled.div`
    position: relative;

    & > p {
        width:40px;
        height:40px;
        position: absolute;
        top: -12px;
        left: -14px;
        cursor: pointer;

        &:hover::before {
            display: block;
        }

        ${props => props.shadow ? css`
            &::before {
                content: "";
                position: absolute;
                display: none;
                width:40px;
                height:40px;
                background-color: #9EAEE5;
                opacity: 0.1;
                border-radius: 100%;
            }
        `
        : css``}
    }

    & p:hover ~ ${MoreBtn}{
        animation-name: inflate;
        animation-duration: 300ms;
        animation-fill-mode: forwards;
    }
`

const ShowMore = React.forwardRef((props, ref) => (
    <ShowMoreWrapped innerRef={ref} {...props}/>
))

class ShowMoreWrapped extends Component {
    render () {

        const { innerRef, handleClick, show, left, bottom, action, actionName, shadow } = this.props

        return (
            <ShowBox ref={innerRef} shadow={shadow}>
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
}

export default ShowMore