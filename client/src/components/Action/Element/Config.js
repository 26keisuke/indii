import React, { Component } from "react"
import styled from "styled-components"
import ToggleBtn from "../../Util/ToggleBtn"

class Config extends Component {
    render() {
        return (
            <form>
                <ConfigInput>{this.props.title}</ConfigInput>
                <ConfigBox width={this.props.width}>
                    <div>
                        <p>{this.props.on ? this.props.text[0] : this.props.text[1]}</p>
                        { this.props.recommend &&
                        <span>{this.props.on && "(推奨)"}</span>
                        }
                    </div>
                    <ToggleBtn
                        on={this.props.on}
                        handleClick={this.props.handleClick}
                    />
                </ConfigBox>
                <ConfigUnderline width={this.props.width}/>
            </form>
        )
    }
}

const ConfigBox = styled.div`
    display: flex;
    flex-direction: row;
    width: ${props => String(props.width) + "px"};
    align-items: center;
    justify-content: space-between;

    & > div:nth-child(1) {

        display: flex;
        align-items: center;

        & > p {
            margin-top: 15px;
            margin-left: 9px;
            margin-bottom: 7px;
            font-size: 14px;
        }

        & > span {
            color: #666666;
            font-size: 10px;
            margin-top: 10px;
            margin-left: 7px;
        }
    }
`


const ConfigInput = styled.p`
    color: #333333 !important;
    font-size: 11px !important;
`

const ConfigUnderline = styled.div`
    width: ${props => String(props.width) + "px"};
    border-bottom: 1px solid #838383;
    margin-bottom: 30px;
`

export default Config