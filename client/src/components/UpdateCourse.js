import React, { Component } from "react";
import Form from "./Form";

export default class UpdateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    firstName: "",
    lastName: "",
    courseId: this.props.match.params.id,
    courseOwnerId: "",
    errors: [],
  };

  componentDidMount() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const { courseId } = this.state;

    context.data
      .getCourseDetail(courseId)
      .then((response) => {
        if (response) {
          this.setState({
            title: response.title,
            description: response.description,
            estimatedTime: response.estimatedTime,
            materialsNeeded: response.materialsNeeded,
            firstName: authUser.firstName,
            lastName: authUser.lastName,
            courseOwnerId: response.userId,
          });
        } else {
          console.log("error");
          this.props.history.push("/notfound");
        }

        if (authUser.id !== this.state.courseOwnerId) {
          this.props.history.push("/forbidden");
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      firstName,
      lastName,
      errors,
    } = this.state;

    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="input-title course--title--input"
                      placeholder="Course title..."
                      value={title}
                      onChange={this.change}
                    />
                  </div>
                  <p>
                    By {firstName} {lastName}
                  </p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      className=""
                      placeholder="Course description..."
                      value={description}
                      onChange={this.change}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          className="course--time--input"
                          placeholder="Hours"
                          value={estimatedTime}
                          onChange={this.change}
                        />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          className=""
                          placeholder="List materials..."
                          value={materialsNeeded}
                          onChange={this.change}
                        ></textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const { context } = this.props;

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      courseId,
    } = this.state;

    // Get userID
    const userId = context.authenticatedUser.id;

    // Get user credentials
    const { emailAddress, password } = context.authenticatedUser;

    // Create course
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    context.data
      .updateCourse(courseId, course, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log("Course updated");
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}
