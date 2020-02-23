import React, { Component } from "react"
import styled from "styled-components"

const Box = styled.textarea`
    -webkit-appearance: none;
    outline: none;
    margin-bottom: 15px;
    height: 100px;
    border: 1px solid #d2d2d2;
`

class TextArea extends Component {

    render() {
        return (
            <Box
                maxLength="150"
                value={this.props.value}
                onChange={(e) => this.props.handleChange(e)}
            />
        )
    }
}

export default TextArea