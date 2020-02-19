import styled, { css } from "styled-components"

const HoverIcon = styled.div`

    position: relative;

    & > p {
        width:40px;
        height:40px;
        position: absolute;
        top:-10px;
        left: -11px;
        cursor: pointer;

        &:hover::before {
            display: block;
        }

        ${props => props.shadow ? css`
            &::before {
                content: "";
                position: absolute;
                display: none;
                width:40px;
                height:40px;
                background-color: #9EAEE5;
                opacity: 0.1;
                border-radius: 100%;
            }
        `
        : css``}

    }
`

export default HoverIcon