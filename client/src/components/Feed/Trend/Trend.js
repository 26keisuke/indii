import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { fmtDate } from "../../Util/util"

import Recommend from "../../Util/Recommend"

class Trend extends Component {

    renderElement = () => {
        return
    }

    render () {
        return (
            <div>
                <SlashTitle>
                    <p>トレンド</p>
                    <p>//////////////////////////////////</p>
                </SlashTitle>
                {/* {this.renderElement()} */}
                {
                this.props.feed.recommend.map(recom => 
                    <Recommend
                        key={recom._id}
                        id={recom._id}
                        title={recom.postName}
                        content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                        authorImg={recom.creator[0].photo}
                        author={recom.creator[0].userName}
                        editDate={fmtDate(recom.lastEdited)}
                        postImg={recom.postImg[0] ? recom.postImg[0].image : recom.topicSquareImg[0].image}
                    />
                )
                }
                {/* <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample1}
                />
                <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample1}
                />
                <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample1}
                />
                <Recommend
                    title="タイトルが入ります"
                    content="radio buttonのcssを一括する。ポストのconfigurationを変えるところ。Not Authenticated。"
                    authorImg={sample}
                    author="飯塚啓介"
                    editDate="作成日が入ります"
                    postImg={sample1}
                /> */}
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
        feed
    }
}

export default connect(mapStateToProps)(Trend)