import styled from "styled-components"

const Button = styled.button`
    /* width: 90px; */
    padding: 0px 22px;
    height: 34px;
    cursor: pointer;
    border: ${props => props.inverse ? "1px solid #636480" : "none"};
    background-color: ${props => props.inverse ? "#ffffff" : "#636480"};
    color: ${props => props.inverse ? "#636480" : "#ffffff"};
    outline: 0;
    opacity: ${props => props.disabled && 0.2};
`

export default Button