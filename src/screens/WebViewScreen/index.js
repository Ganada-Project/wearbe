import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import { Wrapper } from './styles';
import { BarLoading } from '../../components';
import { theme } from '../../constants';

const WebViewScreen = ({ componentId, uri }) => {
  // const dispatch = useDispatch();
  // const defaultState = useSelector(state => state.get('global'));
  useNavigationComponentDidAppear(() => {});
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <WebView
        source={{ uri }}
        startInLoadingState
        renderLoading={() => (
          <Wrapper>
            <BarLoading size={30} />
          </Wrapper>
        )}
      ></WebView>
    </>
  );
};

WebViewScreen.options = {
  topBar: {
    title: {
      color: theme.pointColor,
    },
    background: {
      color: 'white',
    },
  },
};

WebViewScreen.propTypes = {
  componentId: PropTypes.string,
  uri: PropTypes.string,
};

export default WebViewScreen;
