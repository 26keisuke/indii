import React, { Component } from "react"
import styled from "styled-components"

import link from "../../../../images/link.png"
import pc from "../../../../images/pc.png"
import database from "../../../../images/database.png"

const IconBox = styled.div`
    position: relative;

    & > img {
        position: absolute;
    }

    & > div {
        width: 100px;
        height: 50px;
        position: absolute;
        top: 29px;
        border-radius: 50%;
        left: -22px;
        z-index: -3;
        background-color: #f6f7fc;
    }

    & > img:nth-child(1) {
        width: 70px;
        z-index: -1;
        left: 0px;
    }

    & > img:nth-child(2) {
        width: 45px;
        left: -15px;
        top: 30px;
        z-index: 0;
    }

    & > img:nth-child(3) {
        width: 35px;
        top: 7px;
        left: -8px;
        z-index: -2;
    }
`


class Icon extends Component {
    render() {
        return (
            <IconBox>
                <img src={pc}/>
                <img src={link}/>
                <img src={database}/>
                <div/>
            </IconBox>
        )
    }
}

export default Icon