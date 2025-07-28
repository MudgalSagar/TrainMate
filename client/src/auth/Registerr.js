import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Registerr = () => {
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [paas, setPaas] = useState("");

  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          name: naam,
          email,
          password: paas
        })
      });

      const data = await response.json(); 

      if (response.ok) {
        console.log("User registered successfully");
        navigation("/")
      } else {
        console.log("Registration failed:", data.message);
        alert(data.message); 
      }
    } catch (err) {
      console.error("Error while registering", err);
    }

    setNaam("");
    setEmail("");
    setPaas("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md backdrop-blur-sm bg-white/70">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          <span className="text-orange-500">JOIN</span> FITNESS FREAK
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="text"
              placeholder="Enter your full name"
              value={naam}
              onChange={(e) => setNaam(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="password"
              placeholder="Create a password"
              value={paas}
              onChange={(e) => setPaas(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition duration-300 transform hover:scale-105"
            type="submit"
          >
            GET STARTED
          </button>

          <p className="text-center text-gray-600">
            Already a user?{" "}
            <Link to="/" className="text-orange-500 hover:underline font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registerr;