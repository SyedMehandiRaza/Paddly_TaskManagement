import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="w-1/3 bg-gray-800 p-6 rounded-lg">
          <h2 className=" text-2xl font-semibold mb-4 text-center">Login</h2>
  
          <input
            type="username"
            name="username"
            placeholder="username"
            className="bg-gray-700 px-3 py-2 my-3 w-full rounded "
            required
          />
  
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-gray-700 px-3 py-2 my-3 w-full rounded "
            required
          />
  
          <div className="w-full flex items-center justify-between">
            <button className="bg-blue-400 text-xl font-semibold px-3 py-2 rounded mt-4">
                Login
            </button>
            <Link to="/signup" className="text-gray-400 hover:text-gray-200">Not having an account? SignUp here</Link>
          </div>
        </div>
      </div>
  )
}

export default Login
