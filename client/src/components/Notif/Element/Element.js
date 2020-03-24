import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import Skeleton from "react-loading-skeleton"
import axios from "axios";

import { getEmoji, fmtDate } from "../../Util/util"

import account from "../../../images/account.png"

const renderUrl = (notif, type) => {
    var url;

    switch(type){
        case "POST_LIKE":
        case "POST_EMOJI":
            url = `/post/${notif.post}`
            return url
        case "FOLLOWED":
            url = `/profile/${notif.user._id}`
            return url
        case "POST_EDIT_FEEDBACK":
        case "POST_EDIT_OK":
        case "POST_EDIT":
            url = `/notification/check/${notif._id}`
            return url
        default:
            return "/"
    }
}

const renderAction = (notif, type) => {
    switch(type){
        case "POST_LIKE":
            return <ActionWrapper><Link to={`/post/${notif.post}`}>あなたのポスト</Link>をお気に入りに登録しました。</ActionWrapper>
        case "POST_EMOJI":
            return <ActionWrapper><Link to={`/post/${notif.post}`}>あなたのポスト</Link>に<EmojiWrapper>{getEmoji(parseInt(notif.emoji))}</EmojiWrapper>しました。</ActionWrapper>
        case "FOLLOWED":
            return <ActionWrapper>あなたをフォローしました。</ActionWrapper>
        case "POST_EDIT":
            return <ActionWrapper><Link to={`/post/${notif.post}`}>あなたのポスト</Link>に編集リクエストしました。</ActionWrapper>
        case "POST_EDIT_OK":
            return <ActionWrapper><Link to={`/post/${notif.post}`}>あなたのポスト</Link>を編集しました。</ActionWrapper>
        case "POST_EDIT_FEEDBACK":
            return <ActionWrapper>あなたの編集リクエストを{notif.isApproved ? "承認" : "拒否"}しました。</ActionWrapper>
        default:
            return ""
    }
}

class Element extends Component {

    handleClick = () => {
        if(!this.props.notif.checked){
            axios.post(`/api/notif/${this.props.notif._id}`)
        }   
    }

    handleFeedback = () => {

    }

    render() {

        const { user, timeStamp, type, checked } = this.props.notif

        return(
            <Link to={renderUrl(this.props.notif, type)} onClick={this.handleClick}>
                <Box>
                    { user.photo && !checked && <Check/> }
                    <Profile>
                        <Link to={`/profile/${user._id}`}>
                            { user.photo
                            ?
                            <Person src={user.photo || account} alt={"行動を起こした人のプロフィール写真"}/>
                            :
                            <SkeletonWrapper><Skeleton width={48} height={48}/></SkeletonWrapper>
                            }
                            
                        </Link>
                        <div>
                            
                            { user.photo
                            ?
                            <Name><Link to={`/profile/${user._id}`}>{user.userName}</Link>さんが、{renderAction(this.props.notif, type)}</Name>
                            :
                            <Name><Skeleton width={320} height={20}/></Name>
                            }

                            { user.photo
                            ?
                            <Date>{fmtDate(timeStamp)}</Date>
                            :
                            <Date><Skeleton width={80} height={17}/></Date>
                            }
                                
                        </div>
                    </Profile>
                </Box>
            </Link>
        )
    }
}

const Date = styled.div`
    color: #747474;
    font-size: 12px;
`

const Name = styled.div`
    margin-bottom: 5px;
    display: flex;
    cursor: pointer;

    & > span {
        font-weight: bold;
    }

    & > a {
        border-bottom: 1px dotted #000000;
        height: 16px;
    }
`

const Profile = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`


const Check = styled.div`
    position: absolute;
    width:10px;
    height:10px;
    background-color: #9EAEE5;
    border-radius: 100%;
    left:30px;
    top:35px;
`

const Box = styled.div`
    height: 50px;
    position: relative;
    padding: 15px 70px;
    border-bottom: 1px solid #eaeaea;
    background-color: #ffffff;
    cursor: pointer;

    &:hover{
        background-color: rgba(233, 233, 238, 0.25);
    }
`

const Person = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 5px;
    object-fit: cover;
    flex-shrink: 0;
    margin-right: 10px;
    cursor: pointer;
`

const SkeletonWrapper = styled.div`
    margin-right: 10px;
`

const ActionWrapper = styled.div`
    display: flex;
    & > a {
        border-bottom: 1px dotted #000000;
        height: 16px;
    }
`

const EmojiWrapper = styled.div`
    & > img {
        width:17px;
        height:17px;
        margin: 0px 8px;
    }
`

export default Element;