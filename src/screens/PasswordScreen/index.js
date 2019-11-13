import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import { Wrapper, Header, Footer, InfoText } from './styles';
import { RegisterForm, FullWidthButton } from '../../components';
import KeyboardWrapper from '../../components/KeyboardWrapper';

const PasswordScreen = ({ componentId, phone }) => {
  const [password, setPassword] = useState('');
  const passwordRef = createRef();

  const onChangePassword = text => {
    setPassword(text);
  };

  useNavigationComponentDidAppear(() => {
    passwordRef.current.focus();
  });

  const onPressNext = () => {
    Navigation.push(componentId, {
      component: {
        name: 'wearbe.signUp',
        options: {
          topBar: {
            title: {
              text: '부가정보',
            },
          },
        },
        passProps: {
          phone,
          password,
        },
      },
    });
  };

  return (
    <KeyboardWrapper>
      <Wrapper>
        <Header>
          <RegisterForm
            label="등록된 휴대폰번호가 로그인에 필요한 아이디가 됩니다."
            secure
            onChangeText={onChangePassword}
            defaultRef={passwordRef}
            value={password}
          />
          <InfoText>영문 대소문자, 숫자, 특수문자 가능</InfoText>
        </Header>
        <Footer>
          <FullWidthButton
            onPress={onPressNext}
            content="다음(3/4)"
            disabled={password === ''}
          />
        </Footer>
      </Wrapper>
    </KeyboardWrapper>
  );
};

PasswordScreen.propTypes = {
  componentId: PropTypes.string,
  phone: PropTypes.string,
};

export default PasswordScreen;
