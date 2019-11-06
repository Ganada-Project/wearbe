import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native-elements';
import {
  Wrapper,
  ImageArea,
  BrandTitle,
  Content,
  ItemArea,
  BrandInfo,
} from './style';
import { theme } from '../../constants';

const event = [
  {
    title: '예술을 이해하기 위한 바른 자세',
    subTitle: '#갤러리룩',
    imgUrl: 'https://s3...',
    outer: [
      {
        id: 0,
        name: '점퍼',
      },
    ],
    top: [],
    bottom: [],
  },
];

const styles = {
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  followText: {
    color: theme.textColor,
    fontSize: 15,
  },
  followedText: {
    color: theme.pointColor,
    fontSize: 15,
  },
};

class BrandBox extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { brand, onPress } = this.props;

    return (
      <Wrapper>
        <Content>
          <BrandInfo>
            <BrandTitle selected={brand.get('selected')}>
              {brand.get('brand_name')}
            </BrandTitle>
            <Button
              title={brand.get('selected') ? '팔로우중' : '팔로우'}
              onPress={onPress}
              type="clear"
              titleStyle={
                brand.get('selected') ? styles.followedText : styles.followText
              }
            />
          </BrandInfo>
          <ItemArea horizontal showsHorizontalScrollIndicator={false}>
            {brand.get('items').map(item => (
              <ImageArea key={`brandBox-itemImage-${item.get('id')}`}>
                <FastImage
                  source={{
                    uri: item.getIn(['image', 0, 'img_url']),
                  }}
                  style={styles.itemImage}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </ImageArea>
            ))}
          </ItemArea>
        </Content>
      </Wrapper>
    );
  }
}

BrandBox.propTypes = {
  brand: PropTypes.object,
  onPress: PropTypes.func,
};

export default BrandBox;
