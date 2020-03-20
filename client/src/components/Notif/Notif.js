import React, { Component } from "react";
import styled from "styled-components"
import { connect } from "react-redux"
import { Helmet } from "react-helmet"

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
                
                { this.props.auth.info.notif.map((notif,index) => {
                    if(index === 0){
                        return ([
                            <Border key={"borderTopNotif"} bottom={true}/>,
                            <Element 
                                key={index+notif.timeStamp}
                                notif={notif}
                            />
                        ])
                    }
                    return (
                        <Element 
                            key={index+notif.timeStamp}
                            notif={notif}
                        />
                    )
                })
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
            <div>
                <Helmet>
                    <title>通知一覧 | Indii</title>
                    <meta name="description" content="あなたへの通知一覧です。フォロワーからのリスポンスや編集リクエストを確認することができます。"/>
                    <meta name="keywords" content="通知,編集リクエスト,フォロワー"/>
                </Helmet>
                <Screen>
                    {this.renderTopContent()} 
                    {this.renderLeftContent()} 
                    {this.renderRightContent()}
                </Screen>
            </div>
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