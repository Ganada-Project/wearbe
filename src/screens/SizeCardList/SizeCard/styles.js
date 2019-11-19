import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { theme } from '../../../constants';
const window = Dimensions.get('window');

export const Wrapper = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${window.height / 8.5};
  padding: 10px 15px;
  border-radius: 20px;
  /* border: 1px solid ${theme.grayColor}; */
  /* box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2); */
  box-shadow:${(props) => props.isSelected
    ? '0px 25px 20px rgba(106, 130, 251, 0.4)'
    : '0px 10px 10px rgba(232,232,232,0.1)'} ;
    z-index: ${(props) => (props.isSelected ? 20 : 0)};
  background-color:${(props) => props.isSelected ? theme.pointColor : 'rgba(255,255,255,0.9)'} ;
  margin-bottom: 20px;
`;

export const ProfileWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ProfileImageBg = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
  border: ${(props) => props.isSelected ? '1px solid white' : '1px solid transparent'};
`;

export const ContentWrapper = styled.View`
  flex: 3;
  padding-left: 15px;
  justify-content: space-between;
`;

export const TopWrapper = styled.View``;

export const DescWrapper = styled.View`
  margin-top: 2px;
  flex-direction: row;
  align-items: center;
`;

export const DescText = styled.Text`
  margin: 0 2px;
  font-size: 14px;
  color: ${(props) => (props.isSelected ? 'white' : theme.textColor)};
`;

export const SizeCardName = styled.Text`
  color: ${(props) => (props.isSelected ? 'white' : theme.textColor)};
  font-weight: bold;
  font-size: 16px;
`;

export const CreatedAt = styled.Text`
  color: ${(props) => (props.isSelected ? 'white' : theme.textColor)};
  font-size: 12px;
`;

export const ButtonWrapper = styled.View`
  flex: 2;
  justify-content: center;
  align-items: flex-end;
`;

export const ButtonInner = styled.View`
  border-radius: 9px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const MyCardWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export const MyCardText = styled.Text`
  color: ${(props) => (props.isSelected ? 'white' : theme.pointColor)};
  font-size: 12px;
`;
