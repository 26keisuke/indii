import React, { useEffect, Component, PureComponent } from "react"
import styled from "styled-components"
import { IoMdDocument } from "react-icons/io"
import StarIcon from '@material-ui/icons/Star';

import People from "../../People/People"

import account from "../../../images/account.png"

import { arrObjLookUp, fmtDate } from "../../Util/util"

class Element extends PureComponent {
    render() {

        const { star, author, index, lastEdited, tags, postName } = this.props

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
                            <div key={tag}># {tag}</div>
                        )}
                    </h3>
                    <h2>{postName}</h2>
                    <Bottom>
                        <Star>
                            <StarIcon/>
                            {star}
                        </Star>
                        <Date>
                            作成日:
                            <p>{fmtDate(lastEdited)}</p>
                        </Date>
                    </Bottom>
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

const Activity = ({ fetchTopic, posts, columns, order, activity }) => {

    useEffect(() => {
        !posts[1]?.creator?._id && fetchTopic();
    },[])

    const renderElement = () => {
        var arr = [];
        var post, column;

        for(var i=1; i < order.length; i++){
            column = arrObjLookUp(columns, "_id", order[i]);
            for(var j=0; j < column.posts.length; j++){
                post = arrObjLookUp(posts, "_id", column.posts[j]);
                if(post.index[0] === 0){ continue }
                arr.push(
                    <Element
                        key={post.lastEdited}
                        index={String(post.index.join("."))}
                        tags={post.tags}
                        topicName={post.topicName}
                        postName={post.postName}
                        author={post.creator}
                        lastEdited={post.lastEdited}
                        star={post.star.counter}
                    />
                )
            }
        }

        return arr;
    }

    const renderActivity = () => {
        if(!activity[0].user.userName) return null

        return activity.map(action => 
            <Action
                key={action.timeStamp}
                userName={action.user.userName}
                photo={action.user.photo}
                timeStamp={action.timeStamp}
                type={action.type}
                postName={action.postName}
            />
        )
    }

    const flag = !!posts

    return (
        <Wrapper>
            <Left>
                <div>ポスト一覧</div>
                { flag && renderElement() }
            </Left>
            <Right>
                <div>アクティビティー </div>
                { flag && renderActivity() }
            </Right>
        </Wrapper>
    )
}


const ActionBox = styled.div`
    display: flex;
    font-size: 10px;
    margin-bottom: 20px;

    @media only screen and (max-width: 670px) {
        font-size: 11px;
    }
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

        @media only screen and (max-width: 670px) {
            min-width: 40px;
        }

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
    @media only screen and (max-width: 670px) {
        flex-direction: column;
        padding: 0px;
    }
    display: flex;
    width: 100%;
    padding: 0px 30px;
    background-color: #f9f9f9;
`

const Left = styled.div`
    @media only screen and (max-width: 670px) {
        width: 100%;
        padding: 15px;
        margin-right: 30px;
        background: #FDFDFD;
        box-sizing: border-box;
        margin-bottom: 3px;
    }

    @media only screen and (min-width: 670px) {
        min-width: 600px;
        max-width: 600px;
    }

    padding: 25px;
    padding-right: 45px;
    margin-right: 20px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 1px;
    border-radius: 3px;

    & > div:nth-child(1){
        font-size: 14px;
        margin-bottom: 10px;
        margin-left: 3px;
    }
`

const Right = styled.div`

    @media only screen and (max-width: 670px) {
        width: 100%;
        background: #FDFDFD;
    }

    @media only screen and (min-width: 670px) {
        min-width: 290px;
        max-width: 290px;
    }

    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 1px;
    border-radius: 3px;
    padding: 20px;

    & > div:nth-child(1){
        font-size: 14px;
        margin-bottom: 10px;
    }
`

const Bottom = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    font-size: 11px;
    align-items: center;
`

const Star = styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;

    & > svg {
        width: 13px;
        height: 13px;
        margin-right:3px;
        color: ${props => props.theme.secondary};
    }
`

export default Activity