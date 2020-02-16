import React, { Component } from "react"
import styled, { css } from "styled-components"

import { TiUserAddOutline } from 'react-icons/ti';
import { FiCheck } from 'react-icons/fi';

class PeopleFollow extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            follow: false,
        }

        this.handleFollowClick = this.handleFollowClick.bind(this)
    }

    componentWillMount() {
        this.checkIfFollowed()
    }

    checkIfFollowed(){}

    handleFollowClick(e) {
        e.preventDefault()
        if(!this.state.follow){
            this.setState({
                follow: true
            })
        } else {
            this.setState({
                follow: false
            })
        }
    }

    render() {
        return (
            <Follow follow={this.state.follow} onClick={this.handleFollowClick}>
                {
                    this.state.follow 
                    ? <FollowedIcon/>
                    : <FollowIcon/>
                }  
                <FollowText follow={this.state.follow}>{this.state.follow ? "フォロー中" : "フォロー"}</FollowText>
            </Follow>
        ) 
    }
}

const Follow = styled.div`
    height: 22px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right:15px;
    border-radius: 20px;
    justify-content: center;
    align-self: center;
    margin-left:40px;
    cursor: pointer;
    min-width: 72px;
    position: relative;

    ${props => props.follow 
    ? css`
        background-color: #9aaee6;
        padding: 2px 1px;
        padding-left: 9px;
    `
    : css`
        border: 1px solid #636480;
        padding: 1px 0px;
        padding-left: 8px;

        &:hover {
            border:1px solid #9aaee6;
        }

        &:hover > svg{
            color: #9aaee6;
            /* animation-name: tiny-bounce;
            animation-duration: 300ms; */
        }

        &:hover > p{
            color: #9aaee6;
        }

    `}
`

const FollowIcon = styled(TiUserAddOutline)`
    width: 14px;
    height: 14px;
    color:#636480;
    position: absolute;
    top: 4px;
    left: 11px;
`

const FollowedIcon = styled(FiCheck)`
    width: 13px;
    height: 13px;
    color:#ffffff;
    position: absolute;
    top: 6px;
    left: 7px;
    
`

const FollowText = styled.p`
    font-size: ${props => props.follow ? "10px" : "10px"};
    color: ${props => props.follow ? "#ffffff" : "#636480"};
    margin-left: 7px;
`

export default PeopleFollow