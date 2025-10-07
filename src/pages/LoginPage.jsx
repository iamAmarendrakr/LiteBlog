import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosInstance } from "../routes/AxiosInstance"; // Assuming AxiosInstance is set up to handle API requests
import { AuthContext } from "../context/AuthContext";
// import { useContext } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  //
  useContext(AuthContext);

  // State to hold login user data
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  // State to hold all registered users
  // This can be used to check if the user exists during login
  const [allRegisteredUsers, setAllRegisteredUsers] = useState([]);

  // useNavigate hook to programmatically navigate after login
  const navigate = useNavigate();

  // Function to handle input changes
  // This updates the loginUser state with the input values
  const handleChange = (e) => {
    let { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  // Function to fetch all registered users
  async function getAllUsers() {
    let res = await AxiosInstance.get("/users");
    console.log(res.data);

    setAllRegisteredUsers(res.data);
  }

  // Fetch all users when the component mounts
  useEffect(() => {
    getAllUsers();
  }, []);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the user exists in the registered users list
    let authUser = allRegisteredUsers.find((ele) => {
      return (
        ele.email === loginUser.email && ele.password === loginUser.password // Simple password check for demonstration purposes
      );
    });

    // If user exists, store a token in localStorage and navigate to home page
    // Otherwise, navigate to signup page and show an error toast message
    if (authUser) {
      localStorage.setItem("token", Date.now());
      navigate("/");
      toast.success("Login Successful 🎉");
    } else {
      navigate("/signup");
      toast.error("User not found, Please Sign-up ❌");
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-rose-200 to-purple-600 bg-cover flex justify-center items-center">
      <form className=" bg-transparent flex flex-col p-3 gap-2 rounded-2xl border-2 shadow-2xl shadow-black">
        {/* Title */}
        <h1 className="text-2xs font-extrabold text-center text-gray-800">
          Log-in
        </h1>
       
        {/* Email */}
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className="bg-transparent"
          name="email"
          value={loginUser.email}
          onChange={handleChange}
        />
        {/* Password */}
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          className="bg-transparent"
          name="password"
          type="password"
          value={loginUser.password}
          onChange={handleChange}
        />
        {/* Forgot Password*/}
        <p className="text-sm text-right text-blue-600 hover:underline cursor-pointer">
          Forgot Password ?
        </p>

        {/* Submit Butoon*/}
        <Button
          variant="contained"
          onClick={handleSubmit}
          type="submit"
          fullWidth
          sx={{
            padding: "10px",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "none",
          }}>
          Login
        </Button>

        {/* Signup redirect */}
        <p className="mt-5">
          Not a member? {""}
          <Link to="/signup" className="text-blue-900">Sign-up here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
