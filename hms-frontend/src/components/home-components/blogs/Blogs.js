import React from "react";
import "./Blogs.css";
import Card from "react-bootstrap/Card";
import { blogs } from "./BlogsList";

export default function Blogs() {
  return (
    <div className="blogs">
      <div className="container">
        <div className="row fac-head mb-3">
          <div className="col">
            <p className="tag px-3 mx-auto text-uppercase">Our Blogs</p>
            <h1 className="about-head">See Our Latest Blog</h1>
          </div>
        </div>
        <div className="row g-4 mt-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="col-lg-4 col-sm-6 px-4 mb-5">
              <Card className="p-0 each-blog text-start d-flex flex-column gap-2">
                <Card.Img
                  variant="top"
                  src={blog.image}
                  className="m-0 blog-img"
                />
                <Card.Body className="ps-4">
                  <Card.Title className="fs-4 fw-semibold mb-3">
                    {blog.title}
                  </Card.Title>
                  <Card.Text>{blog.content}</Card.Text>
                </Card.Body>
                <p className="text-uppercase read-more-text ps-4 pb-2">
                  Read More +
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
