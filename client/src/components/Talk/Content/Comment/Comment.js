import React, { Component } from "react"
import styled from "styled-components"
import TextField from '@material-ui/core/TextField';
import Button from "../../../Util/Button"
import { IoIosSend } from "react-icons/io"
// import { FiMinus } from "react-icons/fi"

class Comment extends Component {
    render() {
        return(
            <CommentBox>
                <TextField
                    id="outlined-textarea"
                    label="コメントを追加"
                    placeholder="コメントを入力..."
                    rows="3"
                    multiline
                    value={this.props.value}
                    onChange={this.props.handleChange}
                    variant="outlined"
                />
                <ButtonWrapper>
                    <Button disabled={!this.props.value} onClick={this.props.handleSubmit}>追加<SendIcon/></Button>
                </ButtonWrapper>
                {/* <ShrinkIcon/> */}
            </CommentBox>
        )
    }
}

// const ShrinkIcon = styled(FiMinus)`
//     position: absolute;
//     color: #333333;
//     top: 10px;
//     transform: scale(1.8);
//     right: 30px;
// `

const ButtonWrapper = styled.div`
    width: 88px;
    align-self: flex-end;
    margin-right: 10%;
`

const SendIcon = styled(IoIosSend)`
    margin-left: 7px;
    margin-top: 2px;
`

const CommentBox = styled.div`
    box-shadow: 1px 1px 10px #d2d2d2;
    background-color: white;
    position: sticky;
    bottom: 0px;
    width: 100%;
    /* left: 41px; */
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    max-height: 155px;
    padding-top: 30px;
    border-radius: 3px;
    padding-bottom: 10px;

    & > div:nth-child(1) {
        width: 80%;
        margin-bottom: 10px;
    }
`

export default Comment