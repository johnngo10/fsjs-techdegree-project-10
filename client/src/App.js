import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/global.css";
import axios from "axios";

import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
// import withContext from "./Context";

// const HeaderWithContext = withContext(Header);

class App extends Component {
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
        console.log(course);
        this.setState({ courses: course });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Courses courses={this.state.courses} />
        </div>
      </Router>
    );
  }
}

export default App;
