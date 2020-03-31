import React from "react"
import styled from "styled-components"

import Card from "../Card/Card"
import MobileCard from "../Card/Mobile/Mobile"
import Icon from "./Icon/Icon"
import Breakpoint from "../../Breakpoint"
import Header from "../../Header/Header"

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

const GridTitle = styled.h2`
    font-size: 15px;
    color: #1C1C1C;
    margin-bottom: 10px;
    margin-left:20px;
    z-index:2;
`

const MobileBox = styled.div`
    padding: 75px 16px;
`

const MobileTitle = styled.h2`
    font-size: 15px;
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

const Grid = ({config}) => {

    return ([
        <Breakpoint name="dablet">
            <GridBox>
                    <GridTop>
                        <Icon/>
                        <div>
                            <h1>{config.header}</h1>
                            <h2>{config.headerContent}</h2>
                        </div>
                    </GridTop>
                    { 
                    config.screenName.map((_,index) =>
                        ([
                            <GridTitle key={config.screenName[index]}>{config.screenName[index]}</GridTitle>,
                            <Card
                                key={"actionCard" + index}
                                category={config.category[index]}
                                actionList={config.actionList[index]}
                                title={config.title[index]}
                                description={config.description[index]}
                                img={config.img[index]}
                            />
                        ])
                    )
                    }
            </GridBox>
        </Breakpoint>,
        <Breakpoint name="mobile">
            <Header/>
            <MobileBox>
                {
                config.screenName.map((_,index) =>
                    ([
                        <MobileTitle key={"mobile" + config.screenName[index]}>{config.screenName[index]}</MobileTitle>,
                        <MobileCard
                            key={"mobileActionCard" + index}
                            category={config.category[index]}
                            actionList={config.actionList[index]}
                            title={config.title[index]}
                            description={config.description[index]}
                            img={config.img[index]}
                        />
                    ])
                )
                }
            </MobileBox>
        </Breakpoint>
    ])
}

export default Grid