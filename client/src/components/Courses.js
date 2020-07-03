import React from "react";

const Courses = (props) => {
  const results = props.data;
  let courses = results.map((course) => {
    return <li>{}</li>;
  });

  return (
    <div>
      <ul>{courses}</ul>
    </div>
  );
};

export default Courses;
