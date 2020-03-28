import React from "react"
import styled, { css, keyframes } from "styled-components"
import PropTypes from "prop-types"

const Toggle = ({ selected, handleClick }) => {
    return (
        <TopicToggle>
            <TopicToggleElement selected={selected["topic"]} onClick={() => handleClick("topic")}>
                <p>トピック</p>
                <div/>
            </TopicToggleElement>
            {/* <TopicToggleElement selected={selected["talk"]} onClick={() => handleClick("talk")}>
                <p>フリートーク</p>
                <div/>
            </TopicToggleElement> */}
            <TopicToggleElement selected={selected["activity"]} onClick={() => handleClick("activity")}> 
                <p>アクティビティー </p>
                <div/>
            </TopicToggleElement>
        </TopicToggle>
    )
}


const TopicToggle = styled.div`
    display: flex;
    position: absolute;
    bottom:-45px;
`


const TopicToggleElement = styled.div`
    padding: 10px;
    padding-bottom: 0px;
    margin-right:70px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    flex-shrink: 0;
    align-items: center;
    position: relative;

    & > p {
        color: ${props => props.selected ? "#000000" : "#8D8D8D"}
    }

    & > div {
        ${props => props.selected && css`
            background-color: #636480;
            width:100%;
            height:1px;
            animation-name: ${extend};
            animation-duration: 250ms;
            animation-timing-function: ease-in-out;
        `}
    }
`

const extend = keyframes`
    from {
        width: 0px;
    } to {
        width: 80%;
    }
`

Toggle.prototype = {
    selected: PropTypes.object,
    handleClick: PropTypes.func,
}

export default Toggle