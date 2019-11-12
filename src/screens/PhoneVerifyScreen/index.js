import React, { useState, useEffect } from 'react';

// react-native
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import useCountDown from 'react-countdown-hook';

import { Wrapper, InfoText, Header, Footer } from './styles';
import { RegisterForm, FullWidthButton } from '../../components';
import { checkPhoneAction } from '../../actions/authActions';

const initialTime = 60 * 1000; // initial time in milliseconds, defaults to 60000
const interval = 1000;

function convert(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const PhoneVerifyScreen = ({ componentId }) => {
  const [isSent, setIsSent] = useState(false);
  const [phone, setPhone] = useState('');
  const [timeLeft, start] = useCountDown(initialTime, interval);
  const [verifyNumber, setVerifyNumber] = useState('');
  const dispatch = useDispatch();
  const global = useSelector(state => state.get('global'));
  const phoneVerify = global.get('phoneVerify');
  const checking = phoneVerify.get('checking');
  const overlap = phoneVerify.get('overlap');
  const isIos = Platform.OS === 'ios';
  const timeLeftConverted = convert(timeLeft);

  useEffect(() => {
    if (isSent) {
      start();
    }
  }, [isSent]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsSent(false);
    }
  }, [timeLeft]);

  const onChangePhoneText = text => {
    setPhone(text);
    dispatch(checkPhoneAction({ number: text }));
  };

  const onChangeVerify = text => {
    setVerifyNumber(text);
  };

  const onPressNext = () => {
    setIsSent(true);
  };

  const navigateToPassword = () => {
    Navigation.push(componentId, {
      component: {
        name: 'wearbe.password',
        options: {
          topBar: {
            title: {
              text: '비밀번호',
            },
          },
        },
      },
    });
  };

  const renderCheck = () => (
    <Wrapper>
      <Header>
        <RegisterForm
          phone
          label="휴대전화 번호"
          loading={checking}
          placeholder="휴대전화번호를 입력해주세요."
          onChangePhoneText={onChangePhoneText}
          phoneValue={phone}
          errorText={overlap ? '이미 존재하는 전화번호입니다' : null}
        />
        <InfoText>입력하신 번호로 4자리 숫자가 발송됩니다.</InfoText>
      </Header>
      <Footer>
        <FullWidthButton
          content="다음(1/4)"
          disabled={phone === '' || overlap}
          onPress={onPressNext}
        />
      </Footer>
    </Wrapper>
  );

  const renderVerify = () => (
    <Wrapper>
      <Header>
        <RegisterForm
          label="인증번호"
          loading={checking}
          keyboardType="numeric"
          placeholder="인증번호 4자리를 입력해주세요."
          onChangeText={onChangeVerify}
          value={verifyNumber}
          errorText={overlap ? '이미 존재하는 전화번호입니다' : null}
        />
        <InfoText style={{ alignSelf: 'flex-end' }}>
          {timeLeftConverted}
        </InfoText>
        <InfoText>인증번호를 못 받으셨나요?</InfoText>
      </Header>
      <Footer>
        <FullWidthButton
          content="다음(2/4)"
          disabled={verifyNumber === '' || verifyNumber.length > 4}
          onPress={navigateToPassword}
        />
      </Footer>
    </Wrapper>
  );

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : null}
      enabled
      style={{ flex: 1 }}
      keyboardVerticalOffset={0}
    >
      {isSent ? renderVerify() : renderCheck()}
    </KeyboardAvoidingView>
  );
};

PhoneVerifyScreen.propTypes = {
  componentId: PropTypes.string,
};

export default PhoneVerifyScreen;
