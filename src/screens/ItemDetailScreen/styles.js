import styled from 'styled-components/native';
import {
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { theme, layout } from '../../constants';
const window = Dimensions.get('window').width;

const Button =
  Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;

export const Wrapper = styled.View`
  flex: 1;
  /* height: 500px; */
  background-color: ${theme.backgroundColor};
  padding: ${layout.defaultPadding};
  padding: 30px 25px 0px 25px;
`;

export const Header = styled.View`
  flex: 0.1;
  flex-direction: column;
  justify-content: center;
`;

export const Body = styled.ScrollView`
  flex: 1;
  /* border: 1px red solid; */
  margin-bottom: 55px;
`;

export const ItemInfoWrapper = styled.View`
  margin-top: 15px;
  flex-direction: row;
  padding: 10px 0;
`;

export const ItemInfo = styled.View`
  flex-direction: column;
  margin-right: 20%;
`;

ItemInfo.Label = styled.Text`
  font-size: 14px;
  color: ${theme.darkGray};
  margin-bottom: 5px;
`;
ItemInfo.Text = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const CarouselWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const SizeChartWrapper = styled.View`
  background-color: white;
  width: 100%;
  padding: 20px 10px;
  border-radius: 20px;
  margin-top: 20px;
`;

export const SizeLabel = styled.ScrollView`
  margin-top: 5px;
  margin-bottom: 20px;
  width: 100%;
  flex-direction: row;
`;

SizeLabel.Item = styled.View`
  width: ${window / 6};
  height: 35px;
  border: 1px ${props => (props.selected ? theme.pointColor : theme.grayColor)}
    solid;
  margin-right: 10px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.selected ? theme.pointColor : 'white')};
`;

SizeLabel.Text = styled.Text`
  color: ${props => (!props.selected ? theme.dimGray : 'white')};
  font-size: 14px;
`;

export const SizeGraph = styled.View`
  width: 100%;
  margin-bottom: 15px;
`;

SizeGraph.Label = styled.Text`
  color: ${theme.pointColor};
  margin-bottom: 10px;
`;

SizeGraph.BarWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

SizeGraph.BarUser = styled.View`
  width: ${props => (props.main ? '100%' : `${props.value}%`)};
  height: 5px;
  background-color: ${theme.pointColor};
  margin-bottom: 5px;
  border-radius: 2px;
`;

SizeGraph.BarSize = styled.View`
  width: ${props => (props.main ? '100%' : `${props.value}%`)};
  height: 5px;
  background-color: ${theme.grayColor};
  margin-bottom: 5px;
  border-radius: 2px;
`;

SizeGraph.LegendWrapper = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;

SizeGraph.Legend = styled.View`
  margin-right: 20px;
  flex-direction: row;
  align-items: center;
`;

SizeGraph.LegendDot = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  margin-right: 10px;
  background-color: ${props =>
    !props.item ? theme.pointColor : theme.darkGray};
`;

SizeGraph.LegendText = styled.Text`
  color: ${props => (!props.item ? theme.pointColor : theme.darkGray)};
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

export const Footer = styled.View`
  position: absolute;
  bottom: 0px;
  left: 10px;
  right: 10px;
  height: 50px;
  width: ${window - 20};
  background-color: ${theme.pointColor};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

Footer.Button = styled(Button)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

Footer.Text = styled.Text`
  color: white;
`;
