import EditModal from "./EditModal";

import { AxiosInstance } from "../routes/AxiosInstance";

import toast from "react-hot-toast";

// Destructure blog prop to get individual blog details
// This makes it easier to access blog properties directly
const BlogCard = (props) => {
  let { id, category, title, description } = props.blog; // Destructure blog prop
  let token = localStorage.getItem("token");

  // Function to delete a blog
  // Use async-await for handling asynchronous operations
  // Use AxiosInstance to make DELETE request to the server to delete the blog
  const deleteBlog = async (blogId) => {
    if (!token) {
      toast.error("Login Required");
      return;
    }
    // Make DELETE request to delete the blog by its ID
    let res = await AxiosInstance.delete(`/blogs/${blogId}`);
    if (res.status === 200) {
      toast.success("Blog Deleted Successfully");
      props.getAllBlogs(); // If deletion is successful, fetch the updated list of blogs
    } else {
      toast.error("Delete Failled");
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all bg-white p-6 m-3 relative flex flex-col">
      {/* Category */}
      <span className="text-sm font-medium text-orange-500 uppercase tracking-wide mb-2">
        {category}
      </span>

      {/* Title */}
      <h1 className="font-semibold text-xl text-gray-800 mb-2">{title}</h1>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1">
        {description.length > 120
          ? description.substring(0, 120) + "..."
          : description}
      </p>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3">
        <EditModal editBlog={props.blog} getAllBlogs={props.getAllBlogs} />

        <button
          onClick={() => deleteBlog(id)}
          className="px-4 py-2 text-sm font-semibold border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all">
          Delete
        </button>
        <button>
          <a
            href={`/view/${id}`}
            className="px-4 py-2 text-sm font-semibold border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all">
            View
          </a>
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
