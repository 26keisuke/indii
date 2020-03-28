import React from "react"
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
    top: 8px;
    left: 11px;
`

const MobileBack = (props) => {
    return (
        <Back>
            <ArrowBackIcon onClick={() => props.history.push("/")}/>
        </Back>
    )
}

export default withRouter(MobileBack)