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
    <div className="upload-box">
      <label
        htmlFor="image-upload"
        className="upload-box__dropzone"
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
      >
        {image ? (
          <>
            <div className="upload-box__file">
              <span className="upload-box__file-name">{image.name}</span>
              <button
                type="button"
                onClick={removeBtn}
                className="upload-box__remove"
              >
                {t("uploadBox.remove")}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="upload-box__empty">
              <div className="upload-box__icon" aria-hidden="true">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16V4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7 9L12 4L17 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 20H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h3 className="upload-box__headline">
                {t("uploadBox.dropText")}
              </h3>
              <p className="upload-box__subtext">
                Clear photos help the community identify your pet
              </p>
              <span className="upload-box__browse">
                {t("uploadBox.browse")}
              </span>
            </div>
          </>
        )}

        <input
          id="image-upload"
          className="upload-box__input"
          name="image-upload"
          type="file"
          onChange={handleChange}
        />
      </label>

      <ul className="upload-box__errors">
        {errors.map((error) => {
          return <li className="upload-box__error">{error}</li>;
        })}
      </ul>
    </div>
  );
};

export default UploadBox;
