import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import { Wrapper } from './styles';

const DefaultScreen = ({ componentId }) => {
  // const dispatch = useDispatch();
  // const defaultState = useSelector(state => state.get('global'));
  useNavigationComponentDidAppear(() => {});
  return <Wrapper></Wrapper>;
};

DefaultScreen.propTypes = {
  componentId: PropTypes.string,
};

export default DefaultScreen;
