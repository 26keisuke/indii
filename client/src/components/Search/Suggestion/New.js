import React, { Component } from "react";
import { Link } from "react-router-dom"
import styled from "styled-components";
import PropTypes from "prop-types";

const SearchBox = styled(Link)`
    cursor: pointer;
    
    & > div {
        width: auto;
        padding: 10px 20px;
        display: flex;
        align-items: center;

        background-color: ${props => props.onHover && "rgb(240,240,240)"};

        &:hover {
            background-color: rgb(240,240,240);
        }

        & > span {
            margin-right: 10px;
        }
    }
`

class New extends Component {
    render() {

        const { url, value, message, handleClick, icon, onHover } = this.props

        return (
            <SearchBox to={url} onClick={() => handleClick(value)} onHover={onHover}>
                <div>
                    {icon}
                    <span/>
                    {message}
                </div>
            </SearchBox>
        )
    }
}

New.propTypes = {
    url: PropTypes.string,
    message: PropTypes.string, // before and after: eg) 新しい[value]を検索
    icon: PropTypes.object,
    value: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
}

export default New