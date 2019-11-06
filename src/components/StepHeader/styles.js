import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
const window = Dimensions.get('window');

export const StepHeadrWrapper = styled.View`
  position: absolute;
  padding-bottom: 5px;
  background-color: white;
  top: 0;
  z-index: 30;
  width: ${window.width};
`;
