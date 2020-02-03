import React, {Component} from "react"
import { Link } from "react-router-dom"
import styled, {css} from "styled-components"

import classnames from "classnames"

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

import "./List.css"

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

class List extends Component {

    constructor(props) {
        super(props)
    }

    // tertinary expressionで書くと見にくくなる
    renderText = (index, textClass) => {
        if(this.props.display === "header"){
            return null
        } else {
            return <p className={textClass}>{screenName[index]}</p>
        }
    }

    renderList = () => {

        const cate = this.props.category;
        const nudgeProps = this.props.nudge

        const nudge = {
            home: classnames({"checked": nudgeProps.home === true}),
            draft: classnames({"checked": nudgeProps.draft === true}),
            action: classnames({"checked": nudgeProps.action === true}),
            notification: classnames({"checked": nudgeProps.notification === true}),
            setting: classnames({"checked": nudgeProps.setting === true}),
        };

        const subject = variableName.map((name, index) => {
            const textClass = classnames({"unselected": !cate[name]})

            if (name != "home") {
                var url = "/" + name;
            } else {
                var url = "/"
            }
            
            return (
                <ListElement to={url} className="side-bar-row" onClick={() => this.props.handleClick(name)}>
                    <div className={nudge[name]}></div>
                    <ListImg src={cate[name] ? images.pressed[name] : images.unpressed[name]} className="side-bar-img"/>
                    {this.renderText(index, textClass)}
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