import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import {
  Wrapper,
  ProfileWrapper,
  InfoWrapper,
  SizeCardName,
  ShadowBox,
} from './styles';
import { theme } from '../../../constants';
import { renderIconImage } from '../../../utils/renderSizeCard';

const SelectedSizeCard = ({ sizeCard, empty, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <ShadowBox empty={empty}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={
          empty
            ? [theme.whiteColor, theme.whiteColor]
            : [theme.pointColor, theme.pointColor]
        }
        style={{
          borderRadius: 15,
          height: 45,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 1,
          // opacity: 0.9,
        }}
      >
        <Wrapper>
          <InfoWrapper>
            <ProfileWrapper
              color={empty ? theme.grayColor : sizeCard.get('card_color')}
            >
              <Icon
                name={renderIconImage({ empty, sizeCard })}
                type="antdesign"
                size={15}
                color="white"
              />
            </ProfileWrapper>
            <SizeCardName empty={empty}>{sizeCard.get('name')}</SizeCardName>
          </InfoWrapper>
          <Icon
            name="arrow-right"
            type="simple-line-icon"
            size={15}
            color={theme.grayColor}
          />
        </Wrapper>
      </LinearGradient>
    </ShadowBox>
  </TouchableWithoutFeedback>
);

SelectedSizeCard.propTypes = {
  sizeCard: PropTypes.object,
  empty: PropTypes.bool,
  onPress: PropTypes.func,
};

export default SelectedSizeCard;
