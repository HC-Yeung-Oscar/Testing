import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

export const PictureTaker = () => {

    const handleTakePhoto = (dataUri) => {
        console.log("photo has been taken.");
        console.log(dataUri);
    }

    return (
        <div>
            <Camera onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}></Camera>
        </div>
    )
}
