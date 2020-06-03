import React from 'react';

export const FileUploadButton = (props) => {

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(await toBase64(e.currentTarget["uploaded-image"].files[0]));
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="uploaded-image"
                    type="file"
                    accept="image/*"
                    required
                />

                <button type="submit">upload a photo</button>
            </form>
        </div>
    )
}

