import React, { useState } from 'react';
import { ProfilePicture } from '../ProfilePicture/ProfilePicture';
import { handleUpload } from '../../utils/api';


export const FileInput = () => {
    const [file, setFile] = useState();

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const onSubmit = async () => {
        try {
            const url = await handleUpload({ target: { files: [file] }});
            console.log(url); // log the response
        } catch (error) {
            console.error('Error uploading file', error);
        }
    }

    return (
        <div>
            <div className="relative w-40 h-10">
                <input id="file-input" type="file" className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                accept="image/png, image/jpeg" onChange={onFileChange}/>
                <button type="button" className="w-full h-full shadow-md bg-azure hover:bg-white hover:shadow-none hover:border
                 hover:border-gray-600 rounded-4xl transition-all duration-300">
                <p>Change profile picture</p>
                </button>
                <button type="button" onClick={onSubmit}>Submit</button>
                <ProfilePicture />
            </div>
        </div>
    );
};

export default FileInput;
