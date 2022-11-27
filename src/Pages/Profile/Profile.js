import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AuthContext } from "../../Context/AuthProvider";
import avater from "../../assets/avater.png";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setuserData] = useState([]);
  const [varifiedUser, setVerifiedUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:5000/users/${user.email}`);
      setuserData(res.data);
    };
    fetchUser();
  }, [user.email]);
  const varifyUser = {
    varify: "requested to verify",
  };
  const handleReq = (email) => {
    fetch(`http://localhost:5000/users/${email}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(varifyUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setVerifiedUser(data.matchedCount);
          toast.success("Request To Admin To Verify Your Account");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <section className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src={user?.photoURL ? user.photoURL : avater}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div className="w-full px-4 text-center mt-20">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8"></div>
                </div>
              </div>
              <div className="text-center mt-12">
                <div className="flex justify-center items-center gap-3">
                  {" "}
                  <BsFillPersonFill />
                  <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {user?.displayName}
                  </h3>
                </div>
                <div className="text-sm flex justify-center items-center gap-3 leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <MdEmail />
                  {user?.email}
                </div>

                <div className="mb-2 text-blueGray-600">
                  Role:
                  {userData?.isAdmin
                    ? "Admin"
                    : userData?.isSeller
                    ? "Seller"
                    : "Buyer"}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4 flex flex-col gap-3">
                    <Link to="/dashboard" className=" font-normal text-red-500">
                      Go To Dashboard
                    </Link>

                    {userData?.isSeller ? (
                      <button
                        className="btn btn-sm"
                        onClick={() => handleReq(userData?.email)}
                      >
                        {varifiedUser > 0 ? (
                          <span>requested</span>
                        ) : (
                          <span>request for varify user</span>
                        )}
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
