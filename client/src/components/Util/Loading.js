import React from "react"
import styled from "styled-components"
import CircularProgress from '@material-ui/core/CircularProgress';
// import PropTypes from "prop-types"
  
const Wrapper = styled.div`
    position: fixed;
    left: 50%;
    top: 40%;
    z-index: 100;
    transform: translate(-50%, 0);
`
  
const Loading = () => {
    return (
        <Wrapper>
            <CircularProgress 
                color="primary"
            />
        </Wrapper>
    )
}

// Loading.propTypes

export default Loading