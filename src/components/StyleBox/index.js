import React, {Component} from 'react';
import {TouchableOpacity, Dimensions, Text, Image, View} from 'react-native';
import PropTypes from 'prop-types';

import styles from './style';
import {theme} from '../../constants';
const window = Dimensions.get('window');

export class StyleBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {name, imgUrl, index, onPress, selected, divider} = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          ...styles.wrapper,
          width: window.width / divider,
          height: window.width / divider,
          marginRight: index % 3 === 2 ? 0 : 10,
          justifyContent: selected ? 'center' : 'flex-end',
          position: 'relative',
        }}>
        <Image
          source={{uri: imgUrl}}
          borderRadius={1}
          style={{width: '100%', height: '100%'}}
        />
        <View
          style={{
            ...styles.overlay,
            backgroundColor: selected ? theme.pointColor : 'black',
          }}
        />
        {selected ? (
          // <Image
          //   style={{
          //     width: 60,
          //     height: 60,
          //     position: 'absolute',
          //     bottom: 10,
          //   }}
          //   source={require('../../Assets/Icons/Register/style-check.png')}
          // />
          <Text>하하</Text>
        ) : (
          <Text
            style={{
              ...styles.text,
              marginBottom: selected ? 0 : 10,
            }}>
            {name}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}

StyleBox.propTypes = {
  name: PropTypes.string,
  imgUrl: PropTypes.string,
  index: PropTypes.number,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
  divider: PropTypes.number,
};

export default StyleBox;
