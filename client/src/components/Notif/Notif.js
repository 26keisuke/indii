import React, { Component } from "react";
import styled from "styled-components"
import { connect } from "react-redux"

import * as actions from "../../actions"

import Element from "./Element/Element"
// import Filter from "./Filter/Filter";

import Screen from "../Util/Screen"
import { Border } from "../Theme"

const Title = styled.p`
    font-size:16px;
    color: #434343;
`

// const RightInsideTitle = styled.div`
//     height:35px;
//     padding-left:30px;
//     border: 1px solid #eaeaea;
//     font-size: 16px;
//     display: flex;
//     align-items: center;
// `

class Notif extends Component {
    
    componentDidMount(){
        this.props.fetchNotif()
    }

    renderTopContent() {
        return(
            <Title>通知</Title>
        )
    }

    renderLeftContent() {
        return(
            <div>
                <Border bottom={true}/>
                { this.props.auth.info.notif.map(notif => (
                    <Element 
                        notif={notif}
                    />
                ))
                }
            </div>
        )
    }

    renderRightContent() {
        return(
            <div>
                {/* <RightInsideTitle>
                    <p>検索フィルター</p>
                </RightInsideTitle>
                <Filter/> */}
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

function mapStateToProps({ update, auth }){
    return {
        update,
        auth
    }
}

export default connect(mapStateToProps, actions)(Notif);