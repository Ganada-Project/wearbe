import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Icon } from 'react-native-elements';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import {
  Wrapper,
  Header,
  Body,
  InitialText,
  SelectedSizeCardWrapper,
  NavItem,
} from './styles';
import SelectedSizeCard from './SelectedSizeCard';
import InitialImage from './Images/initial.png';
import { theme } from '../../constants';
import { getSizeCardRequestAction } from '../../actions/homeActions';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const [sizeCardPosition, setSizeCardPostion] = useState(
    new Animated.Value(-20),
  );

  useNavigationComponentDidAppear(() => {
    dispatch(getSizeCardRequestAction());
  });

  const homeState = useSelector(state => state.get('home'));
  const selectedSizeCard = homeState.get('selectedSizeCard');

  return (
    <Wrapper>
      <Header>
        <SelectedSizeCardWrapper>
          <SelectedSizeCard sizeCard={selectedSizeCard} empty />
        </SelectedSizeCardWrapper>
        <NavItem.Wrapper>
          <NavItem>
            <Icon
              type="octicons"
              name="search"
              color={theme.textColor}
              size={20}
            />
          </NavItem>
        </NavItem.Wrapper>
      </Header>
      <Body>
        <>
          <FastImage
            source={InitialImage}
            style={{ width: '100%', height: 270 }}
            resizeMode="contain"
          />
          <InitialText>사이즈 카드가 아직 없어요.</InitialText>
          <InitialText>신체치수를 측정해서 </InitialText>
          <InitialText>편리한 쇼핑을 즐겨보세요</InitialText>
        </>
      </Body>
    </Wrapper>
  );
};

HomeScreen.options = {
  topBar: {
    visible: false,
    drawBehind: true,
  },
};

export default HomeScreen;
