import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { connect } from "react-redux"
import axios from "axios";

import * as actions from "../../../actions"

class TextArea extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editorState: BraftEditor.createEditorState(null),
        }
    }

    componentDidMount() {
        this.autoSave = setInterval(() => {
            this.sendUpdate(false)
        }, 60000)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.draft !== this.props.draft) {
            this.setState({
                editorState: BraftEditor.createEditorState(this.props.draft.content)
            })
        }
    }

    // このリクエストが受理されてアップデートされる前に次のページのcomponentDidMountがcallされているから、draftUpdatedを呼ばなきゃいけない
    componentWillUnmount() {
        clearInterval(this.autoSave)
        this.sendUpdate(true)
    }

    sendUpdate = (timeUpdate) => {
        const url = "/api/draft/" + this.props.draft._id
        axios.post(url, {timeUpdate: timeUpdate, content: JSON.stringify(this.state.editorState.toHTML())})
            .then(this.props.draftUpdated())
            .catch(err => console.error(err))
    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }

    render () {
        const { editorState } = this.state

        return (
            <div>
                <BraftEditor
                    language="jpn"
                    placeholder="ここに入力してください..."
                    controls={[
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
                    ]}
                    value={editorState}
                    controlBarClassName="draft-area-tools"
                    contentClassName="draft-area-textarea"
                    onChange={this.handleEditorChange}
                />
            </div>
        )

    }

}

export default connect(null, actions)(TextArea)