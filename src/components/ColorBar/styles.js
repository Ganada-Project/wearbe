import {
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../constants';

const Button = Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;

export const Wrapper = styled.View`
  flex-direction: row;
`;

export const ColorItem = styled(Button)`
  width: 30px;
  height: 15px;
  backgroundColor: ${props => props.selected ? 'black' :props.color};
`;


