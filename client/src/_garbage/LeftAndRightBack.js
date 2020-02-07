// 左と右に分けるやつ（Back付き）

import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import Back from "./Back"

const FeedBox = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    overflow-x: hidden;
`

const FeedLeft = styled.div`
    width: 675px;
    flex-shrink: 0;
    height:100%;
    position: relative;
    border-right: 1px solid #d2d2d2;
    overflow: scroll;

    &::-webkit-scrollbar {
        width: 0 !important;
    }
`

const FeedRight = styled.div`
    width:100%;
    margin: 0px 15px;
    margin-top: 20px;

    & > div {
        width: 360px;
        height: 100%;
        margin: 0px auto;
    }
`

const FeedBackHeader = styled.div`
    height:40px;
    background-color: #ffffff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #d2d2d2;
    border-bottom: 1px solid #d2d2d2;
    margin-left: -1px;
    width: 100%;
    & > div {
        margin-top:-20px;
    }

    & > p {
        color: #878787;
    }
`

// props [url, backName, title, left, right]
class LeftAndRightBack extends Component {

    render() {
        return (
            <FeedBox>
                <FeedLeft>
                    <FeedBackHeader>
                        <div>
                            <Back
                                back={() => this.props.history.goBack()}
                                name="戻る"
                            />
                        </div>
                        <p>
                            {this.props.title}
                        </p>
                    </FeedBackHeader>

                    {this.props.left}

                </FeedLeft>
                <FeedRight>
                    <div>
                        
                        {this.props.right}

                    </div>
                </FeedRight>
            </FeedBox>
        )
    }
}

export default withRouter(LeftAndRightBack)