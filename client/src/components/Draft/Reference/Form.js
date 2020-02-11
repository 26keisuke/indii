import React, { Component } from "react"
import styled from "styled-components"

import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import ja from 'date-fns/locale/ja';
registerLocale("ja", ja)

class Form extends Component {

    renderForm = () => {

        const {list, date, handleDateChange, setSelected, unsetSelected, getState} = this.props

        const res = list.map(elem => {
            return(
                <RefElement key={elem.name} selected={getState(elem.name)}>
                    <p>{elem.name}</p>
                    {   elem.required &&
                    <p>* 必須</p>
                    }
                    {   elem.date 
                    ?
                    <DatePicker
                        selected={date}
                        onChange={handleDateChange}
                        locale="ja"
                    />
                    :
                    <input 
                        placeholder={elem.placeholder} 
                        name={elem.name}
                        onSelect={() => setSelected(elem.name)}
                        onBlur={() => unsetSelected(elem.name)}
                    />
                    }
                </RefElement>
            )
        })
        return res;
    }

    render() {
        return (
            <RefForm>
                {this.renderForm()}
            </RefForm>
        )
    }
}


const RefForm = styled.form`
    padding: 14px;
`

const RefElement = styled.div`
    position: relative;
    margin-bottom: 20px;

    & div {
        font-family: "Gennokaku Gothic";
    }

    & > p:nth-child(1) {
        color: #585858;
        font-size: 10px;
        margin-left: 4px;
        margin-bottom: 7px;
    }

    & > p:nth-child(2) {
        position: absolute;
        top: 0px;
        color: #585858;
        font-size: 10px;
        left: 60px;
    }

    & input {
        width: 97%;
        font-size: 12px;
        border: none;
        border-bottom: ${props => props.selected ? "1px solid #9EAEE5" : "1px solid #d2d2d2"};
        padding: 3px 5px;
        font-family: "Gennokaku Gothic" !important;

    }
`

export default Form