import React, { useContext, useState } from "react";

import moment from "moment";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthProvider";
import styles from "../../../styles";
const AddProducts = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [category, setCategory] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const imgUrl = form.imgUrl.value;
    const useyear = form.useyear.value;
    const buyprice = form.buyprice.value;
    const sellprice = form.sellprice.value;
    const location = form.location.value;
    const telephone = form.telephone.value;
    const description = form.description.value;

    const productInfo = {
      title: title,
      imgUrl: imgUrl,
      email: user?.email,
      username: user?.displayName,
      buyprice: buyprice,
      sellprice: sellprice,
      location: location,
      telephone: telephone,
      useyear: useyear,
      description: description,
      category: category,
      advertise: false,
      created: moment().format("MMM Do YY"),
    };
    fetch(`http://localhost:5000/products`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(productInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("products adeed successfully");
          form.reset();
        }
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className={`${styles.padding}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative z-0 mb-6 w-full group ">
          <input
            type="text"
            name="title"
            id="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
          />
          <label
            htmlFor="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Bikes Name
          </label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            name="imgUrl"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Image Url
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <label className="peer-focus:font-medium  text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 mr-2">
              Category
            </label>
            <select
              onChange={handleChange}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Pick a Category
              </option>
              <option value="choppers">Choppers bikes</option>
              <option value="naked">Naked Bikes</option>
              <option value="sports">Sports Bikes</option>
            </select>
          </div>
          <textarea
            name="description"
            className="textarea textarea-bordered"
            placeholder="Description"
          ></textarea>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="buyprice"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Buy Price
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="sellprice"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Sell Price
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="useyear"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Years Of Use
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="tel"
              name="telephone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="location"
              id="floating_company"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_company"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Location
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="text-white  bg-black hover:bg-grey-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black "
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
