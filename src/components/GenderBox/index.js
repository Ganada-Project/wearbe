import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import { theme } from '../../constants';
const window = Dimensions.get('window');

export class GenderBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { id, selectedGenderId, name, onPress, divider } = this.props;

    return (
      <TouchableOpacity
        style={{
          ...styles.wrapper,
          width: window.width / divider,
          height: 40,
          borderWidth: 1,
          borderRadius: window.width / divider / 2,
          borderColor:
            selectedGenderId !== id ? theme.whiteColor : theme.whiteColor,
          backgroundColor:
            selectedGenderId !== id ? 'transparent' : theme.whiteColor,
        }}
        onPress={() => onPress(id)}
      >
        <Text
          style={{
            ...styles.text,
            color: selectedGenderId !== id ? theme.textColor : theme.pointColor,
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  }
}

GenderBox.propTypes = {
  id: PropTypes.number,
  selectedGenderId: PropTypes.number,
  name: PropTypes.string,
  onPress: PropTypes.func,
  divider: PropTypes.number,
};

export default GenderBox;
