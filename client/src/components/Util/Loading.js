import React, { Component } from "react"
import styled, { keyframes } from "styled-components"

const rotate = keyframes`
    100% {
      transform: rotate(360deg);
    }
`

const LoadingElement = styled.div`
    height: 0;
    width: 0;
    padding: 15px;
    border: 3px solid #c4c4c4;
    border-right-color: #646380;
    border-radius: 22px;
    animation: ${rotate} 1s infinite linear;
    position: absolute;
    left: 50%;
    top: 40%;
    z-index: 10;
`

class Loading extends Component {
    render () {
        return (
            <div>
                <LoadingElement/>
            </div>
        )
    }
}

export default Loading