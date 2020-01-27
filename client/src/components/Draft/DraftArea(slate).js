// Alternatives to consider

// canner slate editor
// braft editor
// ckeditor
// Trumbowyg
// draft-js-plugins (https://www.draft-js-plugins.com/)

import React, { useMemo, useState, useCallback } from "react"
import { Editable, withReact, useSlate, Slate, useFocused, useSelected, useEditor } from "slate-react"
import { Editor, Transforms, createEditor } from "slate"
import isHotkey from "is-hotkey"
import imageExtensions from "image-extensions"
import isUrl from "is-url"
import { css } from "emotion"
import { withHistory } from "slate-history"

import { Button, Icon, Toolbar } from './DraftComponents'

const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code",
}

const LIST_TYPES = ["numbered-list", "bulleted-list"]

// Block => listやbullet pointなど行数単位で行うもの
// Mark => boldやhighlightなどの文字単位で行うもの(draft.jsでいうinlinestyle)

const DraftArea = () => {
    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem("content")) || initialValue
    )
    const renderElement = useCallback(props => <Element {...props}/>, [])
    const renderLeaf = useCallback(props => <Leaf {...props}/>, [])
    const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), [])
    const saveValue = useCallback(value => {
        setValue(value)
        localStorage.setItem("content", JSON.stringify(value))
    }, [])

    return (
        <Slate editor={editor} value={value} onChange={saveValue}>
            <Toolbar>
                <MarkButton format="bold" icon="format_bold" />
                <MarkButton format="italic" icon="format_italic" />
                <MarkButton format="underline" icon="format_underlined" />
                <MarkButton format="code" icon="code" />
                <BlockButton format="block-quote" icon="format_quote" />
                <BlockButton format="numbered-list" icon="format_list_numbered" />
                <BlockButton format="bulleted-list" icon="format_list_bulleted" />
                <InsertImageButton/>
            </Toolbar>
            <Editable
                className="draft-area"
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="文字を入力してください。"
                spellcheck
                autoFocus
                onKeyDown={ event => {
                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event)) {
                            event.preventDefault()
                            const mark = HOTKEYS[hotkey]
                            toggleMark(editor, mark)
                        }
                    }
                }}
            />
        </Slate>
    )
}

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === format
    })
    return !!match
}

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)
  
    Transforms.unwrapNodes(editor, {
      match: n => LIST_TYPES.includes(n.type),
      split: true,
    })
  
    Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    })
  
    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)
  
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
}

const Element = (props) => {
    const { attributes, children, element } = props

    switch (element.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      case "image":
        return <ImageElement {...props}/>
      default:
        return <p {...attributes}>{children}</p>
    }
}

const ImageElement = ({attributes, children, element}) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          src={element.url}
          className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? '0 0 0 3px #9EAEE5' : 'none'};
          `}
        />
      </div>
      {children}
    </div>
  )
}

const InsertImageButton = () => {
  const editor = useEditor()
  return (
    <Button
      onMouseDown={event => {
        event.preventDefault()
        const url = window.prompt('URLを下に入力するか、画像をドラッグ&ドロップしてください')
        if (!url) return
        insertImage(editor, url)
      }}
    >
      <Icon>image</Icon>
    </Button>
  )
}

const isImageUrl = url => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
}
  
const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }
  
    if (leaf.code) {
      children = <code>{children}</code>
    }
  
    if (leaf.italic) {
      children = <em>{children}</em>
    }
  
    if (leaf.underline) {
      children = <u>{children}</u>
    }
  
    return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
      <Button
        active={isBlockActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault()
          toggleBlock(editor, format)
        }}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
}
  
const MarkButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
      <Button
        active={isMarkActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault()
          toggleMark(editor, format)
        }}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
}

const withImages = editor => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === "image" ? true : isVoid(element)
  }

  editor.insertData = data => {
    const text = data.getData("text/plain")
    const {files} = data

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

const insertImage = (editor, url) => {
  const text = { text: ""}
  const image = { type: "image", url, children: [text] }
  Transforms.insertNodes(editor, image)
}


const initialValue = [
    {
      type: 'paragraph',
      children: [
        { text: 'This is editable ' },
        { text: 'rich', bold: true },
        { text: ' text, ' },
        { text: 'much', italic: true },
        { text: ' better than a ' },
        { text: '<textarea>', code: true },
        { text: '!' },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text:
            "Since it's rich text, you can do things like turn a selection of text ",
        },
        { text: 'bold', bold: true },
        {
          text:
            ', or add a semantically rendered block quote in the middle of the page, like this:',
        },
      ],
    },
    {
      type: 'block-quote',
      children: [{ text: 'A wise quote.' }],
    },
    {
      type: 'paragraph',
      children: [{ text: 'Try it out for yourself!' }],
    },
]

export default DraftArea