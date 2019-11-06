import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import { gradientPreset } from '../../constants';

export class FullWidthButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Button = Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;
    const {
      content,
      invert,
      icon,
      onPress,
      disabled,
      transparent,
      height,
    } = this.props;
    if (disabled) {
      return (
        <View
          style={[
            invert ? styles.disabledInvertContainer : styles.disabledContainer,
            { height },
          ]}
        >
          {icon ? (
            <Icon
              style={invert ? styles.invertIcon : styles.defaultIcon}
              name={icon}
            />
          ) : null}
          <Text style={styles.invertText}>{content}</Text>
        </View>
      );
    }
    if (invert) {
      return (
        <View style={[styles.invertContainer, { height }]}>
          <Button
            onPress={onPress}
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {icon ? (
              <Icon size={16} name={icon} style={styles.defaultIcon} />
            ) : null}
            <Text style={styles.invertText}>{content}</Text>
          </Button>
        </View>
      );
    }
    if (transparent) {
      return (
        <View style={[styles.transparentContainer, { height }]}>
          <Button
            onPress={onPress}
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {icon ? (
              <Icon size={16} name={icon} style={styles.defaultIcon} />
            ) : null}
            <Text style={styles.defaultText}>{content}</Text>
          </Button>
        </View>
      );
    }
    return (
      <LinearGradient
        style={[styles.defaultContainer, { height }]}
        colors={gradientPreset}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Button
          onPress={onPress}
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon ? (
            <Icon size={16} name={icon} style={styles.defaultIcon} />
          ) : null}
          <Text style={styles.defaultText}>{content}</Text>
        </Button>
      </LinearGradient>
      // <Button >
      //   <AnimatedGradient
      //     customColors={gradientPreset}
      //     speed={gradientSpeed}
      //   >

    //   </AnimatedGradient>
    // </Button>
    );
  }
}
FullWidthButton.defaultProps = {
  height: 55,
};
FullWidthButton.propTypes = {
  height: PropTypes.number,
  content: PropTypes.string,
  icon: PropTypes.string,
  invert: PropTypes.bool,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  transparent: PropTypes.bool,
};

export default FullWidthButton;
