import { Link, useParams } from "react-router-dom";

export default function Blogs(){
    const blogs = [
      { id: 1, title: "blog1" },
      { id: 2, title: "blog2" },
      { id: 3, title: "blog3" },
    ];
    const {id}=useParams()
    if(!id)
    {
        return (
      <>
        <div>Blog Home Page</div>
        {blogs.map((blog)=><div><Link to={"/blog/"+blog.id}>{blog.title}</Link></div>)}
      </>
    );}
    return (
      <>
        <div>Blog Details Page</div>
      </>
    );
}