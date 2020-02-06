import styled from "styled-components"

export const FormWrapper = styled.div`
    height: 100%;
    padding-top:40px;

    &::-webkit-scrollbar {
        width: 10px;  
    }

    & > div {
        position: relative;
        display: flex;
        justify-content: center;
        height: 100%;

        & > p {
            z-index: 10;
            position: absolute;
            font-size: 16px;
            top: -23px;
        }
    }
`

export const FormMount = styled.div`
    height: 110px;
    width: 100%;
    position: absolute;
    background-color: #ffffff;
    z-index:2;
`

export const BackWrapper = styled.div`
    margin-top:-30px;
`