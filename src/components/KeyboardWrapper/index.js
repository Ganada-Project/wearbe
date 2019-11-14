import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import PropTyeps from 'prop-types';
import { Navigation } from 'react-native-navigation';

const KeyboardWrapper = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(null);

  async function getHeaderHeight() {
    const constants = await Navigation.constants();
    const { topBarHeight } = constants;
    setHeaderHeight(topBarHeight + 30);
  }

  useEffect(() => {
    getHeaderHeight();
  }, []);

  const getTopBarHeight = async () => {};
  const isIos = Platform.OS === 'ios';
  getTopBarHeight();
  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : null}
      keyboardVerticalOffset={isIos ? headerHeight : 0}
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

KeyboardWrapper.propTypes = {
  children: PropTyeps.element,
};

export default KeyboardWrapper;
