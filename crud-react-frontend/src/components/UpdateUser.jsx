import { useLoaderData } from "react-router-dom";
import Header from "./Header";
import { Helmet } from "react-helmet-async";

const UpdateUser = () => {
  const loadedUser = useLoaderData();
  console.log(loadedUser);

  const handleUpdateUser = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const password = form.password.value;
    const updatedUser = { name, email, phone, password };
    // console.log(updatedUser);

    fetch(`http://localhost:5001/users/${loadedUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  return (
    <div>
      <Header></Header>
      <Helmet>
        <title>Update User</title>
      </Helmet>
      <h1 className="text-3xl font-semibold">
        <span className="text-xl">Update the information of:</span> <br />
        {loadedUser.name}
      </h1>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleUpdateUser} className="card-body">
            <h1 className="text-left text-3xl font-semibold">Update User</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                defaultValue={loadedUser.name}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl">Email</span>
              </label>
              <input
                type="email"
                name="email"
                defaultValue={loadedUser.email}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl">Phone</span>
              </label>
              <input
                type="text"
                defaultValue={loadedUser.phone}
                placeholder="phone"
                name="phone"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl">Password</span>
              </label>
              <input
                type="text"
                defaultValue={loadedUser.password}
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
