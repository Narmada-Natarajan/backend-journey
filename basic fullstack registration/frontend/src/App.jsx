import React, { useState } from 'react'
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaEye,
  FaEyeSlash
} from "react-icons/fa"

const App = () => {
  const [fullname, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpass] = useState("")
  const [confirmpassword, setconpass] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handlesubmit = (e) => {
    e.preventDefault()
    console.log({ fullname, email, password, confirmpassword })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handlesubmit}
        className="w-96 bg-gray-200 flex flex-col items-center rounded-xl p-6"
      >
        <p className="text-lg text-gray-600 font-semibold mb-6">
          Registration
        </p>

        <div className="flex flex-col items-center gap-5">

          {/* Name */}
          <div className="flex gap-4 items-center">
            <FaUser className="text-violet-400" />
            <input
              className="bg-gray-100 w-60 p-2 rounded-md outline-none"
              type="text"
              placeholder="Enter your name"
              value={fullname}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="flex gap-4 items-center">
            <FaEnvelope className="text-violet-400" />
            <input
              className="bg-gray-100 w-60 p-2 rounded-md outline-none"
              type="email"
              placeholder="Enter your email id"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex gap-4 items-center relative">
            <FaLock className="text-violet-400" />
            <input
              className="bg-gray-100 w-60 p-2 rounded-md outline-none pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setpass(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="flex gap-4 items-center">
            <FaLock className="text-violet-400" />
            <input
              className="bg-gray-100 w-60 p-2 rounded-md outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password again"
              value={confirmpassword}
              onChange={(e) => setconpass(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex gap-4 w-72 bg-violet-400 text-white font-semibold rounded-md p-2 mt-6 items-center justify-center hover:bg-violet-500 transition">
          Submit
          <FaArrowRight />
        </button>
      </form>
    </div>
  )
}

export default App
