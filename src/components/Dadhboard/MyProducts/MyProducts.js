import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  fetch(`http://localhost:5000/products?email=${user.email}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setProducts(data);
    });

  const handelDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete");
    if (confirm) {
      fetch(`http://localhost:5000/products/${id}`, {
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
  return (
    <div>
      <div className="overflow-x-auto mt-10">
        <table className="table w-full">
          <thead>
            <tr className="bg-red-500">
              <th>Products Name</th>
              <th>Location</th>
              <th>Category</th>
              <th>Price</th>
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
                      <button
                        onClick={() => handelDelete(item._id)}
                        className="btn"
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
      </div>
    </div>
  );
};

export default MyProducts;
