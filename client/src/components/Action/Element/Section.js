import React, { Component } from "react"
import styled, { css } from "styled-components"
import { PreviewTitle } from "./Element"

import Title from "./Title"

class Section extends Component {
    render() {
        return (
            <div>   
                <Title title={this.props.title}/>
                { this.props.edit &&
                <Form onSubmit={(e) => this.props.handleSubmit(e)} focus={this.props.focus} width={this.props.width}>
                    <input 
                        type="text" 
                        onFocus={this.props.handleFocus} 
                        onBlur={this.props.handleBlur} 
                        onChange={(e) => this.props.handleChange(e)}
                        value={this.props.content}
                    />
                    <div/>
                </Form>
                }
                { (this.props.edit) || (!this.props.hideContent) &&
                ([
                <PreviewTitle key={"title"}>{this.props.content}</PreviewTitle>,
                <PreviewUnderline key={"underLine"} width={this.props.width}/>
                ])
                }
            </div>
        )
    }
}


const Form = styled.form`
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 22px;
    margin-bottom: 30px;

    & > input {
        border: none;
        width: ${props => String(props.width) + "px"};
        border-bottom: 1px solid #838383;
        font-size: 14px;
        padding-bottom: 7px;
        
        margin: 0px;
        font-feature-settings: "palt";
        letter-spacing: 1.0px;
    }

    & > div {
        width: 0px;
        transition: 200ms;
        position: absolute;

        ${props => props.focus && css`
            width: ${props => String(props.width) + "px"};
            border-bottom: 2px solid #9EAEE5;
            bottom: -1px;
        `}
    }
`

const PreviewUnderline = styled.div`
    width: ${props => String(props.width) + "px"};
    border-bottom: 1px solid #838383;
    margin-bottom: 30px;
`

export default Section