import React from "react"
import TextField from "@material-ui/core/TextField"
import styled from "styled-components"

const TalkTitle = (props) => {
    return (
        <TextWrapper>
            <TextField 
                id="talk_title" 
                multiline={props.textarea}
                rows={props.textarea && "5"}
                label={props.title}
                value={props.value}
                onChange={props.handleChange} 
            />
        </TextWrapper>
    )
}

const TextWrapper = styled.div`
    padding: 0px 2px;
    padding-top: 10px;
    padding-bottom: 40px;

    & > div {
        width: 100%;
    }
`

export default TalkTitle