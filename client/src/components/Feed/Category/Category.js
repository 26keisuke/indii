import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import computer from "../../../images/computer_science.png"
import business from "../../../images/business.png"

const Box = styled.div`
    display: flex;
    align-items: center;

    & > img {
        width: 100%;
        border-radius: 8px;
        box-shadow: 1px 1px 10px #d2d2d2;
    }
`

const Category = ({ category }) => {
    return (
        <>
        <Box>
            <img src={computer} alt="コンピューターサイエンスの画像"/>
        </Box>
        <Box>
            <img src={business} alt="コンピューターサイエンスの画像"/>
        </Box>
        </>
    )
}

function mapStateToProps({ feed }){
    return {
        category: feed.category
    }
}

export default connect(mapStateToProps)(Category)