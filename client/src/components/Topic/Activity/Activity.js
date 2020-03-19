import React, { Component, PureComponent } from "react"
import styled from "styled-components"
import { IoMdDocument } from "react-icons/io"
import { FaHashtag } from "react-icons/fa"

import People from "../../People/People"

import account from "../../../images/account.png"

import { arrObjLookUp, fmtDate } from "../../Util/util"

class Element extends PureComponent {
    render() {

        const { author, index, lastEdited, tags, postName } = this.props

        return (
            <Post>
                <div>
                    <div>
                        {index}
                    </div>
                    <div/>
                </div>
                <Content>
                    <h3>
                        { tags.map(tag => 
                            <div key={tag}><FaHashtag/> {tag}</div>

                        )}
                    </h3>
                    <h2>{postName}</h2>
                    <Date>
                        作成日:
                        <p>{fmtDate(lastEdited)}</p>
                    </Date>
                    <PeopleWrapper>
                        <People
                            id={author._id}
                            photo={author.photo || account}
                            name={author.userName} 
                            job={author.comment} 
                            intro={author.intro}
                            skeleton={!author._id}
                        />
                    </PeopleWrapper>
                </Content>
            </Post>
        )
    }
}

const renderTypeInfo = (type, userName, postName) => {
    switch(type){
        case "EDIT_POST":
            return `${userName}さんが${postName}を編集しました。`
        case "CREATE_POST":
            return `${userName}さんが${postName}を作成しました。`
        case "EDIT_TOPIC":
            return `${userName}さんがトピックを編集しました。`
        case "CREATE_TOPIC":
            return `${userName}さんがトピックを作成しました。`
        default:
            return ""
    }
}

const renderTypeIcon = (type) => {
    switch(type){
        default:
            return (
                <ActionLeft>
                    <div>
                        <IoMdDocument/>
                    </div>
                    <div/>
                </ActionLeft>
            )
    }
}

class Action extends Component {
    render() {

        const { userName, photo, postName, timeStamp, type } = this.props

        return (
            <ActionBox>
                <div>
                    {renderTypeIcon(type)}
                </div>
                <div>
                    <ActionUser>
                        <img src={photo} alt={"ユーザーの写真"}/>
                        <div>
                            <p>{renderTypeInfo(type, userName, postName)}</p>
                            <ActionDate>{fmtDate(timeStamp)}</ActionDate>
                        </div>
                    </ActionUser>
                </div>
            </ActionBox>
        )
    }
}

class Activity extends Component {


    renderElement = () => {
        const { posts, columns, order } = this.props

        var arr = [];
        var column;
        var post;

        for(var i=1; i < order.length; i++){
            column = arrObjLookUp(columns, "_id", order[i]);
            for(var j=0; j < column.posts.length; j++){
                post = arrObjLookUp(posts, "_id", column.posts[j]);
                if(post.index[0] === 0){ continue }
                arr.push(
                    <Element
                        index={String(post.index.join("."))}
                        tags={post.tags}
                        topicName={post.topicName}
                        postName={post.postName}
                        author={post.creator}
                        lastEdited={post.lastEdited}
                    />
                )
            }
        }

        return arr;
    }

    renderActivity = () => {
        const { activity } = this.props

        const arr = [];

        for(var i=0; i < activity.length; i++){
            arr.push(
                <Action
                    key={i + activity[i].timeStamp}
                    userName={activity[i].user.userName}
                    photo={activity[i].user.photo}
                    timeStamp={activity[i].timeStamp}
                    type={activity[i].type}
                    postName={activity[i].postName}
                />
            )
        }

        return arr;
    }

    render() {

        const flag = this.props.posts

        return (
            <Wrapper>
                <Left>
                    <div>
                        ポスト一覧
                    </div>
                    { flag && this.renderElement() }
                </Left>
                <Right>
                    <div>
                        アクティビティー 
                    </div>
                    { flag && this.renderActivity() }
                </Right>
            </Wrapper>
        )
    }
}


const ActionBox = styled.div`
    display: flex;
    font-size: 10px;
    margin-bottom: 20px;
`

const ActionUser = styled.div`
    display: flex;

    & > img {
        width: 30px;
        height: 30px;
        border-radius: 5px;
        object-fit: cover;
        margin-right: 10px;
    }
`

const ActionLeft = styled.div`
    display: flex;
    justify-content: center;
    min-width: 25px;
    font-size: 13px;
    margin-top: 12px;
    margin-right: 10px;
    flex-direction: column;
    align-items: center;
    height: 100%;

    & > div:nth-child(1) {
        min-width: 19px;
        min-height: 19px;
        max-width: 19px;
        max-height: 19px;
        border-radius: 50%;
        background-color: ${props => props.theme.secondary};
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 1px 1px 10px #b2b2b2;

        & > svg {
            color: white;
        }
    }

    & > div:nth-child(2) {
        min-height: 100%;
        width: 1px;
        background-color: #d2d2d2;
    }
`


const ActionDate = styled.div`
    margin-top: 5px;
`

const Date = styled.div`
    display: flex;
    margin-bottom: 10px;
    color: #555555;

    & > p {
        margin-left: 8px;
    }
`

const PeopleWrapper = styled.div`
    & div {
        box-shadow: none;
    }

    & > a {
        & > div {
            padding: 0px;
            &:hover{
                background-color: white !important;
            }
        }
    }
`

const Content = styled.div`
    width: 100%;
    
    & > h3 {
        font-size: 11px !important;
        color: #777777;
        display: flex;

        & > div {
            margin-right: 8px;
        }
    }

    & > h2 {
        font-size: 15px;
        margin: 5px 0px;
    }
`

const Post = styled.div`
    display: flex;
    margin: 15px 0px;

    & > div:nth-child(1) {
        display: flex;
        justify-content: center;
        min-width: 70px;
        font-size: 13px;
        margin-right: 10px;
        flex-direction: column;
        align-items: center;

        & > div:first-child {
            min-height: 30px;
            max-height: 30px;
            min-width: 30px;
            max-width: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            background-color: white;
            box-shadow: 1px 1px 10px #b2b2b2;
        }

        & > div:last-child {
            height: 100%;
            width: 1px;
            background-color: #d2d2d2;
        }
    }
`

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 0px 30px;
    background-color: #f9f9f9;
`

const Left = styled.div`
    padding: 25px;
    padding-right: 45px;
    min-width: 600px;
    max-width: 600px;
    margin-right: 20px;
    background-color: white;
    box-shadow: 1px 1px 10px #d2d2d2;
    border-radius: 3px;

    & > div:nth-child(1){
        font-size: 14px;
        margin-bottom: 10px;
        margin-left: 3px;
    }
`

const Right = styled.div`
    background-color: white;
    box-shadow: 1px 1px 10px #d2d2d2;
    border-radius: 3px;
    min-width: 290px;
    max-width: 290px;
    padding: 20px;

    & > div:nth-child(1){
        font-size: 14px;
        margin-bottom: 10px;
    }
`

export default Activity