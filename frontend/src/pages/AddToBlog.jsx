import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'

const AddToBlog = () => {
  const { formData, setFormData, isEdit, setIsEdit } = useContext(GlobalContext);

  const navigate = useNavigate();
  const location = useLocation()

  const handleClick = async () => {
    try {
      const response =  isEdit
      ? await axios.put(
          `http://localhost:8000/blogs/update/${location.state.getCurrentId._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post("http://localhost:8000/blogs/add", {
        title: formData.title,
        description: formData.description,
      });
      const data = await response.data();
      console.log(data);
      if(data){
        setIsEdit(false)
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

useEffect(()=>{
  console.log(location);
  if(location.state) {
    const { getCurrentId} = location.state;
    setIsEdit(true)
    setFormData({
      title : getCurrentId.title,
      description : getCurrentId.description,
    })
  }
},[location])

  return (
    <div className="blogcontainer">
      <h1>{isEdit? "Edit a Blog" : "Add To Blog"}</h1>
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
            <button onClick={handleClick}>{isEdit ? "Edit a Blog" :"Add To Blog"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToBlog;
