import React, {Component} from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import styled, {css} from "styled-components"

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

    renderText = (index, selected) => {
        const { display } = this.props
        return display === "header" ? null : <TextSelected selected={selected}>{screenName[index]}</TextSelected>
    }

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
                <ListElement key={name} to={url} onClick={(e) => this.props.handleClick(e, name)}>
                    {/* <SelectBar selected={cate[name].selected}/> */}
                    <NudgeMark key={name} nudge={nudge[name]}/>
                    {renderIcon(name, cate[name].selected)}
                    <Breakpoint name="desktop">
                        {this.renderText(index, cate[name].selected)}
                    </Breakpoint>
                </ListElement>
            )
        })

        return subject;
    }

    render() {
        return (
            <ListWrapper display={this.props.display}>
                {this.renderList()}
            </ListWrapper>
        )
    }
}

const ListWrapper = styled.div`

    ${props => props.display !== "header" && css`
        margin: 0px;
        padding-top:20px;
        padding-left:30px;
        width:168px;
        height:100%;
        top:56px;
        bottom:0px;
        position: fixed;
        box-shadow: 1px 1px 3px #eaeaea;
        z-index:1;
    `};

    @media (min-width: 670px) and (max-width: 1024px) {
        width: 54px !important;
    }

    display: ${props => props.display === "header" ? "none" : "flex"};
    flex-direction: ${props => props.display === "header" ? "row" : "column"};

    @media only screen and (max-width: 670px) {
        display: ${props => props.display === "header" ? "flex" : "none"};
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

    & > p {
        padding-left:15px;
        cursor: pointer;
        font-size: 11px;
    }

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
`

function mapStateToProps({ category }) {
    return{
        category,
    }
}


export default connect(mapStateToProps)(List)