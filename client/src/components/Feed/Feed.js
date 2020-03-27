import React, { Component } from "react";
import styled from "styled-components"
import { connect } from "react-redux"

import * as actions from "../../actions"

import PostFeed from "./Post/Post";

import Trend from "./Trend/Trend"
import New from "./New/New"
import People from "./People/People"
import Header from "../Header/Header"
import Breakpoint from "../Breakpoint"
import Screen from "../Util/Screen"
import { Space } from "../Theme"

const TrendWrapper = styled.div`
    margin-left: 5px;
`

const HeaderWrapper = styled.div`
    & > nav {
        position: relative;
    }
`

const numOfUsers = 3;

class Feed extends Component {

    componentDidMount() {

        const { recommend, user } = this.props

        this.props.fetchFeed()
        this.props.fetchNewTopic()

        if(!recommend.length) this.props.fetchRecommend()
        if(!user.length) this.props.fetchPeople()

    }

    renderFeed = () => {
        const { feed, user } = this.props

        var res = [];

        for(var i=0; i < feed.length; i++){
            res.push(
                <PostFeed
                    key={feed[i]._id}
                    id={feed[i]._id}
                    userId={feed[i].creator._id}
                    photo={feed[i].creator.photo}
                    name={feed[i].creator.userName}
                    action={"CREATE_POST"}
                    date={feed[i].lastEdited}
                    topicId={feed[i].topic}
                    topicName={feed[i].topicName}
                    title={feed[i].postName}
                    content={feed[i].content}
                    star={feed[i].star.lookUp}
                    rating={feed[i].rating}
                />
            )
            if(
                i !== 0 && 
                i % 8 === 0
            ) {

                const currentIdx = parseInt(i/8) - 1
                const recommendedUser = user.slice(currentIdx*numOfUsers, currentIdx+numOfUsers-1)

                if(!!user.length) {
                    res.push(
                        <Space key={"spaceHead"+i} height={"10px"} backgroundColor={"#F9F9F9"}/>
                    )
    
                    res.push(
                        <People 
                            key={"people"+i}
                            user={recommendedUser}
                        />
                    )
    
                    res.push(
                        <Space key={"spaceTail"+i} height={"10px"} backgroundColor={"#F9F9F9"}/>
                    )
                }
            }
        }

        res.push(
            <Space key={"spaceLast"+i} height="500px" backgroundColor="#f9f9f9"/>
        )

        return res
    }

    renderLeft = () => {

        const { feed } = this.props

        return(
            <div>
                <div style={{borderBottom: "1px solid #eaeaea"}}/>
                {Object.keys(feed).length > 0
                ?
                    this.renderFeed()
                :
                    ([
                    <PostFeed key={"s1"} skeleton={true}/>
                    ,
                    <PostFeed key={"s2"} skeleton={true}/>
                    ,
                    <PostFeed key={"s3"} skeleton={true}/>
                    ])
                }
            </div>
        )
    }

    renderRight = () => {
        return (
            <div>
                <New/>
                <TrendWrapper>
                    <Trend/>
                </TrendWrapper>
            </div>
        )
    }

    render() {
        return(
            <div>
                <Breakpoint name="mobile">
                    <HeaderWrapper>
                        <Header/>
                    </HeaderWrapper>
                </Breakpoint>
                <Screen noHeader={true}>
                    {this.renderLeft()}
                    {this.renderRight()}
                </Screen>
            </div>
            
        )
    }
}

function mapStateToProps({feed}) {
    return {
        feed: feed.feed,
        recommend: feed.recommend,
        user: feed.user,
    }
}

export default connect(mapStateToProps, actions)(Feed)