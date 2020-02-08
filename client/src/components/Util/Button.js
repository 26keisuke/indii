import styled from "styled-components"

const Button = styled.button`
    /* width: 90px; */
    padding: 0px 22px;
    height: 34px;
    cursor: pointer;
    border: none;
    background-color: #636480;
    color: #ffffff;
    font-family: "Gennokaku Gothic";
    outline: 0;
    opacity: ${props => props.disabled && 0.2};
`

export default Button