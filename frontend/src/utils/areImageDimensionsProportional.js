import getImageDimensions from "./getImageDimensions.js";

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

export default areImageDimensionsProportional;
