/**
 * @format
 */
import React from 'react';
import {Navigation} from 'react-native-navigation';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Imports: Dependencies
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
// Imports: Redux Root Reducer
import rootReducer from './src/reducers';
// Imports: Redux Root Saga
import {rootSaga} from './src/sagas';
import {Provider} from 'react-redux';

import WelcomeScreen from './src/screens/WelcomeScreen';
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

Navigation.registerComponent(`wearbe.app`, () => ReduxProvider(App), () => App);
Navigation.registerComponent(
  `wearbe.welcome`,
  () => ReduxProvider(WelcomeScreen),
  () => WelcomeScreen,
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
