import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Animated,
  View,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Icon } from 'react-native-elements';
import MasonryList from 'react-native-masonry-list';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import { Navigation } from 'react-native-navigation';
import NumberFormat from 'react-number-format';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {
  Wrapper,
  Header,
  Body,
  InitialText,
  SelectedSizeCardWrapper,
  NavItem,
  ItemInfo,
  InitialWrapper,
} from './styles';
import SelectedSizeCard from './SelectedSizeCard';
import InitialImage from './Images/initial.png';
import { theme } from '../../constants';
import {
  getSizeCardRequestAction,
  setSizeCardRequestAction,
} from '../../actions/homeActions';
import { BarLoading } from '../../components';
import { alertSetSizeCard } from './utils/alert';
import { SizeCardAlert } from './SizeCardAlert';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const MasonryCustomComponent = ({ data, style, onPress }) => (
  <TouchableWithoutFeedback onPress={() => onPress(data)}>
    <FastImage
      resizeMode="cover"
      source={{ uri: data.uri }}
      style={{
        width: style.width,
        height: style.height,
        margin: style.margin,
        borderRadius: 15,
      }}
    />
  </TouchableWithoutFeedback>
);

MasonryCustomComponent.propTypes = {
  data: PropTypes.object,
  style: PropTypes.object,
  onPress: PropTypes.func,
};

const HomeScreen = ({ componentId }) => {
  const dispatch = useDispatch();
  const global = useSelector(state => state.get('global'));
  const userData = global.get('userData');
  const homeState = useSelector(state => state.get('home'));
  const sizeCards = homeState.get('sizeCards');
  const sizeDetail = homeState.get('sizeDetail');
  const sizeCardsLoading = homeState.get('sizeCardsLoading');
  const selectedSizeCard = homeState.get('selectedSizeCard');
  const items = homeState.get('items');
  const itemsLoading = homeState.get('itemsLoading');
  const empty = sizeCards.size === 0;

  const [sizeCardAlertTop] = useState(new Animated.Value(-20));
  const [sizeCardAlertOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    dispatch(getSizeCardRequestAction());
  }, []);

  useEffect(() => {
    if (selectedSizeCard.get('id')) {
      alertSizeCardChanged();
    }
  }, [selectedSizeCard]);
  useNavigationComponentDidAppear(() => {});

  const setSizeCard = ({ sizeCard, cId }) => {
    dispatch(setSizeCardRequestAction({ sizeCard, cId }));
  };

  const navigateToSizeCardList = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'wearbe.sizeCardList',
              passProps: {
                selectedSizeCard,
                sizeCards,
                user: userData,
                setSizeCard,
              },
            },
          },
        ],
      },
    });
  };

  const navigateToPoseInfo = () => {
    Navigation.push(componentId, {
      component: {
        name: 'wearbe.bodySize',
        options: {
          topBar: {
            title: {
              text: '기본정보',
            },
          },
        },
        passProps: {},
      },
    });
  };

  const navigateToProfile = () => {
    Navigation.push(componentId, {
      component: {
        name: 'wearbe.profile',
        options: {
          topBar: {
            title: {
              text: '프로필',
            },
          },
        },
        passProps: {},
      },
    });
  };

  const onPressSelectedSizeCard = () => {
    if (sizeCards.size === 0) {
      navigateToPoseInfo();
    } else {
      navigateToSizeCardList();
    }
  };

  const onPressItem = item => {
    Navigation.push(componentId, {
      component: {
        name: 'wearbe.itemDetail',
        passProps: {
          itemDetail: item,
          sizeDetail,
        },
      },
    });
  };

  const alertSizeCardChanged = () => {
    ReactNativeHapticFeedback.trigger('impactMedium', options);
    alertSetSizeCard({ sizeCardAlertOpacity, sizeCardAlertTop });
  };

  const renderBody = () => {
    if (sizeCardsLoading || itemsLoading) {
      return (
        <InitialWrapper>
          <BarLoading size={30}></BarLoading>
        </InitialWrapper>
      );
    }
    if (empty)
      return (
        <InitialWrapper>
          <FastImage
            source={InitialImage}
            style={{ width: '100%', height: 270 }}
            resizeMode="contain"
          />
          <InitialText>사이즈 카드가 아직 없어요.</InitialText>
          <InitialText>신체치수를 측정해서 </InitialText>
          <InitialText>편리한 쇼핑을 즐겨보세요</InitialText>
        </InitialWrapper>
      );
    return (
      <Body>
        <SizeCardAlert
          sizeCardAlertOpacity={sizeCardAlertOpacity}
          sizeCardAlertTop={sizeCardAlertTop}
        />

        <MasonryList
          images={items.toJS()}
          columns={2}
          spacing={3}
          completeCustomComponent={item => (
            <MasonryCustomComponent onPress={onPressItem} {...item} /> // eslint-disable-line
          )}
          onPressImage={onPressItem}
          imageContainerStyle={{ borderRadius: 20 }}
          masonryFlatListColProps={{ showsVerticalScrollIndicator: false }}
          renderIndividualFooter={data => (
            <TouchableWithoutFeedback
            // onPress={() => Linking.openURL('https://luehangs.site')}
            >
              <ItemInfo>
                <ItemInfo.Maker>{data.maker}</ItemInfo.Maker>
                <NumberFormat
                  value={data.price}
                  thousandSeparator
                  prefix="₩"
                  displayType="text"
                  renderText={value => <ItemInfo.Price>{value}</ItemInfo.Price>}
                ></NumberFormat>
              </ItemInfo>
            </TouchableWithoutFeedback>
          )}
        />
      </Body>
    );
  };

  return (
    <Wrapper>
      <StatusBar barStyle="dark-content"></StatusBar>
      <Header>
        <SelectedSizeCardWrapper>
          <SelectedSizeCard
            sizeCard={selectedSizeCard}
            empty={empty}
            onPress={onPressSelectedSizeCard}
          />
        </SelectedSizeCardWrapper>
        <NavItem.Wrapper>
          <NavItem onPress={navigateToPoseInfo}>
            <Icon
              type="octicons"
              name="search"
              color={theme.textColor}
              size={20}
            />
          </NavItem>
          <NavItem onPress={navigateToProfile}>
            <Icon
              type="simple-line-icon"
              name="settings"
              color={theme.textColor}
              size={20}
            />
          </NavItem>
        </NavItem.Wrapper>
      </Header>
      {renderBody()}
    </Wrapper>
  );
};

HomeScreen.options = {
  topBar: {
    visible: false,
    drawBehind: true,
  },
};

HomeScreen.propTypes = {
  componentId: PropTypes.string,
};

export default HomeScreen;
