import React, { useEffect, useMemo, useState, useCallback } from "react"
import styled, { css } from "styled-components"
import { Editor, createEditor, Transforms, } from "slate"
import { 
    Slate, Editable, withReact, useSlate
} from "slate-react"
import { withHistory } from 'slate-history'
import { BlockMath } from "react-katex"
import { connect } from "react-redux"
import imageExtensions from 'image-extensions'
import { Waypoint } from "react-waypoint"
import isUrl from 'is-url'
import axios from "axios"

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// import CropFreeIcon from '@material-ui/icons/CropFree';

import Image from "./Image/Image"

// import { customeBeforeInput } from "./Plugin/Plugin"
import * as actions from "../../../actions"

import { renderIcon, renderTitle } from "../util"

import "katex/dist/katex.min.css"

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const Toolbar = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 5px 100px;
    background-color: #f5f5f5;
`

const ToolbarAbs = styled(Toolbar)`
    position: fixed;
    top: 66px;
    box-shadow: 1px 1px 10px #d2d2d2;
    left: 50%;
    z-index: 11;
    transform: translate(-50%, 0);
    background-color: white;
`

// vertical alignはplaceholderのズレをなくすためだが、katexにも影響が出るので今はoffにしている
const EditableWrapper = styled.div`

    font-size: 12px !important;
    color: #222222;

    ${props => !props.readOnly && css`
        & > div {
            min-height: 500px;
            padding: 50px 80px;
            padding-bottom: 200px;
        }
    `}

    & h2 {
        font-size: 18px;
        font-weight: bold;
    }

    & h3 {
        font-weight: bold;
        font-size: 15px;
    }
    
    /* & span {
        vertical-align: unset !important;
    } */
    & ol,
    & ul{
        padding-left: 30px;
        margin: 12px 0px;
    }

    & ul {
        list-style: outside;
    }

    & ol {
        list-style: decimal;
    }
`

const ToolWrapper = styled.div`
    & svg {
        color: ${props => props.isActive && "royalblue"};
    }
`

const TextArea = (props) => {

    var autoSave;

    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: "" },],
        }
    ])
    const [abs, setAbs] = useState(false)

    const editor = useMemo(() => withHistory(withImages(withKatex(withReact(createEditor())))), [])

    const sendUpdate = (timeUpdate) => {
        const url = "/api/draft/" + props.draftId
        axios.post(url, {timeUpdate: timeUpdate, content: JSON.stringify(editor)})
            .then(() => {
                if(timeUpdate){
                    props.draftUpdated()
                }
            })
            .catch(err => console.error(err))
    }

    const katexClick = (e) => {
        e.preventDefault()

        const id = "1";
        const action = "DRAFT_ADD_KATEX";
        const title = "数式を追加"
        const message = "数式を入力してください";
        const caution = "";
        const buttonMessage = "追加する";

        props.showConfirmation(id, action, title, caution, message, buttonMessage);
    }

    const imageClick = (e) => {
        e.preventDefault()

        const id = "1";
        const action = "DRAFT_ADD_URL";
        const title = "画像を追加"
        const message = "画像を挿入してください";
        const caution = "";
        const buttonMessage = "追加する";

        props.showConfirmation(id, action, title, caution, message, buttonMessage);
    }

    useEffect(() => {
        if(props.content){
            if(typeof(props.content) === "object"){
                setValue(props.content.children)
                return
            }
            setValue(JSON.parse(props.content).children)
        } else if(props.draftContent){
            if(typeof(props.draftContent) === "object"){
                setValue(props.draftContent.children)
                return
            }
            setValue(JSON.parse(props.draftContent).children)
        }

    }, [props.content, props.draftContent])

    useEffect(() => {
        if(props.readOnly) return

        autoSave = setInterval(() => {
            sendUpdate(false)
        }, 5000)

        return () => {
            clearInterval(autoSave)
        }
    }, [props.readOnly, props.draftId])

    useEffect(() => {

        if(props.readOnly) return

        if(props.katex){
            insertKatex(editor, props.katex)
            props.draftAddKatex("")
        }

        if(props.url){
            insertImage(editor, props.url)
            props.draftAddUrl("")
        }

    }, [props.readOnly, props.katex, props.url])


    const renderElement = useCallback(props => <Element readOnly={props.readOnly} {...props}/>, [])
    const renderLeaf = useCallback(props => <Leaf {...props}/>, [])

    const handleLeave = () => { setAbs(true) }
    const handleEnter = () => { setAbs(false) }

    const isZero = props.type === "Zero"

    return (
        <Slate 
            editor={editor} 
            value={value} 
            onChange={value => {
                localStorage.setItem(`${props.draftId}`, JSON.stringify({value: editor, timeStamp: Date.now()}))
                setValue(value)
            }}
        >
            { !props.readOnly && <Waypoint onEnter={handleEnter} onLeave={handleLeave} fireOnRapidScroll/>}
            { !isZero && !props.readOnly && abs &&
            <ToolbarAbs>
                {/* <MarkButton format="bold"/>
                <MarkButton format="italic"/>
                <MarkButton format="underline"/>
                <MarkButton format="code"/>
                <MarkButton format="superscript"/> */}
                <BlockButton format="heading-one"/>
                <BlockButton format="heading-two"/>
                <BlockButton format="code"/>
                <BlockButton format="block-quote"/>
                <BlockButton format="numbered-list"/>
                <BlockButton format="bulleted-list"/>
                <KatexButton handleClick={(e) => katexClick(e)}/>
                <ImageButton handleClick={(e) => imageClick(e)}/>
            </ToolbarAbs>
            }
            { !isZero && !props.readOnly &&
            <Toolbar>
                {/* <MarkButton format="bold"/>
                <MarkButton format="italic"/>
                <MarkButton format="underline"/>
                <MarkButton format="code"/>
                <MarkButton format="superscript"/> */}
                <BlockButton format="heading-one"/>
                <BlockButton format="heading-two"/>
                <BlockButton format="code"/>
                <BlockButton format="block-quote"/>
                <BlockButton format="numbered-list"/>
                <BlockButton format="bulleted-list"/>
                <KatexButton handleClick={(e) => katexClick(e)}/>
                <ImageButton handleClick={(e) => imageClick(e)}/>
            </Toolbar>
            }
            <EditableWrapper readOnly={props.readOnly}>
                <Editable
                    readOnly={props.readOnly ? true : false}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder={props.readOnly ? "" : "ここに入力してください..."}
                />
            </EditableWrapper>
        </Slate>
    )
}

const withKatex = editor => {
    const { isVoid } = editor

    editor.isVoid = element => {
        return element.type === "katex" ? true : isVoid(element)
    }

    return editor
}

const withImages = editor => {
    const { insertData, isVoid } = editor

    editor.isVoid = element => {
        return element.type === "image" ? true : isVoid(element)
    }

    // drag and drop
    editor.insertData = data => {
        const text = data.getData('text/plain')
        const { files } = data
    
        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader()
                const [mime] = file.type.split('/')
    
                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result
                        insertImage(editor, url)
                    })
    
                    reader.readAsDataURL(file)
                }
            }
        } else if (isImageUrl(text)) {
            insertImage(editor, text)
        } else {
            insertData(data)
        }
    }

    return editor
}

const insertKatex = (editor, katex) => {
    Transforms.insertNodes(editor, { type: "katex", katex, children: [{ text: "" }]})
    Transforms.insertNodes(editor, { type: "paragraph", children: [{ text: "" }]})
}

const insertImage = (editor, url) => {
    Transforms.insertNodes(editor, { type: "image", url, position: "left", children: [{ text: "" }]})
    Transforms.insertNodes(editor, { type: "paragraph", children: [{ text: "" }]})
}

const KatexButton = ({handleClick}) => {
    return (
        <Tooltip title="数式の挿入">
            <IconButton 
                aria-label="insert_formulaa"
                onMouseDown={handleClick}
            >
                {renderIcon("katex")}
            </IconButton>
        </Tooltip>
    )
}

const ImageButton = ({handleClick}) => {
    return(
        <Tooltip title="写真の挿入">
            <IconButton 
                aria-label="insert_image"
                onMouseDown={handleClick}
            >
                {renderIcon("image")}
            </IconButton>
        </Tooltip>
    )
}

const Code = styled.div`
    width: 100%;
    font-family: monospace;
    background-color: #eee;
    padding: 3px;
`

const Element = props => {

    const { readOnly, attributes, children, element } = props

    switch(element.type){
        case "code":
            return <Code {...attributes}>{children}</Code>
        case "block-quote":
            return <blockquote {...attributes}>{children}</blockquote>
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>
        case "heading-one":
            return <h2 {...attributes}>{children}</h2>
        case "heading-two":
            return <h3 {...attributes}>{children}</h3>
        case "list-item":
            return <li {...attributes}>{children}</li>
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>
        case "katex":
            return <Katex {...props}/>
        case "image":
            return <Image readOnly={readOnly} {...props} />
        default:
            return <p {...attributes}>{children}</p>
    }
}

const Katex = ({ attributes, children, element }) => {
    return (
        <div {...attributes}>
            <div 
                contentEditable={false}
                style={{ userSelect: "none" }}
            >
                <BlockMath>{element.katex}</BlockMath>
            </div>
            {children}
        </div>
    )
}


const Leaf = ({ attributes, children, leaf }) => {
    if(leaf.bold){
        children = <strong>{children}</strong>
    }
  
    if(leaf.code){
        children = <code>{children}</code>
    }
  
    if(leaf.italic){
        children = <em>{children}</em>
    }
  
    if(leaf.underline){
        children = <u>{children}</u>
    }

    if(leaf.superscript){
        children = <span style={{top: "-6px", position: "relative", fontSize: "10px"}}>{children}</span>
    }
  
    return <span {...attributes}>{children}</span>
}


const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    // 一旦初期化する
    Transforms.unwrapNodes(editor, {
        match: n => LIST_TYPES.includes(n.type),
        split: true,
    })

    Transforms.setNodes(editor, {
        type: isActive ? "paragraph" : isList ? "list-item" : format
    })

    if(!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if(isActive) {
        Editor.removeMark(editor, format)
    } else {
        console.log(editor)
        Editor.addMark(editor, format, true)
    }
}

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === format,
    })
  
    return !!match
}
  
const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}


const BlockButton = ({ format }) => {
    const editor = useSlate()
    const isActive = isBlockActive(editor, format)
    return (
        <ToolWrapper isActive={isActive}>
            <Tooltip title={renderTitle(format)}>
                <IconButton 
                    aria-label="insert"
                    active={isActive}
                    onMouseDown={e => {
                        e.preventDefault()
                        toggleBlock(editor, format)
                    }}
                >
                    {renderIcon(format)}
                </IconButton>
            </Tooltip>
        </ToolWrapper>
    )
}

const MarkButton = ({ format }) => {
    const editor = useSlate()
    const isActive = isMarkActive(editor, format)
    return (
        <ToolWrapper isActive={isActive}>
            <Tooltip title={renderTitle(format)}>
                <IconButton 
                    aria-label="insert"
                    active={isActive}
                    onMouseDown={e => {
                        e.preventDefault()
                        toggleMark(editor, format)
                    }}
            >
                    {renderIcon(format)}
                </IconButton>
            </Tooltip>
        </ToolWrapper>
    )
}

const isImageUrl = url => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split('.').pop()
    return imageExtensions.includes(ext)
}

function mapStateToProps({draft}){
    return {
        type: draft.selected.type,

        draftId: draft.selected._id,
        draftContent: draft.selected.content,
        
        katex: draft.katex,
        url: draft.url,
    }
}


export default connect(mapStateToProps, actions)(TextArea)