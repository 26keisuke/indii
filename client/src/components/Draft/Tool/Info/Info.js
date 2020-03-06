import React, {Component} from "react"
import styled from "styled-components"
import Section from "../../../Action/Element/Section"
import Edit from "../../../Notif/Confirm/Edit/Edit"
import People from "../../../People/People"
import account from "../../../../images/account.png"
import { Space } from "../../../Theme"

class Info extends Component {

    getDate = (dt) => {
        const date = new Date(dt)
        return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
    }

    render () {

        var id, photo, userName, comment, intro;
        var editId, editPhoto, editUserName, editComment, editIntro;

        if(this.props.value["author"]){
            id =  this.props.value["author"]._id
            photo =  this.props.value["author"].photo
            userName =  this.props.value["author"].userName
            comment =  this.props.value["author"].comment
            intro =  this.props.value["author"].intro
        }

        if(this.props.value["lastEditedAuthor"]){
            editId =  this.props.value["lastEditedAuthor"]._id
            editPhoto =  this.props.value["lastEditedAuthor"].photo
            editUserName =  this.props.value["lastEditedAuthor"].userName
            editComment =  this.props.value["lastEditedAuthor"].comment
            editIntro =  this.props.value["lastEditedAuthor"].intro
        }

        return (
            <Wrapper>
                <div>
                    { this.props.edit &&
                    <RevertBtn onClick={this.props.revertClick}>最初の状態に戻す</RevertBtn>
                    }
                    <Section
                        title={"ポスト名"} 
                        edit={this.props.edit}
                        content={this.props.value["postName"]}
                        handleChange={this.props.handleChange}
                        handleBlur={this.props.handleBlur}
                        handleFocus={this.props.handleFocus}
                        handleSubmit={this.props.handleSubmit}
                        focus={this.props.focus}
                        width={275}
                    />
                </div>
                <Section
                    title={"トピック名"} 
                    content={this.props.value["topicName"]}
                    width={275}
                />
                <Section
                    title={"オーナー"} 
                    hideContent={true}
                />
                <Space height={"20px"}/>
                <People
                    id={id}
                    photo={photo || account}
                    name={userName} 
                    job={comment} 
                    intro={intro}
                    skeleton={!this.props.value["author"]}
                />
                <Space height={"30px"}/>
                <Section
                    title={"作成日"} 
                    content={this.getDate(this.props.value["creationDate"])}
                    width={275}
                />
                { this.props.value["lastEdited"] && 
                ([
                <Section
                    key={"title"}
                    title={"前回の編集者"} 
                    hideContent={true}
                />,
                <Space key={"spaceTop"} height={"20px"}/>,
                <Edit
                    key={"edit"}
                    date={this.props.value["lastEdited"]}
                    photo={editPhoto || account}
                    userName={editUserName}
                    comment={editComment}
                    followBtn={true}
                    id={editId}
                />,
                <Space key={"spaceBottom"} height={"30px"}/>
                ])
                }
            </Wrapper>
        )
    }
}

const RevertBtn = styled.p`
    position: absolute;
    right: 0px;
    text-decoration: underline;
    color: #747474;
    cursor: pointer;
    font-size: 10px;
    z-index: 1;
`

const Wrapper = styled.div`
    padding: 10px;

    & > div{
        position: relative;
    }
`




export default Info