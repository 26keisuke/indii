import React from "react"
import styled, { css } from "styled-components"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import * as actions from "../../../actions"

import { TiUserAddOutline } from 'react-icons/ti';
import { FiCheck } from 'react-icons/fi';

import { useUpdater } from "../../Util/util" 

const FollowBtn = ({ loggedIn, follows, id, userId, show, ...props }) => {
    const [isFollowed, handleFollowClick] = useUpdater(loggedIn, follows, "user", id, "INDII_USER_FOLLOW", props.setUserFollow)
    
    const handleAuthClick = (e) => {
        e.preventDefault()
        props.showLogin()
    }

    return (
        <div>
            {   ((id !== userId) && (show === true)) &&
            <Follow 
                follow={isFollowed} 
                onClick={!userId ? handleAuthClick : handleFollowClick}
            >
                {
                    isFollowed
                    ? <FollowedIcon/>
                    : <FollowIcon/>
                }  
                <FollowText follow={isFollowed}>{isFollowed ? "フォロー中" : "フォロー"}</FollowText>
            </Follow>
            }
        </div>
    ) 
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
        background-color: ${props => props.theme.secondary};
        padding: 2px 1px;
        padding-left: 9px;
    `
    : css`
        border: 1px solid ${props => props.theme.primary};
        padding: 1px 0px;
        padding-left: 8px;

        &:hover {
            border:1px solid ${props => props.theme.secondary};
        }

        &:hover > svg{
            color: ${props => props.theme.secondary};
        }

        &:hover > p{
            color: ${props => props.theme.secondary};
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

function mapStateToProps({ auth }) {
    return {
        follows: auth.follows,
        userId: auth.info._id,
        loggedIn: auth.loggedIn
    }
}

export default connect(mapStateToProps, actions)(FollowBtn)