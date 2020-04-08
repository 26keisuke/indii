import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components"
import { connect } from "react-redux"
import { Waypoint } from "react-waypoint"

import * as actions from "../../actions"

import PostFeed from "./Post/Post";
import Trend from "./Trend/Trend"
import New from "./New/New"
import People from "./People/People"
import Header from "../Header/Header"
import Breakpoint from "../Breakpoint"
import Screen from "../Util/Screen"
import Loading from "../Util/Loading"
import { Space, Border } from "../Theme"

const TrendWrapper = styled.div`
    margin-left: 5px;
`

const HeaderWrapper = styled.div`
    & > nav {
        position: relative;
    }
`

const LoadingWrapper = styled.div`
    background-color: #f9f9f9;
    display: flex;
    justify-content: center;
    padding: 40px 0px;

    & > div {
        position: relative;
        z-index: 10;
        left: 0 !important;
        top: 0 !important;
        transform: none !important;

        & > div {
            width: 30px !important;
            height: 30px !important;
        }
    }
`

const numOfUsers = 3;

const sequentialRequests = 3

const Feed = ({ done, rendered, page, scroll, feed, user, recommend, ...props }) => {
    
    const [lock, setLock] = useState(1)

    useScroll(scroll, props.restoreScroll)
    
    useEffect(() => {
        props.fetchNewTopic()
        if(!feed.length) {
            for(var i=0; i < sequentialRequests; i++){
                props.fetchFeed(i)
            } 
        }
        // if(!recommend.length) props.fetchRecommend()
        if(!user.length) props.fetchPeople()

        if(scroll > 0){
            setTimeout(() => {
                window.scroll(0, scroll)
            }, 300)
        }
    }, [])

    const handleEnter = () => {
        if(lock && !done) {
            setLock(1-sequentialRequests)
            props.setPage(page+1)
        }
    }

    // ↓ // ここは分けなくてもいいけどこっちの方が見やすい

    useEffect(() => {
        if(page > 0){
            for(var i=0; i < sequentialRequests; i++){
                props.fetchFeed(page*sequentialRequests+i)
            }
        }
    }, [page])

    // ↓

    useEffect(() => {
        if(
            !feed[0] || 
            !feed[page]
        ) return

        var temp = rendered.slice()
        props.renderFeed(temp.concat(render()))
    }, [feed])

    // ↓

    const render = () => {
        var res = [];

        for(var i=0; i < feed[feed.length-1].length; i++){
            res.push(
                <PostFeed
                    key={feed[feed.length-1][i]._id}
                    id={feed[feed.length-1][i]._id}
                    userId={feed[feed.length-1][i].creator[0]._id}
                    photo={feed[feed.length-1][i].creator[0].photo}
                    name={feed[feed.length-1][i].creator[0].userName}
                    action={"CREATE_POST"}
                    date={feed[feed.length-1][i].lastEdited}
                    topicId={feed[feed.length-1][i].topic}
                    topicName={feed[feed.length-1][i].topicName}
                    title={feed[feed.length-1][i].postName}
                    content={feed[feed.length-1][i].content}
                    rating={feed[feed.length-1][i].rating}
                />
            )
        }

        if(feed.length % sequentialRequests === 0){

            const getIndexAt = parseInt(feed.length/sequentialRequests-1)
            const recommendedUser = user.slice(getIndexAt*numOfUsers, getIndexAt+numOfUsers)

            if(!!recommendedUser.length) {
                res.push([
                    <Space key={"spaceHead"+i} height={"10px"} backgroundColor={"#F9F9F9"}/>,
                    <People 
                        key={"people"+i}
                        user={recommendedUser}
                    />,
                    <Space key={"spaceTail"+i} height={"10px"} backgroundColor={"#F9F9F9"}/>,
                ])
            }

        }

        setLock(lock+1) // すべてのリクエストが完了した時に1に戻る

        return res
    }

    const renderLeft = () => {
        return(
            <div>
                <Border bottom={true}/>
                {feed.length > 0
                ?
                    <>
                        { rendered }
                        <LoadingWrapper>
                            {!done && !lock && <Loading determinate={false}/>}
                        </LoadingWrapper>
                        <Waypoint 
                            scrollableAncestor={window}
                            fireOnRapidScroll
                            onEnter={handleEnter} 
                        />
                    </>
                :
                    <>
                        <PostFeed skeleton={true}/>,
                        <PostFeed skeleton={true}/>,
                        <PostFeed skeleton={true}/>
                    </>
                }
            </div>
        )
    }

    const renderRight = () => {
        return (
            <div>
                <New/>
                {/* <TrendWrapper>
                    <Trend/>
                </TrendWrapper> */}
            </div>
        )
    }

    return(
        <div>
            <Breakpoint name="mobile">
                <HeaderWrapper>
                    <Header/>
                </HeaderWrapper>
            </Breakpoint>
            <Screen noHeader={true}>
                {renderLeft()}
                {renderRight()}
            </Screen>
        </div>
    )
}

// restoreScrollのためのuseScroll
const useScroll = (initVal, postAction) => {
    const [scroll, setScroll] = useState(initVal)
    const refScroll = useRef(scroll) // useEffectのreturn内はclosureでdefineされた時のvalueのままだから

    useEffect(() => {
        refScroll.current = scroll
    })

    const listener = e => {
        setScroll(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener("scroll", listener);
        return () => {
            postAction(refScroll.current)
            window.removeEventListener("scroll", listener);
        };
    }, [])

    return scroll
}

function mapStateToProps({ feed }) {
    return {
        rendered: feed.rendered,
        page: feed.page,
        scroll: feed.scroll,
        feed: feed.feed,
        recommend: feed.recommend,
        user: feed.user,
        done: feed.done,
    }
}

export default connect(mapStateToProps, actions)(Feed)