import React, { Component } from "react"
import styled, { css, keyframes} from "styled-components"
import Skeleton from "react-loading-skeleton"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import * as actions from "../../../actions"

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

// import question from "../../../images/question.png"
// import post from "../../../images/post.png"

import Back from "../../Util/Back"

let ct = 0;

class Info extends Component {

    constructor(props){
        super(props)
        this.state = {
            liked: false,
            madeLikeAction: false,
        }
    }

    componentDidMount() {
        this.props.fetchUser()

        if(this.props.loggedIn && (ct === 0)) {
            if(this.props.id){
                this.checkForFavorite()
            }
            this.setUpdater() 
            ct++
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.loggedIn && !prevProps.id && this.props.id){
            this.checkForFavorite()
        }
    }

    handleWindowClose = () => {
        if(this.state.madeLikeAction) {
            this.props.fetchAfterTopicLike(this.props.id, this.state.liked)
        }
    }

    setUpdater = () => {

        window.addEventListener("beforeunload", this.handleWindowClose);

        this.autoUpdate = setInterval(() => {
            if (this.state.madeLikeAction) {
                
                this.props.fetchAfterTopicLike(this.props.id, this.state.liked)
                this.setState({
                    madeLikeAction: false,
                })

            }
        }, 10000)
    }

    handleLikeClick = (e) => {
        e.preventDefault()

        this.setState({
            liked: !this.state.liked,
            madeLikeAction: true,
        })
    }

    componentWillUnmount() {

        ct = 0;

        if (this.props.loggedIn){
            if(this.state.madeLikeAction) {
                this.props.fetchAfterTopicLike(this.props.id, this.state.liked)
            }
            window.removeEventListener("beforeunload", this.handleWindowClose);
        }
       
        clearInterval(this.autoUpdate)
    }

    checkForFavorite = () => {
        const res = this.props.likedTopic.filter(elem => elem.topic === this.props.id)
        if(res.length > 0) {
            this.setState({ liked: true })
            return 
        }
        this.setState({ liked: false })
        return 
    }

    render() {

        const { content, flag, tags, topicName, postCount, likes, handleClick, selected, squareImg } = this.props

        return (
            <TopicTop>
                <div>
                    <BackWrapper>
                        <div>
                            <Back
                                back={() => this.props.history.goBack()}
                                name="戻る"
                            />
                        </div>
                    </BackWrapper>
                    <TopicTags>
                        { flag 
                        ?
                            tags.map(tag =>
                                <div key={tag}># {tag}</div>
                            )
                        :
                            <div><Skeleton count={3} width={50} height={22}/></div>
                        }
                    </TopicTags>
                    <TopicTitle>{flag ? topicName : <Skeleton width={300} height={28}/>}</TopicTitle>
                    <TopicContent>
                        {
                            flag 
                            ?
                            content 
                            :
                            <ContentSkeleton>
                                <Skeleton count={5} height={18}/>
                            </ContentSkeleton>
                        }
                    </TopicContent>
                    <TopicTimeStamp>
                        {flag && <p>ポスト数: {postCount}</p> }
                        {flag && <p>お気に入り数: {likes.counter}</p>}
                        {!flag && <p><Skeleton width={160} height={18}/></p> }
                    </TopicTimeStamp>
                    <TopicOption>
                        {/* { flag && 
                        <div>
                            <PostRequestIcon src={question} alt="ポストリクエストのボタン"/>
                        </div>
                        }
                        { flag && 
                        <div>
                            <PostCreateIcon src={post} alt="ポスト作成のボタン"/>
                        </div>
                        } */}
                        { 
                        flag
                        ?
                        this.state.liked 
                        ? <BookmarkIcon onClick={(e) => this.handleLikeClick(e)}/>
                        : <BookmarkBorderIcon onClick={this.props.loggedIn ? (e) => this.handleLikeClick(e) : this.props.showLogin}/>
                        : ""}
                    </TopicOption>
                    { flag &&
                    <TopicToggle>
                        <TopicToggleElement selected={selected["topic"]} onClick={() => handleClick("topic")}>
                            <p>トピック</p>
                            <div/>
                        </TopicToggleElement>
                        {/* <TopicToggleElement selected={selected["talk"]} onClick={() => handleClick("talk")}>
                            <p>フリートーク</p>
                            <div/>
                        </TopicToggleElement> */}
                        <TopicToggleElement selected={selected["activity"]} onClick={() => this.props.handleClick("activity")}> 
                            <p>アクティビティー </p>
                            <div/>
                        </TopicToggleElement>
                    </TopicToggle>
                    }
                </div>
                { flag 
                ? <img src={squareImg.image} alt="トピックを代表する写真"/>
                : <section><Skeleton width={250} height={250}/></section>
                }
            </TopicTop>
        )
    }
}


const ContentSkeleton = styled.div`
    & span {
        width: 100%;
    }
`


const TopicTop = styled.div`
    background-color: white;
    min-width: 770px;
    box-shadow: 1px 1px 10px #d2d2d2;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #eaeaea;
    padding-top: 20px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 50px;
    min-width: 960px;

    & > div {
        display: flex;
        flex-direction: column;
        position: relative;
        min-width: 420px;
        width: 100%;
    }

    & > img {
        min-height: 250px;
        min-width: 250px;
        max-height: 250px;
        max-width: 250px;
        /* padding-right: 30px; */
        object-fit: contain;
        flex-shrink: 0;
    }

    & > section {
        /* padding-right: 30px; */
        flex-shrink: 0;
    }
`

const TopicTags = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;

    & > div {

        display: flex;
        align-items: center;
        margin-right: 7px;

        & > p {
            color: #5a5a5a;
            font-size: 12px;
            flex-shrink: 0;
            margin-top: -1px;
        }
    }    

    & span {
        margin-right: 7px;
    }
`

// const Tag = styled(FaHashtag)`
//     color: #5a5a5a;
//     transform: scale(0.9);
//     margin-top: -2px;
//     margin-right: 2px;
// `

const TopicTitle = styled.h1`
    color: #1C1C1C;
    font-size: 23px;
    font-weight: bold;
    margin-bottom:15px;
`

const TopicTimeStamp = styled.p`
    display: flex;
    flex-direction: row;
    font-size: 11px;
    color: #5a5a5a;
    position: absolute;
    bottom: 0px;

    & > p {
        margin-right: 10px;
    }
`

const TopicContent = styled.h2`
    color: #2B2B2b;
    margin-bottom: 30px;
    margin-right:30px;
    font-size: 12px;

    & > div {
        & span {
            margin-bottom: 5px;
        }
    }
`

const TopicOption = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    right:38px;
    bottom: 0px;
    
    & > svg {
        transform: scale(1.2);
        cursor: pointer;
        color: ${props => props.theme.primary};

        &:hover{
            color: ${props => props.theme.secondary};
        }
    }

    /* & > div {
        width:28px;
        height:28px;
        border: 0.5px solid #636480;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        cursor: pointer;
        margin-left: 30px;
    } */
`

// const PostRequestIcon = styled.img`
//     width: 22px;
//     height: 22px;
// `

// const PostCreateIcon = styled.img`
//     width: 18px;
//     height: 18px;
// `

const TopicToggle = styled.div`
    display: flex;
    position: absolute;
    bottom:-45px;
`


const TopicToggleElement = styled.div`
    padding: 10px;
    padding-bottom: 0px;
    margin-right:70px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    flex-shrink: 0;
    align-items: center;
    position: relative;

    & > p {
        color: ${props => props.selected ? "#000000" : "#8D8D8D"}
    }

    & > div {
        ${props => props.selected && css`
            background-color: #636480;
            width:100%;
            height:1px;
            animation-name: ${extend};
            animation-duration: 250ms;
            animation-timing-function: ease-in-out;
        `}
    }
`

const BackWrapper = styled.div`
    position: relative;
    margin-top: 6px;

    & > div {
        position: absolute;
        width: 300px;
        top: -54px;
        left: -36px;
    }
`

const extend = keyframes`
    from {
        width: 0px;
    } to {
        width: 80%;
    }
`

function mapStateToProps({auth}){
    return {
        loggedIn: auth.loggedIn,
        likedTopic: auth.info.likedTopic
    }
}

export default connect(mapStateToProps, actions)(withRouter(Info))