import React, { useEffect } from "react";
import BlogList from "../components/BlogList";
import BlogPost from "../components/BlogPost";
import axios from "axios";

const Home = () => {

  const fetchData = async () => {
    try {
     
      const response =  await axios.get("http://localhost:5000/api/posts");
        window.location.href = "/";
      } catch (error) {
        console.error(error);
      }
  }
  useEffect( () => {
     fetchData()
  });

  return (
    <div>
      <h1>Welcome to the Blog Platform</h1>
      <h1>Welcome to the Blog Platform</h1>
      <div className="blogs-cont">
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />
        {/* <BlogList /> */}
      </div>
    </div>
  );
};

export default Home;
