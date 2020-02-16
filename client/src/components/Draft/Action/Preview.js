import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { Separator, DraftElement } from "./Action"
import { IndexPreview } from "./Index"

import { IoMdCheckmark } from "react-icons/io"

const DraftElementWrapper = styled.div`
    margin-bottom: 20px;
    overflow: scroll;
    height: 285px;

    &::-webkit-scrollbar{
        width: 0px !important;
    }
`

const AddColumn = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    top: 10px;
    right: 5px;
    font-size: 10px;
`

const ColumnCheck = styled(IoMdCheckmark)`
    margin-right: 8px;
    color: #4CD964;
`

class Preview extends Component {

    findDraftById = (isUpload) => {
        const res = this.props.draft.onEdit.map(elem => {
            if(this.props.ids.includes(elem._id)){
                return (
                    <DraftElement key={elem._id} indexPreview={isUpload ? true : false} preview={isUpload ? false : true}>
                        <img src={elem.topicImg} alt={"ドラフトが傘下となっているトピックの写真"}/>
                        <div>
                            <p>{elem.postName}</p>
                            <div>前回の編集日： {elem.editDate[elem.editDate.length-1] === undefined ? <span/> : elem.editDate[elem.editDate.length-1]}</div>
                        </div>
                        { isUpload &&
                        <IndexPreview top="10px" left="7px">
                            <div/>
                            <p>{this.props.index[elem._id].index.join(".")}</p>
                            <p>{this.props.index[elem._id].title}</p>
                            <p>の後</p>
                        </IndexPreview>
                        }
                        { this.props.index[elem._id].addColumn &&
                        <AddColumn>
                            <ColumnCheck/>
                            <p>新しいコラムを追加</p>
                        </AddColumn>
                        }
                    </DraftElement>
                )
            }
        })
        return res;
    }

    render () {
        console.log(this.props.index)
        return (
            <div>
                <Separator/>
                <DraftElementWrapper>
                    
                    { this.props.action === "DRAFT_DELETE_CHECK"

                    ? this.findDraftById(false)

                    : this.findDraftById(true)

                    }

                </DraftElementWrapper>
                <Separator bottom="49px"/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        draft: state.draft
    }
}

export default connect(mapStateToProps,null)(Preview)