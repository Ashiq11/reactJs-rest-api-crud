import React, { Component } from "react";
// import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CourseList from "./components/courseList.component";
import UserList from "./components/userList.component";
import Login from "./components/login.component";
import { Routes, Route } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div>
        {/* <CourseList /> */}
        {/* <UserList /> */}
        {/* <SimpleTable /> */}
        <div className="container mt-3">

          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/user" element={<UserList />} />
            <Route exact path="/courseList/:id" element={<CourseList />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
