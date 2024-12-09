import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }
  const [Data, setData] = useState({ username: "", email: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/v1/sign-in",
          Data
        );
        setData({ username: "", email: "", password: "" });
        alert(response.data.message);
        history("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-1/3 bg-gray-800 p-6 rounded-lg">
        <h2 className=" text-2xl font-semibold mb-4 text-center">Signup</h2>

        <input
          type="username"
          name="username"
          placeholder="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded "
          value={Data.username}
          required
          onChange={change}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded "
          value={Data.email}
          required
          onChange={change}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded "
          value={Data.password}
          required
          onChange={change}
        />

        <div className="w-full flex items-center justify-between">
          <button
            className="bg-blue-400 text-xl font-semibold px-3 py-2 rounded mt-4"
            onClick={submit}
          >
            Signup
          </button>
          <Link to="/login" className="text-gray-400 hover:text-gray-200">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
