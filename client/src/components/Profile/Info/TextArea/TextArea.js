import React, { Component } from "react"
import styled from "styled-components"
import TextField from '@material-ui/core/TextField';

const Wrapper = styled.div`
    padding: 0px 2px;
    padding-top: 10px;
    padding-bottom: 35px;
    display: flex;
    flex-direction: column;
    & > div {
        margin-bottom: 10px;
    }
`

class TextArea extends Component {

    componentDidMount() {
        const initial = this.props.value

        this.props.setValue(
            [initial.userName,initial.comment,initial.intro],
            ["userName","comment","intro"]
        )
    }

    componentWillUnmount() {
        this.props.setValue({})
    }

    render() {

        const changed = this.props.changedValue

        return (
            <Wrapper>
                <TextField
                    id="userName" 
                    label="ユーザー名" 
                    value={changed.userName}
                    onChange={(e) => this.props.setValue(e.target.value, "userName")} 
                    inputProps={{
                        maxLength: 25,
                    }}
                />
                <TextField
                    id="comment" 
                    label="職業・経歴・一言" 
                    value={changed.comment}
                    onChange={(e) => this.props.setValue(e.target.value, "comment")} 
                    inputProps={{
                        maxLength: 30,
                    }}
                />
                <TextField
                    id="intro" 
                    label="自己紹介" 
                    multiline
                    rows={5}
                    value={changed.intro}
                    onChange={(e) => this.props.setValue(e.target.value, "intro")}
                    inputProps={{
                        maxLength: 150,
                    }}
                />
            </Wrapper>
        )
    }
}

export default TextArea