import React, { Component } from "react"
import styled from "styled-components"

import {
        nameList,
        websiteList,
        newsList,
        journalList,
        bookList,
        chapterList,
        paperList,
        mediaList,
        generalList,} from "./List"

import Button from "../../Util/Button"
import Form from "./Form"
import Carousel from "./Carousel"

class Reference extends Component {

    constructor(props) {
        super(props)
        this.state = {

            toggle: {
                website: true,
                news: false,
                book: false,
                journal: false,
                paper: false,
                media: false,
                general: false,
            },

            website: {
                title: "",
                url: "",
                author: "",
                date: "", // publish date
                website: "",
            },

            news: {
                title: "",
                source: "",
                date: "",
                author: "",
                url: "",
            },

            journal: {
                author: "",
                title: "",
                source: "",
                date: "", // volumeのdate
                page: "",
                doi: "",
                URL: "",
            },

            book: {
                author: "",
                title: "",
                date: "",
                publisher: "",
                location: "", // publisher location
                isbnurl: "",
            },

            chapter: {
                author: "",
                bookTitle: "",
                chapterTitle: "",
                date: "",
                page: "",
                editor: "",
                publisher: "",
                location: "", // publisher location
                url: "",
            },

            paper: {
                author: "",
                title: "",
                date: "",
                name: "", // conference name
                location: "", // conference location
                doi: "",
                url: "",
            },

            media: {
                name: "", // license name
                url: "", // license url
                creator: "",
                creatorUrl: "", 
                sourceUrl: "",
                holder: "", // copyright holder
                date: "", // copyright date
            },

            general: {
                title: "",
                author: "",
                date: "",
                url: "",
            },
        }
    }

    getState = (name) => {
        return this.state[name]
    }

    setSelected = (name) => {
        this.setState({
            [name]: true
        })
    }

    unsetSelected = (name) => {
        this.setState({
            [name]: false
        })
    }

    handleDateChange = (date) => {
        this.setState({
            date: date
        })
    }

    render () {
        return (
            <RefBox>
                <Carousel
                    list={nameList}
                />
                <Form
                    list={journalList}
                    date={this.state.date}
                    getState={this.getState}
                    setSelected={this.setSelected}
                    unsetSelected={this.unsetSelected}
                    handleDateChange={this.handleDateChange}
                />
                <RefButtonWrapper>
                    <Button>参照を追加する</Button>
                </RefButtonWrapper>
            </RefBox>
        )
    }
}

const RefBox = styled.div`
    border-right: 1px solid #d2d2d2;
    border-bottom: 1px solid #d2d2d2;
    border-left: 1px solid #d2d2d2;
`

const RefButtonWrapper = styled.div`
    padding: 0px 10px;
    margin-top: -15px;
    margin-right: 12px;
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-end;
`

export default Reference