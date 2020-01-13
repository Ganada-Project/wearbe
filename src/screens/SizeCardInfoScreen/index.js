import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import styles, { Wrapper } from './styles';
import { RegisterForm, FullWidthButton, GenderBox } from '../../components';
import KeyboardWrapper from '../../components/KeyboardWrapper';

const genderData = [
  {
    id: 0,
    name: '여성',
    icon: require('../../assets/Icons/Register/woman.png'), //eslint-disable-line
    iconWhite: require('../../assets/Icons/Register/woman-white.png'), //eslint-disable-line
  },
  {
    id: 1,
    name: '남성',
    icon: require('../../assets/Icons/Register/man.png'), //eslint-disable-line
    iconWhite: require('../../assets/Icons/Register/man-white.png'), //eslint-disable-line
  },
];

export class SizeCardInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeCardName: '',
      age: '',
      selectedGenderId: null,
    };
  }

  navigateToFinalRegister = () => {
    const {
      componentId,
      height,
      weight,
      base64,
      headOffsetY,
      footOffsetY,
      shoulderOffsetY,
      wristOffsetY,
      crotchOffsetY,
      pelvisOffsetY,
      ankleOffsetY,
      bellyOffsetX,
      leftShulderOffsetX,
      leftChestOffsetX,
      leftWaistOffsetX,
      leftPelvisOffsetX,
      rightShulderOffsetX,
      rightChestOffsetX,
      rightWaistOffsetX,
      rightPelvisOffsetX,
      leftThighOffsetX,
      rightThighOffsetX,
      isMe,
    } = this.props;
    const { sizeCardName, selectedGenderId, age } = this.state;
    Navigation.push(componentId, {
      component: {
        name: 'wearbe.finalRegister',
        passProps: {
          sizeCardName,
          gender: selectedGenderId,
          age,
          height,
          weight,
          base64,
          headOffsetY,
          footOffsetY,
          bellyOffsetX,
          shoulderOffsetY,
          wristOffsetY,
          crotchOffsetY,
          pelvisOffsetY,
          ankleOffsetY,
          leftShulderOffsetX,
          leftChestOffsetX,
          leftWaistOffsetX,
          leftPelvisOffsetX,
          rightShulderOffsetX,
          rightChestOffsetX,
          rightWaistOffsetX,
          rightPelvisOffsetX,
          rightThighOffsetX,
          leftThighOffsetX,
          isMe,
        },
      },
    });
  };

  handleGender = id => {
    this.setState({ selectedGenderId: id });
  };

  render() {
    const { isMe } = this.props;
    const { sizeCardName, age, selectedGenderId } = this.state;

    return (
      <KeyboardWrapper>
        <Wrapper>
          <View style={styles.header}>
            <Text style={styles.header__title}>기본 신체정보</Text>
          </View>
          <View style={styles.body}>
            <RegisterForm
              label="사이즈카드 이름"
              onChangeText={text => this.setState({ sizeCardName: text })}
            />
            {!isMe ? (
              <>
                <RegisterForm
                  label="나이"
                  keyboardType="numeric"
                  autoFocus={false}
                  onChangeText={text => this.setState({ age: text })}
                />
                <View style={{ flexDirection: 'row' }}>
                  {genderData.map(gender => (
                    <GenderBox
                      onPress={this.handleGender}
                      icon={gender.icon}
                      iconWhite={gender.iconWhite}
                      id={gender.id}
                      selectedGenderId={selectedGenderId}
                      key={`gender-${gender.id}`}
                      name={gender.name}
                      divider={6.5}
                    />
                  ))}
                </View>
              </>
            ) : null}
          </View>
          <View style={styles.footer}>
            <FullWidthButton
              disabled={
                isMe
                  ? !!sizeCardName === ''
                  : !!sizeCardName === '' ||
                    age === '' ||
                    selectedGenderId === null
              }
              onPress={this.navigateToFinalRegister}
              content="다음 단계"
            />
          </View>
        </Wrapper>
      </KeyboardWrapper>
    );
  }
}

SizeCardInfoScreen.propTypes = {
  componentId: PropTypes.string,
  isMe: PropTypes.bool,
  base64: PropTypes.string,
  height: PropTypes.string,
  weight: PropTypes.string,
  headOffsetY: PropTypes.number,
  footOffsetY: PropTypes.number,
  bellyOffsetX: PropTypes.number,
  shoulderOffsetY: PropTypes.number,
  wristOffsetY: PropTypes.number,
  crotchOffsetY: PropTypes.number,
  pelvisOffsetY: PropTypes.number,
  ankleOffsetY: PropTypes.number,
  leftShulderOffsetX: PropTypes.number,
  leftChestOffsetX: PropTypes.number,
  leftWaistOffsetX: PropTypes.number,
  leftPelvisOffsetX: PropTypes.number,
  rightShulderOffsetX: PropTypes.number,
  rightChestOffsetX: PropTypes.number,
  rightWaistOffsetX: PropTypes.number,
  rightPelvisOffsetX: PropTypes.number,
  rightThighOffsetX: PropTypes.number,
  leftThighOffsetX: PropTypes.number,
};

export default SizeCardInfoScreen;
