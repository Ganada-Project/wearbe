import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
// moment
import moment from 'moment';
import 'moment/src/locale/ko';

import { fromJS } from 'immutable';
import {
  Wrapper,
  ProfileWrapper,
  ContentWrapper,
  SizeCardName,
  ButtonWrapper,
  ProfileImageBg,
  ButtonInner,
  ButtonText,
  DescWrapper,
  DescText,
  TopWrapper,
  CreatedAt,
  MyCardWrapper,
  MyCardText,
} from './styles';
import { renderIconImage } from '../../../utils/renderSizeCard';
import { theme } from '../../../constants';

const SizeCard = ({ sizeCard, onPressSelectCard, isSelected, onPressCard }) => (
  <TouchableWithoutFeedback onPress={onPressCard}>
    <Wrapper isSelected={isSelected}>
      <ProfileWrapper>
        <ProfileImageBg color={sizeCard.card_color} isSelected={isSelected}>
          <Icon
            name={renderIconImage({ sizeCard: fromJS(sizeCard) })}
            type="antdesign"
            size={16}
            color="white"
          />
        </ProfileImageBg>
      </ProfileWrapper>
      <ContentWrapper>
        <TopWrapper>
          <SizeCardName isSelected={isSelected}>{sizeCard.name}</SizeCardName>
          <DescWrapper>
            <DescText isSelected={isSelected}>{sizeCard.age}</DescText>
            <Icon
              name="dot-single"
              type="entypo"
              color={isSelected ? 'white' : theme.darkGray}
              size={10}
            />
            <DescText isSelected={isSelected}>
              {sizeCard.gender === 1 ? 'M' : 'W '}
            </DescText>
            <Icon
              name="dot-single"
              type="entypo"
              color={isSelected ? 'white' : theme.darkGray}
              size={10}
            />
            <DescText isSelected={isSelected}>{sizeCard.body_shape}</DescText>
          </DescWrapper>
        </TopWrapper>
        <CreatedAt isSelected={isSelected}>1달 전에 생성됨</CreatedAt>
      </ContentWrapper>
      <ButtonWrapper>
        <TouchableOpacity
          style={{ width: '100%' }}
          onPress={isSelected ? null : onPressSelectCard}
        >
          <ButtonInner>
            {sizeCard.mine === 1 ? (
              <MyCardWrapper>
                <MyCardText isSelected={isSelected}>본인</MyCardText>
              </MyCardWrapper>
            ) : null}
          </ButtonInner>
        </TouchableOpacity>
      </ButtonWrapper>
    </Wrapper>
  </TouchableWithoutFeedback>
);

SizeCard.propTypes = {
  sizeCard: PropTypes.object,
  isMe: PropTypes.bool,
  isSelected: PropTypes.bool,
  onPressCard: PropTypes.func,
  onPressSelectCard: PropTypes.func,
};

export default SizeCard;
