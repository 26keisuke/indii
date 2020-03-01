import React, { Component } from "react"
import styled, { css } from "styled-components"
import { PreviewTitle } from "../Element/Element"
import Title from "../Element/Title"

class Config extends Component {
    render() {
        return (
            <form>
                <Title title={this.props.title}/>
                <PreviewConfig on={this.props.on}>
                    <PreviewTitle>{this.props.on ? this.props.text[0] : this.props.text[1]}</PreviewTitle>
                    <div>
                        <input type="button"/>
                        <div/>
                    </div>
                </PreviewConfig>
                <ConfigUnderline/>
            </form>
        )
    }
}


export const PreviewConfig = styled.div`
    display: flex;
    flex-direction: row;
    width: 433px;
    align-items: center;
    justify-content: space-between;

    & > div {
        position: relative;

        & > input {
            position: absolute;
            top: -10px;
            width: 27px;
            height: 27px;
            margin-top: 12px;
            border: none;
            border-radius: 100%;
            box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);

            ${props => props.on
            ? css`
                right: 3px; 
                background-color: #9EAEE6;
            `
            : css`
                right: 20px; 
                background-color: #d2d2d2;
            `};
        }

        & > div {
            border: 1px solid #d2d2d2;
            width: 48px;
            height: 30px;
            border-radius: 50px;
        }

    }
`

export const ConfigUnderline = styled.div`
    width: 440px;
    border-bottom: 1px solid #838383;
    margin-bottom: 30px;
`


export default Config