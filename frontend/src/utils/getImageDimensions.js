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

export default getImageDimensions;
