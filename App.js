/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {setCustomText} from 'react-native-global-props';

// redux
import {compose} from 'redux';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {makeSelectUser} from './src/selectors.js';
import {fonts} from './src/constants';
import {fetchUserAction} from './src/actions/authActions.js';

// const customTextProps = {
//   style: {
//     fontFamily: fonts.NanumGothic,
//   },
// };

// setCustomText(customTextProps);

const App = ({fetchUser}) => {
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView></SafeAreaView>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchUser: () => {
    dispatch(fetchUserAction());
  },
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
