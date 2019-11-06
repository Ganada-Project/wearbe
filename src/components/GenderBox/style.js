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
    marginRight: 10,
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default styles;
