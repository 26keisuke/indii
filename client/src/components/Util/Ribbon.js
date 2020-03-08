import React, { Component } from "react";
import styled from "styled-components"

class Ribbon extends Component {
    render() {
        return (
            <div>
                <Content>
                    <Element success={this.props.success}>{this.props.content}</Element>
                </Content>
            </div>
        )
    }
}

const Content = styled.div`
    position: absolute;
    top: -6px;
    left: -6px;
    width: 89px;
    height: 91px;
    overflow: hidden;
    transform: rotate(-90deg);
`
  
const Element = styled.span`
    display: inline-block;
    position: absolute;
    padding: 7px 0;
    left: -23px;
    top: 22px;
    width: 160px;
    text-align: center;
    font-size: 13px;
    line-height: 16px;
    background: ${props => props.success ? "#4CD964" : "#FF5F5F"};
    color: #fff;
    letter-spacing: 0.05em;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`

export default Ribbon;