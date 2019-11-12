import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, StatusBar } from 'react-native';
import { Navigation } from 'react-native-navigation';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import styles from './styles';
import { FullWidthButton } from '../../components';
import { gradientPreset, gradientSpeed } from '../../constants';
import WaveLogoWhite from '../../assets/Logos/wave-logo-white.png';

const WelcomeScreen = ({ componentId }) => {
  const navigateToSignUp = () => {
    Navigation.push(componentId, {
      component: {
        name: 'wearbe.phoneVerify',
        options: {
          topBar: {
            title: {
              text: '번호인증',
            },
          },
        },
      },
    });
  };

  const navigateToSignIn = () => {
    Navigation.push(componentId, {
      component: {
        name: 'wearbe.signIn',
      },
    });
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <AnimatedLinearGradient
        customColors={gradientPreset}
        speed={gradientSpeed}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.logo} source={WaveLogoWhite} />
            {/* <Text style={styles.header__title}>웨어비</Text> */}
            <Text style={styles.header__title}>혹시 아시나요?</Text>
            <Text style={styles.header__subtitle}>
              패션 브랜드마다 사이즈 측정법이 다르데요.
            </Text>
          </View>
          <View style={styles.footer}>
            <FullWidthButton
              transparent
              content="로그인"
              onPress={navigateToSignIn}
            />
            <FullWidthButton
              invert
              content="회원가입"
              onPress={navigateToSignUp}
            />
            {/* <FullWidthButton invert content="카카오로 회원가입" /> */}

            {/* <SizeCardAddButton onPressAdd={this.navigateToInfo1} /> */}
          </View>
        </View>
      </AnimatedLinearGradient>
    </>
  );
};

WelcomeScreen.propTypes = {
  componentId: PropTypes.string,
};

export default WelcomeScreen;
