import React from "react";

const Courses = (props) => {
  const results = props.courses;
  let course = results.map((course) => {
    return (
      <div className="grid-33">
        <a className="course--module course--link" href="#">
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{course.title}</h3>
        </a>
      </div>
    );
  });

  console.log(results);
  return (
    <div className="bounds">
      {course}
      <div>
        <div class="grid-33">
          <a
            class="course--module course--add--module"
            href="create-course.html"
          >
            <h3 class="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                class="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </h3>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Courses;
