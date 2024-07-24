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

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    const userData = {
      username,
      email,
      phoneNumber,
      password,
    };
  
    try {
      const response = await fetch("http://localhost:4000/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      // Check if the response is in JSON format
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (response.ok) {
          alert("Signup successful!");
          navigate('/login');
        } else {
          setError(data.message || "Signup failed. Please try again.");
        }
      } else {
        // Handle unexpected response format
        setError("Unexpected response format from server.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again later.");
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
          <form className="w-fit h-fit" onSubmit={handleSignup}>
            <div className="flex flex-col w-full gap-[20px]">
              <div className="flex items-center h-[3.5rem]">
                <i className="fas fa-user text-blackish"></i>
                <input
                  className="w-full h-full bg-whitish border-b border-white text-blackish pl-10 py-2 rounded-[5px] focus:outline-none"
                  type="text"
                  placeholder="Fullname"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-[10px] w-full">
                <div className="flex items-center w-[60%] h-[3.5rem]">
                  <i className="fa-solid fa-envelope left-3 text-blackish"></i>
                  <input
                    className="w-full h-full bg-whitish border-b border-white text-blackish pl-10 py-2 rounded-[5px] focus:outline-none"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center w-[40%] h-[3.5rem]">
                  <i className="fas fa-phone text-blackish"></i>
                  <input
                    className="w-full h-full bg-whitish border-b border-white text-blackish pl-10 py-2 rounded-[5px] focus:outline-none"
                    type="tel"
                    placeholder="Phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-[10px] w-full">
                <div className="flex items-center w-[50%] h-[3.5rem]">
                  <i className="fas fa-lock text-blackish"></i>
                  <input
                    className="w-full h-full bg-whitish border-b border-white text-blackish pl-10 py-2 rounded-[5px] focus:outline-none"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onClick={() => setError(null)}
                    required
                  />
                </div>
                <div className="flex items-center w-[50%] h-[3.5rem]">
                  <i className="fas fa-lock left-3 text-blackish"></i>
                  <input
                    className="w-full h-full bg-whitish border-b border-white text-blackish pl-10 py-2 rounded-[5px] focus:outline-none"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
            <div className="w-fit h-fit p-3 flex gap-4">
              <NavLink to="/login">
                <button className="bg-[#120658] text-whitish flex justify-center items-center cursor-pointer border-b border-black px-10 py-5 rounded-full focus:outline-none">
                  Login
                </button>
              </NavLink>
              <button
                type="submit"
                className="bg-white text-blackish flex justify-center items-center cursor-pointer border-b border-white px-10 py-5 rounded-full focus:outline-none"
              >
                Signup
              </button>
            </div>
          </form>
        </article>
      </section>
    </div>
  );
}

export default Signup;
