import React, {useMemo, useEffect} from "react"
import PropTypes from "prop-types"
import { useDropzone } from "react-dropzone"

const Upload = ( props ) => {

    const {file, setFile, storage, baseStyle, activeStyle, acceptStyle, rejectStyle, message, caution, onDropped} = props

    const {
        // acceptedFiles,
        getRootProps,
        getInputProps,
        isDragAccept, 
        isDragActive, 
        isDragReject
    } = useDropzone({
        accept: "image/jpeg, image/png",
        maxSize: 5242880,
        multiple: false,
        onDropAccepted: (acceptedFiles) => {

            const promise = new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(acceptedFiles[0])
                reader.onload = () => {
                    if(!!reader.result) {
                        resolve(reader.result)
                    } else {
                        reject(Error("Failed converting to base64"))
                    }
                }
            })
            promise.then(result => {
                setFile({preview: result})
            }, err => {
                console.log(err)
            })
        }
    });

    useEffect (() => {
        // if(storage && ((file.preview !== null) && (file.preview !== undefined))){
        //     localStorage.setItem(storage, file.preview)
        // }
        if(onDropped && ((file.preview !== null) && (file.preview !== undefined))) {
            onDropped(file.preview)
        }
    },[
        storage,
        file, 
        // こっからしたはいらないかもしれない
        onDropped
    ])

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
        ...(isDragActive ? activeStyle : {})
    }), [
        isDragActive,
        isDragReject,
        // こっからしたはいらないかもしれない
        acceptStyle,
        activeStyle, 
        baseStyle, 
        isDragAccept,
        rejectStyle,
    ]);

    return (
        <div>
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>{message}</p>
                <em>{caution}</em>
            </div>
        </div>
    )
}

Upload.propTypes = {
    message: PropTypes.string,
    caution: PropTypes.string,
    file: PropTypes.object,
    storage: PropTypes.string,
    setFile: PropTypes.func,
    onDropped: PropTypes.func,
    baseStyle: PropTypes.object,
    activeStyle: PropTypes.object,
    acceptStyle: PropTypes.object,
    rejectStyle: PropTypes.object,
}

export default Upload