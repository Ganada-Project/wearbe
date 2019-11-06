import styled from 'styled-components/native';
import {
  Dimensions,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
const window = Dimensions.get('window');
export const ItemWrapperButton = Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  itemImage: {
    width: '100%',
    height: 140,
    borderRadius: 10,
  },
});

export const ItemLeft = styled.View`
  width: ${window.width / 2.5};
  margin-left: 15px;
  margin-right: 5px;
  margin-top: 20px;
`;

export const ItemRight = styled.View`
  width: ${window.width / 2.5};
  margin-left: 5px;
  margin-right: 15px;
  margin-top: 20px;
`;

export default styles;
