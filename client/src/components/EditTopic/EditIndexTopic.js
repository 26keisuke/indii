import React, { Component } from "react"

const initialData = {
    tasks: {
        "task-1": { id: "task-1", content: "take out the garbage"},
        "task-2": { id: "task-2", content: "take out the garbage"},
        "task-3": { id: "task-3", content: "take out the garbage"},
        "task-4": { id: "task-4", content: "take out the garbage"}
    },
    columns: {
        "column-1": {
            id: "column-1",
            title: "To do",
            taskIds: ["task-1","task-2","task-3","task-4"]
        }
    },
    columnOrder: ["column-1"]
}

class EditIndexTopic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: initialData
        }
    }

    render() {
        return (
            <div className="topic-form-area">
                <div className={this.props.back ? "topic-form-area-wrapper-enter" : "topic-form-area-wrapper-show"}>
                    <div className="topic-form-area-top"> 
                        {/* {this.renderWarning()} */}
                        <p className="topic-form-area-top-title">1. トピックを選択してください</p>
                    </div> 




                    
                </div>
            </div>
        )
    }
}

export default EditIndexTopic