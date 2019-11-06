import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { theme } from '../../constants';
const window = Dimensions.get('window');

export const Wrapper = styled.View`
  width: ${window.width / 3};
  margin-right: 15px;
`;

export const ImageArea = styled.View`
  width: 100%;
  height: ${window.width / 3};
`;

export const BrandText = styled.Text`
  font-size: 16px;
  margin-top: 10px;
  margin-left: 5px;
  font-weight: 600;
  color: ${theme.textColor};
`;
