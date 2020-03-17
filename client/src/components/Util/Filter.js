import React, { Component } from "react"
import styled from "styled-components"

const FilterElement = styled.div`
    background-color: rgba(0,0,0,.1);
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 100;
    transition: show .2s;
    z-index: 12;
`

class Filter extends Component {
    render () {
        return (
            <div>
                <FilterElement/>
            </div>
        )
    }
}

export default Filter