import React, { Component } from "react"
import styled from "styled-components"
import { withRouter } from "react-router-dom"
import { Collapse } from 'react-collapse';
import { connect } from "react-redux"
import axios from "axios"

import { FaGlobe, FaClipboardList, FaImage } from "react-icons/fa"
import { IoIosInformationCircleOutline, IoIosSettings } from "react-icons/io"
import { IoIosPricetag } from "react-icons/io"

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

import Info from "./Info/Info"
import Title from "./Title/Title"
import Button from "../../Util/Button"
import Config from "./ConfigBox/ConfigBox"
import Form from "./Form/Form"
import List from "./List/List"
import Carousel from "./Carousel/Carousel"
import Image from "./Image/Image"
import { Space } from "../../Theme"

class Reference extends Component {

    constructor(props) {
        super(props)
        this.state = {

            toggle: "website",

            // reference: [], こいつをdefineしてしまうとうまくいかない（何故だかはよくわからん）
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
            tagAdd: {
                isOpened: false,
                changed: false,
            },
            
            info: {
                isOpened: false,
                changed: false,

                postName: "", // undefinedじゃなくてこれにしないと,warningが出る
                topicName: undefined,
                author: undefined,
                creationDate: undefined,
                lastEdited: undefined,
                lastEditedAuthor: undefined,
                config: {
                    allowEdit: false,
                }
            },
            config: {
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

        if(prevProps.draft.ref && this.props.draft.ref){
            var prev = prevProps.draft.ref.filter(r => r.isDeleted === false).length
            var now = this.props.draft.ref.filter(r => r.isDeleted === false).length
        }

        if(prevState.reference && (prevState.reference.length !== this.state.reference.length) && this.state.tempReference.refType) {

            axios.post(`/api/draft/${this.props.draft._id}/ref`, {ref: this.state.tempReference})
            .then(
                this.setState({
                    tempReference: {},
                    transparent: true
                })
            )
            .catch(err => {
                console.log(err)
            })

        } else if ((!prevProps.draft.ref && (this.props.draft.ref.length > 0)) || (prev != now)) {
            this.setState({
                reference: this.props.draft.ref || []
            })

        } else if ((prevState.toggle !== this.state.toggle) || 
                (prevState[this.state.toggle] !== this.state[this.state.toggle])) {

            const empty = this.checkForRequired()
            empty ? this.setState({ transparent: true }) : this.setState({ transparent: false })
        }

        // userが空欄にした時は、""になる
        if((!this.state.info.postName) && (!this.state.info.author) && (this.props.draft.postName)){
            var author;
            var creationDate;
            var lastEdited;
            var lastEditedAuthor;

            if(this.props.draft.type === "New") {
                author = this.props.auth.info
                creationDate = this.props.draft.creationDate
            } else {
                if(this.props.draft.type === "Edit") {
                    author = this.props.draft.editCreator
                    creationDate = this.props.draft.editCreationDate
                }
                lastEdited = this.props.draft.editLastEdited
                lastEditedAuthor = this.props.draft.editLastEditedAuthor
            }

            this.setState({
                ...this.state,
                info: {
                    ...this.state.info,
                    postName: this.props.draft.postName,
                    topicName: this.props.draft.topicName,
                    author: author,
                    creationDate: creationDate,
                    lastEdited: lastEdited,
                    lastEditedAuthor: lastEditedAuthor,
                    config: {
                        ...this.state.info.config,
                        allowEdit: this.props.draft.config.allowEdit,
                    }
                }
            })
        }

        if(prevProps.draft.postName && (prevProps.draft.postName !== this.props.draft.postName)) {
            this.setState({
                ...this.state,
                info: {
                    ...this.state.info,
                    postName: this.props.draft.postName,
                }
            })
        }

        if(prevProps.draft.config !== this.props.draft.config) {
            this.setState({
                ...this.state,
                info: {
                    ...this.state.info,
                    config: {
                        ...this.state.info.config,
                        allowEdit: this.props.draft.config.allowEdit,
                    }
                }
            })
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
        this.setState({file: {preview: null}})

        axios.post(`/api/draft/${this.props.draft._id}/image`, {img: this.state.url})
        .then(
            this.props.updateMessage("success", "メイン画像を保存しました。")
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
            this.props.updateMessage("success", "参照を追加しました。")
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

    handleConfigClick = (name) => {

        if(this.props.draft.type === "Edit") {
            if(this.props.draft.editCreator._id !== this.props.auth.info._id){
                this.props.updateMessage("fail", "このポストのオーナーしか設定を変更できません。")
                return
            }
        }

        const id = this.props.draft._id;
        const action = "CHANGE_DRAFTCONFIG";
        const title = "設定の変更";
        const message = "この設定を変更しますか？";
        const caution = "";
        const buttonMessage = "変更する";
        this.props.showConfirmation(id, action, title, caution, message, buttonMessage, "", name);
        this.props.enableGray();
    }

    handleNameSubmit = (e) => {
        e.preventDefault()
        if(!this.state.info.postName){
            this.props.updateMessage("fail", "ポスト名が入力されていません。")
            return
        }
        this.props.changeDraftName(this.props.draft._id, this.state.info.postName, false);
    }

    revertClick = () => {
        const id = this.props.draft._id;
        const action = "CHANGE_DRAFTNAME";
        const title = "ポスト名を元に戻す";
        const message = "ポスト名を最初の状態に戻しますか？";
        const caution = "";
        const buttonMessage = "元に戻す";
        this.props.showConfirmation(id, action, title, caution, message, buttonMessage);
        this.props.enableGray();
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            info:{
                ...this.state.info,
                postName: e.target.value,
            }
        })
    }

    handleBlur = () => {
        this.setState({
            ...this.state,
            info:{
                ...this.state.info,
                focus: false
            }
        })
    }

    handleFocus = () => {
        this.setState({
            ...this.state,
            info:{
                ...this.state.info,
                focus: true
            }
        })
    }

    render () { 

        const { file, url } = this.state
        const initialVal = this.props.draft.postImg && this.props.draft.postImg.image

        const display = !url ? initialVal : url

        return (
            <Box>
                <Title
                    title="基本情報"
                    icon={<InfoIcon/>}
                    isOpened={this.state.info.isOpened}
                    changed={this.state.info.changed}
                    handleClick={() => this.handleClick("info")}
                />
                <Collapse isOpened={this.state.info.isOpened}>
                    <Info
                        edit={this.props.draft.type === "Edit"}
                        revertClick={this.revertClick}
                        handleSubmit={this.handleNameSubmit}
                        handleChange={this.handleChange}
                        value={this.state.info}
                        handleBlur={this.handleBlur}
                        handleFocus={this.handleFocus}
                        focus={this.state.info.focus}
                    />
                </Collapse>

                <Title
                    title="参照を追加"
                    icon={<FaGlobe/>}
                    isOpened={this.state.refAdd.isOpened}
                    changed={this.state.refAdd.changed}
                    handleClick={() => this.handleClick("refAdd")}
                />
                <Collapse isOpened={this.state.refAdd.isOpened}>
                    <div>
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
                    </div>
                    <Space height="20px"/>
                </Collapse>

                <Title
                    title="参照一覧"
                    icon={<FaClipboardList/>}
                    isOpened={this.state.refList.isOpened}
                    changed={this.state.refList.changed}
                    handleClick={() => this.handleClick("refList")}
                />
                <Collapse isOpened={this.state.refList.isOpened}>
                    <List
                        id={this.props.draft._id}
                        reference={this.state.reference || []}
                    />
                    <Space height="20px"/>
                </Collapse>
            
                { this.props.draft.type !== "Zero" &&
                ([<Title
                    key={"imgTitle"}
                    title="メイン画像を追加"
                    icon={<FaImage/>}
                    isOpened={this.state.refImg.isOpened}
                    changed={this.state.refImg.changed}
                    handleClick={() => this.handleClick("refImg")}
                />
                ,
                <Collapse key={"imgCollapse"} isOpened={this.state.refImg.isOpened}>
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
                    { file.preview && url &&
                        <RefButtonWrapper>
                            <Button inverse={true} onClick={this.handleImgClick}>
                                決定
                            </Button>
                        </RefButtonWrapper>
                    }
                    <Space height="20px"/>
                </Collapse> 
                ])}

                { this.props.draft.type !== "Zero" &&
                ([
                <Title
                    title="タグを追加"
                    icon={<IoIosPricetag/>}
                    isOpened={this.state.tagAdd.isOpened}
                    changed={this.state.tagAdd.changed}
                    handleClick={() => this.handleClick("tagAdd")}
                />
                ,
                <div>
                    タグを追加
                </div>
                ])}   

                { (this.props.draft.type !== "Zero") &&
                ([<Title
                    key={"titleConfig"}
                    title="設定一覧"
                    icon={<IoIosSettings/>}
                    isOpened={this.state.config.isOpened}
                    changed={this.state.config.changed}
                    handleClick={() => this.handleClick("config")}
                />,
                <Collapse key={"contentConfig"} isOpened={this.state.config.isOpened}>
                    <Config
                        handleClick={this.handleConfigClick}
                        config={this.state.info.config}
                    />
                </Collapse>
                ])}
                <Space height={"220px"}/>
            </Box>
        )
    }
}

const Box = styled.div`
    & > div {
        margin: 6px 0px;
    }
`

const RefButtonWrapper = styled.div`
    margin-top: -15px;
    margin-right: 12px;
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-end;
`

const InfoIcon = styled(IoIosInformationCircleOutline)`
    transform: scale(1.2)
`

function mapStateToProps({auth}) {
    return {
        auth
    }
}

export default connect(mapStateToProps, actions)(withRouter(Reference))