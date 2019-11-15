import React, { useState, createRef } from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import { Wrapper, Header, Footer, InfoText } from './styles';
import {
  RegisterForm,
  FullWidthButton,
  KeyboradWrapper,
} from '../../components';
import { signInAction } from '../../actions/authActions';

const SignInScreen = ({ componentId }) => {
  const dispatch = useDispatch();
  const phoneRef = createRef();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const onChangePhoneText = text => {
    setPhone(text);
  };

  const onChangePassword = text => {
    setPassword(text);
  };

  const onPressSignIn = () => {
    dispatch(signInAction({ phone, password }));
  };
  // const dispatch = useDispatch();
  // const defaultState = useSelector(state => state.get('global'));
  useNavigationComponentDidAppear(() => {
    phoneRef.current._inputElement.focus(); //eslint-disable-line
  });
  return (
    <KeyboradWrapper>
      <>
        <StatusBar barStyle="dark-content" />
        <Wrapper>
          <Header>
            <RegisterForm
              phone
              label="휴대전화 번호"
              placeholder="휴대전화번호를 입력해주세요."
              onChangePhoneText={onChangePhoneText}
              phoneValue={phone}
              phoneRef={phoneRef}
            />
            <RegisterForm
              label="비밀번호"
              secure
              onChangeText={onChangePassword}
              value={password}
            />
            <InfoText>계졍/비밀번호를 잊으셨나요?</InfoText>
          </Header>
          <Footer>
            <FullWidthButton
              content="로그인"
              disabled={phone === '' || password === ''}
              onPress={onPressSignIn}
            />
          </Footer>
        </Wrapper>
      </>
    </KeyboradWrapper>
  );
};

SignInScreen.options = {
  topBar: {
    noBorder: true,
  },
};

SignInScreen.propTypes = {
  componentId: PropTypes.string,
};

export default SignInScreen;
