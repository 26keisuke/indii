import React, { Component } from "react"
import styled, { css } from "styled-components"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import axios from "axios"

import * as actions from "../actions"

import { TiUserAddOutline } from 'react-icons/ti';
import { FiCheck } from 'react-icons/fi';

let ct = 0;

class FollowBtn extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            follow: false,
            madeFollowAction: false,
        }
    }

    componentDidMount() {
        // こいつが５回もコールされてるから、グローバルカウンターで一回にしてる
        if(this.props.auth.loggedIn && (ct == 0)) {
            this.checkIfFollows()
            this.setUpdater() 
            ct++
        }
    }

    componentWillMount() {
        ct = 0;
    }

    setUpdater = () => {

        window.addEventListener("beforeunload", this.handleWindowClose);

        this.autoUpdate = setInterval(() => {
            if (this.state.madeFollowAction) {
                const url = `/api/profile/${this.props.id}/follow`
                axios.post(url, {follow: this.state.follow})
                .then(()=>{
                    this.setState({
                        madeFollowAction: false,
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }, 10000)
    }

    handleWindowClose = () => {
        if(this.state.madeStarAction) {
            const url = `/api/profile/${this.props.id}/follow`
            axios.post(url, {follow: this.state.follow})
        }
    }

    checkIfFollows = () => {
        const ls = this.props.auth.info.follows;
        var followed = false;
        for(var i = 0; i < ls.length; i++) {
            if(ls[i].user === this.props.id) {
                followed = true
                break
            };
        };
        this.setState({ follow: followed })
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.auth.loggedIn && this.props.auth.loggedIn){
            this.setUpdater()
        }

        if((!prevProps.auth.info.follows || !prevProps.id) && (this.props.id && this.props.auth.info.follows)) {
            this.checkIfFollows()
        }

        if (prevProps.auth.info.follows && (prevProps.auth.info.follows.length !== this.props.auth.info.follows.length)){
            this.checkIfFollows()
        }
    }

    componentWillUnmount() {

        if (this.props.auth.loggedIn){
            if(this.state.madeFollowAction) {
                const url = `/api/profile/${this.props.id}/follow`
                axios.post(url, {follow: this.state.follow})
            }
            window.removeEventListener("beforeunload", this.handleWindowClose);
        }

        clearInterval(this.autoUpdate)
    }

    handleFollowClick = (e) => {
        e.preventDefault()
        this.setState({ 
            follow: !this.state.follow ? true : false,
            madeFollowAction: true,
        })
    }

    handleAuthClick = (e) => {
        e.preventDefault()
        this.props.showLogin()
        this.props.enableGray()
    }

    render() {

        const { follow } = this.state
        const { id, auth, show } = this.props

        return (
            <div>
                {   ((id !== auth.info._id) && (show === true)) &&
                <Follow 
                    follow={follow} 
                    onClick={!auth.info._id ? this.handleAuthClick : this.handleFollowClick}
                >
                    {
                        follow 
                        ? <FollowedIcon/>
                        : <FollowIcon/>
                    }  
                    <FollowText follow={follow}>{follow ? "フォロー中" : "フォロー"}</FollowText>
                </Follow>
                }
            </div>
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

FollowBtn.defaultProps = {
    show: true,
}

FollowBtn.propTypes = {
    id: PropTypes.string,
    show: PropTypes.bool,
}

function mapStateToProps({auth}) {
    return {
        auth
    }
}

export default connect(mapStateToProps, actions)(FollowBtn)