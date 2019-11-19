/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { setCustomText } from 'react-native-global-props';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAction } from './src/actions/authActions';
import { fonts, theme } from './src/constants';
import { BarLoading } from './src/components';

// const customTextProps = {
//   style: {
//     fontFamily: fonts.NanumGothic,
//   },
// };

// setCustomText(customTextProps);

const App = () => {
  const dispatch = useDispatch();
  const global = useSelector(state => state.get('global'));
  const userLoading = global.get('userLoading');
  useEffect(() => {
    dispatch(fetchUserAction());
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {userLoading ? (
        <BarLoading></BarLoading>
      ) : (
        <View style={{ backgroyndColor: theme.backgroundColor }}></View>
      )}
    </>
  );
};

export default App;
