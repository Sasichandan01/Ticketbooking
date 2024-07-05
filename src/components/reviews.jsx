import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export default function reviews(props) {
  const review = props.reviews;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items:3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1200, min: 860 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 860, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div>
      <div className="plot" id="plott">
        <h4>
          <strong
            style={{
              borderRadius: "10px",
              backgroundColor: "#D8D9DA",
              padding: "0 5px",
            }}
          >
            {review?.length === 0 ? "No reviews" : "Reviews"}
          </strong>
        </h4>
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          centerMode={false}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
          className="carousell"
        >
          {review !== null &&
            review.map((data) => (
              <div className="reviewdata1" key={data.key}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    outline: "1px solid black",
                    padding: " 10px ",
                    position: "sticky",
                  }}
                >
                  {" "}
                  <p>
                    Name:&nbsp;
                    <b>{data.author}</b>
                  </p>
                  <p>
                    Rating: <b>{data.author_details.rating}/10</b>
                  </p>
                </div>

                <p style={{ margin: "10px" }}>{data.content}....</p>
              </div>
            ))}
        </Carousel>

      </div>
    </div>
  );
}
