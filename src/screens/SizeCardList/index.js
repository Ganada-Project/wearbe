import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { List } from 'immutable';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import {
  useNavigationComponentDidAppear,
  useNavigationButtonPress,
} from 'react-native-navigation-hooks/dist';
import { Wrapper, Header, HeadderText, SubText, Body } from './styles';
import SizeCard from './SizeCard';
import { theme } from '../../constants';

const SizeCardList = ({
  componentId,
  sizeCards,
  selectedSizeCard,
  setSizeCard,
  user,
}) => {
  // const dispatch = useDispatch();
  // const defaultState = useSelector(state => state.get('global'));
  useNavigationComponentDidAppear(() => {});

  const closeModal = () => {
    Navigation.dismissModal(componentId);
  };

  useNavigationButtonPress(
    () => {
      Navigation.dismissModal(componentId);
    },
    componentId,
    'cancel',
  );

  const navigateToSizeCardDetail = () => {};

  return (
    <Wrapper>
      <Header>
        <View>
          <HeadderText>사이즈 카드</HeadderText>
          <SubText>{`총 ${sizeCards.size}개의 사이즈카드`}</SubText>
        </View>
      </Header>
      <Body showsVerticalScrollIndicator={false}>
        {sizeCards.map(sizeCard => (
          <SizeCard
            key={sizeCard.id}
            sizeCard={sizeCard}
            isMe={user.get('id') === sizeCard.user_id}
            isSelected={selectedSizeCard.get('id') === sizeCard.id}
            selectedSizeCard={selectedSizeCard}
            onPressCard={() =>
              navigateToSizeCardDetail({
                sizeCard,
              })
            }
            onPressSelectCard={() =>
              setSizeCard({ sizeCard, cId: componentId })
            }
          />
        ))}
      </Body>
    </Wrapper>
  );
};

SizeCardList.options = {
  topBar: {
    noBorder: true,
    background: {
      color: theme.backgroundColor,
    },
    leftButtons: [
      {
        id: 'cancel',
        text: '취소',
      },
    ],
  },
};

SizeCardList.propTypes = {
  componentId: PropTypes.string,
  sizeCards: PropTypes.instanceOf(List),
  selectedSizeCard: PropTypes.instanceOf(Object),
  setSizeCard: PropTypes.func,
  user: PropTypes.instanceOf(Object),
};

export default SizeCardList;
