import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { AiOutlineQuestionCircle } from "react-icons/ai"

import * as actions from "../../actions"


const Wrapper = styled(AiOutlineQuestionCircle)`
    position: absolute;
    width: 20px;
    height: 20px;
    top: ${props => props.top + "px"};
    right: ${props => props.right + "px"};
    color: ${props => props.theme.secondary};
`

const Question = ({ top, right, title, content, ...props }) => {

    const handleClick = (e) => {
        e.preventDefault()
        props.enableGray()
        props.showConfirmation("", "", title, "", content)
    }

    return (
        <Wrapper onClick={handleClick} top={top} right={right} />
    )
}

Question.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    top: PropTypes.number,
    right: PropTypes.number,
}

export default connect(null, actions)(Question)