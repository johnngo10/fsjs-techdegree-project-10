import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      courseId: props.match.params.id,
      course: [],
      firstName: "",
      lastName: "",
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/courses/${this.state.courseId}`)
      .then((res) => {
        const result = res.data;
        this.setState({
          course: result,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  }

  render() {
    const course = this.state.course;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <Link
                  className="button"
                  to={`/courses/${this.state.courseId}/update`}
                >
                  Update Course
                </Link>
                <Link className="button" to="#">
                  Delete Course
                </Link>
              </span>
              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>
                By {this.state.firstName} {this.state.lastName}
              </p>
            </div>
            <div className="course--description">
              <p>{course.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li>{course.materialsNeeded}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetail;
