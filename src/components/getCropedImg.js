export const getCroppedImg = async (imageSrc, crop) => {
    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.src = url;
        });

    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to the crop area
    canvas.width = crop.width;
    canvas.height = crop.height;

    // Draw the cropped image onto the canvas
    ctx.drawImage(
        image,
        crop.x, crop.y, crop.width, crop.height, // Source image position and size
        0, 0, crop.width, crop.height            // Draw image on canvas
    );

    // Convert the canvas to a Blob or Base64 (depending on how you want to return the image)
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);  // You can also return canvas.toDataURL() if you want Base64
        }, 'image/jpeg');  // Adjust format if needed
    });
};
