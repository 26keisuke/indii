import React, { PureComponent } from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { Collapse } from 'react-collapse';
import styled from "styled-components"
import Skeleton from "react-loading-skeleton"

import account from "../../../images/account.png"

import Response from "../../Util/Response"
import ArrowSpin from "../../Util/ArrowSpin"
import TextArea from "../../Util/TextArea/TextArea"

import { fmtDate } from "../../Util/util"

import * as actions from "../../../actions";

const message = [
    "さんが、ポストを投稿しました。",
    "さんが、ポストを編集しました。",
    "さんが、ポストにスターを付けました。" ,
]

class Post extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isOpened: true, 
            changed: false,
        }
    }

    handleCollapseClick = (e) => {
        e.preventDefault()
        this.setState({
            isOpened: !this.state.isOpened,
            changed: true,
        })
    }

    actionRender = (action) => {
        switch(action){
            case "CREATE_POST":
                return message[0]
            case "EDIT_POST":
                return message[1]
            case "STAR_POST":
                return message[2]
            default:
                return;
        }
    }

    render() {
        return (
                <PostBox to={this.props.skeleton ? "/" : "/post/" + this.props.id}>
                    { this.props.skeleton 
                    ?
                    <PostTop>
                        <div>
                            <div style={{marginRight: "10px"}}>
                                <Skeleton width={37} height={37}/>
                            </div>
                            
                            <div>
                                <div>
                                    <Skeleton width={250} height={17}/>
                                </div>
                                <Skeleton width={200} height={15}/>
                            </div>
                        </div>
                        <ArrowWrapper>
                            <ArrowSpin
                                handleClick={this.handleCollapseClick}
                                isOpened={this.state.isOpened}
                                changed={this.state.changed}
                                size={38}
                            />
                        </ArrowWrapper>
                    </PostTop>
                    :
                    <PostTop>
                        <div>
                            <Link to={`/profile/${this.props.userId}`}>
                                <img src={this.props.photo || account} alt={"このポストの作成者の写真"}/>
                            </Link>
                            <div>
                                <div>
                                    <p>{this.props.name}</p>
                                    <p>{this.actionRender(this.props.action)}</p>
                                </div>
                                <p>{fmtDate(this.props.date)}</p>
                            </div>
                        </div>
                        <ArrowWrapper>
                            <ArrowSpin
                                handleClick={this.handleCollapseClick}
                                isOpened={this.state.isOpened}
                                changed={this.state.changed}
                                size={38}
                            />
                        </ArrowWrapper>
                    </PostTop>
                    }
                    
                    { this.props.skeleton 
                    ?
                    <PostMiddle>
                        <Link to={"/"}><Skeleton width={120} height={15}/></Link>
                        <p style={{marginBottom: "10px"}}><Skeleton width={200} height={23}/></p>
                        <Collapse isOpened={this.state.isOpened}>
                        <SkeletonWrapper>
                            <Skeleton count={5} width={630} height={20}/>
                        </SkeletonWrapper>
                        <Skeleton width={430} height={20}/>
                        </Collapse>
                    </PostMiddle>
                    :
                    <PostMiddle>
                        <Link to={`/topic/${this.props.topicId}`}>{this.props.topicName}</Link>
                        <p>{this.props.title}</p>
                        <Collapse isOpened={this.state.isOpened}>
                        <EditorWrapper>
                            <TextArea
                                readOnly={true}
                                content={this.props.content}
                            />
                        </EditorWrapper>
                        </Collapse>
                    </PostMiddle>
                    }

                    { this.props.skeleton 
                    ?
                    <Collapse isOpened={this.state.isOpened}>
                    <div style={{marginRight: "5px"}}>
                        <div style={wrapperStyle}>
                            <Skeleton width={250} height={20}/>
                        </div>
                    </div>
                    </Collapse>
                    :
                    <Collapse isOpened={this.state.isOpened}>
                    <ResponseWrapper>
                        <Response
                            postId={this.props.id}
                            wrapperStyle={wrapperStyle}
                            isOpened={this.state.isOpened}
                        />
                    </ResponseWrapper>
                    </Collapse>
                    }
                </PostBox>
        )
    }
}

const wrapperStyle = {
    display: "flex",
    justifyContent: "flex-end",
    zIndex:2,
    paddingTop:"13px",
}

const PostBox = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: start;
    background-color: #ffffff;
    padding: 15px 20px;
    border-bottom: 1px solid #eaeaea;

    &:hover {
        background-color: rgba(233, 233, 238, 0.25);    
    }
`

const PostTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;

    & > div:nth-child(1) {
        display: flex;
        flex-direction: row;
        align-items: center;

        & img {
            width: 37px;
            height: 37px;
            border-radius: 5px;
            object-fit: cover;
            margin-right:10px;
            cursor: pointer;
        }

        & > div {
            & > div {
                display: flex;
                flex-direction: row;
                margin-bottom: 3px;

                & > p:nth-child(1) {
                    margin-right: 5px;
                    color: #4B4B4B;
                    cursor: pointer;
                }

                & > p:nth-child(2) {
                    color: #252525;
                }

            }

            & > p {
                color: #747474;
                font-size: 10px;
            }
        }
    }
`

const EditorWrapper = styled.div`
    & > div {
        padding: 0px !important;
    }

    & > p {
        line-height: 20px;
    }
`

const ArrowWrapper = styled.div`
    margin-right: 8px;
`

const PostMiddle = styled.div`

    & > a {
        margin-left: 1px;
        font-size: 13px;
        font-weight: bold;
        color: #767676;
        cursor: pointer;

        &:hover {
            color: #565656;
        }
    }

    /* title */
    & > p {
        font-size: 16px;
        color: #1C1C1C;
        margin-bottom: 5px;
    }

    & > div p{
        line-height: 20px;
    }
`

const ResponseWrapper = styled.div`
    & svg,
    & img {
        margin-right:65px;
    }

    & > div {
        & > div:last-child {
            margin-right: 65px;

            & > svg {
                margin-right: 0px;
            }
        }
    }
`

const SkeletonWrapper = styled.div`
    & span {
        margin-bottom: 8px;
    }
`

function mapStateToProps(state) {
    return {
        response: state.response,
        auth: state.auth
    }
}

export default connect(mapStateToProps, actions)(Post);