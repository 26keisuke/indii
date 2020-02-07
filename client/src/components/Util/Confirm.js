import React, { Component } from "react"
import styled, {css} from "styled-components"

import Report from "./Report"
import AddColumn from "./AddColumn"

import { IoMdClose } from "react-icons/io"

class Confirm extends Component {

    renderReport = () => {
        return (
            <Report
                handleChange = {this.props.reportChange}
            />
        )
    }

    renderAddColumn = (id, action) => {
        return (
            <AddColumn
                id={id}
                action={action}
                postAction={this.postAction}
                handleChange={this.props.addColumnChange}
            />
        )
    }

    renderContent = (id, action) => {
        switch(action){
            case "GIVE_FEEDBACK":
                return this.renderReport()
            case "ADD_COLUMN":
                return this.renderAddColumn(id, action)
        }
    }

    render () {

        const {innerRef, id, action, title, caution, message,
             buttonMessage, cancel, postAction} = this.props

        return (
            <ConfirmBox ref={innerRef} cancel={cancel}>
                <div>
                    <ConfirmIcon onClick={() => postAction(action)}/>
                    <p>{title}</p>
                    <p>{message}</p>
                    <p>{caution}</p>
                    {this.renderContent(id, action)}
                    <div>
                        <button onClick={() => postAction(action, id)}>{buttonMessage}</button>
                        <button onClick={() => postAction(action)}>キャンセル</button>
                    </div>
                </div>
            </ConfirmBox>
        )
    }
}

const ConfirmBox = styled.div`
    position: absolute;
    width: 400px;
    padding: 20px 30px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
    background-color: #ffffff;
    border-radius: 3px;;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    ${props => props.cancel
    ? css`
        animation: onLeave 200ms ease-out forwards;
    `
    : css `
        animation: onEnter 200ms ease-out;
    `}

    & > div {
        position: relative;
        display: flex;
        flex-direction: column;

        & > p:nth-child(2){
            font-size: 14px;
            margin-bottom: 15px;
            font-weight: bold;
        }

        & > p:nth-child(3){
            margin-bottom: 15px;
        }

        & > p:nth-child(4){
            margin-top: -10px;
            margin-bottom: 5px;
            font-size: 10px;
            color: #838383
        }

        & > div {
            align-self: flex-end;

            & > :nth-child(1){
                font-family: ${props => props.theme.font};
                background-color: #636480;
                color: white;
                border: none;
                height:30px;
                width: 80px;
                border-radius: 3px;
                margin-right: 20px;
                cursor: pointer;

                &:focus {
                    outline: none;
                }
            }

            & > :nth-child(2){
                font-family: ${props => props.theme.font};
                border: 0.5px solid #838383;
                height:30px;
                width: 80px;
                border-radius: 3px;
                cursor: pointer;

                &:focus {
                    outline: none;
                }
            }

        }
    }
`

const ConfirmIcon = styled(IoMdClose)`
    position: absolute;
    right: -13px;
    top: -13px;
    transform: scale(1.2);
    padding: 13px;
    cursor: pointer;
`

export default Confirm