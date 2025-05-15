import React from "react";
import "./Testimonial.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { testimonials } from "./TestimonialsList";
import { ImQuotesRight } from "react-icons/im";

export default function Testimonial({ deviceType }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1500, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 1000, min: 0 },
      items: 1,
    },
  };

  return (
    <div  className="testimonial">
      <div className="container">
      <div className="row fac-head mb-0">
          <div className="col">
            <p className="tag px-3 mx-auto text-uppercase">Our Clients</p>
            <h1 className="about-head">What Clients Say About Us</h1>
          </div>
        </div>

        <div className="row col-12 col-lg-10 my-3  mx-auto">
          <Carousel
            responsive={responsive}
            className="carousel-second"
            infinite={true}
            autoPlay={false}
            showDots={true}
            dotListClass="custom-dot-list-style"
            removeArrowOnDeviceType={["tablet", "desktop","mobile"]}
            ssr={true} // means to render carousel on server-side.
          >
            {testimonials.map((each_test) => (
              <div
                key={each_test.id}
                className="each-test d-flex flex-column p-4 gap-2 align-items-center justify-content-around text-start"
              >
                <p className="dec">{each_test.feedback}</p>

                <div className="test-desc d-flex align-items-center justify-content-between w-100">
                  <div className="d-flex align-items-center gap-4">
                    <img
                      src={each_test.image}
                      className="test-img rounded-circle"
                      alt={each_test.name}
                    />
                    <div>
                      <h3 className="text-uppercase test-name">{each_test.name}</h3>
                      <p className="text-uppercase test-field">
                        {each_test.field}
                      </p>
                    </div>
                  </div>
                  <ImQuotesRight className="quote fs-1" />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
