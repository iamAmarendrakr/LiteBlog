// src/components/ViewDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosInstance } from "../routes/AxiosInstance";
import toast from "react-hot-toast";

const ViewDetail = () => {
  const { id } = useParams(); // <-- get :id from the route
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch blog details when component mounts

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await AxiosInstance.get(`/blogs/${id}` || userName);
        setBlog(res.data);
        toast.success("Blog view successfully");
      } catch (err) {
        toast.error("Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found.</p>;

  return (
    <div className="min-h-screen bg-amber-50  pl-30">
      <div className="max-w-3xl mx-auto p-6 pl-10 bg-amber-200 rounded-lg shadow-md mt-10 mb-10">
        {/* Author */}
        <p className="text-gray-800 font-bold mb-1">
          By {blog.createdBy.userName}
        </p>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>

        {/* Category */}
        <span className="text-sm text-gray-600">{blog.category}</span>

        {/* Scrollable description */}
        <div className="mt-4 h-70 overflow-y-auto border-amber-300 p-4 text-black ">
          {blog.description}
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;
