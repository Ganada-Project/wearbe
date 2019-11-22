import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import { Dimensions, TouchableWithoutFeedback } from 'react-native';
import { List } from 'immutable';
import {
  Wrapper,
  Header,
  Body,
  HeaderText,
  SubText,
  CarouselWrapper,
  SizeChartWrapper,
  SizeLabelWrapper,
  SizeLabel,
  SizeGraph,
} from './styles';
import { theme } from '../../constants';
import { getSizeGraphData } from '../../utils/parseSize';
const win = Dimensions.get('window');

const renderItem = ({ item, index }) => (
  <CarouselWrapper>
    <FastImage
      source={{ uri: item.uri }}
      resizeMode={FastImage.resizeMode.cover}
      style={{
        width: '100%',
        height: 270,
        borderRadius: 20,
      }}
    ></FastImage>
  </CarouselWrapper>
);

renderItem.propTypes = {
  item: PropTypes.object,
};

const ItemDetailScreen = ({ componentId, itemDetail, sizeDetail }) => {
  // const dispatch = useDispatch();
  // const defaultState = useSelector(state => state.get('global'));
  useNavigationComponentDidAppear(() => {});
  const [selectedSize, setSelectedSize] = useState(0);
  const mainImg = [{ uri: itemDetail.main_img }];
  const otherImages = itemDetail.other_imgs.map(x => ({
    uri: x,
  }));
  const itemImages = [...mainImg, ...otherImages];
  const filtered = itemImages.filter(x => x.uri !== null);
  const { sizeLabel, sizeContent } = getSizeGraphData(
    itemDetail,
    sizeDetail.toJS(),
  );
  console.log(sizeLabel);

  console.log(sizeContent);

  const onClickLabel = id => {
    setSelectedSize(id);
  };

  return (
    <Wrapper>
      <Header>
        <HeaderText>{itemDetail.maker}</HeaderText>
        <SubText>{itemDetail.name}</SubText>
      </Header>
      <Body>
        <Carousel
          activeSlideAlignment="start"
          data={filtered}
          inactiveSlideScale={1}
          renderItem={renderItem}
          hasParallaxImages
          slideStyle={{ marginRight: 15 }}
          // loopClonesPerSide={2}
          sliderWidth={win.width}
          itemWidth={win.width - 100}
        />
      </Body>
      <SizeChartWrapper>
        <SizeLabel>
          {sizeLabel.map(label => (
            <TouchableWithoutFeedback
              key={`sizeLabel-${label.id}`}
              onPress={() => onClickLabel(label.id)}
            >
              <SizeLabel.Item selected={selectedSize === label.id}>
                <SizeLabel.Text selected={selectedSize === label.id}>
                  {label.name}
                </SizeLabel.Text>
              </SizeLabel.Item>
            </TouchableWithoutFeedback>
          ))}
        </SizeLabel>
        {sizeContent
          .filter(x => x.id === selectedSize)
          .map(content => (
            <SizeGraph>
              <SizeGraph.Label>{content.name}</SizeGraph.Label>
              <SizeGraph.BarWrapper>
                <SizeGraph.BarUser
                  main={content.userSize > content.size}
                  value={
                    content.userSize >= content.size
                      ? '100%'
                      : Math.round((content.userSize * 100) / content.size)
                  }
                ></SizeGraph.BarUser>
                <SizeGraph.BarSize
                  main={content.userSize < content.size}
                  value={
                    content.userSize < content.size
                      ? '100%'
                      : Math.round((content.size * 100) / content.userSize)
                  }
                ></SizeGraph.BarSize>
              </SizeGraph.BarWrapper>
            </SizeGraph>
          ))}
      </SizeChartWrapper>
    </Wrapper>
  );
};

ItemDetailScreen.options = {
  topBar: {
    noBorder: true,
    background: {
      color: theme.backgroundColor,
    },
  },
};

ItemDetailScreen.propTypes = {
  componentId: PropTypes.string,
  itemDetail: PropTypes.object,
  sizeDetail: PropTypes.instanceOf(List),
};

export default ItemDetailScreen;
