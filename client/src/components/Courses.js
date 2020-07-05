import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Courses extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      courses: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/courses")
      .then((res) => {
        const course = res.data;
        this.setState({ courses: course });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  }

  render() {
    const results = this.state.courses;
    let course = results.map((course) => {
      return (
        <div className="grid-33" key={course.id}>
          <Link
            className="course--module course--link"
            to={`/courses/${course.id}`}
          >
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        </div>
      );
    });

    return (
      <div className="bounds">
        {course}
        <div>
          <div className="grid-33">
            <Link
              className="course--module course--add--module"
              to="/courses/create"
            >
              <h3 className="course--add--title">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 13 13"
                  className="add"
                >
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>
                New Course
              </h3>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
