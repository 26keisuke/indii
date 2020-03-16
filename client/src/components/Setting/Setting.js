import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const Box = styled.div`

    display: flex;
    flex-direction: column;

    & > a {
        margin: 20px;
        padding: 20px;
        width: 200px;
        display: flex;
        font-size: 13px;
        border: 1px solid ${props => props.theme.secondary};
        border-radius: 2px;

        &:hover {
            box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
            transition: box-shadow 0.2s ease;
            border: 1px solid white;
        }

        & > svg {
            margin-right: 10px;
        }
    }
`

class Setting extends Component {
    render() {
        return(
            <Box>
                { this.props.loggedIn && 
                <a href="/api/logout">
                    <AccountCircleOutlinedIcon/>
                    ログアウト
                </a>
                }
                <Link to={"/setting/terms"}>
                    <AssignmentOutlinedIcon/>
                    利用規約
                </Link>
                <Link to={"/setting/policy"}>
                    <VerifiedUserOutlinedIcon/>
                    プライバシーポリシー
                </Link>
            </Box>
        )
    }
}

function mapStateToProps({ auth }){
    return {
        loggedIn: auth.loggedIn
    }
}

export default connect(mapStateToProps)(Setting)