import React, { Component } from "react"
import styled from "styled-components"

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const Message = styled.p`
    color: #585858;
    font-size: 10px;
`

class Crop extends Component {

    constructor(props) {
        super(props)

        this.state = {
            crop: null,
        }
    }

    componentDidUpdate(prevProps) {
        if ((!this.state.crop && this.props.config)) {
            // 初期化
            this.setState({ 
                ...this.state,
                crop: this.props.crop,
            })
        } else if((prevProps.config !== this.props.config)) {
            this.setState({ 
                ...this.state,
                crop: this.props.crop,
            })
        }
    }

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
              this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    onImageLoaded = image => {
        this.imageRef = image;
    };
    
    onCropChange = (crop, percentCrop) => {
        this.setState({ crop });
    };
    
    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };
    
    makeClientCrop = (crop) => {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = this.getCroppedImg(this.imageRef, crop);
            this.props.setUrl(croppedImageUrl)
        }
    }
    
    getCroppedImg(image, crop) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    
        return canvas.toDataURL()
    }

    render () {

        const { crop } = this.state;
        const { file, style, imageStyle  } = this.props

        return (
            <div>
                {file.preview && (
                <div>
                    <Message>画像のサイズを変更する</Message>
                    <ReactCrop
                        style={ style || { marginTop: "10px", width: "444px", border: "1px solid #d2d2d2", boxSizing: "border-box" }}
                        imageStyle={ imageStyle || { width: "445px" }}
                        src={file.preview}
                        crop={crop}
                        ruleOfThirds
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                    />
                </div>
                )}
            </div>
        )
    }
}

export default Crop