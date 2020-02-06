import React, { Component } from "react";
import { Link } from "react-router-dom"
import styled from "styled-components";
import PropTypes from "prop-types";

const SearchBox = styled(Link)`
    & > div {
        width: auto;
        padding: 10px 20px;
    }
`

class New extends Component {
    render() {

        const {url, children, value, text, handleClick } = this.props

        return (
            <SearchBox to={url} onClick={() => handleClick(value)}>
                <div>
                    {children}{text[0]}<span>"{value}"</span>{text[1]}
                </div>
            </SearchBox>
        )
    }
}

New.propTypes = {
    url: PropTypes.string,
    text: PropTypes.arrayOf(PropTypes.string).isRequired, // before and after: eg) 新しい[value]を検索
    children: PropTypes.element,
    value: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
}

export default New