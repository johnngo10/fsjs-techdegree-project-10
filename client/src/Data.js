import config from "./config";

export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  /**
   * A method that retrieves the user by performing a GET request to the api
   * @param {string} emailAddress - The user's email address
   * @param {string} password - The user's password
   */
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      emailAddress,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  /**
   * A method that creates a new user by sending a POST request to the api
   * @param {object} user - Object containing user info
   */
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * A method that creates a new course by sending a POST request to the api
   * @param {object} course - Object containing course info
   * @param {string} emailAddress - The user's email address
   * @param {string} password - The user's password
   */
  async createCourse(course, emailAddress, password) {
    const response = await this.api("/courses", "POST", course, true, {
      emailAddress,
      password,
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * A method that retrieves a course by sending a GET request to the api
   * @param {number} id - The course's id number
   */
  async getCourseDetail(id) {
    const response = await this.api(`/courses/${id}`, "GET", null, false, null);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 400) {
      console.log(response.status);
      return null;
    } else {
      throw new Error();
    }
  }

  /**
   * A method that update's a course by sending a PUT request to the api
   * @param {number} id - The course's id number
   * @param {object} course - Object containg course info
   * @param {string} emailAddress - User's email address
   * @param {string} password - User's password
   */
  async updateCourse(id, course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, "PUT", course, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * A method that deletes a course by sending a DELETE request to the api
   * @param {number} id - Course's id number
   * @param {string} emailAddress - User's email address
   * @param {string} password - User's password
   */
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
