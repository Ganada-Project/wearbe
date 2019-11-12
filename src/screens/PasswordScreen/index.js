import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Wrapper, Header, Footer, InfoText } from './styles';
import { RegisterForm, FullWidthButton } from '../../components';

const PasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const isIos = Platform.OS === 'ios';

  const onChangePassword = text => {
    setPassword(text);
  };

  const onChangePasswordConfirm = text => {
    setPasswordConfirm(text);
  };

  const onPressNext = () => {
    Navigation.push({});
  };

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : null}
      enabled
      style={{ flex: 1 }}
      keyboardVerticalOffset={0}
    >
      <Wrapper>
        <Header>
          <RegisterForm
            label="등록된 휴대폰번호가 로그인에 필요한 아이디가 됩니다."
            secure
            onChangeText={onChangePassword}
            value={password}
          />
          <InfoText>영문 대소문자, 숫자, 특수문자 가능</InfoText>
          <RegisterForm
            label="비밀번호 확인"
            secure
            autoFocus={false}
            onChangeText={onChangePasswordConfirm}
            value={passwordConfirm}
          />
        </Header>
        <Footer>
          <FullWidthButton
            onPress={onPressNext}
            content="다음(3/4)"
            disabled={password !== passwordConfirm}
          />
        </Footer>
      </Wrapper>
    </KeyboardAvoidingView>
  );
};

export default PasswordScreen;
