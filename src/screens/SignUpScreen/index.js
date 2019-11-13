import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Wrapper, Header, Footer } from './styles';
import { RegisterForm, FullWidthButton } from '../../components';
import { checkNicknameAction } from '../../actions/authActions';

const SignUpScreen = ({ componentId, phone, password }) => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState('');
  const global = useSelector(state => state.get('global'));
  const nicknameState = global.get('nickname');
  const checking = nicknameState.get('checking');
  const overlap = nicknameState.get('overlap');
  const onChangeNickname = text => {
    setNickname(text);
    dispatch(checkNicknameAction({ nickname: text }));
  };

  const onPressSignup = () => {
    const signUpObj = {
      phone,
      password,
      componentId,
    };
  };
  return (
    <Wrapper>
      <Header>
        <RegisterForm
          label="닉네임"
          value={nickname}
          onChangeText={onChangeNickname}
          loading={checking}
          errorText={overlap ? '닉네임이 존재합니다' : null}
        />
      </Header>
      <Footer>
        <FullWidthButton content="가입하기" onPress={onPressSignup} />
      </Footer>
    </Wrapper>
  );
};

SignUpScreen.propTypes = {
  componentId: PropTypes.string,
};

export default SignUpScreen;
