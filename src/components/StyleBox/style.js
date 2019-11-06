import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../constants';

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'column',
    borderRadius: 10,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
  },
  text: {
    position: 'absolute',
    bottom: 5,
    fontWeight: '600',
    fontSize: 16,
    color: theme.whiteColor,
  },
});

export default styles;
