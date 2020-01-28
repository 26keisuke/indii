import React, {useState, useMemo, useEffect} from "react"
import axios from "axios"
import Dropzone, { useDropzone } from "react-dropzone"

// mostly from
// https://react-dropzone.netlify.com/

const CLOUDINARY_UPLOAD_PRESET = 'glgcswc0';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dgc4swpmv/upload';

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    width: "400px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    transition: 'border .24s ease-in-out'
};
const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

// TODO: fileどうせ一個しかないのだからmapする必要はない

function CreateImageTopic(props) {

    const [end, setEnd] = useState(false);
    const [warning, setWarning] = useState("");
    const [files, setFiles] = useState([]);

    const {
        acceptedFiles,
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
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            // const uploader = acceptedFiles.map(file => {
            //     const formData = new FormData();
            //     formData.append("file", file);
            //     formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            //     formData.append("timestamp", (Date.now()));
            //     return axios.post(CLOUDINARY_UPLOAD_URL, formData, {
            //         headers: { "X-Requested-With": "XMLHttpRequest" },
            //     }).then(response => {
            //         const data = response.data;
            //         const fileURL = data.secure_url // Have to store this URL for future references
            //         console.log(data);
            //     })
            // })
        }
    });

    const thumbs = files.map(file => (
        file.preview
    ));

    useEffect(() => {
        return files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
        ...(isDragActive ? activeStyle : {})
    }), [
        isDragActive,
        isDragReject
    ]);


    const renderWarning = ()  => {
        if(warning){
            return (
                <div className="topic-form-area-top-warning">
                    <div className="topic-form-area-top-warning-circle"/>
                    <p>
                        {warning}
                    </p>
                </div>
            );
        };
        return false;
    };

    const handleBack = () => {
        setEnd(true);
        props.setBackward(true);
        props.setStep(0);
    };

    const handleForward = () => {
        if(!acceptedFiles.length){
            console.log("Illegal attempt to bypass sending a file");
        }
        props.setBackward(false)
        props.setStep(2);
        props.setImage(files.map(file => (
            file
        )));
    };

    return (
        <div className="topic-form-area">
            <div className={props.back ? "topic-form-area-wrapper-enter" : "topic-form-area-wrapper-show"}>
                <div className="topic-form-area-top"> 
                    {renderWarning()}
                    <p className="topic-form-area-top-title">2. アイコンと背景用の写真を選択</p>
                </div> 
                <section className="container">
                    <div {...getRootProps({style})}>
                        <input {...getInputProps()} />
                        <p>このボックスに画像をドラッグするか、ボックスをクリックしてください</p>
                        <em>(*.jpegと*.pngのみ)</em>
                    </div>
                    <div>
                    <div className="thumb-preview">
                        <div className="thumb-preview-wrapper">
                            <div className={ !acceptedFiles.length ? "thumb-preview-mobile-fake" : "zero-opacity" }/>
                            <img src={thumbs} className={ !acceptedFiles.length ? "thumb-preview-mobile zero-opacity" : "thumb-preview-mobile"}/>
                        </div>
                        <div className="thumb-preview-wrapper">
                            <div className={ !acceptedFiles.length ? "thumb-preview-web-fake" : "zero-opacity" }/>
                            <img src={thumbs} className={ !acceptedFiles.length ? "thumb-preview-web zero-opacity" : "thumb-preview-web" }/>
                        </div>
                    </div>
                    </div>
                </section>
                <div className="topic-form-button">
                    <button className="topic-form-button-left" onClick={handleBack}>戻る</button>
                    <button 
                        className={!acceptedFiles.length ? "topic-form-button-right disable" : "topic-form-button-right"} 
                        onClick={handleForward}
                    >
                            次へ進む
                    </button>
                </div>
            </div>
        </div>
    );
};


export default CreateImageTopic;