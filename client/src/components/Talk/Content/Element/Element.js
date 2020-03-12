import React, { Component } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

class Element extends Component {
    render() {

        const {user, date, content} = this.props

        return(
            <Wrapper>
                <Info>
                    <Link to={`/profile/${user && user._id}`}>{user && user.userName}</Link>
                    <div>・</div>
                    <div>{date}</div>
                </Info>
                <div>
                    <Connect/>
                    <Content>{content}</Content>
                </div>
            </Wrapper>
        )
    }
}

const Connect = styled.div`
    display: flex;
    justify-content: center;
    min-height: 100%;
    width: 1px;
    background-color: #d2d2d2;
    margin: 0px 12px;
`

const Wrapper = styled.div`
    margin-bottom: 30px;

    & > div:nth-child(2){
        display: flex;
    }
`

const Info = styled.div`

    display: flex;
    color: #777777;
    margin-bottom: 6px;

    & > a {
        color: #767676;
        
        &:hover{
            color: #565656;
        }
    }

    & > div:nth-child(2){
        margin: 0px 6px;
    }
`

const Content = styled.div`
    
`


export default Element