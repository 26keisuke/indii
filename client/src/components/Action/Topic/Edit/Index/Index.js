import React, { Component } from "react"
import { ObjectID } from "bson"
import { connect } from "react-redux"
import styled from "styled-components"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { GoPlusSmall } from "react-icons/go"

import { Box, BoxTransition, RevertBtn, AddBtn } from "../../../Element/Element"
import { Space } from "../../../../Theme"
import TwoButtons from "../../../Element/TwoButtons"

import { arrObjLookUp, deepCopyArrOfObj } from "../../../../Util/util"

import * as actions from "../../../../../actions"

import Column from "./Column/Column"

const Wrapper = styled.div`
    position: relative;
    margin-top: 5px;
`

const Container = styled.div`
    display: flex;
    height: 350px;
`

const IndexBox = styled.div`
    position: absolute;
    width: 760px;
    margin-left: -160px;
    overflow: scroll;

    &::-webkit-scrollbar{
        width: 0px;
    }
`

class EditIndexTopic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: this.props.initialVal1,
            columns: this.props.initialVal2,
            order: this.props.initialVal3,
        }

        // draggableをページの下までもっていきすぎるとDOMが崩れるのでそれを防ぐ
        document.documentElement.style.position= "fixed"
        document.documentElement.style.width= "100vw"
    }

    componentDidUpdate = (prevProps) => {
        if((prevProps.index.columnName !== this.props.index.columnName) && (this.props.index.columnName)){
            this.addNewIndex()
            this.props.addColumn(""); // リセット
            this.props.updateMessage("success", "コラムを削除しました。")
        }

        if((prevProps.index.revert === false) && (this.props.index.revert === true)){
            this.setState({
                posts: this.props.initialVal1,
                columns: this.props.initialVal2,
                order: this.props.initialVal3,
            })
            this.props.revertColumn(false)
            this.props.updateMessage("success", "変更を元に戻しました。")
        }

        if(prevProps.index.deleteId !== this.props.index.deleteId) {

            // get column from this.state.columns ... 0
            const column = arrObjLookUp(this.state.columns, "_id", this.props.index.deleteId)

            // delete column from this.state.columns using 0
            const copiedColumns = deepCopyArrOfObj(this.state.columns)
            copiedColumns.splice(column.index, 1)

            var newPosts = []
            const copiedPosts = deepCopyArrOfObj(this.state.posts)
        
            for(var i=column.index; i < copiedColumns.length; i++){
                // update column index of remaining columns 
                copiedColumns[i].index = copiedColumns[i].index - 1
                // update column index of remaining indexes
                this.findPostsAndIncrement(0, copiedColumns[i].posts.length, copiedColumns[i].posts, -1, newPosts, true)
            }

            this.replaceOldWithModified(newPosts, copiedPosts)

            // delete from order using 0
            const copiedOrder = deepCopyArrOfObj(this.state.order)
            copiedOrder.splice(column.index, 1)

            this.setState({
                columns: copiedColumns,
                posts: copiedPosts,
                order: copiedOrder,
            })
        }
    }

    sortColumnSwap = (newColumnOrder, start, end) => {

        // 動かした対象のColumnのPostsをUpdate
        const targetResult = this.createNewIndexes(end+1, 0, 0, start)

        var columnStore = []
        var postStore = []

        Array.prototype.push.apply(postStore, targetResult[1])

        if (end > start) {
            // eg) start => 0, end => 3の場合は、1~3の計3つのcolumnが１下がる
            for(var i = start+1; i < end+1; i++){
                const restColumnId = this.state.order[i+1]
                const restIndex = arrObjLookUp(this.state.columns, "_id", restColumnId).index
                const restResult = this.createNewIndexes(restIndex, -1, 0, i)
                columnStore.push(restResult[0])
                Array.prototype.push.apply(postStore, restResult[1]) // concatでもいいが、新しいobjを作ってしまう
            }

            columnStore.push(targetResult[0])
            
        } else if(start > end) {

            // eg) start => 3, end => 0の場合は、0~2の計3つのcolumnが１上がる
            columnStore.push(targetResult[0])

            for(var j = end; j <= start-1; j++){
                const restColumnId = this.state.order[j+1]
                const restIndex = arrObjLookUp(this.state.columns, "_id", restColumnId).index
                const restResult = this.createNewIndexes(restIndex, 1, 0, j)
                columnStore.push(restResult[0])
                Array.prototype.push.apply(postStore, restResult[1])
            }
        }

        const oldColumn = deepCopyArrOfObj(this.state.columns)
        const oldPost = deepCopyArrOfObj(this.state.posts)

        // ここから先はsetStateするための前置き
        var ct = 0
        const combinedColumns = []

        for (var k=0; k < oldColumn.length; k++) {
            if(start > end){
                if((end+1 <= k) && (k <= start+1)) { // ここの+1は概要の分
                    combinedColumns.push(columnStore[ct])
                    ct++
                    continue
                }
                combinedColumns.push(oldColumn[k])
            } else if(end > start) {
                if((start+1 <= k) && (k <= end+1)) {
                    combinedColumns.push(columnStore[ct])
                    ct++
                    continue
                }
                combinedColumns.push(oldColumn[k])
            }
        }

        this.replaceOldWithModified(postStore, oldPost)

        this.setState({
            ...this.state,
            columns: combinedColumns,
            posts: oldPost,
            order: newColumnOrder,
        })
    }
    
    // Level => [1,4]だったらLevel0は1のことを指す
    createNewIndexes = (baseIndex, valueToChange, level, columnIndex) => {
    
        const columnId = this.state.order[columnIndex+1] // このplus1は概要の分
        const column = arrObjLookUp(this.state.columns, "_id", columnId)
        const postIds = column.posts // このColumnに属するpost
    
        var newPosts = []
        var post = {}
        var postFound = {}

        postIds.forEach(id => {
            postFound = arrObjLookUp(this.state.posts, "_id", id)
            post = deepCopyArrOfObj(postFound)
            
            post.index[level] = baseIndex + valueToChange
            newPosts.push(post)
        }) 

        const newColumn = deepCopyArrOfObj(column)
        newColumn.index = baseIndex + valueToChange

        return [newColumn, newPosts]
    }

    findPostsAndIncrement = (startCond, endCond, lookUpIdList, incrementVal, storeArray, isColumn) => {

        var targetPost = {}
        var newArray = {}

        for (var i=startCond; i<endCond; i++){
            targetPost = arrObjLookUp(this.state.posts, "_id", lookUpIdList[i])
            newArray = deepCopyArrOfObj(targetPost)
            if(isColumn) {
                newArray.index[0] = newArray.index[0]+incrementVal
            } else {
                newArray.index[1] = newArray.index[1]+incrementVal
            }
            storeArray.push(newArray)
        }
    }

    replaceOldWithModified = (newList, oldList) => {
        var found = {}
        for (var i=0; i < oldList.length; i++) {
            found = arrObjLookUp(newList, "_id", oldList[i]._id)
            if(!!found){
                oldList[i] = found
                continue
            }
        }
    }

    onDragEnd = result => {
        const { destination, source, draggableId, type } = result;

        if (!destination) { return; }

        if (destination.droppableId === source.droppableId && destination.index === source.index) { return; }

        ///////////////////////////////////
        // もし、Column同士を入れ替えた場合 //
        ///////////////////////////////////

        if(type === "column") {
            var newColumnOrder = deepCopyArrOfObj(this.state.order);
            newColumnOrder.splice(source.index+1, 1);
            newColumnOrder.splice(destination.index+1, 0, draggableId);

            // 中のポストのIndexを直す
            this.sortColumnSwap(newColumnOrder, source.index, destination.index) 

            return;
        }

        const origin = arrObjLookUp(this.state.columns, "_id", source.droppableId)
        const target = arrObjLookUp(this.state.columns, "_id", destination.droppableId)

        ///////////////////////////////////
        // もし、同じColumnから持ってきた場合 //
        ///////////////////////////////////

        if(origin === target) {
            var postIds = deepCopyArrOfObj(origin.posts);
            postIds.splice(source.index, 1); // 動かす前の位置をから消す
            postIds.splice(destination.index, 0, draggableId); // 新しい位置へと付け加える

            var newPosts = []
            var postId = ""

            if (destination.index > source.index) {
                // 2{soure.index}を4{destination.index}の位置に持っていく場合は、前半（2~3）が-1され、4が3の値+1される

                this.findPostsAndIncrement(source.index, destination.index, postIds, -1, newPosts)
                
                postId = [draggableId]
                this.findPostsAndIncrement(0, 1, postId, destination.index - source.index, newPosts)

            } else if (destination.index < source.index) {
                // 4{soure.index}を2{destination.index}の位置に持っていく場合は、前半（2~3）が+1され、4が3の値+1される

                postId = [draggableId]
                this.findPostsAndIncrement(0, 1, postId, destination.index - source.index, newPosts)

                this.findPostsAndIncrement(destination.index+1, source.index+1, postIds, 1, newPosts)
            }

            // ここから先はsetStateのための前準備

            var ct = 0
            var newColumn = deepCopyArrOfObj(origin)

            for(var l=0; l < newColumn.posts.length; l++) {
                if(destination.index < source.index){
                    if((destination.index <= l) && (l <= source.index)) {
                        newColumn.posts[l] = newPosts[ct]._id
                        ct++
                        continue
                    }
                } else if(destination.index > source.index) {
                    if((source.index <= l) && (l <= destination.index)) {
                        newColumn.posts[l] = newPosts[ct]._id
                        ct++
                        continue
                    }
                }
            }

            var combinedColumns = deepCopyArrOfObj(this.state.columns)
            var combinedPosts = deepCopyArrOfObj(this.state.posts)
            // var found = {}

            combinedColumns[source.droppableId] = newColumn

            this.replaceOldWithModified(newPosts, combinedPosts)

            this.setState({
                ...this.state,
                columns: combinedColumns,
                posts: combinedPosts,
            })

            return;
        }

        ///////////////////////////////////
        // もし、違うColumnから持ってきた場合 //
        ///////////////////////////////////

        // Sourceに残ったNodeのLogic
        const sourcePosts = deepCopyArrOfObj(origin.posts); // 始めのColumn
        sourcePosts.splice(source.index, 1) 

        var found = {}
        var changed = []

        this.findPostsAndIncrement(source.index, sourcePosts.length, sourcePosts, -1, changed)

        // SourceからTargetに追加されたNodeのロジック
        const temp = arrObjLookUp(this.state.posts, "_id", draggableId)
        const newAddedPost = deepCopyArrOfObj(temp)

        //挿入する位置の一つ前のものか、一番最初の場合は0
        var destinationIndex = -1
        const destinationPostId = target.posts[destination.index-1]
        if (destinationPostId) {
            destinationIndex = arrObjLookUp(this.state.posts, "_id", destinationPostId).index[1]  
        }

        newAddedPost.index[0] = target.index
        newAddedPost.index[1] = destinationIndex + 1

        changed.push(newAddedPost)

        // Targetに元々あるNodeのロジック
        var targetPosts = deepCopyArrOfObj(target.posts); //　ターゲットのColumn
        targetPosts.splice(destination.index, 0, draggableId);

        this.findPostsAndIncrement(destination.index+1, targetPosts.length, targetPosts, 1, changed) // ここもしかたら最初のargの値違うかも


        // ここから先は、setStateのための前準備
        var combinedColumns = deepCopyArrOfObj(this.state.columns)

        for(var q=0; q < combinedColumns.length; q++) {
            if(q === origin.index) {
                combinedColumns[q].posts = sourcePosts
            } else if(q === target.index) {
                combinedColumns[q].posts = targetPosts
            }
        }

        var combinedPosts = deepCopyArrOfObj(this.state.posts)

        this.replaceOldWithModified(changed, combinedPosts)

        this.setState({
            ...this.state,
            columns: combinedColumns,
            posts: combinedPosts,
        })

    }

    showAddIndex = (e) => {
        e.preventDefault();
        const id = "1"; // falseじゃなければなんでもいい
        const action = "ADD_COLUMN";
        const title = "新しいコラムを追加する";
        const message = "主題のタイトルを入力してください。";
        const caution = "";
        const buttonMessage = "追加する";
        this.props.showConfirmation(id, action, title, caution, message, buttonMessage);
        this.props.enableGray();
    }

    addNewIndex = () => {

        const _id = new ObjectID();
        const index = this.state.order.length;
        
        const newData = {
            _id: String(_id),
            index,
            title: this.props.index.columnName,
            posts: []
        }

        const newColumns = deepCopyArrOfObj(this.state.columns)
        newColumns.push(newData)

        const newColumnOrder = deepCopyArrOfObj(this.state.order)
        newColumnOrder.push(String(_id))

        this.setState({
            ...this.state,
            order: newColumnOrder,
            columns: newColumns,
        })

        this.props.updateMessage("success", `コラム「${this.props.index.columnName}」を追加しました。`)
    }

    handleRevert = () => {
        const id = "1";
        const action = "REVERT_COLUMN";
        const title = "変更を元に戻す";
        const message = "変更をもとに戻しますか？";
        const caution = "";
        const buttonMessage = "変更する";
        this.props.showConfirmation(id, action, title, caution, message, buttonMessage);
        this.props.enableGray();
    }

    handleBack = () => {
        this.props.setBackward(true);
        this.props.setStep(2);
    }  

    handleForward = () => {
        this.props.setBackward(false);
        this.props.setStep(4);
        this.props.setIndex(this.state.posts, this.state.columns, this.state.order);
    }

    handleNameChange = (columnIndex, value) => {
        const column = arrObjLookUp(this.state.columns, "index", columnIndex)
        this.setState(state => {
            const res = state.columns
                        .map(col => { 
                            if(col._id === column._id) {
                                col.title = value; 
                                return col; 
                            }
                            return col;
                        })
            return { res }
        })
    }

    handleDelete = (columnId, columnTitle) => {
        const id = columnId;
        const action = "DELETE_COLUMN";
        const title = "コラムの削除";
        const message = `コラム"${columnTitle}"を削除しますか？`;
        const caution = "";
        const buttonMessage = "削除する";
        this.props.showConfirmation(id, action, title, caution, message, buttonMessage);
        this.props.enableGray();
    }

    renderTask = () => {

        return (
            <Wrapper>
                <IndexBox>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="all-columns" direction="horizontal" type="column">
                            {(provided) => (
                                <Container
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                {this.state.order
                                    .filter((_, index) => index !== 0)
                                    .map((columnId, index) => {
                                        const column = arrObjLookUp(this.state.columns, "_id", columnId);
                                        return (
                                            <InnerList
                                                key={columnId}
                                                column={column}
                                                postMap={this.state.posts}
                                                index={index}
                                                handleChange={this.handleNameChange}
                                                handleDelete={this.handleDelete}
                                            />
                                        )
                                    })
                                }
                                {provided.placeholder}
                                </Container>
                            )}
                        </Droppable>
                    </DragDropContext>
                </IndexBox>
            </Wrapper>
        )
    }

    render() {
        return (
            <Box scroll={true}>
                <BoxTransition back={this.props.back} transition={true}>
                    <div> 
                        <p>4. トピックの目次を編集</p>
                        <RevertBtn　onClick={this.handleRevert}>元に戻す</RevertBtn>
                        <AddBtn onClick={(e) => this.showAddIndex(e)}>
                            <GoPlusSmall/>コラムを追加
                        </AddBtn>
                    </div> 

                    { this.state.posts[0] && this.renderTask() }

                    <Space height={"360px"}/>

                    <TwoButtons
                        handleBack={this.handleBack}
                        handleForward={this.handleForward}
                        text={["戻る", "次へ進む"]}
                    />
                    
                    <Space height={"220px"}/>

                </BoxTransition>
            </Box>
        )
    }
}

// ここは本来PureComponentだったが、deep comparisonするために（column.title）Componentに変えた
// 将来的には、deep objでshouldComponentUpdateする
class InnerList extends Component {
    render () {
        const { column, postMap, index, handleChange, handleDelete } = this.props;
        const posts = column.posts.map(id => arrObjLookUp(postMap, "_id", id));
        return <Column column={column} posts={posts} index={index} handleChange={handleChange} handleDelete={handleDelete}/>
    }
}

function mapStateToProps({index}) {
    return {
        index
    }
}

export default connect(mapStateToProps, actions)(EditIndexTopic)