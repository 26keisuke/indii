import React, { Component } from "react"
import styled from "styled-components"
import { withRouter } from "react-router-dom"
import { Collapse } from 'react-collapse';
import { connect } from "react-redux"
import axios from "axios"

import { FaGlobe, FaClipboardList, FaImage } from "react-icons/fa"

import * as actions from "../../../actions"
import { sendMessage } from "../../Util/util"

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
import ArrowSpin from "../../Util/ArrowSpin"
import Image from "./Image/Image"
import { Space } from "../../Theme"
// import { id } from "date-fns/locale";

class Reference extends Component {

    constructor(props) {
        super(props)
        this.state = {

            toggle: "website",

            reference: [],
            tempReference: {},

            transparent: true,

            // reference
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

            // Collapse
            refAdd: {
                isOpened: false,
                changed: false,
            },
            refList: {
                isOpened: false,
                changed: false,
            },
            refImg: {
                isOpened: false,
                changed: false,
            },

            // image
            file: {preview: null}, // Uploadされた時
            url: "", // Cropがされている時
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // tempReferenceの部分は、最初にinitializeした時に呼ばれる（空白のobjがaxiosで送られる）から必要
        if((prevState.reference !== this.state.reference) && (this.state.tempReference.refType)) {
            
            axios.post(`/api/draft/${this.props.draft._id}/ref`, {ref: this.state.tempReference})
            .then(
                this.setState({
                    ...this.state,
                    tempReference: {},
                })
            )
            .catch(err => {
                console.log(err)
            })

            this.setState({ transparent: true })

        } else if (prevProps.draft !== this.props.draft) {

            this.setState({
                reference: this.props.draft.ref || []
            })

        } else if ((prevState.toggle !== this.state.toggle) || 
                (prevState[this.state.toggle] !== this.state[this.state.toggle])) {

            const empty = this.checkForRequired()
            empty ? this.setState({ transparent: true }) : this.setState({ transparent: false })

        }
    }

    checkForRequired = () => {
        const list = this.renderList()
        for (var k in list){
            if(list[k].required === true) {
                const filledVal = this.state[this.state.toggle][list[k].stateName]
                if((filledVal === "") || (filledVal === null)) {
                    return true
                }
            }
        }
        return false
    }

    getState = (name) => {
        return this.state[name]
    }

    setFile = (file) => {
        this.setState({
            file,
        })
    }

    setUrl = (url) => {
        this.setState({
            url
        })
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

    handleImgClick = () => {
        axios.post(`/api/draft/${this.props.draft._id}/image`, {img: this.state.url})
        .then(
            sendMessage("success", "メイン画像を保存しました。", 3000, this.props)
        )
        .catch(err => {
            console.log(err)
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
                data[key] = null
            } else {
                data[key] = ""
            }
        })

        this.setState({
            ...this.state,
            reference: subject,
            tempReference: merged,
            [this.state.toggle]: data,
        }, () => {
            sendMessage("success", "参照を追加しました。", 3000, this.props)
        })
    }

    handleClick = (name) => {
        this.setState({
            ...this.state,
            [name]: {
                ...this.state[name],
                isOpened: !this.state[name].isOpened,
                changed: true,
            }
        })
    }

    render () { 

        const { file, url } = this.state
        const initialVal = this.props.draft.postImg

        // const flag = ((file.preview === null) || (file.preview === undefined))
        // const display = flag ? initialVal : file.preview

        const display = !url ? initialVal : url

        return (
            <div>
                <RightInsideTitle onClick={() => this.handleClick("refAdd")}>
                    参照を追加
                    <IconRefAdd/>
                    <ArrowWrapper>
                        <ArrowSpin
                            size={32}
                            handleClick={() => this.handleClick("refAdd")}
                            isOpened={this.state.refAdd.isOpened}
                            changed={this.state.refAdd.changed}
                        />
                    </ArrowWrapper>
                </RightInsideTitle>
                <Collapse isOpened={this.state.refAdd.isOpened}>
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
                            { this.state.transparent ?
                            <Button 
                                inverse={true} 
                                disabled={this.state.transparent} 
                            >
                                参照を追加する
                            </Button>
                            :
                            <Button 
                                inverse={true} 
                                disabled={this.state.transparent} 
                                onClick={() => this.handleSubmit()}
                            >
                                参照を追加する
                            </Button>
                            }
                        </RefButtonWrapper>
                    </RefBox>
                    <Space height="20px"/>
                </Collapse>

                
                <RightInsideTitle onClick={() => this.handleClick("refList")}>
                    参照一覧
                    <IconRefList/>
                    <ArrowWrapper>
                        <ArrowSpin
                            size={32}
                            handleClick={() => this.handleClick("refList")}
                            isOpened={this.state.refList.isOpened}
                            changed={this.state.refList.changed}
                        />
                    </ArrowWrapper>
                </RightInsideTitle>
                <Collapse isOpened={this.state.refList.isOpened}>
                    <List
                        reference={this.state.reference}
                    />
                    <Space height="20px"/>
                </Collapse>

                <RightInsideTitle onClick={() => this.handleClick("refImg")}>
                    メイン画像を追加
                    <IconImage/>
                    <ArrowWrapper>
                        <ArrowSpin
                            size={32}
                            handleClick={() => this.handleClick("refImg")}
                            isOpened={this.state.refImg.isOpened}
                            changed={this.state.refImg.changed}
                        />
                    </ArrowWrapper>
                </RightInsideTitle>
                <Collapse isOpened={this.state.refImg.isOpened}>
                    <Image
                        // uploadのprops
                        display={display}
                        message="ここに画像をドラッグするか、ボックスをクリックしてください"
                        caution="(*.jpegと*.pngのみ)"
                        file={file}
                        setFile={this.setFile}

                        // cropのprops
                        setUrl={this.setUrl}
                        crop={{
                            aspect: 1,
                            height: 100,
                            x: 0,
                            y: 0,
                        }}
                        config={"postImg"}
                    />
                    { url &&
                        <RefButtonWrapper>
                            <Button inverse={true} onClick={this.handleImgClick}>
                                決定
                            </Button>
                        </RefButtonWrapper>
                    }
                    <Space height="20px"/>
                </Collapse>

            </div>
        )
    }
}


const RefBox = styled.div``

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
    padding-left:42px;
    font-size: 12px;
    display: flex;
    align-items: center;
    color: white;
    background-color: #636480;
    position: relative;
    cursor: pointer;
`

const ArrowWrapper = styled.div`
    position: absolute;
    right: 14px;
    top: 9px;
`

const IconRefAdd = styled(FaGlobe)`
    position: absolute;
    left: 15px;
`

const IconRefList = styled(FaClipboardList)`
    position: absolute;
    left: 15px;
`

const IconImage = styled(FaImage)`
    position: absolute;
    left: 15px;
`

export default connect(null, actions)(withRouter(Reference))