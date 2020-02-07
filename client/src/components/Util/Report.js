import React, { Component } from "react"
import styled from "styled-components"

const ReportBox = styled.form`

    margin-bottom: 15px;

    & > div {
        margin: 10px 0px;
        margin-right: 10px;

        & input:checked + label,
        & input:not(:checked) + label
        {
            position: relative;
            padding-left: 30px;
            cursor: pointer;
            display: inline-block;
            color: #333333;
        }

        & input:checked + label:before,
        & input:not(:checked) + label:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 18px;
            height: 18px;
            border: 1px solid #ddd;
            background: #fff;
        }

        & input:checked + label:after,
        & input:not(:checked) + label:after {
            content: '';
            width: 10px;
            height: 10px;
            background: #4CD964;
            position: absolute;
            top: 5px;
            left: 5px;
            border-radius: 100%;
            -webkit-transition: all 0.2s ease;
            transition: all 0.2s ease;
        }

        & input:not(:checked) + label:after {
            opacity: 0;
            -webkit-transform: scale(0.8);
            transform: scale(0.8);
        }

        & input:checked + label:after {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1);
        }

        & input:checked,
        & input:not(:checked) {
            position: absolute;
            left: -9999px;
        }

    }
`

class Report extends Component {
    render () {
        return (
            <ReportBox>
                <div>
                    <input onChange={(e) => this.props.handleChange(e, "problem0")} type="checkbox" id="0" name="p0"/>
                    <label htmlFor="0">理解するのが難しいです。</label>
                </div>
                <div>
                    <input onChange={(e) => this.props.handleChange(e, "problem1")} type="checkbox" id="1" name="p1"/>
                    <label htmlFor="1">書かれている内容が不適切です。</label>
                </div>
                <div>
                    <input onChange={(e) => this.props.handleChange(e, "problem2")} type="checkbox" id="2" name="p2"/>
                    <label htmlFor="2">書かれている内容が間違っています。</label>
                </div>
                <div>
                    <input onChange={(e) => this.props.handleChange(e, "problem3")} type="checkbox" id="3" name="p3"/>
                    <label htmlFor="3">タイトルを変えるべきです。</label>
                </div>
                <div>
                    <input onChange={(e) => this.props.handleChange(e, "problem4")} type="checkbox" id="4" name="p4"/>
                    <label htmlFor="4">同じようなポストが既にあります。</label>
                </div>
            </ReportBox>
        )
    }
}

export default Report