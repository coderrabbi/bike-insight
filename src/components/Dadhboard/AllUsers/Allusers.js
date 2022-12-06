import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AllUsers = () => {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users`);
      const data = await res.json();
      return data;
    },
  });
  console.log(users);
  const [newUser, setNewUser] = useState(users);
  const handelDelete = (email) => {
    const confirm = window.confirm("Are you sure you want to delete");
    if (confirm) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/users/${email}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            const remaining = newUser.filter((user) => user.email !== email);
            setNewUser(remaining);
          }
          toast.success("deleted User successfully");
        });
    }
  };
  const veified = {
    veified: "Varified",
  };

  const updateVarify = (email) => {
    fetch(`http://localhost:5000/users/${email}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(veified),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Varified Account");
        }
      })
      .catch((err) => console.log(err));
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
              <th>Verify Request</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {newUser.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user?.role}</td>
                <td>
                  <button
                    className={
                      user?.userVerify === "Varified"
                        ? "bg-green-500 btn-disabled text-white btn-sm rounded :opacity-75"
                        : "bg-black text-white "
                    }
                    onClick={() => updateVarify(user.email)}
                  >
                    {user?.userVerify}
                  </button>
                </td>
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
