import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './Cropimage';  // Utility function for cropping
import { FiRotateCcw, FiRotateCw, FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { closeProfilePicModal, selectIsProfilePicModalOpen } from '../state/store/profilepicSlice';
import axios from 'axios';
import '../styles/profilepicmodal.css';

const UpdateProfileModal = () => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector(selectIsProfilePicModalOpen);

    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
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

    // Crop complete callback
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // Handle cropping
    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
            setCroppedImage(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, rotation, imageSrc]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await showCroppedImage(); // Generate cropped image when form is submitted

        const formData = new FormData();
        if (croppedImage) {
            formData.append('profilePictureUrl', croppedImage); // Use the schema field 'profilePictureUrl'
        }

        try {
            setLoading(true);
            const response = await axios.put('/api/auth/updateprofilepicture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'auth-token': localStorage.getItem('token'), // Ensure token is fetched properly
                },
            });
            const updatedUser = response.data;

            if (updatedUser) {
                console.log("Profile picture updated successfully");
            } else {
                throw new Error('Update failed');
            }

            handleClose();
            window.location.reload();
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
                    <button className="close-btn" onClick={handleClose}>×</button> {/* Close modal icon */}
                </div>

                {/* Image Crop Section */}
                <div className="profile-picture-container3">
                    {imageSrc ? (
                        <div className="crop-container3">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}  // Aspect ratio for circular crop
                                cropShape="round"
                                rotation={rotation}
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

                {/* Controls moved outside the image select container */}
                <div className="controls">
                    <button onClick={() => setRotation(rotation - 90)}><FiRotateCcw /></button>
                    <button onClick={() => setRotation(rotation + 90)}><FiRotateCw /></button>
                    <button onClick={() => setZoom(zoom + 0.1)}><FiZoomIn /></button>
                    <button onClick={() => setZoom(zoom - 0.1)}><FiZoomOut /></button>
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
