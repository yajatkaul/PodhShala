import React, { useState } from "react";
import useLogin from "../hooks/useLogin";
import backgroundImage from "../assets/background/bg-2.jpg";

const Login = () => {
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });

  const { loading, handelLogin } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handelLogin(inputs);
  };
  return (
    <>
      <div
        className={`w-screen h-screen flex justify-center items-center bg-cover`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="bg-base-300 p-[40px] rounded-xl">
          <p className="flex justify-center items-center text-[30px] mb-[30px]">
            Login
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label class="input input-bordered flex items-center gap-2 mb-[30px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  class="grow border-0 focus:ring-0"
                  placeholder="Username"
                  value={inputs.userName}
                  onChange={(e) =>
                    setInputs({ ...inputs, userName: e.target.value })
                  }
                />
              </label>
              <label class="input input-bordered flex items-center gap-2 mb-[30px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="w-4 h-4 opacity-70"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  class="grow border-0 focus:ring-0"
                  placeholder="Password"
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                />
              </label>

              <p className="mb-[10px]">
                <a href="/signup">Don't have an account?</a>
              </p>

              <button className="btn btn-wide outline-1 outline">
                {loading ? (
                  <span className="loading loading-spinner loading-lg"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
