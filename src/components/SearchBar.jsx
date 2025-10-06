// SearchBar.jsx
import * as React from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { AxiosInstance } from "../routes/AxiosInstance";

// 🔷 MUI Styled Components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#e5e7eb",
  "&:hover": { backgroundColor: "#d1d5db" },
  width: "100%",
  maxWidth: 600,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:focus": { width: "50ch" },
    },
  },
}));

export default function SearchBar({ onResults }) {
  const [blogs, setBlogs] = React.useState([]);
  const [query, setQuery] = React.useState("");

  // Fetch blogs once
  React.useEffect(() => {
    AxiosInstance.get("/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  // Filter blogs whenever query changes
  React.useEffect(() => {
    const lowerQuery = query.toLowerCase();
    const filtered = blogs.filter(
      (b) =>
        b.title?.toLowerCase().includes(lowerQuery) ||
        b.category?.toLowerCase().includes(lowerQuery) 
    );
    if (onResults) onResults(filtered); // send data up 
  }, [query, blogs, onResults]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search blogs..."
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
}
// End of SearchBar.jsx
