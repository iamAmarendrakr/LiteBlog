import { Link } from "react-router-dom";
import EditModal from "./EditModal";
import { AxiosInstance } from "../routes/AxiosInstance";
import toast from "react-hot-toast";

const BlogCard = (props) => {
  let { id, category, title, description } = props.blog;
  let token = localStorage.getItem("token");

  const deleteBlog = async (blogId) => {
    if (!token) {
      toast.error("Login Required");
      return;
    }
    try {
      const res = await AxiosInstance.delete(`/blogs/${blogId}`);
      if (res.status === 200) {
        toast.success("Blog Deleted Successfully");
        props.getAllBlogs();
      }
    } catch {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all bg-white p-6 m-3 relative flex flex-col">
      <span className="text-sm font-medium text-orange-500 uppercase tracking-wide mb-2">
        {category}
      </span>
      <h1 className="font-semibold text-xl text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-600 text-sm leading-relaxed flex-1">
        {description.length > 120
          ? description.substring(0, 120) + "..."
          : description}
      </p>
      <div className="mt-6 flex gap-3">
        <EditModal editBlog={props.blog} getAllBlogs={props.getAllBlogs} />
        <button
          onClick={() => deleteBlog(id)}
          className="px-4 py-2 text-sm font-semibold border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all">
          Delete
        </button>
        <Link
          to={`/view/${id}`}
          className="px-4 py-2 text-sm font-semibold border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all">
          View
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
