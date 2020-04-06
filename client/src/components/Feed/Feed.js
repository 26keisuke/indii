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
import { Space, Border } from "../Theme"

const TrendWrapper = styled.div`
    margin-left: 5px;
`

const HeaderWrapper = styled.div`
    & > nav {
        position: relative;
    }
`

const numOfUsers = 3;

const Feed = ({ renderedCt, rendered, page, scroll, feed, user, recommend, ...props }) => {

    const [lock, setLock] = useState(1)

    useScroll(scroll, props.restoreScroll)
    
    useEffect(() => {
        props.fetchNewTopic()
        if(!feed.length) props.fetchFeed(0)
        if(!recommend.length) props.fetchRecommend()
        if(!user.length) props.fetchPeople()

        if(scroll > 0){
            setTimeout(() => {
                window.scroll(0, scroll)
            }, 300)
        }
    }, [])

    const render = () => {
        var res = [];

        for(var i=0; i < feed[page].length; i++){
            res.push(
                <PostFeed
                    key={feed[page][i]._id}
                    id={feed[page][i]._id}
                    userId={feed[page][i].creator._id}
                    photo={feed[page][i].creator.photo}
                    name={feed[page][i].creator.userName}
                    action={"CREATE_POST"}
                    date={feed[page][i].lastEdited}
                    topicId={feed[page][i].topic}
                    topicName={feed[page][i].topicName}
                    title={feed[page][i].postName}
                    content={feed[page][i].content}
                    // star={feed[page][i].star.lookUp}
                    rating={feed[page][i].rating}
                />
            )
        }

        const recommendedUser = user.slice(page*numOfUsers, page+numOfUsers-1)

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

        
        setLock(1)

        return res
    }

    const handleEnter = () => {
        if(lock) {
            setLock(0)
            props.setPage(page+1)
            props.fetchFeed(page+1)
        }
    }

    useEffect(() => {
        if(
            !feed[0] || 
            !feed[page] || 
            renderedCt >= page
        ) return

        var temp = rendered.slice()
        props.renderFeed(temp.concat(render()))
    }, [feed])

    const renderLeft = () => {
        return(
            <div>
                <Border bottom={true}/>
                {feed.length > 0
                ?
                    ([rendered, 
                    <Waypoint 
                        key={"waypointFeed"} 
                        scrollableAncestor={window}
                        fireOnRapidScroll
                        onEnter={handleEnter} 
                    />
                    ])
                :
                    ([
                    <PostFeed key={"s1"} skeleton={true}/>,
                    <PostFeed key={"s2"} skeleton={true}/>,
                    <PostFeed key={"s3"} skeleton={true}/>
                    ])
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
        renderedCt: feed.renderedCt,
        rendered: feed.rendered,
        page: feed.page,
        scroll: feed.scroll,
        feed: feed.feed,
        recommend: feed.recommend,
        user: feed.user,
    }
}

export default connect(mapStateToProps, actions)(Feed)