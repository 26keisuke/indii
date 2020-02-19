import React, { Component } from "react"
import styled from "styled-components"

import { MdChevronLeft, MdChevronRight} from "react-icons/md"

class Navigation extends Component {

    render () {
        return (
            <Row>
                <div>
                    <MdChevronLeft/>
                    <p>前</p>
                </div>
                <div>
                    <p>次</p>
                    <MdChevronRight/>
                </div>
            </Row>
        )
    }
}

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 18px;

    & > div:nth-child(1) {
        & > svg {
            margin-right: 10px;
        }
    }

    & > div:nth-child(2) {
        & > svg {
            margin-left: 10px;
        }
    }

    & > div {
        display: flex;
        flex-direction: row;
        cursor: pointer;
        align-items: center;

        & > svg {
            transform: scale(1.5);
        }

    }

`


export default Navigation