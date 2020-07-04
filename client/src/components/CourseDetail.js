import React from "react";

const CourseDetail = (props) => {
  const course = props.courses;
  return (
    <div>
      <div className="actions--bar">
        <div className="bounds">
          <div class="grid-100">
            <span>
              <a className="button" href="update-course.html">
                Update Course
              </a>
              <a className="button" href="#">
                Delete Course
              </a>
            </span>
            <a class="button button-secondary" href="index.html">
              Return to List
            </a>
          </div>
        </div>
      </div>
      <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">Build a Basic Bookcase</h3>
            <p>By Joe Smith</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
