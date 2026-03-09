import { useState } from "react";
import { useTranslation } from "react-i18next";
import isFileImage from "../../utils/isFileImage.js";
import areImageDimensionsProportional from "../../utils/areImageDimensionsProportional.js";
import "./UploadBox.css";

const UploadBox = ({ image, setImage }) => {
  const [errors, setErrors] = useState([]);
  const { t } = useTranslation();

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

    if (!isFileImage(file)) currentErrors.push(t("uploadBox.errors.fileType"));
    if (!(await areImageDimensionsProportional(file)))
      currentErrors.push(t("uploadBox.errors.aspectRatio"));
    if (!isImageSizeNormal(file))
      currentErrors.push(t("uploadBox.errors.sizeLimit"));

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
              {t("uploadBox.remove")}
            </button>
          </>
        ) : (
          <>
            <h3 className="drop-text">{t("uploadBox.dropText")}</h3>

            <div className="browse-btn">{t("uploadBox.browse")}</div>
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
