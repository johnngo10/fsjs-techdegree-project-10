import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      courseId: props.match.params.id,
      course: [],
      firstName: "",
      lastName: "",
      courseOwnerId: "",
      errors: [],
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
          courseOwnerId: result.userId,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  }

  render() {
    const { course, courseId, lastName, firstName, courseOwnerId } = this.state;
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                {authUser !== null && authUser.id === courseOwnerId ? (
                  <React.Fragment>
                    <Link className="button" to={`/courses/${courseId}/update`}>
                      Update Course
                    </Link>
                    <Link className="button" onClick={this.delete} to="#">
                      Delete Course
                    </Link>
                  </React.Fragment>
                ) : (
                  ""
                )}
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
                By {firstName} {lastName}
              </p>
            </div>
            <div className="course--description">
              <ReactMarkdown>{course.description}</ReactMarkdown>
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
                    <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  delete = () => {
    const { context } = this.props;

    const { courseId } = this.state;

    // Get user credentials
    const { emailAddress, password } = context.authenticatedUser;

    context.data
      .deleteCourse(courseId, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log("Course deleted");
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };
}
