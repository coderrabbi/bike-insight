import React from "react";
import { Link } from "react-router-dom";
import notFound from "../../assets/notFound-page.svg";
import styles from "../../styles";
const NotFound = () => {
  return (
    <div className={`${styles.padding} flex flex-col items-center gap-5`}>
      <img src={notFound} alt="Not Found" className="max-w-[720px] mx-auto" />
      <Link to="/">
        {" "}
        <button className="btn">Back TO Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
