import "./UploadBox.css";

const UploadBox = ({ image, setImage }) => {
    const removeBtn = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setImage(null);
    }
    return (
        <div className="upload-container">
            <label htmlFor="image-upload" className="drop-zone">
                {image ? (
                    <>
                        <span className="file-name">{image.name}</span>
                        <button onClick={removeBtn} className="remove-btn">Remove image</button>
                    </>
                    ) : (
                    <>
                        <h3 className="drop-text">Drop an image here or click to upload</h3>

                        <div className="browse-btn">
                            Browse
                        </div>
                    </>
                )}

                <input
                    id="image-upload"
                    className="hidden-input"
                    name="image-upload"
                    type="file"
                    onChange={(event) => {
                    setImage(event.target.files[0]);
                }}/>
            </label>
        </div>
    )
}

export default UploadBox;