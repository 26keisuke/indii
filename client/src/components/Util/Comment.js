import React from "react"
import styled from "styled-components"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from "prop-types"

const Comment = ({ handleSubmit, bottom, value, handleChange }) => {
    return (
        <Box bottom={bottom}>
            <ArrowWrapper disabled={!value} onClick={value ? handleSubmit : () => {}}>
                <ArrowForwardIosIcon/>
            </ArrowWrapper>
            <InputWrapper>
                <InputBase
                    // rows="2"
                    multiline
                    placeholder="コメントを入力..."
                    value={value}
                    onChange={handleChange}
                />
            </InputWrapper>
        </Box>
    )
}

const ArrowWrapper = styled.div`
    border-radius: 5px;
    min-width: 30px;
    min-height: 30px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.secondary};
    opacity: ${props => props.disabled && 0.3};

    & > svg {
        font-size: 14px;
        color: white;
    }
`

const Box = styled.div`
    position: fixed;
    width: 100%;
    bottom: ${props => props.bottom + "px"};
    background-color: white;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.25);
    display: flex;
    padding: 10px 10px;
    box-sizing: border-box;
    align-items: center;
`

const InputWrapper = styled.div`

    width: 100%;

    & .MuiInputBase-root{
        width: 100%;
    }

    & textarea {
        font-size: 16px;
        line-height: normal;
        overflow: scroll !important;
        max-height: 70px !important;
    }
`

Comment.propTypes = {
    handleSubmit: PropTypes.func,
    bottom: PropTypes.number,
    value: PropTypes.string,
    handleChange: PropTypes.func,
}

export default Comment