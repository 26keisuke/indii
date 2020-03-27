import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

class Feed extends Component {
    render() {

        const { children } = this.props

        return (
            <SearchFeedWrapper>
                <SearchIcon color="primary"/>
                { children }
            </SearchFeedWrapper>
        )
    }
}

Feed.propTypes = {
    children: PropTypes.object, // <Search {withEnhancedLogic by controller}/>が入る
}

const SearchIcon = styled(SearchOutlinedIcon)`
    height: 17px;
    width: 17px;
    left: 12px;
    position: absolute;
    pointer-events: none;
    z-index:3;
`

const SearchFeedWrapper = styled.div`
    display: flex;
    align-items: center;
    width:100%;
    max-width: 550px;
    position: relative;

    @media  only screen and (max-width: 670px) {
        max-width: 350px !important;
        margin: 0px 10px;
    }
`

export default Feed