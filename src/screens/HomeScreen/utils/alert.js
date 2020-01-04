/* eslint-disable */
import { Animated, Easing } from 'react-native';
export const alertSetSizeCard = ({
  sizeCardAlertOpacity,
  sizeCardAlertTop,
}) => {
  Animated.parallel([
    Animated.timing(sizeCardAlertOpacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
    }),
    Animated.timing(sizeCardAlertTop, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
    }),
  ]).start(() =>
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(sizeCardAlertOpacity, {
          toValue: 0,
          duration: 200,
          easing: Easing.easeOutCubic,
        }),
        Animated.timing(sizeCardAlertTop, {
          toValue: -20,
          duration: 200,
          easing: Easing.linear,
        }),
      ]).start();
    }, 1000),
  );
};
