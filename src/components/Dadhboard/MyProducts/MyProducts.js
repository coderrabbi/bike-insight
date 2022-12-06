import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  fetch(`${process.env.REACT_APP_SERVER_URL}/products?email=${user.email}`)
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
    });

  const handelDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete");
    if (confirm) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            const remaining = products.filter((item) => item._id !== id);
            setProducts(remaining);
          }
          toast.success("deleted product successfully");
        });
    }
  };

  const updateAd = {
    advertise: true,
  };
  const handleAdvertise = (id) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}products/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateAd),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <div className="overflow-x-auto mt-10">
        {products.length < 0 ? (
          <h1 className="text-center md:text-[60px] text-[30px] ">
            NO PRODUCTS FOUND
          </h1>
        ) : (
          <table className="table w-full">
            <thead>
              <tr className="bg-red-500">
                <th>Products Name</th>
                <th>Location</th>
                <th>Category</th>
                <th>Price</th>
                <th>Advertise product</th>
                <th>Delete Products</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item, index) => (
                <tr key={index}>
                  {item.email === user.email ? (
                    <>
                      <td>{item.title}</td>
                      <td>{item.location}</td>
                      <td>{item.category}</td>
                      <td>${item.sellprice}</td>
                      <td>
                        {item.advertise ? (
                          <p className="text-green-500">Advertise done</p>
                        ) : (
                          <button
                            onClick={() => handleAdvertise(item._id)}
                            class="btn bg-green-500 btn-sm hover:bg-green-700"
                          >
                            Advertise
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handelDelete(item._id)}
                          className="btn btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  ) : (
                    ""
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
