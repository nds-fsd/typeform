import React, { useState, useEffect } from 'react';
import { ProfilePicture } from '../ProfilePicture/ProfilePicture';
import { handleUpdateProfilePicture, handleUpload, fetchUserData } from '../../utils/api';
import { useQuery } from 'react-query';
import { useUserProvider } from '../../context/UserContext';
import SmallButton from '../../components/Buttons/SmallButton';

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
        <div className="flex flex-col items-center gap-4 w-36 max-w-52 ">
            <ProfilePicture imageUrl={url_Image} />
            <div className="relative">
                <input
                    id="file-input"
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                />
                <SmallButton type="button" text="Change picture" className="w-[250px]" />
            </div>
        </div>
    );
};

export default FileInput;
