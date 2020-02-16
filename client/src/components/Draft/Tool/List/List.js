import React, { Component } from "react"
import styled from "styled-components"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import * as actions from "../../../../actions"

import ShowMore from "../../../Util/ShowMore"

const ListBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    & > div:nth-child(1) {

        padding-bottom: 5px;
        margin-bottom: 10px;

        & > p:nth-child(1) {
            padding-left: 20px;
            font-size: 14px;
        }
    }
`

const RefElement = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    position: relative;
    padding-left: 10px;

    & > div:nth-child(1) {
        margin-right: 10px;
        padding-top: 2px;
    }

`

const RefSection = styled.div`

    margin-bottom: 2px;
    
    & > div {
        
        display: flex;
        flex-direction: row;

        p:nth-child(1) {
            margin-right: 10px;
        }
    }
`

const ShowMoreWrapper = styled.div`
    position: absolute;
    right: 15px;
    top: 2px;
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

    constructor(props) {
        super(props)
        this.state = {
            isOpened: "",
        }
        this.moreRef = React.createRef()
    }

    componentDidUpdate() {
        if (this.state.isOpened) {
            document.addEventListener("mousedown", this.outsideClick)
        } else {
            document.removeEventListener("mousedown", this.outsideClick)
        }
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.outsideClick)
    }

    outsideClick = (e) => {
        if(this.moreRef.current.contains(e.target)) {
            return null;
        }

        this.setState({
            isOpened: "",
        })
    }

    handleClick = (id) => {
        this.setState({
            isOpened: id,
        })
    }

    deleteRef = (refId) => {

        const url = this.props.location.pathname
        const draftId = url.substring(url.lastIndexOf('/') + 1)
        const id = {draftId, refId}
        this.setState({isOpened: ""})
        const action = "DELETE_REF"
        const title = "この参照を削除";
        const caution = ""
        const message = "この参照を削除してもよろしいですか？";
        const buttonMessage = "削除する";
        this.props.showConfirmation(id, action, title, caution, message, buttonMessage)
        this.props.enableGray()
    }

    renderSection = (ref) => {
        const res = Object.entries(ref).map((section, index) => {
            if(section[1]){
                return (
                    <RefSection key={String(ref._id) + String(index)}>
                        { section[0] !== "_id"
                        ?   section[0].toLowerCase().includes("date")
                            ?
                            <div>
                                <p>{section[0]}:</p>
                                <p>{new Date(section[1]).toLocaleDateString()}</p>
                            </div>
                            :
                            <div>
                                <p>{section[0]}:</p>
                                <p>{section[1]}</p>   
                            </div>               
                        :
                        ""
                        }
                    </RefSection>
                )
            }
        })
        return res;
    }

    renderRef = () => {
        var counter = 0
        const res = this.props.reference.map(ref => {
            console.log(ref)
            if (!ref.isDeleted) {
                counter++
                return(
                    <RefElement key={ref._id} ref={this.moreRef}>
                        <div>[{counter}]</div>
                        <div>
                            {this.renderSection(ref)}
                        </div>
                        <ShowMoreWrapper>
                            <ShowMore
                                ref={this.actionRef}
                                handleClick={() => this.handleClick(ref._id)}
                                show={this.state.isOpened === ref._id}
                                shadow={false}
                                left="-159px"
                                bottom="-39px"
                                actionName={["この参照を削除する"]}
                                action={[() => this.deleteRef(ref._id)]}
                            />
                        </ShowMoreWrapper>
                    </RefElement>
                )
            }
        })

        return res;
    }

    render() {

        return (
            <ListBox>
                <div>
                    {this.renderRef()}
                </div>
            </ListBox>
        )
    }
}

export default connect(null, actions)(withRouter(List))