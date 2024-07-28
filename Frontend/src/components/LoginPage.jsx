import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();
  
  return (
    <button
      className="absolute top-3 right-7 text-white font-gtaHeadingText1 text-4xl hover:text-yellow-500"
      onClick={() => navigate("/")}
    >
      Back
    </button>
  );
};

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const userData = { email, password };

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (response.ok) {
          console.log("Login successful!");
          navigate('/');
          // Handle successful login (e.g., redirect or store tokens)
        } else {
          setError(data.message || "Login failed. Please try again.");
        }
      } else {
        setError("Unexpected response from the server. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className="h-screen w-screen overflow-hidden bg-[url('/LoginPage.png')] bg-cover bg-center flex justify-end">
        <Back />
        <article className="w-1/2 h-full flex flex-col pt-[7%] gap-3">
          <div className="w-[10rem] h-[4rem] text-dblue text-[1.1em] font-gtaDescriptionText bg-whitish rounded-full flex justify-center items-center">
            <p>Welcome!</p>
          </div>
          <p className="text-[4vw] text-whitish font-gtaHeadingText1 leading-[90px]">
            Los Santos
            <br />
            Police Department
          </p>
          <form className="w-[30vw] h-[25vh]" onSubmit={handleLogin}>
            <div className="flex flex-col w-full gap-[30px] pt-[2em]">
              <div className="flex flex-col w-full h-[3.5rem]">
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="flex items-center w-full h-full">
                  <i className="fa-solid fa-envelope left-3 text-blackish"></i>
                  <input
                    id="email"
                    className="w-full h-full bg-whitish border-b border-whitish text-blackish pl-10 py-2 rounded-[5px] focus:outline-none"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    required
                    aria-label="Email"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full h-[3.5rem]">
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="flex items-center w-full h-full">
                  <i className="fas fa-lock left-3 text-blackish"></i>
                  <input
                    id="password"
                    className="w-full h-full bg-whitish border-b border-whitish text-blackish pl-10 py-2 rounded-[5px] focus:outline-none"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    required
                    aria-label="Password"
                  />
                </div>
              </div>
            </div>
            <div className="w-fit h-fit p-3 flex gap-4 mt-10">
              <button
                type="submit"
                className="bg-white flex justify-center items-center cursor-pointer border-b border-white text-blackish px-10 py-5 rounded-full focus:outline-none"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
              <NavLink to="/signup">
                <button className="bg-[#120658] text-whitish flex justify-center items-center cursor-pointer border-b border-black px-10 py-5 rounded-full focus:outline-none">
                  Signup
                </button>
              </NavLink>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>
        </article>
      </section>
    </div>
  );
}

export default LoginPage;
