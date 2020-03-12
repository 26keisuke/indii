import React, {Component} from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { ChangeTitle, ChangeUnderline } from "../Confirm"
import PeopleFollow from "../../../People/FollowBtn/FollowBtn"
import { Space } from "../../../Theme"

import { fmtDate } from "../../../Util/util"

class Edit extends Component {
    render () {
        return (
            <Wrapper>
                {   this.props.title && 
                <ChangeTitle>{this.props.title}</ChangeTitle>
                }
                <p>{!this.props.date ? "-" : fmtDate(this.props.date)}</p>
                <Editor to={`/profile/${this.props.id}`}>
                    <img src={this.props.photo} alt={"前回の編集者の写真"}/>
                    <div>
                        <p>{this.props.userName}</p>
                        <p>{this.props.comment}</p>
                    </div>
                </Editor>
                { this.props.followBtn && 
                <FollowWrapper>
                    <PeopleFollow id={this.props.id}/>
                </FollowWrapper>
                }
                { this.props.intro
                ?
                <Intro>
                    {this.props.intro}
                </Intro>
                :
                <Space height={"10px"}/>
                }
                <ChangeUnderline/>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    position: relative;
`

const FollowWrapper = styled.div`
    position: absolute;
    top: 60px;
    right: -14px;
`

const Intro = styled.div`
    margin-bottom: 10px;
    padding-left: 48px;
    padding-right: 80px;
`

const Editor = styled(Link)`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    background-color: #ffffff;
    position: relative;
    height: 40px;

    & > img {
        width: 37px;
        height: 37px;
        border-radius: 5px;
        object-fit: contain;
        flex-shrink: 0;
        margin-right: 10px;
    }

    & > div {
        & > p:nth-child(1) {
            font-size:12px;
        }

        & > p:nth-child(2) {
            color: #747474;
            font-size: 11px;
            margin-bottom: 5px;
        }
    }
`

export default Edit