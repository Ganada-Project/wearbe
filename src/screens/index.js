import React from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

import App from '../../App';
import WelcomeScreen from './WelcomeScreen';

// Auth Screens
import PhoneVerifyScreen from './PhoneVerifyScreen';
import PasswordScreen from './PasswordScreen';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import ProfileScreen from './ProfileScreen';

// MainScreens
import HomeScreen from './HomeScreen';
import SizeCardList from './SizeCardList';
import ItemDetailScreen from './ItemDetailScreen';
import WebViewScreen from './WebViewScreen';

// Body Measure Screen
import BodySizeScreen from './BodySizeScreen';
import CameraScreen from './CameraScreen';
import HeightSlideScreen from './HeightSlideScreen';
import PartialHeightScreen from './PartialHeightSlideScreen';
import UpperBodyWidthSlideScreen from './UpperBodyWidthSlideScreen';
import LowerBodySlideScreen from './LowerBodySlideScreen';
import ThighSlideScreen from './ThighSlideScreen';
import SizeCardInfoScreen from './SizeCardInfoScreen';
import FinalRegisterScreen from './FinalRegisterScreen';

// Imports: Dependencies

// Imports: Redux Root Reducer
import rootReducer from '../reducers';
// Imports: Redux Root Saga
import { rootSaga } from '../sagas';

console.disableYellowBox = true;
// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();
// Redux: Store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

function ReduxProvider(Component) {
  return props => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

export const registerScreens = () => {
  Navigation.registerComponent(
    `wearbe.app`,
    () => ReduxProvider(App),
    () => App,
  );
  Navigation.registerComponent(
    `wearbe.welcome`,
    () => ReduxProvider(WelcomeScreen),
    () => WelcomeScreen,
  );
  Navigation.registerComponent(
    `wearbe.webView`,
    () => ReduxProvider(WebViewScreen),
    () => WebViewScreen,
  );
  Navigation.registerComponent(
    `wearbe.phoneVerify`,
    () => ReduxProvider(PhoneVerifyScreen),
    () => PhoneVerifyScreen,
  );
  Navigation.registerComponent(
    `wearbe.password`,
    () => ReduxProvider(PasswordScreen),
    () => PasswordScreen,
  );
  Navigation.registerComponent(
    `wearbe.signIn`,
    () => ReduxProvider(SignInScreen),
    () => SignInScreen,
  );
  Navigation.registerComponent(
    `wearbe.signUp`,
    () => ReduxProvider(SignUpScreen),
    () => SignUpScreen,
  );
  Navigation.registerComponent(
    `wearbe.home`,
    () => ReduxProvider(HomeScreen),
    () => HomeScreen,
  );
  Navigation.registerComponent(
    `wearbe.itemDetail`,
    () => ReduxProvider(ItemDetailScreen),
    () => ItemDetailScreen,
  );
  Navigation.registerComponent(
    `wearbe.bodySize`,
    () => ReduxProvider(BodySizeScreen),
    () => BodySizeScreen,
  );
  Navigation.registerComponent(
    `wearbe.camera`,
    () => ReduxProvider(CameraScreen),
    () => CameraScreen,
  );
  Navigation.registerComponent(
    `wearbe.heightSlide`,
    () => ReduxProvider(HeightSlideScreen),
    () => HeightSlideScreen,
  );
  Navigation.registerComponent(
    'wearbe.partialHeightSlide',
    () => ReduxProvider(PartialHeightScreen),
    () => PartialHeightScreen,
  );
  Navigation.registerComponent(
    'wearbe.upperBodyWidthSlide',
    () => ReduxProvider(UpperBodyWidthSlideScreen),
    () => UpperBodyWidthSlideScreen,
  );
  Navigation.registerComponent(
    'wearbe.lowerBodySlide',
    () => ReduxProvider(LowerBodySlideScreen),
    () => LowerBodySlideScreen,
  );
  Navigation.registerComponent(
    'wearbe.thighSlide',
    () => ReduxProvider(ThighSlideScreen),
    () => ThighSlideScreen,
  );
  Navigation.registerComponent(
    'wearbe.upperBodyWidthSlide',
    () => ReduxProvider(UpperBodyWidthSlideScreen),
    () => UpperBodyWidthSlideScreen,
  );
  Navigation.registerComponent(
    `wearbe.profile`,
    () => ReduxProvider(ProfileScreen),
    () => ProfileScreen,
  );
  Navigation.registerComponent(
    `wearbe.sizeCardList`,
    () => ReduxProvider(SizeCardList),
    () => SizeCardList,
  );
  Navigation.registerComponent(
    `wearbe.sizeCardInfo`,
    () => ReduxProvider(SizeCardInfoScreen),
    () => SizeCardInfoScreen,
  );
  Navigation.registerComponent(
    `wearbe.finalRegister`,
    () => ReduxProvider(FinalRegisterScreen),
    () => FinalRegisterScreen,
  );
};
