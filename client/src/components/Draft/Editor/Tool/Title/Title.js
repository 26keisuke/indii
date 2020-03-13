import React, {Component} from "react"
import ArrowSpin from "../../../../Util/ArrowSpin"
import styled from "styled-components"

class Title extends Component {
    render () {
        return (
            <RightInsideTitle onClick={this.props.handleClick}>
                {this.props.title}
                <Icon>
                    {this.props.icon}
                </Icon>
                <ArrowWrapper>
                    <ArrowSpin
                        size={32}
                        handleClick={this.props.handleClick}
                        isOpened={!this.props.isOpened}
                        changed={this.props.changed}
                    />
                </ArrowWrapper>
            </RightInsideTitle>
        )
    }
}


const RightInsideTitle = styled.div`
    height:35px;
    padding-left:42px;
    font-size: 12px;
    display: flex;
    align-items: center;
    color: white;
    background-color: ${props => props.theme.secondary};
    position: relative;
    cursor: pointer;
    box-shadow: 1px 1px 10px #b2b2b2;
`

const ArrowWrapper = styled.div`
    position: absolute;
    right: 14px;
    top: 9px;
`

const Icon = styled.div`
    position: absolute;
    left: 15px;
    top: 10px;
    width: 15px;
    height: 15px;
`


export default Title