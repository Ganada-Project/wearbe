import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import { Button } from 'react-native-elements';
import { Wrapper } from './styles';
import { signOutAction } from '../../actions/authActions';

const ProfileScreen = ({ componentId }) => {
  const dispatch = useDispatch();
  const global = useSelector(state => state.get('global'));
  const userData = global.get('userData');
  useNavigationComponentDidAppear(() => {});
  const onPressSignOut = () => {
    dispatch(signOutAction());
  };
  return (
    <Wrapper>
      <Button onPress={onPressSignOut} title="로그아웃"></Button>
    </Wrapper>
  );
};
ProfileScreen.propTypes = {
  componentId: PropTypes.string,
};

export default ProfileScreen;
