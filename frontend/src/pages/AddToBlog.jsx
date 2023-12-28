import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const AddToBlog = () => {
  const { formData, setFormData } = useContext(GlobalContext);

  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:8000/blogs/add", {
        title: formData.title,
        description: formData.description,
      });
      const data = await response.data();
      console.log(data);
      if(data){
        setFormData({
          title:'',
          description:''
        })
        navigate('/')
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };



  return (
    <div className="blogcontainer">
      <h1>Add To Blog</h1>
      <div className="form-container">
        <form action="">
          <div className="inp-text">
            <input
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              value={formData.title}
              type="text"
              placeholder="Enter Blog Title"
              id="title"
            />
          </div>
          <div className="blog-description">
            <textarea
              name="description"
              id="description"
              placeholder="Enter Blog Description"
              cols="30"
              rows="10"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="btn-add">
            <button onClick={handleClick}>Add New Blog</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToBlog;
