import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { AxiosInstance } from "../routes/AxiosInstance"; // Assuming AxiosInstance is set up to handle API requests
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignupPage = () => {
  // State to hold signup user data
  const [SignupUser, setSignupUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  // useNavigate hook to programmatically navigate after signup
  let navigate = useNavigate();

  // Function to handle input changes
  const handleChange = (e) => {
    let { name, value } = e.target;
    setSignupUser({ ...SignupUser, [name]: value });
  };
  // Function to handle form submission
  // This sends the signup data to the backend and handles the response
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(SignupUser); // userData

    //sending data to backend
    let res = await AxiosInstance.post("/users", SignupUser);

    if (res.status === 201) {
      //alert("Signup successful");
      // Display success message using react-hot-toast
      toast.success("Signup successful"); //

      // Redirect to login page after successful signup
      navigate("/Login");

      // Reset the signup form
      // This clears the form fields after successful signup
      setSignupUser({
        userName: "",
        email: "",
        password: "",
      });
    } else {
      toast.error("Signup failed");
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-tr from-rose-100 to-purple-600 bg-cover flex justify-center items-center bg-transparent">
      <form className="flex flex-col gap-2 border-2 px-3 rounded-2xl  bg-transparent">
        <h1 className="flex justify-center font-bold ">Signup</h1>

        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          className="bg-transparent"
          value={SignupUser.userName}
          name="userName"
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className="bg-transparent"
          name="email"
          value={SignupUser.email}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          className="bg-transparent"
          name="password"
          value={SignupUser.password}
          onChange={handleChange}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Signup
        </Button>
        <p className="mt-5 text-sm font-semibold mb-2 text-center">
          Already a member?{" "}
          <a href="/login" className="text-blue-500">
            Log-in here
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
