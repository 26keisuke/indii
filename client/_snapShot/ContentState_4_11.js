import React, { useRef, useState, useEffect, useMemo } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import equal from "deep-equal"

import * as actions from "../actions"

import DraftEditor from "./Draft/Editor/Editor"

const useInterval = (callback, delay, condition) => {
    const savedCallback = useRef();
  
    useEffect(() => {
        savedCallback.current = callback;
    });
  
    useEffect(() => {
        var id;

        if(condition.filter(elem => !elem).length === 0){
            id = setInterval(() => {
                savedCallback.current();
            }, delay);
        }

        return () => id && clearInterval(id);
    }, [delay, condition]);
}

const WrappedEditorRoute = ({ loggedIn, draftArr, ...props }) => {
    
    const [contentArr, setContentArr] = useState([]) // contentArr :: [{id: string, timeStamp: date, content: obj}]

    useInterval(() => getDiff(contentArr, draftArr), 5000, [loggedIn, !!draftArr.length, !!contentArr.length])
    

    // const setUpdater = () => {
    //     autoUpdate = setInterval(() => {
    //         getDiff(contentArr, draftArr)
    //     }, 5000)
    // }

    // useEffect(() => {
    //     if(contentArr.length > 0) {
    //         clearInterval(autoUpdate)
            // autoUpdate = useInterval(() => getDiff(contentArr, draftArr), 5000)
            // setInterval(() => {
            //     console.log("CALLED")
            //     getDiff(contentArr, draftArr)
            // }, 5000)
        // }
    // }, [contentArr, draftArr, autoUpdate])

    // useEffect(() => {
    //     return () => {
    //         clearInterval(autoUpdate)
    //     }
    // }, [])

    // useEffect(() => {
    //     if(loggedIn && !autoUpdate) { setUpdater() }
    //     return () => {
    //         clearInterval(autoUpdate)
    //     }
    // },[])

    // useEffect(() => {
    //     if(loggedIn && !autoUpdate) { setUpdater() }
    // },[loggedIn, autoUpdate])

    const updateContentArr = (idToUpdate, newContent) => {
        const newObj = JSON.parse(JSON.stringify(contentArr))

        for(var i=0; i < newObj.length; i++){
            if(newObj[i].id === idToUpdate){        
                if(!newContent) {
                    newObj.splice(i, 1)
                    setContentArr(newObj)
                    return
                }
                newObj[i].id = idToUpdate
                newObj[i].content = newContent
                setContentArr(newObj)
                return
            }
        }
        newObj.push({id:idToUpdate, content: newContent})
        setContentArr(newObj)
    }

    const getDiff = (afterArr, beforeArr) => {

        var id, content;

        console.log(beforeArr, afterArr)

        for(var i=0; i < beforeArr.length; i++) {
            id = beforeArr[i]._id
            content = beforeArr[i].content
            for(var j=0; j < afterArr.length; j++) {
                if(id === afterArr[j].id){
                    if(afterArr[j].content && !equal(content, afterArr[j].content)){
                        // props.draftOneUpdate(afterArr[j].id, afterArr[j].content, Date.now())

                        updateContentArr(afterArr[j].id)
                    }
                }
            }
        }
    }

    const Editor = useMemo(() => { return <DraftEditor updateContentArr={updateContentArr} /> }, [])

    return (
        <Route 
            path="/draft/edit/:id" 
            render={() => <> {Editor} </>} 
        />
    )
}

function mapStateToProps({ auth, draft }){
    return {
        loggedIn: auth.loggedIn,
        draftArr: draft.onEdit,
    }
}

export default connect(mapStateToProps, actions)(WrappedEditorRoute)