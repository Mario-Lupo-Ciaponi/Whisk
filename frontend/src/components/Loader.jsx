import { RotatingLines } from "react-loader-spinner";

const Loader = ({ width, height }) => {
  return (
    <RotatingLines
      strokeColor="black"
      width={width}
      height={height}
      visible={true}
    />
  );
};

export default Loader;
