import React, {Component} from "react"
import { Link } from "react-router-dom"
import styled, {css} from "styled-components"

import home from "../../../images/home.png";
import home_pressed from "../../../images/home-pressed.png";
import draft from "../../../images/draft.png";
import draft_pressed from "../../../images/draft-pressed.png";
import action from "../../../images/post.png";
import action_pressed from "../../../images/post-pressed.png";
import notification from "../../../images/notification.png";
import notification_pressed from "../../../images/notification-pressed.png";
import setting from "../../../images/setting.png";
import setting_pressed from "../../../images/setting-pressed.png";

const images = {
    unpressed: {
        home: home,
        draft: draft,
        action: action,
        notification: notification,
        setting: setting,
    },
    pressed: {
        home: home_pressed,
        draft: draft_pressed,
        action: action_pressed,
        notification: notification_pressed,
        setting: setting_pressed,
    }
}

const variableName = ["home", "draft", "action", "notification", "setting"]
const screenName = ["ホーム", "下書き", "編集・作成", "通知", "設定"]


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
        border-right: 1px solid #d2d2d2;
        z-index:1;
    `};

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
        margin-right: 25px;
    }
    margin-top: 15px;
    margin-right: 0px;

    & > p {
        padding-left:15px;
        cursor: pointer;
        padding-top: 15px;
        padding-bottom: 15px;
        padding-right:50px;
        font-size: 12px;
    }

    &:img {
        cursor: pointer;
    }

    &:hover::before {
        display: block;
    }

    &::before {
        content: "";
        display: none;
        position: absolute;
        top:2px;
        left:-16px;
        background-color: #9EAEE5;
        opacity: 0.1;
        @media only screen and (max-width: 670px) {
            width: 40px;
            left: -10px;
        }
        width: 170px;
        height:40px;
        border-radius: 20px;
        z-index:-1;
    }
`

const ListImg = styled.img`
    width:20px;
    height:20px;
    padding-top: 12px;
    padding-bottom: 12px;
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
        props => props.selected && css`
            color: #B3B3C8;
        `
    }
`

class List extends Component {

    // tertinary expressionで書くと見にくくなる
    renderText = (index, selected) => {
        if(this.props.display === "header"){
            return null
        } else {
            return <TextSelected selected={!selected}>{screenName[index]}</TextSelected>
        }
    }

    renderList = () => {

        const cate = this.props.category;
        const nudgeProps = this.props.nudge

        const nudge = {
            home: nudgeProps.home === true,
            draft: nudgeProps.draft === true,
            action: nudgeProps.action === true,
            notification: nudgeProps.notification === true,
            setting: nudgeProps.setting === true,
        };

        const subject = variableName.map((name, index) => {
            var url = ""

            if (name !== "home") {
                url = "/" + name;
            } else {
                url = "/"
            }
            
            return (
                <ListElement key={name} to={url} onClick={() => this.props.handleClick(name)}>
                    <NudgeMark key={name} nudge={nudge[name]}/>
                    <ListImg 
                        src={cate[name] ? images.pressed[name] : images.unpressed[name]} 
                    />
                    {this.renderText(index, cate[name])}
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

export default List