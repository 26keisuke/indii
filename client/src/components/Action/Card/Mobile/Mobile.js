import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { AiOutlinePlus } from "react-icons/ai"

import * as actions from "../../../../actions"

import { Hexagon } from "../Card"
import Question from "../../../Util/Question"

import { checkAuth } from "../../../Util/util"

const MobileHexagon = styled(Hexagon)`
    margin-left: 0px;
`

const Box = styled.div`
    position: relative;
`

const Card = styled(Link)`
    background-color: #F0F0F0;
    position: relative;
    display: flex;
    align-items: center;
    margin: 15px 0px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
`

const Image = styled.img`
    width: 30px;
    height: 30px;
    top: 44px;
    left: 36px;
    position: absolute;
`

const Plus = styled(AiOutlinePlus)`
    position: absolute;
    font-size: 21px;
    right: 35px;
`

const Title = styled.h3`
    font-size: 14px;
    margin-left: -5px;
`

const Mobile = ({ loggedIn, category, actionList, title, description, img, ...props }) => {
    return (
        <div>
            {
            actionList.map((action, index) => 
                <Box>
                    <Card to={"/action/" + category + "/" + action} onClick={(e) => checkAuth(e, props, loggedIn)}>
                        <MobileHexagon>
                            <div/>
                            <div/>
                            <div/>
                        </MobileHexagon>
                        <Image src={img[index]} alt="各Action項目を識別する画像"/>
                        <Title>{title[index]}</Title>
                        <Plus/>
                    </Card>
                    <Question top={10} right={10} title={title[index]} content={description[index]}/>
                </Box>
            )
            }
        </div>
    )
}

function mapStateToProps({ auth }){
    return {
        loggedIn: auth.loggedIn
    }
}

export default connect(mapStateToProps, actions)(Mobile)