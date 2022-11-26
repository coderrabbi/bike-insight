import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AllUsers = () => {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users`);
      const data = await res.json();
      return data;
    },
  });
  const [newUser, setNewUser] = useState(users);
  const handelDelete = (email) => {
    const confirm = window.confirm("Are you sure you want to delete");
    if (confirm) {
      fetch(`http://localhost:5000/users/${email}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            const remaining = newUser.filter((user) => user.email !== email);
            setNewUser(remaining);
          }
          toast.success("deleted User successfully");
        });
    }
  };

  return (
    <div>
      <h2 className="text-3xl">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>user</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {newUser.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user?.role}</td>
                <td>
                  {user?.role !== "admin" ? (
                    <button
                      onClick={() => handelDelete(user.email)}
                      className="btn btn-xs btn-danger"
                    >
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
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
