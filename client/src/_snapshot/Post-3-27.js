import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Helmet } from "react-helmet"
import { withRouter } from "react-router-dom"
import * as actions from "../../actions"

import account from "../../images/account.png"

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Textarea from "./Textarea/Textarea"
import { SlashTitle } from "../Feed/Trend/Trend"
import People from "../People/People"
import Screen from "../Util/Screen"
import Recommend from "../Util/Recommend"
import List from "../Draft/Editor/Tool/List/List"
import { Space } from "../Theme"
import SkeletonBox from "./Skeleton/SkeletonBox"
import Image from "./Image/Image"
// import MobileInfo from "./Info/Info"
import Slider from "./Slider/Slider"
// import Navigation from "./Navigation/Navigation"
import Scroll from "../Util/Scroll"
import Breakpoint from "../Breakpoint"

import { getEditorContent, fmtDate, } from "../Util/util"

const MobileImg = styled.div`
    height: 40px;
    overflow: hidden;
    & > img {
        width: 100%;
        filter: blur(2px) brightness(0.5);
    }
`

const ScreenWrapper = styled.div`
    & .feed-left {
        padding: 0px;
    }
`

const MobileBack = styled.div`
    background-color: #FAFAFA;
    position: absolute;
    z-index: 1;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    top: 8px;
    left: 11px;
`

const MobileWrapper = styled.div`
    padding: 10px 15px;
    box-shadow: 1px 3px 10px #d2d2d2;
`

class Post extends Component {
    
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id)
    }

    renderLeft = () => {

        const { fetched } = this.props.post

        return([
            <Breakpoint key="dablet" name="dablet">
                <LeftWrapper>
                    { fetched.content
                    ? 
                    <Textarea
                        postName={fetched.postName}
                        content={fetched.content}
                        postId={fetched._id}
                    />
                    :      
                    <SkeletonBox/>
                    }   
                    <Space height={"100px"}/>
                </LeftWrapper>
            </Breakpoint>,
            <Breakpoint key="mobile" name="mobile">
                <MobileImg>
                    <MobileBack><ArrowBackIcon onClick={this.props.history.goBack}/></MobileBack>
                    <img src={fetched.topic && fetched.topic.mobileImg.image}/>
                </MobileImg>
                <MobileWrapper>
                    <Textarea
                        topicId={fetched.topic && fetched.topic._id}
                        topicName={fetched.topicName}
                        index={fetched.index}
                        postName={fetched.postName}
                        content={fetched.content}
                        postId={fetched._id}
                    />
                    <MobileInfo>
                        <People
                            id={_id}
                            photo={photo || account}
                            name={userName} 
                            job={comment} 
                            intro={intro}
                            skeleton={!this.props.post.fetched.creator}
                        />
                    </MobileInfo>
                </MobileWrapper>
            </Breakpoint>
        ])
    }

    renderRight = () => {
        
        if(this.props.post.fetched.creator) {
            var { _id, userName, photo, comment, intro } = this.props.post.fetched.creator
        }

        return(
            <div>
                <Image/>
                {/* <Navigation/> */}
                <Slider/>
                <TitleWrapper>
                    <SlashTitle>
                        <p>このポストの著者</p>
                        <p>{"//////////////////////"}</p>
                    </SlashTitle>
                </TitleWrapper>
                <People
                    id={_id}
                    photo={photo || account}
                    name={userName} 
                    job={comment} 
                    intro={intro}
                    skeleton={!this.props.post.fetched.creator}
                />
                <TitleWrapper>
                    <SlashTitle>
                        <p>参照</p>
                        <p>{"///////////////////////////////"}</p>
                    </SlashTitle>
                </TitleWrapper>
                <ListWrapper>
                    <List
                        readOnly={true}
                        reference={this.props.post.fetched.ref || []}
                    />
                </ListWrapper>
                <TitleWrapper>
                    <SlashTitle>
                        <p>関連するポスト</p>
                        <p>{"///////////////////////"}</p>
                    </SlashTitle>
                </TitleWrapper>
                {
                this.props.feed.recommend.slice(0,3).map(recom => 
                    <Recommend
                        key={recom._id}
                        id={recom._id}
                        title={recom.postName}
                        content={recom.content}
                        authorImg={recom.creator[0].photo}
                        author={recom.creator[0].userName}
                        editDate={fmtDate(recom.lastEdited)}
                        topicName={recom.topicName}
                        postImg={recom.postImg[0] ? recom.postImg[0].image : recom.topicSquareImg[0].image}
                    />
                )
                }
                <Space height={"200px"}/>
            </div>
        )
    }

    render() {

        const titleName = this.props.post.fetched.postName || ""
        const description = getEditorContent(this.props.post.fetched.content, 150)

        const keywords = this.props.post.fetched.tags ? titleName + "," + this.props.post.fetched.tags.join(",") : ""

        return (
            <div>
                <Helmet>
                    <title>{titleName + " | Indii"}</title>
                    <meta name="description" content={description}/>
                    <meta name="keywords" content={keywords}/>
                </Helmet>
                <Scroll/>
                <ScreenWrapper>
                    <Screen space={false} noHeaderSpace={true} noHeader={true} post={true} noBorder={true}>
                        {this.renderLeft()}
                        {this.renderRight()}
                    </Screen>
                </ScreenWrapper>
            </div>
        )
    }
}

const LeftWrapper = styled.div`
    padding: 28px 65px;
    background-color: #ffffff;
    margin-top: -10px;

    box-shadow: 1px 1px 3px #eaeaea;
`

const TitleWrapper = styled.div`
    margin-top: 20px;
`

const ListWrapper = styled.div`
    margin-left: -10px;
`

function mapStateToProps(state) {
    return {
        post: state.post,
        auth: state.auth,
        feed: state.feed,
    }
}

export default connect(mapStateToProps, actions)(withRouter(Post))