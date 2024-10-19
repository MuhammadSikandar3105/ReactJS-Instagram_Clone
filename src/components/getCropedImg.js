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
        crop.x, crop.y, crop.width, crop.height,
        0, 0, crop.width, crop.height           
    );

    // Convert the canvas to a Blob or Base64 
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob); 
        }, 'image/jpeg');  
    });
};
