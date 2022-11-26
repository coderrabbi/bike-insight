import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);

  // const { data: bookings = [] } = useQuery({
  //   queryKey: ["bookings", user?.email],
  //   queryFn: async () => {
  //     const res = await fetch(url, {
  //       headers: {
  //         authorization: `bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     });
  //     const data = await res.json();
  //     return data;
  //   },
  // });

  useEffect(() => {
    fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [user]);

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
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{item.title}</td>
                <td>{item.location}</td>
                <td>{item.category}</td>
                <td>${item.sellprice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
