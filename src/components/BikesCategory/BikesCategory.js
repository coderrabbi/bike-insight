import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BikesCategory = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/bikescategory")
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, [category]);
  return (
    <div>
      <div className="grid md:grid-cols-3 grid-cols-1 justify-around m-10 gap-3 ">
        {category.map((item) => (
          <div
            key={item._id}
            className="card bg-base-100 shadow-xl image-full z-0"
          >
            <figure>
              <img src={item.imgUrl} alt={item.category} />
            </figure>
            <div className="card-body justify-center">
              <h2 className="card-title pb-5 text-3xl">{item.categoryName}</h2>
              <div className="card-actions justify-end">
                <Link to={`/bikes/${item.category}`}>
                  <button className="py-4 px-7 bg-black rounded-xl hover:bg-red-500">
                    Visit Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BikesCategory;
