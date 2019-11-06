import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { Wrapper, BrandText, ImageArea } from './styles';

class BrandTile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { brand } = this.props;
    return (
      <Wrapper>
        <ImageArea>
          <FastImage
            source={{
              uri: 'https://unsplash.it/400/400?image=1',
              priority: FastImage.priority.normal,
            }}
            style={{ width: '100%', height: '100%', borderRadius: 20 }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </ImageArea>
        <BrandText>{brand.brand_name}</BrandText>
      </Wrapper>
    );
  }
}

BrandTile.propTypes = {
  brand: PropTypes.object,
};

export default BrandTile;
