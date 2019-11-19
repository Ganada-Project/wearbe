import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { theme, layout } from '../../constants';

export const Wrapper = styled.View`
  flex: 1;
  /* height: 500px; */
  background-color: ${theme.backgroundColor};
  padding: ${layout.defaultPadding};
`;

export const Header = styled.View`
  flex: 0.1;
  padding-top: 15px;
  flex-direction: column;
  justify-content: center;
`;

export const Body = styled.ScrollView`
  flex: 1;
  /* padding: 15px 0; */
  /* border: 1px red solid; */
`;

export const HeaderText = styled.Text`
  font-size: 14px;
  color: ${theme.darkGray};
  font-weight: bold;
  margin-bottom: 10px;
`;

export const SubText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 15px;
  color: ${theme.textColor};
`;
