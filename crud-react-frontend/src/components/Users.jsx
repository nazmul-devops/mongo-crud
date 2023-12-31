// import React from 'react';

import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Header from "./Header";
import { Helmet } from "react-helmet-async";

const Users = () => {
  const users = useLoaderData();
  const navigate = useNavigate();

  const handleDeleteUser = _id => {
    console.log("Delete this user", _id);
    fetch(`http://localhost:5001/users/${_id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("User deleted successfully");
        }
        navigate("/users");
      });
  };

  return (
    <div>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Header></Header>
      <h1 className="text-3xl font-semibold">This is Users component</h1>
      <h2 className="text-2xl">No. of Users from Mongo DB: {users.length}</h2>

      <div>
        {users.map(user => (
          <div
            key={user._id}
            className="border w-1/2 mx-auto p-5 my-5 shadow-md rounded-lg"
          >
            <p className="text-xl font-medium">
              User ID:{" "}
              <span className="text-2xl font-semibold">{user._id}</span>
            </p>
            <p className="text-xl font-medium">
              User Name:{" "}
              <span className="text-2xl font-semibold">{user.name}</span>
            </p>
            <p className="text-xl font-medium">
              User Email:{" "}
              <span className="text-2xl font-semibold">{user.email}</span>
            </p>
            <p className="text-xl font-medium">
              User Phone:{" "}
              <span className="text-2xl font-semibold">{user.phone}</span>
            </p>
            <p className="text-xl font-medium">
              User Password:{" "}
              <span className="text-2xl font-semibold">{user.password}</span>
            </p>
            <Link to={`/update/${user._id}`}>
              <button className="btn bg-blue-400 hover:bg-blue-500 text-white my-5 mx-5">
                Update User
              </button>
            </Link>

            <button
              className="btn bg-red-500 hover:bg-red-600 font-bold text-white my-5"
              onClick={() =>
                document.getElementById(`my_modal_${user._id}`).showModal()
              }
            >
              Delete User
            </button>
            <dialog
              id={`my_modal_${user._id}`}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  Are you sure? You want to delete this user!
                </h3>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-error mr-3"
                    >
                      Yes
                    </button>
                    <button className="btn btn-info">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
