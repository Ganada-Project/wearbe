import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./style";

export class DefaultComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View />;
  }
}

DefaultComponent.propTypes = {};

export default DefaultComponent;
