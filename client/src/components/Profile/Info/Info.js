import React, { Component } from "react"
import { FaPen, FaImage } from "react-icons/fa"
import styled, { css, keyframes } from "styled-components"
import Skeleton from "react-loading-skeleton"
import { connect } from "react-redux"

import * as actions from "../../../actions"

import account from "../../../images/account.png"

import PeopleFollow from "../../People/FollowBtn/FollowBtn"

class ProfileTop extends Component {

    state = {
        userName: "",
        comment: "",
        intro: "",
    }

    componentDidUpdate(prevProps) {
        if(prevProps.profile.user.userName !== this.props.profile.user.userName) {
            this.setState({
                userName: this.props.profile.user.userName,
            })
        }

        if(prevProps.profile.user.comment !== this.props.profile.user.comment) {
            this.setState({
                comment: this.props.profile.user.comment,
            })
        }

        if(prevProps.profile.user.intro !== this.props.profile.user.intro) {
            this.setState({
                intro: this.props.profile.user.intro,
            })
        }
    }

    handleChange = (e, target) => {
        this.setState({
            [target]: e.target.value,
        })
    }

    toggleElement = (target) => {
        if(this.props.toggle[target] === true){
            return true
        }
        return false
    }

    handleImageClick = () => {
        this.setState({
            editName: false, 
            editComment: false, 
        })
        const id = this.props.auth.info._id;
        const action = "SELF_IMAGE";
        const title = "メイン画像の変更";
        const message = "メイン画像を変更します";
        const buttonMessage = "変更する";
        this.props.showConfirmation(id, action, title, "", message, buttonMessage, "");
        this.props.enableGray();
    }

    handleEditClick = () => {
        const id = this.props.auth.info._id;
        const action = "SELF_EDIT";
        const title = "プロフィールの編集";
        const message = "プロフィールを編集します";
        const buttonMessage = "変更する";
        const value = {intro: this.props.auth.info.intro, userName: this.props.auth.info.userName, comment: this.props.auth.info.comment}
        this.props.showConfirmation(id, action, title, "", message, buttonMessage, "", value);
        this.props.enableGray();
    }

    render() {

        const { skeleton, profile, setElement, isThisUser } = this.props
        const { editName, editComment } = this.state

        return (
            <Wrapper>
                <Top>
                    <TopLeft>
                        <AnimationWrapper>
                            <Name edit={editName}>
                                { skeleton 
                                ? <Skeleton width={100} height={22}/> 
                                : profile.user.userName
                                }
                                { isThisUser && 
                                <Pen 
                                    marginLeft={20} 
                                    top={3} 
                                    onClick={this.handleEditClick}
                                /> 
                                }
                            </Name>  
                        </AnimationWrapper>
                        <AnimationWrapper>
                            <Comment edit={editComment}>
                                { skeleton 
                                ? <Skeleton width={220} height={18}/> 
                                : profile.user.comment
                                }
                            </Comment>
                        </AnimationWrapper>
                        <AnimationWrapper>
                            <Intro>
                                { skeleton 
                                ? <SkeletonWrapper>
                                    <Skeleton count={3} width={425} height={17}/>
                                </SkeletonWrapper> 
                                : profile.user.intro
                                }
                            </Intro>
                        </AnimationWrapper>
                    </TopLeft>
                    <TopRightWrapper>
                        {skeleton 
                        ? <Skeleton width={110} height={110}/> 
                        : <TopRight src={profile.user.photo || account}/>
                        }
                        { isThisUser && 
                        <Image onClick={this.handleImageClick}>
                            <FaImage/>
                            <p>写真を変更する</p>
                        </Image> 
                        }
                    </TopRightWrapper>
                </Top>
                <Bottom>
                    <BottomLeft>
                        <Record>
                            <Stats>
                                <p>{ skeleton ? <Skeleton width={28} height={28}/> : profile.user.post.length}</p>
                                <p>ポスト数</p>
                            </Stats>
                            <Stats> 
                                <p>{ skeleton ? <Skeleton width={28} height={28}/> : profile.user.editPost.length}</p>
                                <p>編集回数</p>
                            </Stats>
                            <Stats> 
                                <p>{ skeleton ? <Skeleton width={28} height={28}/> : profile.user.follows.length}</p>
                                <p>フォロー</p>
                            </Stats>
                            <Stats>
                                <p>{ skeleton ? <Skeleton width={28} height={28}/> : profile.user.followers.length}</p>
                                <p>フォロワー</p>
                            </Stats>
                        </Record>
                    </BottomLeft>
                    <BottomRight>
                        <BtnWrapper>
                            <PeopleFollow id={profile.user._id} show={!skeleton && !isThisUser}/>
                        </BtnWrapper>
                    </BottomRight>
                    <ToggleBox>
                        <Toggle selected={this.toggleElement("owner")} onClick={() => setElement("owner")}>
                            <p>オーナー</p>
                            <div/>
                        </Toggle>
                        <Toggle selected={this.toggleElement("favoriteTopic")} onClick={() => setElement("favoriteTopic")}>
                            <p>お気に入りのトピック</p>
                            <div/>
                        </Toggle>
                        <Toggle selected={this.toggleElement("favoritePost")} onClick={() => setElement("favoritePost")}>
                            <p>お気に入りのポスト</p>
                            <div/>
                        </Toggle>
                        <Toggle selected={this.toggleElement("follows")} onClick={() => setElement("follows")}>
                            <p>フォロー</p>
                            <div/>
                        </Toggle>
                        <Toggle selected={this.toggleElement("followers")} onClick={() => setElement("followers")}>
                            <p>フォロワー</p>
                            <div/>
                        </Toggle>
                    </ToggleBox>
                </Bottom>
            </Wrapper>
        )
    }
}

const AnimationWrapper = styled.div`
    position: relative;
     width: 100%;
`

const Pen = styled(FaPen)`
    position: absolute;
    z-index: 1;
    margin-left: ${props => String(props.marginLeft) + "px"};;
    right: ${props => String(props.right) + "px"};
    top: ${props => String(props.top) + "px"};
    bottom: ${props => String(props.bottom) + "px"};
    width: 11px;
    color: #444444;
    cursor: pointer;
`

const Image = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 0px;
    left: 9px;
    cursor: pointer;

    & > svg {
        margin-right: 5px;
        color: #444444;
    }

    & > p {
        font-size: 10px;
        color: #444444;
    }
`

const Wrapper = styled.div`
    width: 100%;
    padding-bottom: 25px;
    border-bottom: 0.5px solid #eaeaea;
`

const Top = styled.div`
    width: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 30px;
    padding-bottom: 0px;
    height: 140px;
`

const TopLeft = styled.div`
    width: 425px;
    margin-right: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TopRightWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`

const TopRight = styled.img`
    width: 110px;
    height: 110px;
    object-fit: cover;
    border-radius: 1px;
    margin-right: 25px;
`

const Bottom = styled.div`
    background-color: #ffffff;
    height: 90px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
`

const BottomLeft = styled.div`
    width: 425px;
    margin-left: 20px;
`

const BottomRight = styled.div`
    position: relative;
    width: 110px;
`

const Name = styled.h1`
    text-align: center;
    font-size: 16px;
    color: #1C1C1C;
    margin-bottom: 10px;
    position: relative;
    width: 100%;
    transition: 500ms;
    white-space: nowrap;
    ${props => props.edit === true && css`
        opacity: 0;
        margin-left: -50px;
    `}
    
    ${props => props.edit === false && css`
        opacity: 1;
        margin-left: 0px;
    `}
`

const Comment = styled.h3`
    text-align: center;
    color: #444444;
    font-size: 12px;
    margin-bottom: 10px;
    position: relative;
    width: 100%;
    transition: 500ms;
    ${props => props.edit === true && css`
        opacity: 0;
        margin-left: -50px;
    `}
    
    ${props => props.edit === false && css`
        opacity: 1;
        margin-left: 0px;
    `}
`

const Intro = styled.h2`
    width: 100%;
    color: #2B2B2b;
    font-size: 11px;
    position: relative;
`

const Record = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const Stats = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px 20px;

    & > p:nth-child(1) {
        color: #2F2F2F;
        font-size: 18px;
        margin-bottom: 5px;
    }

    & > p:nth-child(2) {
        color: #444444;
        font-size: 10px;
        white-space: nowrap;
    }
`

const BtnWrapper = styled.div`
    position: absolute;
    top: 14px;
    left: -5px;
`

const ToggleBox = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: -26px;
`

const extend = keyframes`
    from {
        width: 0px;
    } to {
        width: 100%;
    }
`

const Toggle = styled.div`
    margin: 0px 15px;
    padding: 5px 10px;
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;

    & > p {
        color:  ${props => props.selected ? "#333333" : "#999999"}  
    }

    & > div {
        ${props => !props.selected && css`
            display: none;
        `}
        position: absolute;
        width: 90%;
        border-bottom: 1px solid #646380;
        animation-name: ${extend};
        animation-duration: 250ms;
        animation-timing-function: ease-in-out;
        bottom: 3px;
    }
`

const SkeletonWrapper = styled.div`
    & span {
        margin-bottom: 3px;
    }
`

function mapStateToProps({profile, auth}) {
    return {
        profile,
        auth
    }
}


export default connect(mapStateToProps, actions)(ProfileTop)