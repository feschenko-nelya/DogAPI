import '../.css/base.css';
import '../.css/gallery.css';

import uploadImgNone from '../.img/upload-image-none.svg';
import uploadErr from '../.img/upload-err.svg';
import uploadScs from '../.img/upload-scs.svg';

import React from 'react';
import {useDropzone} from 'react-dropzone';
import {useState, useEffect} from 'react';

function UploadModal(props) {

    const [uploadResult, setUploadResult] = useState({});

    function uploadImage() {
        let url = 'https://api.thedogapi.com/v1/images/upload';

        let file = new FormData();
        file.append('file', files[0]);

        fetch(url, {
            method: "POST",
            headers: {
                // "Content-type": "multipart/form-data",
                "x-api-key": "7e06fa96-57d3-4811-bb36-448b149d2484",
            },
            body: file,
        })
        .then(response => response.json())
        .then(response => setUploadResult(response))
        // .then(setFiles([]));
        // .then(() => { if ('approved' in uploadResult) setFiles([]) } )
        // .then(console.log(files));
    }  

    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone( {
        accept: { 'image/*': [] },
        // onDrop: acceptedFiles => {
        //     setFiles(acceptedFiles.map(file => {
        //                                         Object.assign(file, 
        //                                                       {preview: URL.createObjectURL(file)})
        //                                         }
        //                               )
        //             )}
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
            })));
        }
        });

        useEffect(() => {
            if ('approved' in uploadResult) setFiles([])

            // files[0] = null
            console.log('useEffect')
            console.log(uploadResult)

            // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
            return () => files.forEach(file => URL.revokeObjectURL(file.preview));
        }, [uploadResult]);

        console.log(files);

        let uploadImg = '';
        if (files.length) {
            uploadImg = <img src={files[0].preview} alt={files[0].path} className="upload-img"/>
        }
        else {
            uploadImg = <div>
                            <img src={uploadImgNone} alt='No file' />
                            <div className='upload-noimage-tooltip'>
                                <b>Drag here</b> your file or <b>Click here</b> to upload.
                            </div>
                        </div>;
        }

        let imgBackground = '';
        if ('status' in uploadResult) {
            imgBackground = 'upload-bg-error';
        }

        let uploadResultCmp = <button className="label label-marked upload-btn" onClick={uploadImage}> Upload photo</button>;

        console.log(uploadResult);

        if ('approved' in uploadResult) {
            uploadResultCmp = (
                <div className="upload-result">
                    <img src={uploadScs}/>
                    Thanks for the Upload - Dog found!
                </div>
            );
        }
        else if ('status' in uploadResult) {
            uploadResultCmp = (
                <div className="upload-result">
                    <img src={uploadErr}/>
                    {uploadResult.message}
                </div>
            );
        }

        return (
                <div className="upload-wrapper">
                    <div className="upload-content">
                        <div className="upload-content-head">
                            <button className="button-white button-small upload-btn-close" onClick={ () => props.setUploadModal(false) }>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.05691 8.99997L0.52832 1.47137L1.47113 0.528564L8.99972 8.05716L16.5283 0.528564L17.4711 1.47137L9.94253 8.99997L17.4711 16.5286L16.5283 17.4714L8.99972 9.94278L1.47113 17.4714L0.52832 16.5286L8.05691 8.99997Z" fill="#FF868E"/>
                                </svg>
                            </button>
                            <h1>Upload a .jpg or .png Dog image</h1>

                            Any uploads must comply with the upload guidlines or face deletion.
                        </div>
                        <div className={"upload-content-file " + imgBackground} {...getRootProps()}>
                            {uploadImg}
                            <input {...getInputProps()} />

                        </div>
                        <div className="upload-content-bottom">
                        {!files.length ? 'No file selected' : 'Image File Name:'  + files[0].path}
                        <p></p>
                        {uploadResultCmp}
                        
                        </div>
                    </div>
                </div>
        );
    }

export default UploadModal;
