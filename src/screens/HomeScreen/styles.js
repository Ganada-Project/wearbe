import styled from 'styled-components/native';
import {
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { layout, theme } from '../../constants';

export const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  padding: ${layout.noHeaderPadding};
`;

export const Header = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
`;

export const Body = styled.View`
  flex: 8;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const IconWrapper =
  Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;

export const SelectedSizeCardWrapper = styled.View`
  flex: 1.1;
  margin-right: 10;
`;

export const NavItem = styled(IconWrapper)`
  width: 45px;
  height: 45px;
  border: 1px solid ${theme.grayColor};
  border-radius: 15px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  margin-right: ${props => (props.last ? '0px' : '5px')};
`;

NavItem.Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const InitialText = styled.Text`
  color: ${theme.textColor};
  margin-bottom: 5px;
`;

export const ItemInfo = styled.View`
  padding: 10px;
  flex-direction: column;
  justify-content: center;
`;

ItemInfo.Maker = styled.Text`
  font-weight: bold;
  color: ${theme.textColor};
  font-size: 12px;
  margin-bottom: 5px;
`;

ItemInfo.Price = styled.Text`
  color: ${theme.textColor};
  font-size: 12px;
`;
