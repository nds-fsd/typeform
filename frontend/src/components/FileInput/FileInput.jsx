import React, { useState } from 'react';
import { ProfilePicture } from '../ProfilePicture/ProfilePicture';
import { handleUpdateProfilePicture, handleUpload, fetchUserData } from '../../utils/api';
import { useQuery } from 'react-query';
import { useUserProvider } from '../../context/UserContext';
import { useEffect } from 'react';


export const FileInput = () => {
    const [url_Image, setUrlImage] = useState();

    const { userId } = useUserProvider();

    const { data: user, isLoading, isError, refetch } = useQuery(
        ['user', userId],
        () => fetchUserData(userId),
        { retry: false }
    );

    useEffect(() => {
        if (user?.profilePicture) {
            setUrlImage(user.profilePicture);
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Sorry, there is an error.</div>
    }



    const handleFileChange = async (event) => {
        try {
            const url = await handleUpload(event);
            setUrlImage(url);
            await handleUpdateProfilePicture(userId, url);
            refetch();
        } catch (error) {
            console.error('Error uploading file', error);
        }
    };

    return (
        <div>
            <div className="relative w-40 h-10">
                <input id="file-input" type="file" className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                    accept="image/png, image/jpeg" onChange={handleFileChange} />
                <button type="button" className="w-full h-full shadow-md bg-azure hover:bg-white hover:shadow-none hover:border
                 hover:border-gray-600 rounded-4xl transition-all duration-300">
                    <p>change picture</p>
                </button>
                {/* <button type="button" onClick={onSubmit}>Submit</button> */}
                <ProfilePicture imageUrl={url_Image} />
            </div>
        </div>
    );
};

export default FileInput;
