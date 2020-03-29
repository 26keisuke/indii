import React from "react"
import PropType from "prop-types"
import { withRouter } from "react-router-dom"
import styled from "styled-components"

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Back = styled.div`
    background-color: #FAFAFA;
    position: absolute;
    z-index: 2;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    top: ${props => props.top ? props.top + "px" : "8px"};
    left: ${props => props.left ? props.left + "px" : "11px"};
`

const MobileBack = ({ top, left, handleClick, ...props }) => {
    return (
        <Back top={top} left={left}>
            <ArrowBackIcon onClick={!!handleClick ? handleClick : () => props.history.push("/")}/>
        </Back>
    )
}

MobileBack.propTypes = {
    top: PropType.number,
    left: PropType.number,
    handleClick: PropType.func,
}

export default withRouter(MobileBack)