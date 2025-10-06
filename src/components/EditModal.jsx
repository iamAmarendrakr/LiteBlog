import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import toast from "react-hot-toast";
import { AxiosInstance } from "../routes/AxiosInstance";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function EditModal(props) {
  let token = localStorage.getItem("token");

  // State to hold the editable blog details
  const [editBlog, setEditBlogs] = useState({
    category: "",
    title: "",
    description: "",
  });

  // State to control the modal visibility
  const [open, setOpen] = React.useState(false);

  // Function to handle input changes and update the state
  const handleChange = (e) => {
    let { name, value } = e.target;
    setEditBlogs({ ...editBlog, [name]: value });
  };

  // Use useEffect to update editBlogs state when props.editBlogs changes
  React.useEffect(() => {
    setEditBlogs(props.editBlog);
  }, [props.getAllBlogs]);

  // Function to open the modal
  const handleOpen = () => {
    if (!token) {
      toast.error("Login First to Edit the blog");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // Function to handle the blog update
  const handleUdate = async (e) => {
    e.preventDefault();
    handleClose;
    let res = await AxiosInstance.put(`/blogs/${editBlog.id}`, editBlog); //
    if (res.status === 200) {
      toast.success("Blog Updated");
      props.getAllBlogs; // Fetch the updated list of blogs
    } else {
      toast.error("Updated Failed");
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        className="
        px-4
        py-2
        text-sm
        font-semibold
        border
        border-blue-500
        text-blue-500
        rounded-full
        hover:bg-blue-500
        hover:text-white
        transition-all">
        Edit
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h1 className="text-center text-2xl mb-5"> Edit blog</h1>
          <div className="flex flex-col gap-3">
            <TextField
              className="w-full"
              value={editBlog.category}
              onChange={handleChange}
              id="outlined-basic"
              name="category"
              label="Category"
              variant="outlined"
            />
            <TextField
              className="w-full"
              onChange={handleChange}
              value={editBlog.title}
              id="outlined-basic"
              name="title"
              label="Title"
              variant="outlined"
            />
            <TextField
              className="w-full"
              onChange={handleChange}
              value={editBlog.description}
              id="outlined-basic"
              name="description"
              label="Description"
              variant="outlined"
            />
            <button
              onClick={handleUdate}
              className="px-4 py-2 text-sm font-semibold border border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition-all">
              Update
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
