import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";

import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";

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
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });

    // fetch("http://localhost:5000/api/courses")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     const course = res.data;
    //     console.log(course);
    //     this.setState({ courses: course });
    //   })
    //   .catch((error) => {
    //     console.log("Error fetching and parsing data", error);
    //   });
  }

  render() {
    return (
      <div>
        <h1>Hello world!</h1>
        {/* <Courses courses={this.state.courses} /> */}
      </div>
    );
  }
}

export default App;
