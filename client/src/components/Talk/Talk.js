import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { Helmet } from "react-helmet"

import * as actions from "../../actions"

import Feed from "./Feed/Feed"
import Content from "./Content/Content"

const Talk = ({ selected, ...props }) => {

    const [transition, setTransition] = useState(false)

    useEffect(() => {
        if(window.location.pathname !== "/talk"){
            const id = window.location.pathname.split("/")[2]
            props.selectTalk(id)
            setTransition(true)
        }
        
        props.fetchTalks();
    },[])

    useEffect(() => {
        if(window.location.pathname === "/talk"){
            setTransition(false) //モバイルの戻るボタンを押した時に戻る用にするため
            return
        }
        const id = window.location.pathname.split("/")[2]
        props.selectTalk(id)
        setTransition(true)
    }, [window.location.pathname])

    return (
        <Wrapper>
            <Helmet>
                <title>{"トーク | Indii"}</title>
                <meta name="description" content="Indiiでは、似たような仲間と交流することができます。力を合わして日本一のデータベースを作り上げましょう！"/>
                <meta name="keywords" content={"コミュニティー,コンピューターサイエンス,ギーク,オタク"}/>
            </Helmet>
            <TalkBox>

                <Feed
                    transition={transition}
                    setTransition={setTransition}
                    selectedId={selected && selected._id}
                />
                <Content
                    transition={transition}
                    setTransition={setTransition}
                    talk={selected}
                />

            </TalkBox>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: #f9f9f9;
`

const TalkBox = styled.div`
    display: flex;
    width:100%;
    background-color: #f9f9f9;
`

function mapStateToProps({ talk }){
    return {
        selected: talk.selected,
    }
}

export default connect(mapStateToProps, actions)(Talk)