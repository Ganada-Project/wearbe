import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { theme, layout } from '../../constants';

export const Wrapper = styled.ScrollView`
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

export const CarouselWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export const SizeChartWrapper = styled.View`
  background-color: white;
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  margin-top: 20px;
`;

export const SizeLabel = styled.View`
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  flex-direction: row;
`;

SizeLabel.Item = styled.View`
  flex: 1;
  height: 40px;
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
