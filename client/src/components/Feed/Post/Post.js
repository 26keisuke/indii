import React, { PureComponent } from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { Collapse } from 'react-collapse';
import BraftEditor from 'braft-editor'
import styled from "styled-components"
import Skeleton from "react-loading-skeleton"

import sample from "../../../images/sample0.jpg";

import Response from "../../Util/Response"

import ArrowSpin from "../../Util/ArrowSpin"

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

    componentDidMount() {

        if(this.props.content) {

            // filter out images
            var images = document.getElementsByClassName("bf-image")
            if(Object.keys(images).length > 0) {
                for(var k in images) {
                    if (images[k].style){
                        images[k].style.display = "none"
                    }
                }
            }

            // filter out leftovers from images
            var alignLeft = document.getElementsByClassName("bfa-left")
            if(Object.keys(alignLeft).length > 0) {
                for(var k in alignLeft) {
                    if (alignLeft[k].style){
                        alignLeft[k].style.display = "none"
                    }
                }
            }

            var alignRight = document.getElementsByClassName("bfa-right")
            if(Object.keys(alignRight).length > 0) {
                for(var k in alignRight) {
                    if (alignRight[k].style){
                        alignRight[k].style.display = "none"
                    }
                }
            }

            // filter out empty span
            // => reverse for loopをして、htmlが連続してemptyがだったら削除する
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
                <PostBox to={"/post/" + this.props.id}>
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
                            <img src={sample} alt={"このポストの作成者の写真"}/>
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
                        <Link><Skeleton width={120} height={15}/></Link>
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
                        <Link to={"/topic"}>{this.props.topic}</Link>
                        <p>{this.props.title}</p>
                        <Collapse isOpened={this.state.isOpened}>
                        <EditorWrapper>
                            {/* <p>{BraftEditor.createEditorState(this.props.content).toText().replace(/a\s|\s/g, "").substring(0, 500) + "..."}</p> */}
                            <BraftEditor
                                controls={[]}
                                readOnly={true}
                                value={BraftEditor.createEditorState(this.props.content)}
                                contentClassName="post-braft"
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
    paddingTop:"15px",
}

const PostBox = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: start;
    background-color: #ffffff;
    padding: 15px 20px;
    border-bottom: 1px solid #d2d2d2;

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

        & > img {
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
    & div {
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

    & > p {
        font-size: 12px;
        font-weight: bold;
        color: #767676;
        cursor: pointer;
    }

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
        font-size: 18px;
        color: #1C1C1C;
        margin-bottom: 5px;
        font-weight: bold;
    }

    & > div p{
        line-height: 20px;
    }
`

const ResponseWrapper = styled.div`
    & img {
        margin-right:65px;
    }

    & > div {
        & > div:last-child {
            margin-right: 65px;
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