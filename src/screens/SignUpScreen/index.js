import React, { useState, createRef } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import { Wrapper, Header, Footer } from './styles';
import {
  RegisterForm,
  FullWidthButton,
  GenderBox,
  BarLoading,
  KeyboradWrapper,
} from '../../components';
import { checkNicknameAction, signUpAction } from '../../actions/authActions';

const genderData = [
  {
    id: 0,
    name: '여성',
  },
  {
    id: 1,
    name: '남성',
  },
];

const SignUpScreen = ({ componentId, phone, password }) => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [selectedGenderId, setSelectedGenderId] = useState(0);
  const global = useSelector(state => state.get('global'));
  const signUpLoading = global.get('signUpLoading');
  const nicknameState = global.get('nickname');
  const checking = nicknameState.get('checking');
  const overlap = nicknameState.get('overlap');
  const nicknameRef = createRef();
  const ageRef = createRef();

  const onChangeNickname = text => {
    setNickname(text);
    dispatch(checkNicknameAction({ nickname: text }));
  };
  const onChangeAge = text => {
    setAge(text);
  };

  useNavigationComponentDidAppear(() => {
    nicknameRef.current.focus();
  });

  const handleGender = id => {
    setSelectedGenderId(id);
  };

  const onPressSignup = () => {
    const signUpObj = {
      phone,
      password,
      age,
      name: nickname,
      gender: selectedGenderId,
      componentId,
    };
    dispatch(signUpAction({ signUpObj }));
  };
  return (
    <KeyboradWrapper>
      <Wrapper>
        {signUpLoading ? (
          <BarLoading />
        ) : (
          <>
            <Header>
              <RegisterForm
                label="닉네임"
                value={nickname}
                defaultRef={nicknameRef}
                onChangeText={onChangeNickname}
                loading={checking}
                errorText={overlap ? '닉네임이 존재합니다' : null}
              />
              <RegisterForm
                label="나이"
                value={age}
                defaultRef={ageRef}
                keyboradType="numeric"
                onChangeText={onChangeAge}
              />
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                {genderData.map(gender => (
                  <GenderBox
                    onPress={handleGender}
                    id={gender.id}
                    selectedGenderId={selectedGenderId}
                    key={`gender-${gender.id}`}
                    name={gender.name}
                    divider={6.5}
                  />
                ))}
              </View>
            </Header>
            <Footer>
              <FullWidthButton content="가입하기" onPress={onPressSignup} />
            </Footer>
          </>
        )}
      </Wrapper>
    </KeyboradWrapper>
  );
};

SignUpScreen.propTypes = {
  componentId: PropTypes.string,
  phone: PropTypes.string,
  password: PropTypes.string,
};

export default SignUpScreen;
