import React, { Component } from "react"
import styled, { css } from "styled-components"

class Preview extends Component {
    render() {
        return (
            <PreviewElement hide={!this.props.display} profile={this.props.profile} topic={this.props.topic} mobile={this.props.mobile} post={this.props.post}>
                <p>{this.props.placeholder || "プレビュー"}</p>
                <div/>
                <img 
                    src={this.props.display} 
                    alt={this.props.alt}
                />
            </PreviewElement>
        )
    }
}

export const PreviewElement = styled.div`
    position: relative;
    margin: 0px 15px;
    margin-top: 25px;

    & > p {
        margin-bottom:10px;
        color: #585858;
        font-size: 10px;
        margin-left: 5px;
    }

    & > div {
        position: absolute;
        border: 1px solid black;
        border-style: dashed;
        border-width: 1px;

        ${props => props.mobile 
        ? css`
            width: 380px;
            height: 200px;
            border-bottom-right-radius: 35px;
            border-bottom-left-radius: 35px;
        `
        : props => props.topic 
        ? css`
            width: 250px;
            height: 250px;
        `
        : props => props.post
        ? css`
            width: 292px;
            height: 292px;
        `
        : props => props.profile
        ? css`
            width: 200px;
            height: 200px;
        `
        : css`
            width: 380px;
            height: 200px;
        `}
        
        ${props => !props.hide && css`
            opacity: 0;
        `}
    }

    & > img {

        object-fit: contain;
        border: 1px solid #eaeaea;

        ${props => props.mobile 
        ? css`
            min-width: 380px;
            min-height: 200px;
            max-width: 380px;
            max-height: 200px;
            border-bottom-right-radius: 45px;
            border-bottom-left-radius: 45px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            display: block;
        `
        : props => props.topic 
        ? css`
            min-width: 250px;
            min-height: 250px;
            max-width: 250px;
            max-height: 250px;
            display: block;
        ` 
        : props => props.post 
        ? css`
            min-width: 292px;
            min-height: 292px;
            max-width: 292px;
            max-height: 292px;
            display: block;
        `
        : props => props.profile
        ? css`
            min-width: 200px;
            min-height: 200px;
            max-width: 200px;
            max-height: 200px;
            display: block;
        `
        : css`
            min-width: 380px;
            min-height: 200px;
            max-width: 380px;
            max-height: 200px;
            display: block;
        `}

        ${props => props.hide && css`
            opacity: 0;
        `}
    }
`
export default Preview