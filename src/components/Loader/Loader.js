import loaderImg from "../../assets/loader3.gif";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="fixed w-full h-full bg-black/30 z-10">
      <div className="fixed left-[50%] top-[50%] z-[999] -translate-x-[50%] -translate-y-[50%]">
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
