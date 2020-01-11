import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import AnimatedGradient from 'react-native-animated-linear-gradient';
import styles from './styles';
import { RegisterForm, FullWidthButton } from '../../components';
import KeyboardWrapper from '../../components/KeyboardWrapper';

export class BodySizeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '',
      weight: '',
    };
  }

  navigateCamera = () => {
    const { height, weight } = this.state;
    const { componentId, isMe } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.camera',
        passProps: {
          height,
          weight,
          isMe,
        },
      },
    });
  };

  render() {
    const { height, weight } = this.state;
    return (
      <KeyboardWrapper>
        <View style={styles.header}>
          <Text style={styles.header__title}>기본 신체정보</Text>
        </View>
        <View style={styles.body}>
          <RegisterForm
            label="신장(cm)"
            keyboardType="numeric"
            onChangeText={text => this.setState({ height: text })}
          />
          <RegisterForm
            label="체중(kg)"
            keyboardType="numeric"
            autoFocus={false}
            onChangeText={text => this.setState({ weight: text })}
          />
        </View>
        <View style={styles.footer}>
          <FullWidthButton
            disabled={!!height === '' || weight === ''}
            onPress={this.navigateCamera}
            content="다음 단계"
          />
        </View>
      </KeyboardWrapper>
    );
  }
}

BodySizeScreen.propTypes = {
  componentId: PropTypes.string,
  isMe: PropTypes.bool,
};

export default BodySizeScreen;
