import { useQuery } from "@tanstack/react-query";
import React from "react";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users`);
      const data = await res.json();
      return data;
    },
  });
  console.log(users);

  //   const handleMakeAdmin = (id) => {
  //     fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/admin/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         authorization: `bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.modifiedCount > 0) {
  //           toast.success("Make admin successful.");
  //           refetch();
  //         }
  //       });
  //   };

  return (
    <div>
      <h2 className="text-3xl">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user?.role}</td>
                <td>
                  <button className="btn btn-xs btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
