import getImageDimensions from "./getImageDimensions.js";

const areImageDimensionsProportional = async (image) => {
  const { width, height, ratio } = await getImageDimensions(image);

  return (
    width >= 200 &&
    width <= 3840 &&
    height >= 200 &&
    height <= 3840 &&
    ratio >= 0.4 &&
    ratio <= 2.5
  );
};

export default areImageDimensionsProportional;
