import styled from "styled-components"

const Button = styled.button`
    padding: 0px 22px;
    height: 34px;
    cursor: pointer;
    border: ${props => props.inverse ? "1px solid rgb(14, 18, 34)" : "none"};
    background-color: ${props => props.inverse ? "#ffffff" : "rgb(14, 18, 34)"};
    color: ${props => props.inverse ? "rgb(14, 18, 34)" : "#ffffff"};
    outline: 0;
    width: ${props => props.width ? props.width : "auto"}; 
    display: flex;
    align-items: center;
    justify-content: center;

    opacity: ${props => props.disabled && 0.2};
`

export default Button