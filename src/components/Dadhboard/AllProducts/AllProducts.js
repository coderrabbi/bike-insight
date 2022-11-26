import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AllProducts = () => {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/products`);
      const data = await res.json();
      return data;
    },
  });
  const [allProducts, setAllProducts] = useState(products);
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
            const remaining = allProducts.filter((item) => item._id !== id);
            setAllProducts(remaining);
          }
          toast.success("deleted User successfully");
        });
    }
  };

  return (
    <div>
      <div className="overflow-x-auto mt-10">
        <table className="table w-full">
          <thead>
            <tr className="bg-red-500">
              <th>Item</th>
              <th>Products Name</th>
              <th>Location</th>
              <th>Category</th>
              <th>Price</th>
              <th>Delete orders</th>
            </tr>
          </thead>
          <tbody>
            {allProducts?.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
