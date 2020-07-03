import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Public from "./components/Public";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";

class App extends Component {
  componentDidMount() {
    fetch("");
  }

  render() {
    return <div></div>;
  }
}

export default App;
