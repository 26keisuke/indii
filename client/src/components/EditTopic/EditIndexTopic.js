import React, { Component } from "react"
import Column from "../Column"
import styled from "styled-components"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

const Container = styled.div`
    display: flex;
`

const Wrapper = styled.div`

`

const initialData = {
    tasks: {
        "task-1": { id: "task-1", index: [1,1], content: "1.1"},
        "task-2": { id: "task-2", index: [1,2], content: "1.2"},
        "task-3": { id: "task-3", index: [1,3], content: "1.3"},
        "task-4": { id: "task-4", index: [1,3,1], content: "1.3.1"},
        "task-5": { id: "task-5", index: [1,3,2], content: "1.3.2"},
        "task-6": { id: "task-6", index: [1,3,3], content: "1.3.3"},
        "task-7": { id: "task-7", index: [2,1], content: "2.1"},
        "task-8": { id: "task-8", index: [2,2], content: "2.2"},
        "task-9": { id: "task-9", index: [2,3], content: "2.3"},
        "task-10": { id: "task-10", index: [3,1], content: "3.1"}
    },
    columns: {
        "column-1": {
            id: "column-1",
            column: 1,
            title: "ナポレオンの生涯",
            taskIds: ["task-1","task-2","task-3","task-4","task-5","task-6"]
        },
        "column-2": {
            id: "column-2",
            column: 2,
            title: "ナポレオンの影響",
            taskIds: ["task-7","task-8","task-9"]
        },
        "column-3": {
            id: "column-3",
            column: 3,
            title: "ナポレオンの逸話",
            taskIds: ["task-10"]
        }
    },
    columnOrder: ["column-1", "column-2", "column-3"]
}

class InnerList extends Component {
    shouldComponentUpdate(nextProps) {
        if (
            nextProps.column === this.props.column &&
            nextProps.taskMap === this.props.taskMap &&
            nextProps.index === this.props.index
        ) {
            return false;
        }
        return true;
    }

    render () {
        const { column, taskMap, index } = this.props;
        const tasks = column.taskIds.map(taskId => taskMap[taskId]);
        return <Column column={column} tasks={tasks} index={index}/>
    }
}

class EditIndexTopic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            index: initialData,
            sorted: [], //store column index, two when exchanged between two columns eg) [1,2], [1], []
        }
    }

    createNewIndexes = (index, base, valueToChange) => {
        const columnName = this.state.index.columnOrder[index]
        const taskIds = this.state.index.columns[columnName].taskIds
        // const columnIndex = this.state.index.columns[columnName].column

        var newIndexes = {}

        taskIds.forEach(id => {
            const newArray = Array.from(this.state.index.tasks[id].index)
            newArray[0] = base + valueToChange
            newIndexes = {
                ...newIndexes,
                [id]: {
                    ...this.state.index.tasks[id],
                    index: newArray,
                }
            }
        })

        const columnChange = {
            [columnName]: {
                ...this.state.index.columns[columnName],
                column:base + valueToChange,
            }
        }

        return [columnChange, newIndexes]
    }

    sortColumnSwap = (newColumnOrder, start, end) => {

        const targetResult = this.createNewIndexes(start, end, 1)

        const columnChange = targetResult[0]
        const newIndexes = targetResult[1]

        if (end > start) {
            // eg) start => 0, end => 3の場合は、1~3の計3つのcolumnが１下がる
            var baseColumnChange = {}
            var baseNewIndexes = {}

            for(var i = start+1; i <= end; i++){
                const baseColumnName = this.state.index.columnOrder[i]
                const baseIndex = this.state.index.columns[baseColumnName].column
                const baseResult = this.createNewIndexes(i, baseIndex, -1)
                baseColumnChange = {
                    ...baseColumnChange,
                    ...baseResult[0]
                }
                baseNewIndexes = {
                    ...baseNewIndexes,
                    ...baseResult[1]
                }
            }

        } else if(start > end) {
            // eg) start => 3, end => 0の場合は、0~2の計3つのcolumnが１上がる
            for(var i = start-1; i <= end; i++){
                const baseColumnName = this.state.index.columnOrder[i]
                const baseIndex = this.state.index.columns[baseColumnName].column
                const baseResult = this.createNewIndexes(i, baseIndex, 1)
                baseColumnChange = {
                    ...baseColumnChange,
                    ...baseResult[0]
                }
                baseNewIndexes = {
                    ...baseNewIndexes,
                    ...baseResult[1]
                }
            }
        }

        const newIndex = {
            ...this.state.index,
            columns: {
                ...this.state.index.columns,
                ...columnChange,
                ...baseColumnChange
            },
            tasks: {
                ...this.state.index.tasks,
                ...newIndexes,
                ...baseNewIndexes
            },
            columnOrder: newColumnOrder,
        }

        this.setState({
            index: newIndex
        })

    }

    onDragEnd = result => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId && 
            destination.index === source.index
        ) {
            return;
        }

        if(type === "column") {
            const newColumnOrder = Array.from(this.state.index.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...this.state.index,
                columnOrder: newColumnOrder,
            }

            // this.setState({
            //     index: newState,
            // })

            this.sortColumnSwap(newColumnOrder, source.index, destination.index) 

            return;
        }

        const start = this.state.index.columns[source.droppableId]
        const finish = this.state.index.columns[destination.droppableId]

        if(start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...this.state.index,
                columns: {
                    ...this.state.index.columns,
                    [newColumn.id]: newColumn
                }
            };

            this.setState({
                index: newState,
            });

            // sort logic

            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start,
            taskIds: startTaskIds
        }

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        }
        
        const newState = {
            ...this.state.index,
            columns: {
                ...this.state.index.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            }
        }

        this.setState({
            index: newState,
        })

        // sort logic
    
    }

    addNewIndex = () => {
        const len = this.state.index.columnOrder.length + 1
        const name = "column-" + String(len)
        
        const newData = {
            id: name,
            column: String(len),
            title: "ナポレオンの生涯",
            taskIds: []
        }

        const newColumnOrder = Array.from(this.state.index.columnOrder)
        newColumnOrder.push(name)

        const newState = {
            ...this.state.index,
            columns: {
                ...this.state.index.columns,
                [name]: newData,
            },
            columnOrder: newColumnOrder,
        }

        this.setState({
            index: newState,
        })

    }

    renderTask = () => {

        return (
            <Wrapper>
                <DragDropContext
                    onDragEnd={this.onDragEnd}
                >
                    <Droppable droppableId="all-columns" direction="horizontal" type="column">
                        {(provided) => (
                            <Container
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                            {this.state.index.columnOrder.map((columnId,index) => {
                                const column = this.state.index.columns[columnId];
                                return (
                                    <InnerList
                                        key={column.id}
                                        column={column}
                                        taskMap={this.state.index.tasks}
                                        index={index}
                                    />
                                )
                            })}
                            {provided.placeholder}
                            </Container>
                        )}
                    </Droppable>
                </DragDropContext>
            </Wrapper>
        )
    }

    render() {
        return (
            
            <div className="topic-form-area">
                <div className={this.props.back ? "topic-form-area-wrapper-enter" : "topic-form-area-wrapper-show"}>
                    <div className="topic-form-area-top"> 
                        {/* {this.renderWarning()} */}
                        <p className="topic-form-area-top-title">1. トピックを選択してください</p>
                    </div> 

                    {this.renderTask()}

                    <button onClick={this.addNewIndex}>ADD NEW COLUMN</button>
                    
                </div>
            </div>
        )
    }
}

export default EditIndexTopic