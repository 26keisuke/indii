import React, { Component } from "react"
import styled from "styled-components"

const AddColumnInput = styled.input`
    width: 90%;
    border: none;
    border-bottom: 1px solid #eaeaea;
    margin-top: 10px;
    font-size: 13px;
    margin-bottom: 18px;
    font-family: ${props => props.theme.font};
`
// ここ変えてsetvalueに変えて以降確認できていないから後々エラー出る可能性あり（{App->confirm->ここ}からpropsでとってくるよりConfirmから直接propsで取ってくるようにした）
class AddColumn extends Component {

    constructor(props){
        super(props)
        this.props.setValue("")
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.postAction(true, this.props.action, this.props.value)
    }

    render () {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <AddColumnInput 
                    onChange={(e) => this.props.setValue(e.target.value)}
                    type="text" 
                    placeholder="タイトルを入力..."/>
            </form>
        )
    }
}

export default AddColumn