import React, { Component } from "react"
import styled from "styled-components"

import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import ja from 'date-fns/locale/ja';
registerLocale("ja", ja)

class Form extends Component {

    renderForm = () => {

        const {toggle, list, handleDateChange, handleTextChange, getState} = this.props

        const res = list.map(elem => {
            return(
                <RefElement key={elem.stateName}>
                    <p>{elem.name}</p>
                    {   elem.required &&
                    <p>* 必須</p>
                    }
                    {   elem.date 
                    ?
                    <DatePicker
                        dateFormat="yyyy/MM/dd"
                        placeholderText="日付を選択"
                        selected={getState(toggle)[elem.stateName]}
                        onChange={(date) => handleDateChange(toggle, elem.stateName, date)}
                        locale="ja"
                    />
                    :
                    <input 
                        placeholder={elem.placeholder} 
                        name={elem.stateName}
                        value={getState(toggle)[elem.stateName]}
                        onChange={(e) => handleTextChange(toggle, elem.stateName, e.target.value)}
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
        left: 100px;
    }

    & input {
        width: 97%;
        font-size: 12px;
        border: none;
        border-bottom: 1px solid #eaeaea;
        padding: 3px 5px;

        &::placeholder{
            opacity: 0.5;
        }
    }
`

export default Form