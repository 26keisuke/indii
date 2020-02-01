import React, { Component, PureComponent } from "react"
import Column from "./Column"
import styled from "styled-components"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

import InitialData from "./InitialData"

const Container = styled.div`
    display: flex;
    height: 350px;
`

const Button = styled.button`
    position: absolute;
`

const Wrapper = styled.div`
    position: absolute;
    width: 640px;
    margin-left: -120px;
    overflow: scroll;
`

class InnerList extends PureComponent {
    constructor(props) {
        super(props)
    }

    render () {
        const { column, taskMap, index } = this.props;
        const tasks = column.taskIds.map(taskId => (taskMap[taskId]));
        return <Column column={column} tasks={tasks} index={index}/>
    }
}

class EditIndexTopic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            index: InitialData,
        }
        document.documentElement.style.overflow = "hidden"
    }

    sortColumnSwap = (newColumnOrder, start, end) => {

        const targetResult = this.createNewIndexes(end, 1, 0, start)
    
        const columnChange = targetResult[0]
        const newIndexes = targetResult[1]
    
        if (end > start) {
            // eg) start => 0, end => 3の場合は、1~3の計3つのcolumnが１下がる
            var baseColumnChange = {}
            var baseNewIndexes = {}
    
            for(var i = start+1; i <= end; i++){
                const baseColumnName = this.state.index.columnOrder[i]
                const baseIndex = this.state.index.columns[baseColumnName].column
                const baseResult = this.createNewIndexes(baseIndex, -1, 0, i)
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
            for(var i = end; i <= start-1; i++){
                const baseColumnName = this.state.index.columnOrder[i]
                const baseIndex = this.state.index.columns[baseColumnName].column
                const baseResult = this.createNewIndexes(baseIndex, 1, 0, i)
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
    
    createNewIndexes = (baseIndex, valueToChange, level, columnIndex) => {
    
        var taskIds = []
        var columnName = ""
    
        columnName = this.state.index.columnOrder[columnIndex]
        taskIds = this.state.index.columns[columnName].taskIds
    
        var newIndexes = {}
    
        taskIds.forEach(id => {
            const newArray = Array.from(this.state.index.tasks[id].index)
            newArray[level] = baseIndex + valueToChange
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
                column: baseIndex + valueToChange,
            }
        }
        return [columnChange, newIndexes]
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

        ///////////////////////////////////
        // もし、Column同士を入れ替えた場合 //
        ///////////////////////////////////

        if(type === "column") {
            const newColumnOrder = Array.from(this.state.index.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            this.sortColumnSwap(newColumnOrder, source.index, destination.index) 

            return;
        }

        const origin = this.state.index.columns[source.droppableId]
        const target = this.state.index.columns[destination.droppableId]

        ///////////////////////////////////
        // もし、同じColumnから持ってきた場合 //
        ///////////////////////////////////

        if(origin === target) {
            const newTaskIds = Array.from(origin.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
    
            var newIndexes = {}

            if (destination.index > source.index) {
                // 2{soure.index}を4{destination.index}の位置に持っていく場合は、前半（2~3）が-1され、4が3の値+1される
                for (var i=source.index; i<=destination.index-1; i++){
                    const taskId = newTaskIds[i]
                    const newArray = Array.from(this.state.index.tasks[taskId].index)
                    const baseIndex = this.state.index.tasks[taskId].index[1]
                    newArray[1] = baseIndex-1
                    newIndexes = {
                        ...newIndexes,
                        [taskId]: {
                            ...this.state.index.tasks[taskId],
                            index: newArray
                        }
                    }
                }
                const taskId = draggableId
                const newArray = Array.from(this.state.index.tasks[taskId].index)
                const baseIndex = this.state.index.tasks[taskId].index[1]
                newArray[1] = baseIndex+destination.index-source.index
                newIndexes = {
                    ...newIndexes,
                    [taskId]: {
                        ...this.state.index.tasks[taskId],
                        index: newArray
                    }
                }
            } else if (destination.index < source.index) {
                // 4{soure.index}を2{destination.index}の位置に持っていく場合は、前半（2~3）が+1され、4が3の値+1される
                for (var i=destination.index+1; i<=source.index; i++){
                    const taskId = newTaskIds[i]
                    const newArray = Array.from(this.state.index.tasks[taskId].index)
                    const baseIndex = this.state.index.tasks[taskId].index[1]
                    newArray[1] = baseIndex+1
                    newIndexes = {
                        ...newIndexes,
                        [taskId]: {
                            ...this.state.index.tasks[taskId],
                            index: newArray
                        }
                    }
                }
                const taskId = draggableId
                const newArray = Array.from(this.state.index.tasks[taskId].index)
                const baseIndex = this.state.index.tasks[taskId].index[1]
                newArray[1] = baseIndex+destination.index-source.index
                newIndexes = {
                    ...newIndexes,
                    [taskId]: {
                        ...this.state.index.tasks[taskId],
                        index: newArray
                    }
                }
            }

            const newColumn = {
                ...origin,
                taskIds: newTaskIds,
            };

            const newState = {
                ...this.state.index,
                tasks:{
                    ...this.state.index.tasks,
                    ...newIndexes
                },
                columns: {
                    ...this.state.index.columns,
                    [newColumn.id]: newColumn
                }
            };

            this.setState({
                index: newState,
            });

            return;
        }

        ///////////////////////////////////
        // もし、違うColumnから持ってきた場合 //
        ///////////////////////////////////

        // Sourceに残ったNodeのLogic
        const sourceTaskIds = Array.from(origin.taskIds); // 始めのColumn
        sourceTaskIds.splice(source.index, 1) 
        const newSource = {
            ...origin,
            taskIds: sourceTaskIds
        }

        const taskIdsAfterSource = sourceTaskIds.slice(source.index)

        var newSourceIndex = {}

        taskIdsAfterSource.forEach((taskId) => {
            var newArray = Array.from(this.state.index.tasks[taskId].index)
            newArray[1] = newArray[1] - 1
            newSourceIndex = {
                ...newSourceIndex,
                [taskId]: {
                    ...this.state.index.tasks[taskId],
                    index: newArray,
                }
            }
        })

        // Sourceに追加されたNodeのロジック
        var newAddedIndex = {}

        const newArraySource = Array.from(this.state.index.tasks[draggableId].index)
        //挿入する位置の一つ前のものか、一番最初の場合は1
        const destinationTaskId = this.state.index.columns[destination.droppableId].taskIds[destination.index-1]
        var destinationIndex = 0;
        if (destinationTaskId) {
            destinationIndex = this.state.index.tasks[destinationTaskId].index[1]   
        }

        newArraySource[0] = target.column
        newArraySource[1] = destinationIndex + 1
        
        newAddedIndex = {
            ...newAddedIndex,
            [draggableId]: {
                ...this.state.index.tasks[draggableId],
                index: newArraySource,
            }
        }

        // Targetに元々あるNodeのロジック
        const targetTaskIds = Array.from(target.taskIds); //　ターゲットのColumn
        targetTaskIds.splice(destination.index, 0, draggableId);
        const newTarget = {
            ...target,
            taskIds: targetTaskIds,
        }

        const taskIdsAfterTarget = targetTaskIds.slice(destination.index+1)

        var newTargetIndex = {}

        taskIdsAfterTarget.forEach((taskId) => {
            var newArray = Array.from(this.state.index.tasks[taskId].index)
            newArray[1] = newArray[1] + 1
            newTargetIndex = {
                ...newTargetIndex,
                [taskId]: {
                    ...this.state.index.tasks[taskId],
                    index: newArray,
                }
            }
        })
        
        const newState = {
            ...this.state.index,
            columns: {
                ...this.state.index.columns,
                [newSource.id]: newSource,
                [newTarget.id]: newTarget,
            },
            tasks: {
                ...this.state.index.tasks,
                ...newTargetIndex,
                ...newAddedIndex,
                ...newSourceIndex,
            }
        }

        this.setState({
            index: newState,
        })

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

    handleRevert = () => {
        this.setState({
            index: InitialData,
        })
    }

    render() {
        return (
            
            <div className="topic-form-area">
                <div className={this.props.back ? "topic-form-area-wrapper-enter" : "topic-form-area-wrapper-show"}>
                    <div className="topic-form-area-top"> 
                        {/* {this.renderWarning()} */}
                        <p className="topic-form-area-top-title">4. トピックの目次を編集</p>
                        <p　onClick={this.handleRevert} className="topic-form-area-top-revert">元に戻す</p>
                    </div> 

                    {this.renderTask()}

                    <Button onClick={this.addNewIndex}>ADD NEW COLUMN</Button>
                    
                </div>
            </div>
        )
    }
}

export default EditIndexTopic