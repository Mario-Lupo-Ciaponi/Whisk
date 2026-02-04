import "./UploadBox.css";

const UploadBox = ({ image, setImage }) => {
  const isFileImage = (file) => {
    return file.type.includes("images");
  };

  const removeBtn = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setImage(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const droppedImage = event.dataTransfer.files[0];

    if (isFileImage(droppedImage)) setImage(droppedImage);
    else alert("The file must be an Image!"); // Demo, will change later;
  };

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleChange = (event) => {
    const image = event.target.files[0];

    if (isFileImage(image)) setImage(image);
    else alert("The file must be an Image!"); // Demo, will change later
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
    </div>
  );
};

export default UploadBox;
