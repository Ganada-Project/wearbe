import styled from 'styled-components/native';
import { theme } from '../../../constants';

export const ShadowBox = styled.View`
  box-shadow: ${props =>
    props.empty
      ? '0px 10px 10px rgba(136,146,156,0.1)'
      : '0px 20px 20px rgba(106, 130, 251, 0.4)'};
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  padding: 5px 10px;
`;

export const InfoWrapper = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const SizeCardName = styled.Text`
  margin-left: 5px;
  font-weight: bold;
  color: ${props => (props.empty ? theme.textColor : 'white')};
`;

export const ProfileWrapper = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: ${props => props.color};
  justify-content: center;
  align-items: center;
  border: ${props =>
    !props.empty ? '1px solid white' : '1px solid transparent'};
`;
