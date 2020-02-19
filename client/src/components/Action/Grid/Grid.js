import React, { Component } from "react"
import styled from "styled-components"

import Card from "../Card/Card"
import Icon from "./Icon/Icon"

export const GridWrapper = styled.div`
    overflow: scroll;
    height: 100%;
    &::-webkit-scrollbar{ 
        width: 0px !important;
    }
`

const GridBox = styled.div`
    padding: 35px 100px;
    padding-right: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
`

const GridTitle = styled.p`
    font-size: 15px;
    color: #1C1C1C;
    margin-bottom: 10px;
    margin-left:20px;
    z-index:2;
`

const GridLabel = styled.div`

    position: relative;

    & > div {
        position: absolute;
        opacity: 0.1;
        left: -51px;
        background-color: ${props => props.theme.themeColor.lightBlue};
        z-index:1;
        border-top-right-radius: 100px;
        border-bottom-right-radius: 100px;
    }

    & > div:nth-child(1) {
        width: 150px;
        height: 38px;
        top:  -7px;
    }

    & > div:nth-child(2) {
        width: 125px;
        height: 32px;
        top: -22px;
    }
`

const GridTop = styled.div`

    margin-bottom: 50px;
    margin-left: 30px;

    & > div {
        padding-left: 120px;
    }

    & h1 {
        color: #333333;
        font-size: 16px;
        margin-bottom: 7px;
        margin-top: 7px;
    }

    & h2 {
        font-size: 12px;
        color: #333333;
        font-weight: normal;
    }
`

class Grid extends Component {
    render () {

        const {config} = this.props;

        return (
            <GridBox>
                    <GridTop>
                        {/* <IconWrapper> */}
                            <Icon/>
                        {/* </IconWrapper> */}
                        <div>
                            <h1>{config.header}</h1>
                            <h2>{config.headerContent}</h2>
                        </div>
                    </GridTop>
                    {/* <GridLabel>
                        <div/>
                        <div/>
                    </GridLabel> */}
                    <GridTitle>{config.screenName[0]}</GridTitle>
                    <Card
                        category={config.category[0]}
                        actionList={config.actionList[0]}
                        title={config.title[0]}
                        description={config.description[0]}
                        img={config.img[0]}
                        color={config.color[0]}
                    />
                    {/* <GridLabel>
                        <div/>
                        <div/>
                    </GridLabel> */}
                    <GridTitle>{config.screenName[1]}</GridTitle>
                    <Card
                        category={config.category[1]}
                        actionList={config.actionList[1]}
                        title={config.title[1]}
                        description={config.description[1]}
                        img={config.img[1]}
                        color={config.color[1]}
                    />
            </GridBox>
        )
    }
}

export default Grid