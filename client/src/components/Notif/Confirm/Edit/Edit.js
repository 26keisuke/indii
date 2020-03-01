import React, {Component} from "react"
import styled from "styled-components"
import { Title, Editor, Underline } from "../Confirm"
import PeopleFollow from "../../../PeopleFollow"

import { fmtDate } from "../../../Util/util"

class Edit extends Component {
    render () {
        return (
            <Wrapper>
                {   this.props.title && 
                <Title>{this.props.title}</Title>
                }
                <p>{!this.props.date ? "-" : fmtDate(this.props.date)}</p>
                <Editor>
                    <img src={this.props.photo} alt={"前回の編集者の写真"}/>
                    <div>
                        <p>{this.props.userName}</p>
                        <p>{this.props.comment}</p>
                    </div>
                </Editor>
                {   this.props.followBtn && 
                    <FollowWrapper>
                        <PeopleFollow id={this.props.id}/>
                    </FollowWrapper>
                }
                <Underline/>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    position: relative;
`

const FollowWrapper = styled.div`
    position: absolute;
    bottom: 20px;
    right: -14px;
`

export default Edit