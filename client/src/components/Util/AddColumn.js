import React, { Component } from "react"
import styled from "styled-components"

const AddColumnInput = styled.input`
    width: 90%;
    border: none;
    border-bottom: 1px solid #d2d2d2;
    margin-top: 10px;
    font-size: 13px;
    margin-bottom: 18px;
    font-family: ${props => props.theme.font};
`

class AddColumn extends Component {
    render () {
        return (
            <form onSubmit={(e) => {e.preventDefault(); this.props.postAction(this.props.action, this.props.id)}}>
                <AddColumnInput 
                    onChange={(e) => this.props.handleChange(e)}
                    type="text" 
                    placeholder="タイトルを入力..."/>
            </form>
        )
    }
}

export default AddColumn