import {
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../constants';
const window = Dimensions.get('window');
const Button = Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;

export const Wrapper = styled.View``;

export const Content = styled.View`
  width: 100%;
  flex: 1;
  background-color: white;
  margin-bottom: 15px;
  flex-direction: column;
`;

export const ImageArea = styled.View`
  width: ${window.width / 3};
  height: ${window.width / 3};
  margin-right: 15px;
`;

export const BrandImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const BrandInfo = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ItemArea = styled.ScrollView``;

export const BrandTitle = styled.Text`
  color: ${(props) => (props.selected ? theme.pointColor : theme.textColor)};
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
`;
