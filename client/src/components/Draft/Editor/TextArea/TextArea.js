import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { connect } from "react-redux"
import axios from "axios";
import equal from "deep-equal"

import * as actions from "../../../../actions"

const controls = [
    "undo",
    "redo",
    "bold",
    "italic",
    "underline",
    'list-ol',
    'list-ul',
    'superScript',
    "separator",
    "blockQuote",
    "code",
    "link",
    "media",
    "hr",
]

const zeroControls = [
    "undo",
    "redo",
    "bold",
    "italic",
    "underline",
    'superScript',
    "link",
]

class TextArea extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editorState: BraftEditor.createEditorState(null),
        }
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.handleWindowClose);

        this.autoSave = setInterval(() => {
            this.sendUpdate(false)
        }, 20000)
    }

    componentDidUpdate(prevProps) {

        const { selected } = this.props.draft

        // 初期化
        if(!prevProps.draft.selected && selected) {
            this.setState({
                editorState: BraftEditor.createEditorState(selected.content)
            })
        }
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.handleWindowClose);

        clearInterval(this.autoSave)
        this.sendUpdate(true)
    }

    // このリクエストが受理されてアップデートされる前に次のページのcomponentDidMountがcallされているから、draftUpdatedを呼ばなきゃいけない
    sendUpdate = (timeUpdate) => {

        const { selected } = this.props.draft

        const url = "/api/draft/" + selected._id
        axios.post(url, {timeUpdate: timeUpdate, content: JSON.stringify(this.state.editorState.toHTML())})
            .then(() => {
                if(timeUpdate){
                    this.props.draftUpdated()
                }
            })
            .catch(err => console.error(err))
    }

    handleWindowClose = () => {
        const { selected } = this.props.draft
        const url = "/api/draft/" + selected._id
        axios.post(url, {timeUpdate: true, content: JSON.stringify(this.state.editorState.toHTML())})
            .then(this.props.draftUpdated())
            .catch(err => console.error(err))
    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }

    render () {

        const { editorState } = this.state
        const { selected } = this.props.draft

        return (
            <div>
                <BraftEditor
                    language="jpn"
                    placeholder="ここに入力してください..."
                    controls={selected.type === "Zero" ? zeroControls : controls}
                    value={editorState}
                    controlBarClassName="draft-area-tools"
                    contentClassName="draft-area-textarea"
                    onChange={this.handleEditorChange}
                />
            </div>
        )
    }
}

function mapStateToProps({draft}){
    return {
        draft,
    }
}

export default connect(mapStateToProps, actions)(TextArea)