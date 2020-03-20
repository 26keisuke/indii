import React, {useEffect} from "react"
import TextField from "@material-ui/core/TextField"
import styled from "styled-components"

const ConfirmTextField = (props) => {

    useEffect(() => {
        if(props.init){
            props.init()
        }
    }, [])

    return (
        <TextWrapper>
            <TextField 
                id="talk_title" 
                multiline={props.textarea}
                rows={props.textarea ? "5" : "1"}
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

export default ConfirmTextField