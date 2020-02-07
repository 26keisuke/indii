import React, { Component } from "react";
import styled from "styled-components"

import Element from "./Element/Element"
import Filter from "./Filter/Filter";

import Screen from "../Util/Screen"
import { Border } from "../Theme"

const Title = styled.p`
    font-size:16px;
    color: #434343;
`

const RightInsideTitle = styled.div`
    height:35px;
    padding-left:30px;
    border: 1px solid #d2d2d2;
    font-size: 16px;
    display: flex;
    align-items: center;
`

class Notif extends Component {

    renderTopContent() {
        return(
            <Title>通知</Title>
        )
    }

    renderLeftContent() {
        return(
            <div>
                <Border bottom={true}/>
                <Element 
                    id={"123123"}
                    name={"飯塚啓介"}
                    date={"May 25, 2018 6:34 PM"}
                    action={"EDIT_REQUEST"}
                />
            </div>
        )
    }

    renderRightContent() {
        return(
            <div>
                <RightInsideTitle>
                    <p>検索フィルター</p>
                </RightInsideTitle>
                <Filter/>
            </div>
        )
    }

    render() {
        return(
            <Screen>
                {this.renderTopContent()} 
                {this.renderLeftContent()} 
                {this.renderRightContent()}
            </Screen>
        )
    }
}

export default Notif;