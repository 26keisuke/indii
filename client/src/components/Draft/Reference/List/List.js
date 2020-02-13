import React, { Component } from "react"
import styled from "styled-components"

const ListBox = styled.div`
    display: flex;
    flex-direction: column;

    & > div:nth-child(1) {

        padding-bottom: 5px;
        border-bottom: 1px solid #d2d2d2;
        margin-bottom: 10px;

        & > p:nth-child(1) {
            padding-left: 20px;
            font-size: 14px;
        }
    }

    & > div:nth-child(2) {
        
    }
`

const RefElement = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;

    & > div:nth-child(1) {
        margin-right: 10px;
    }

    & > div:nth-child(2) {
 
    }
`

const RefSection = styled.div`

    display: flex;
    flex-direction: row;
    margin-bottom: 2px;

    & > p:nth-child(1) {
        margin-right: 10px;
    }
`

function jpMapping(enName) {
    switch(enName){
        case "title":
            return 
        case "url":
            return 
        case "author":
            return 
        case "date":
            return 
        case "url":
            return 
        case "author":
            return 
    }
}

class List extends Component {

    renderSection = (ref) => {
        const res = Object.entries(ref).map((section, index) => {
            if(section[1]){
                return (
                    <RefSection key={index}>
                        <p>{section[0]}:</p>
                        { section[0].toLowerCase().includes("date")
                        ?
                        <p>{section[1].toLocaleDateString()}</p>
                        :
                        <p>{section[1]}</p>
                        }
                    </RefSection>
                )
            }
        })

        return res;
    }

    renderRef = () => {
        const res = this.props.reference.map((ref, index) =>
            <RefElement key={index}>
                <div>[{index+1}]</div>
                <div>
                    {this.renderSection(ref)}
                </div>
            </RefElement>
        )

        return res;
    }

    render() {
        return (
            <ListBox>
                <div>
                    <p>参照一覧</p>
                </div>
                <div>
                    {this.renderRef()}
                </div>
            </ListBox>
        )
    }
}

export default List