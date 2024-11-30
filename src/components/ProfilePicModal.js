import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './getCropedImg';  // Make sure the function is imported
import { useSelector, useDispatch } from 'react-redux';
import { closeProfilePicModal, selectIsProfilePicModalOpen } from '../state/store/profilepicSlice';
import axios from 'axios';
import '../styles/profilepicmodal.css';

const UpdateProfileModal = ({userId}) => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector(selectIsProfilePicModalOpen);

    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1); // Allow zoom for more accurate cropping
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // When crop is completed, save the pixel values
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // Show the cropped image and convert to Blob
    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            return croppedImage;
        } catch (e) {
            console.error('Error cropping image:', e);
            return null;
        }
    }, [croppedAreaPixels, imageSrc]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the cropped image Blob
        const croppedImageBlob = await showCroppedImage();

        if (!croppedImageBlob) {
            console.log('No cropped image found.');
            return;
        }

        // Prepare the form data with the cropped image
        const formData = new FormData();
        const croppedFile = new File([croppedImageBlob], 'profile-pic.jpg', { type: 'image/jpeg' });
        formData.append('profilepicture', croppedFile); // Ensure the field matches your API

        try {
            setLoading(true);
            const response = await axios.put(`/api/auth/updateprofilepicture/673edcf0c77d287d31fffdcd`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'auth-token': localStorage.getItem('token'),
                },
            });

            const updatedUser = response.data;
            if (updatedUser) {
                console.log("Profile picture updated successfully");
            } else {
                throw new Error('Update failed');
            }

            handleClose();
            // window.location.reload();
        } catch (error) {
            console.error('Error updating profile picture:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        dispatch(closeProfilePicModal());
    };

    if (!isModalOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content3">
                <div className="modal-header3">
                    <h2>Update Profile Picture</h2>
                    <button className="close-btn" onClick={handleClose}>×</button>
                </div>

                {/* Image Upload and Crop Section */}
                <div className="profile-picture-container3">
                    {imageSrc ? (
                        <div className="crop-container3">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}  // Aspect ratio for circular crop
                                cropShape="round"
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                    ) : (
                        <div className="upload-placeholder3">
                            <input type="file" onChange={handleImageUpload} />
                            <p>Upload Profile Picture</p>
                        </div>
                    )}
                </div>

                {/* Form Actions */}
                <form onSubmit={handleSubmit}>
                    <div className="form-actions">
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileModal;
