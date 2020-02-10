import React, { Component } from "react"
import styled from "styled-components"

import Card from "../Card/Card"

export const GridWrapper = styled.div`
    overflow: scroll;
    height: 100%;
    &::-webkit-scrollbar{ 
        width: 0px !important;
    }
`

const GridBox = styled.div`
    padding: 35px 50px;
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

class Grid extends Component {
    render () {

        const {config} = this.props;

        return (
            <GridBox>
                    <GridLabel>
                        <div/>
                        <div/>
                    </GridLabel>
                    <GridTitle>{config.screenName[0]}</GridTitle>
                    <Card
                        category={config.category[0]}
                        actionList={config.actionList[0]}
                        title={config.title[0]}
                        description={config.description[0]}
                        img={config.img[0]}
                        color={config.color[0]}
                    />
                    <GridLabel>
                        <div/>
                        <div/>
                    </GridLabel>
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