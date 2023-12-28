import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const Home = () => {
  const { formData, setFormData, blogList, setBlogList } =
    useContext(GlobalContext);
  const fetchListofBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/blogs`);
      const data =await response.data; // axios automatically parses JSON

      if (data && data.blogList && data.blogList.length) {
        setBlogList(data.blogList);
      }

      console.log(data);
    } catch (error) {
      console.error("Error fetching blog list:", error);
    }
  };

  const handleDelete = async (getCurrentId) => {
    console.log(getCurrentId);
    const response = await axios.delete(
      `http://localhost:8000/blogs/delete/${getCurrentId}`
    );

    const data =await response.data; //
    if (data?.msg) {
      fetchListofBlog();
    }
  };

  const handleEdit = (getCurrentId) => {
    console.log(getCurrentId);
  };

  useEffect(() => {
    fetchListofBlog();
  }, []);

  return (
    <div>
      <h2>Blog List</h2>
      <div className="blog-item">
        <p>Title</p>
        <p>Description</p>
      </div>
      {blogList.map((blogItem, index) => (
        <div className="bloglist" key={index}>
          <p>{blogItem.title}</p>
          <p>{blogItem.description}</p>
          <FaEdit onClick={handleEdit} size={30} />
          <FaTrash onClick={handleDelete} size={30} />
        </div>
      ))}
    </div>
  );
};

export default Home;
