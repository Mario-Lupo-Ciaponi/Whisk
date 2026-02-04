import { useState } from "react";
import "./UploadBox.css";

const UploadBox = ({ image, setImage }) => {
  const [errors, setErrors] = useState([]);

  const getImageDimensions = (file) => {
    return new Promise((resolve) => {
      const img = new Image();

      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        const dimensions = {
          width: img.width,
          height: img.height,
          ratio: img.height / img.width,
        };

        URL.revokeObjectURL(objectUrl);
        resolve(dimensions);
      };

      img.src = objectUrl;
    });
  };

  const isFileImage = (file) => {
    return file.type.includes("image");
  };

  const areImageDimensionsProportional = async (image) => {
    const { width, height, ratio } = await getImageDimensions(image);

    return (
      412 <= width &&
      width <= 2560 &&
      200 <= height &&
      height <= 3000 &&
      0.5 <= ratio &&
      ratio <= 1.6
    );
  };

  const isImageSizeNormal = (image) => {
    const imageSizeLimitInMg = 5;
    const imageSizeInMg = image.size / Math.pow(1024, 2);

    return imageSizeInMg < imageSizeLimitInMg;
  };

  const isImageValid = async (file) => {
    setErrors([]);
    let currentErrors = [];

    if (isFileImage(file)) {
      if (
        isImageSizeNormal(file) &&
        (await areImageDimensionsProportional(file))
      )
        return true;
    }

    if (!isFileImage(file)) currentErrors.push("File must be of type Image.");
    if (!(await areImageDimensionsProportional(file)))
      currentErrors.push(
        "Image is too long or too wide. Please use a more standard aspect ratio.",
      );
    if (!isImageSizeNormal(file))
      currentErrors.push("Image's size must not exceed 5 MB.");

    setErrors(currentErrors);

    return false;
  };

  const removeBtn = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setImage(null);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const droppedImage = event.dataTransfer.files[0];

    if (await isImageValid(droppedImage)) setImage(droppedImage);
  };

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleChange = async (event) => {
    const image = event.target.files[0];

    if (await isImageValid(image)) setImage(image);
  };

  return (
    <div className="upload-container">
      <label
        htmlFor="image-upload"
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
      >
        {image ? (
          <>
            <span className="file-name">{image.name}</span>
            <button onClick={removeBtn} className="remove-btn">
              Remove image
            </button>
          </>
        ) : (
          <>
            <h3 className="drop-text">Drop an image here or click to upload</h3>

            <div className="browse-btn">Browse</div>
          </>
        )}

        <input
          id="image-upload"
          className="hidden-input"
          name="image-upload"
          type="file"
          onChange={handleChange}
        />
      </label>

      <ul className="errors">
        {errors.map((error) => {
          return <li className="error">{error}</li>;
        })}
      </ul>
    </div>
  );
};

export default UploadBox;
