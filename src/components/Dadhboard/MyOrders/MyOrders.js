import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrderData(data))
      .catch((err) => console.log(err));
  }, [user]);

  const handelDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete");
    if (confirm) {
      fetch(`http://localhost:5000/bookings/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            const remaining = orderData.filter((item) => item._id !== id);
            setOrderData(remaining);
          }
          toast.success("deleted User successfully");
        });
    }
  };

  return (
    <div>
      <div className="text-center">
        {orderData.length === 0 ? (
          <h1 className=" md:text-[60px] text-[30px]"> NO ORDERS FOUND</h1>
        ) : (
          <>
            <div className="overflow-x-auto mt-10">
              <table className="table w-full">
                <thead>
                  <tr className="bg-red-500">
                    <th>Item</th>
                    <th>Products Name</th>
                    <th>Location</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Payment</th>
                    <th>Delete orders</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData?.map((item, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{item.title}</td>
                      <td>{item.location}</td>
                      <td>{item.category}</td>
                      <td>${item.sellprice}</td>
                      <td>
                        <Link to={`/dashboard/payments/${item._id}`}>
                          <button className="btn btn-sm">pay</button>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => handelDelete(item._id)}
                          className="btn btn-error btn-sm text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
