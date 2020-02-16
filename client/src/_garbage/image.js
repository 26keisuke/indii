// const {
    //     acceptedFiles,
    //     getRootProps,
    //     getInputProps,
    //     isDragAccept, 
    //     isDragActive, 
    //     isDragReject
    // } = useDropzone({
    //     accept: "image/jpeg, image/png",
    //     maxSize: 5242880,
    //     multiple: false,
    //     onDropAccepted: (acceptedFiles) => {

    //         const promise = new Promise((resolve, reject) => {
    //             const reader = new FileReader()
    //             reader.readAsDataURL(acceptedFiles[0])
    //             reader.onload = () => {
    //                 if(!!reader.result) {
    //                     resolve(reader.result)
    //                 } else {
    //                     reject(Error("Failed converting to base64"))
    //                 }
    //             }
    //         })
    //         promise.then(result => {
    //             setFile({preview: result})
    //         }, err => {
    //             console.log(err)
    //         })

    //         // setFiles(acceptedFiles.map(file => Object.assign(file, {
    //         //     preview: URL.createObjectURL(file)
    //         // })));

    //         // const uploader = acceptedFiles.map(file => {
    //         //     const formData = new FormData();
    //         //     formData.append("file", file);
    //         //     formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    //         //     formData.append("timestamp", (Date.now()));
    //         //     return axios.post(CLOUDINARY_UPLOAD_URL, formData, {
    //         //         headers: { "X-Requested-With": "XMLHttpRequest" },
    //         //     }).then(response => {
    //         //         const data = response.data;
    //         //         const fileURL = data.secure_url // Have to store this URL for future references
    //         //         console.log(data);
    //         //     })
    //         // })
    //     }
    // });

    // useEffect (() => {
    //     if(file !== "undefined" || file === undefined){
    //         localStorage.setItem(props.storage, file.preview)
    //     }
    // },[props.storage, file])

    // const style = useMemo(() => ({
    //     ...baseStyle,
    //     ...(isDragAccept ? acceptStyle : {}),
    //     ...(isDragReject ? rejectStyle : {}),
    //     ...(isDragActive ? activeStyle : {})
    // }), [
    //     isDragActive,
    //     isDragReject
    // ]);

    // const display = ((file.preview === "null") || (file.preview === "") || (file.preview === null)) ? props.initialVal : file.preview

    // Styling
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
// if((file.preview === "null") || (file.preview === "") || (file.preview === null)) {

// const display = ((file.preview === "null") || (file.preview === "") || (file.preview === null)) ? props.initialVal : file.preview

                        {/* <PreviewElement hide={!file.preview && !props.initialVal}> */}
                        {/* <PreviewElement mobile={true} hide={!file.preview && !props.initialVal}> */}