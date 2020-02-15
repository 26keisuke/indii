import React, { Component } from "react"
import styled from "styled-components"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from "axios"

import * as actions from "../../../actions"

import {
        nameList,
        websiteList,
        newsList,
        journalList,
        bookList,
        chapterList,
        paperList,
        mediaList,
        generalList,
        stateName} from "./Data/data"
        
import Button from "../../Util/Button"
import Form from "./Form/Form"
import List from "./List/List"
import Carousel from "./Carousel/Carousel"

import { Space } from "../../Theme"

class Reference extends Component {

    constructor(props) {
        super(props)
        this.state = {

            toggle: "website",

            reference: [],
            tempReference: {},

            website: {
                title: "",
                url: "",
                author: "",
                postDate: null, // publish date
                website: "",
            },

            news: {
                title: "",
                source: "",
                date: null,
                author: "",
                url: "",
            },

            journal: {
                author: "",
                title: "",
                source: "",
                date: null, // volumeのdate
                page: "",
                doi: "",
                URL: "",
            },

            book: {
                author: "",
                title: "",
                publishDate: null,
                publisher: "",
                isbnurl: "",
            },

            chapter: {
                author: "",
                bookTitle: "",
                chapterTitle: "",
                date: null,
                page: "",
                editor: "",
                publisher: "",
                url: "",
            },

            paper: {
                author: "",
                title: "",
                heldDate: null,
                conferenceName: "", // conference name
                doi: "",
                url: "",
            },

            media: {
                creator: "",
                creatorUrl: "", 
                sourceUrl: "",
                licenseName: "", // license name
                licenseUrl: "", // license url
                licenseHolder: "", // copyright holder
                licenseDate: null, // copyright date
            },

            general: {
                title: "",
                author: "",
                date: null,
                url: "",
            },
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // tempReferenceの部分は、最初にinitializeした時に呼ばれる（空白のobjがaxiosで送られる）から必要
        if((prevState.reference !== this.state.reference) && (this.state.tempReference.refType)) {
            const url = this.props.location.pathname
            const draftId = url.substring(url.lastIndexOf('/') + 1)
            axios.post(`/api/draft/${draftId}/ref`, {ref: this.state.tempReference})
            .then(
                this.setState({
                    ...this.state,
                    tempReference: {},
                })
            )
            .catch(err => {
                console.log(err)
            })
        } else if (prevProps.draft !== this.props.draft) {
            this.setState({
                reference: this.props.draft.ref || []
            })
        }
    }

    getState = (name) => {
        return this.state[name]
    }

    setToggle = (name) => {
        this.setState({
            toggle: name,
        })
    }

    handleTextChange = (name, area, value) => {
        this.setState({
            ...this.state,
            [name]: {
                ...this.state[name],
                [area]: value
            }
        })
    }

    handleDateChange = (name, stateName, date) => {
        this.setState({
            ...this.state,
            [name]: {
                ...this.state[name],
                [stateName]: date
            }
            
        })
    }

    renderList = () => {

        const { toggle } = this.state

        if (toggle === "website") {
            return websiteList
        } else if (toggle === "news") {
            return newsList
        } else if (toggle === "book") {
            return bookList
        } else if (toggle === "journal") {
            return journalList
        } else if (toggle === "chapter") {
            return chapterList
        } else if (toggle === "paper") {
            return paperList
        } else if (toggle === "media") {
            return mediaList
        } else if (toggle === "general") {
            return generalList
        }
    }

    handleSubmit = () => {

        const type = {
            refType: this.state.toggle,
        }

        const data = Object.assign({}, this.state[this.state.toggle])
        const merged = Object.assign({}, type, data)
        const subject = this.state.reference.slice()

        subject.push(merged)

        Object.keys(data).forEach(key => {
            if(key.toLowerCase().includes("date")){
                data[key] = new Date()
            } else {
                data[key] = ""
            }
        })

        this.setState({
            ...this.state,
            reference: subject,
            tempReference: merged,
            [this.state.toggle]: data,
        })
    }

    render () { 

        return (
            <div>
                <RightInsideTitle>参照を追加</RightInsideTitle>
                <RefBox>
                    <Carousel
                        list={nameList}
                        state={stateName}
                        setToggle={this.setToggle}
                        getState={this.getState}
                    />
                    <Form
                        toggle={this.state.toggle}
                        list={this.renderList() || generalList} // just in case
                        getState={this.getState}
                        handleDateChange={this.handleDateChange}
                        handleTextChange={this.handleTextChange}
                    />
                    <RefButtonWrapper>
                        <Button onClick={() => this.handleSubmit()}>参照を追加する</Button>
                    </RefButtonWrapper>
                </RefBox>
                <Space height="20px"/>
                <List
                    reference={this.state.reference}
                />
            </div>
        )
    }
}

const RefBox = styled.div`

`

const RefButtonWrapper = styled.div`
    padding: 0px 10px;
    margin-top: -15px;
    margin-right: 12px;
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-end;
`

const RightInsideTitle = styled.div`
    height:35px;
    padding-left:20px;
    font-size: 14px;
    display: flex;
    align-items: center;
`

export default connect(null, actions)(withRouter(Reference))