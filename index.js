/**
 * @format
 */
/* eslint-disable */
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './App';

// Imports: Dependencies

// Imports: Redux Root Reducer
import rootReducer from './src/reducers';
// Imports: Redux Root Saga
import { rootSaga } from './src/sagas';

import WelcomeScreen from './src/screens/WelcomeScreen';
import PhoneVerifyScreen from './src/screens/PhoneVerifyScreen';
import PasswordScreen from './src/screens/PasswordScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SizeCardList from './src/screens/SizeCardList';
import ItemDetailScreen from './src/screens/ItemDetailScreen';
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
  `wearbe.camera`,
  () => ReduxProvider(CameraScreen),
  () => CameraScreen,
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

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'wearbe.app',
      },
    },
  });
});
