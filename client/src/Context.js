import React, { Component } from "react";
import Data from "./Data";
import Cookies from "js-cookie";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  /**
   * A method that checks if the user exist and signs in the user by adding the user info to state
   * @param {string} emailAddress - User's email address
   * @param {string} password - User's password
   */
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      user.password = password;
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  /**
   * A method that signs out the user by removing them from state
   * @param {string} emailAddress - User's email address
   * @param {string} password - User's password
   */
  signOut = async (emailAddress, password) => {
    this.setState(() => {
      return { authenticatedUser: null };
    });
    Cookies.remove("authenticatedUser");
    const user = await this.data.getUser(emailAddress, password);
    return user;
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
