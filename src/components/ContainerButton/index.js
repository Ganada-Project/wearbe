import {
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

const ContainerButton = Platform.os === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;
export default ContainerButton;
