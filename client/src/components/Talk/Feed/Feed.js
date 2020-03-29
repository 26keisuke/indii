import React, { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import { connect } from "react-redux"
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

import * as actions from "../../../actions"

import TalkFeed from "./Element/Element"
import { Space } from "../../Theme"
import Breakpoint from "../../Breakpoint"

import { checkAuth, fmtDate } from "../../Util/util"

const Feed = ({ transition, setTransition, selectedId, fetched, ...props}) => {

    const [init, setInit] = useState(false)

    useEffect(() => {
        if(!!fetched[0] && !init){
            props.selectTalk(fetched[0])
            setInit(true)
        }
    }, [fetched])

    const handleClick = (e) => {

        const isAuthenticated = checkAuth(e, props)

        if(isAuthenticated){
            const id = "1";
            const action = "ADD_TALK";
            const title = "新しいトークを作成"
            const message = "トークのタイトルを入力してください。";
            const caution = "";
            const buttonMessage = "次へ";
            props.enableGray();
            props.showConfirmation(id, action, title, caution, message, buttonMessage, "ADD_TALK_REF");
        }
    }

    const handleTalkClick = (e, talk) => {
        e.preventDefault();
        props.selectTalk(talk)
        props.history.push(`/talk/${talk._id}`)
    }

    const handleMobileTalkClick = (e, talk) => {
        e.preventDefault();
        props.selectTalk(talk)
        setTransition(true)
        props.history.push(`/talk/${talk._id}`)
    }

    const renderTalkElement = (elem) => {
        return ([
            <Breakpoint key={`talkDablet${elem._id}`} name="dablet">
                <TalkFeed
                    pinned={elem.pinned}
                    creator={elem.creator}
                    date={fmtDate(elem.timeStamp)}
                    title={elem.title}
                    description={elem.description}
                    counter={elem.msgCounter}
                    handleClick={(e) => handleTalkClick(e, elem)}
                    selected={elem._id === selectedId}
                />
            </Breakpoint>,
            <Breakpoint key={`talkMobile${elem._id}`} name="mobile">
                <TalkFeed
                    pinned={elem.pinned}
                    creator={elem.creator}
                    date={fmtDate(elem.timeStamp)}
                    title={elem.title}
                    description={elem.description}
                    counter={elem.msgCounter}
                    handleClick={(e) => handleMobileTalkClick(e, elem)}
                    selected={elem._id === selectedId}
                />
            </Breakpoint>
        ])
    }

    const renderedTalk = useMemo(() => {
        var pinned = []
        var notPinned = []

        fetched.map(talk => {
            if(talk.pinned){
                pinned.push(renderTalkElement(talk))
            } else {
                notPinned.push(renderTalkElement(talk))
            }
        })

        return pinned.concat(notPinned)
    }, [fetched, selectedId])

    return (
        <Box transition={transition}>
            <TalkHeader>
                <h2>トーク一覧</h2>
                <div>
                    <AddBoxOutlinedIcon onClick={handleClick}/>
                </div>
            </TalkHeader>
            <div>
                {   
                fetched[0]
                ? 
                renderedTalk
                :
                <div>
                    <TalkFeed/>
                    <TalkFeed/> 
                    <TalkFeed/>   
                    <TalkFeed/>
                    <TalkFeed/> 
                    <TalkFeed/>   
                    <TalkFeed/>
                </div>
                }
            </div>
            <Space height={"200px"}/>
        </Box>
    )
}

const Box = styled.div`
    @media only screen and (max-width: 670px) {
        width: 100%;
        margin-right: 0px;
        margin-left: ${props => props.transition ? "-100%" : 0};
        opacity: ${props => props.transition ? 0 : 1};
    }

    @media only screen and (min-width: 670px) {
        min-width: 320px;
        max-width: 320px;
    }

    transition: 300ms;
    background-color: white;
    box-shadow: 1px 1px 10px #d2d2d2;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    margin-right: 20px;
    min-height: 100vh;
`

const TalkHeader = styled.div`

    @media only screen and (min-width: 670px) {
        padding-bottom: 35px; 
    }

    display: flex;
    padding: 10px 27px;
    position: relative;
    border-bottom: 1px solid #eeeeee;
    
    & > h2 {
        font-size: 14px !important;
    }

    & > div:nth-child(2) {
        position: relative;
        margin-left: auto;

        & > svg {
            position: absolute;
            color: ${props => props.theme.primary};
            top: 2px;
            transform: scale(1.1);
            left: -17px;
            cursor: pointer;
        }
    }
`

Feed.propTypes = {
    transition: PropTypes.bool,
    setTransition: PropTypes.func,
    selectedId: PropTypes.string,
}

function mapStateToProps({ talk, auth }){
    return {
        auth,
        fetched: talk.fetched,
    }
}

export default connect(mapStateToProps, actions)(withRouter(Feed))