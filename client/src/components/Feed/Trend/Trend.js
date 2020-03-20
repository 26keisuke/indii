import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { fmtDate } from "../../Util/util"

import Recommend from "../../Util/Recommend"

class Trend extends Component {

    render () {
        return (
            <div>
                <SlashTitle>
                    <p>トレンド</p>
                    <p>//////////////////////////////////</p>
                </SlashTitle>
                { this.props.recommend.length !== 0 
                ?
                this.props.recommend.map(recom => 
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
                :
                <div>
                    <Recommend/>
                    <Recommend/>
                    <Recommend/>
                </div>
                }
            </div>
        )
    }
}

export const SlashTitle = styled.div`

    display: flex;
    flex-direction: row;
    margin-bottom: 15px;

    & > p:nth-child(1) {
        margin-right: 10px;
        font-size: 14px;
    }

    & > p:nth-child(2) {
        color: #eaeaea;
        font-size: 14px;
        letter-spacing: 2.5px;
    }
`

function mapStateToProps({ feed }){
    return {
        recommend: feed.recommend
    }
}

export default connect(mapStateToProps)(Trend)