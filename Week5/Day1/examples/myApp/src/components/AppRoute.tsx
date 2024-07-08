import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import AboutUs from "../views/AboutUs";
import Blog from "../views/Blogs";
import ContactUs from "../views/ContactUs";

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/aboutus" element={<AboutUs />}></Route>
      <Route path="/contactus" element={<ContactUs />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/blog" element={<Blog />}></Route>
      <Route path="/blog/:id" element={<Blog />}></Route>
    </Routes>
  );
}
