import styled from 'styled-components/native';
import { layout, theme } from '../../constants';

export const Wrapper = styled.View`
  padding: ${layout.padding};
  flex: 1;
`;

export const Header = styled.View`
  flex: 3;
  flex-direction: column;
`;
export const Footer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const InfoText = styled.Text`
  margin-top: 20px;
  color: ${theme.darkGray};
`;
