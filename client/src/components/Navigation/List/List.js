import React, {Component} from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import styled, {css} from "styled-components"

import * as actions from "../../../actions"

import Breakpoint from "../../Breakpoint"

import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import ForumTwoToneIcon from '@material-ui/icons/ForumTwoTone';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import NoteAddTwoToneIcon from '@material-ui/icons/NoteAddTwoTone';
import NotificationsNoneTwoToneIcon from '@material-ui/icons/NotificationsNoneTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';

const renderIcon = (name, selected) => {

    const pressed = selected ? "primary" : "disabled"

    switch(name){
        case "home":
            return <HomeTwoToneIcon color={pressed} fontSize="large"/>
        case "draft":
            return <CreateTwoToneIcon color={pressed} fontSize="large"/>
        case "talk":
            return <ForumTwoToneIcon color={pressed} fontSize="large"/>
        case "action":
            return <NoteAddTwoToneIcon color={pressed} fontSize="large"/>
        case "notification":
            return <NotificationsNoneTwoToneIcon color={pressed} fontSize="large"/>
        case "setting":
            return <SettingsTwoToneIcon color={pressed} fontSize="large"/>
        default:
            return ""

    }
}

const variableName = ["home", "draft", "talk", "action", "notification", "setting"]
const screenName = ["ホーム", "下書き", "トーク", "編集・作成", "通知", "設定"]

class List extends Component {

    renderList = () => {

        const cate = this.props.category;

        const nudge = {
            home: cate.home.nudge === true,
            draft: cate.draft.nudge === true,
            talk: cate.talk.nudge === true,
            action: cate.action.nudge === true,
            notification: cate.notification.nudge === true,
            setting: cate.setting.nudge === true,
        };

        const subject = variableName.map((name, index) => {
            var url = ""

            name !== "home" ? (url = "/" + name) : (url = "/")

            return (
                <ListElement key={name} to={url} onClick={(e) => this.props.handleClick(e, name, this.props)}>
                    <NudgeMark nudge={nudge[name]}/>
                    {renderIcon(name, cate[name].selected)}
                    <Breakpoint name="desktop">
                        <TextSelected selected={cate[name].selected}>{screenName[index]}</TextSelected>
                    </Breakpoint>
                    <Breakpoint name="mobile">
                        <TextSelected selected={cate[name].selected}>{screenName[index]}</TextSelected>
                    </Breakpoint>
                </ListElement>
            )
        })

        return subject;
    }

    render() {
        return (
            <ListWrapper>
                {this.renderList()}
            </ListWrapper>
        )
    }
}

const ListWrapper = styled.div`

    @media (min-width: 670px) {
        margin: 0px;
        padding-top:20px;
        padding-left:30px;
        width:168px;
        height:100%;
        top:56px;
        bottom:0px;
        position: fixed;
        border-right: 1px solid #eaeaea;
        z-index:1;
    }

    @media (min-width: 670px) and (max-width: 1024px) {
        width: 54px !important;
    }

    display: flex;;
    flex-direction: column;

    @media only screen and (max-width: 670px) {
        position: fixed;
        flex-direction: row;
        background-color: #F8F8F8;
        z-index: 2;
        border-top: 1px solid #eaeaea;
        bottom: 0;
        width: 100%;
        justify-content: space-evenly;
        padding-top: 3px;
        padding-bottom: 19px;
        padding-left: 8px;

        & > a:last-child {
            display: none;
        }
    }

`

const ListElement = styled(Link)`
    display: flex;
    flex-direction: row;
    position: relative;

    @media only screen and (max-width: 670px) {
        margin-top: 0px;
        margin-right: 20px;
    }

    margin-top: 15px;
    margin-right: 0px;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 8px;

    &:img {
        cursor: pointer;
    }

    @media only screen and (min-width: 1024px) {

        &:hover::before {
            display: block;
        }

        &::before {
            content: "";
            display: none;
            position: absolute;
            left: -30px;
            top: 0px;
            background-color: rgba(14, 18, 34, 0.1);
            width: 187px;
            height: 45px;
            border-top-right-radius: 22px;
            border-bottom-right-radius: 22px;
        }

    }
`

const NudgeMark = styled.div`
    ${ 
        props => props.nudge && css`
        background-color: #9EAEE5;
        width: 6px;
        height: 6px;
        position: absolute;
        left: 19px;
        top:7px;
        border-radius: 4px;
    `}
`

const TextSelected = styled.p`
    ${
        props => !props.selected && css`
            color: #888888;
        `
    }
    padding-left:15px;
    cursor: pointer;
    font-size: 11px;

    @media only screen and (max-width: 670px) {
        font-size: 10px;
        left:22%;
        position: absolute;
        bottom: -8px;
        white-space: nowrap;
        transform: translate(-50%, 0);
    }
`

function mapStateToProps({ auth, category }) {
    return{
        auth,
        category,
    }
}


export default connect(mapStateToProps, actions)(List)