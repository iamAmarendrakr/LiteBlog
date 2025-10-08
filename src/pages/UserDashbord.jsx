import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosInstance } from "../routes/AxiosInstance";
import { TextField } from "@mui/material";
import { toast } from "react-hot-toast";

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [newBlog, setNewBlog] = useState({
    title: "",
    category: "",
    description: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // Handle input changes correctly
  const handleBlog = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch user data correctly
  async function getAuthUser() {
    try {
      const res = await AxiosInstance.get(`/users/${id}`);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data)); // ✅ store user
    } catch (error) {
      toast.error("Failed to fetch user");
      console.error(error);
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // ✅ fixed key
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      getAuthUser();
    }
  }, [id]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newBlog.title || !newBlog.category || !newBlog.description) {
      toast.error("All fields are required");
      return;
    }

    const payload = {
      ...newBlog,
      createdBy: {
        _id: user._id,
        username: user.username,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const res = await AxiosInstance.post("/blogs", payload);
      if (res.status === 201 || res.status === 200) {
        // ✅ accept 200 & 201
        toast.success("Blog Created");
        setNewBlog({ title: "", category: "", description: "" });
        navigate("/");
      } else {
        toast.error("Failed to create blog");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <section className="flex flex-1 overflow-hidden">
        <aside className="w-1/4 bg-white shadow-xl p-5 flex flex-col">
          <div className="text-2xl text-center capitalize bg-gray-50 p-3 rounded-xl mb-3">
            Welcome
          </div>
          <div className="text-2xl font-semibold bg-gray-50 p-3 rounded-xl">
            Create Blog
          </div>
        </aside>

        <article className="flex-1 overflow-y-auto p-5">
          <h1 className="text-center font-extrabold text-4xl mb-6">
            User Dashboard
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-2xl mx-auto">
            <h2 className="font-semibold text-2xl">Create Blog</h2>

            <TextField
              label="Category"
              name="category"
              value={newBlog.category}
              type="text"
              variant="outlined"
              fullWidth
              onChange={handleBlog}
            />
            <TextField
              label="Title"
              name="title"
              value={newBlog.title}
              type="text"
              variant="outlined"
              fullWidth
              onChange={handleBlog}
            />
            <TextField
              label="Description"
              name="description"
              value={newBlog.description}
              variant="outlined"
              fullWidth
              multiline
              rows={4} // ✅ better for description
              onChange={handleBlog}
            />

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white text-xl p-3 rounded font-bold transition duration-200">
              Create Blog
            </button>
          </form>
        </article>
      </section>
    </div>
  );
};

export default UserDashboard;
