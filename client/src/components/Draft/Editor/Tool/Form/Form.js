import React, { Component } from "react"
import styled from "styled-components"
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

class Form extends Component {

    renderForm = () => {

        const {toggle, list, handleDateChange, handleTextChange, getState} = this.props

        const res = list.map(elem => {
            return(
                <RefElement key={elem.stateName}>
                    {   elem.date 
                    ?
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy/MM/dd"
                            margin="normal"
                            id={elem.stateName+"date"}
                            label={
                                <Label>
                                    { elem.name }
                                    { elem.required &&
                                    <span>
                                        <Circle/>
                                        必須
                                    </span>
                                    }
                                </Label>
                            }
                            value={getState(toggle)[elem.stateName]}
                            onChange={(date) => handleDateChange(toggle, elem.stateName, date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    :
                    <TextField 
                        id={elem.stateName+elem.placeholder} 
                        label={
                            <Label>
                                {elem.placeholder}
                                { elem.required &&
                                <span>
                                    <Circle/>
                                    必須
                                </span>
                                }
                            </Label>
                        }
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

const Label = styled.div`
    display: flex;

    & > span {
        margin-left: 5px;
        display: flex;
        align-items: center;
        transform: scale(0.8);
    }
`

const Circle = styled.div`
    width:6px;
    height:6px;
    background-color: #FF5F5F;
    border-radius: 100%;
    margin-right: 5px;
`

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

    & > div {
        font-size: 12px;
        width: 100%;
        margin: 0px;
    }
`

export default Form