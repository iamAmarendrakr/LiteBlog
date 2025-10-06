// HomePage.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";

const HomePage = () => {
  // State to hold filtered blogs from search
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  return (
    <div>
      <Navbar onSearchResults={setFilteredBlogs} />{" "}
      {/* Pass setter to Navbar to receive search results */}
      <section>s
        {filteredBlogs.length === 0 ? (
          <h2 style={{ textAlign: "center" }}>No blogs found</h2>
        ) : (
          <article className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            {filteredBlogs.map((blog, idx) => (
              <BlogCard key={idx} blog={blog} getAllBlogs={() => {}} />
            ))}
          </article>
        )}
      </section>
    </div>
  );
};

export default HomePage;
