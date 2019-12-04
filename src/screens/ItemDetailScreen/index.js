import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import { useAnimation } from 'react-native-animation-hooks';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import {
  Dimensions,
  TouchableWithoutFeedback,
  Easing,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { List } from 'immutable';
import NumberFormat from 'react-number-format';
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
  ItemInfoWrapper,
  ItemInfo,
  Footer,
} from './styles';
import { theme } from '../../constants';
import { getSizeGraphData } from '../../utils/parseSize';
const win = Dimensions.get('window');

const renderItem = ({ item, index }, parallaxProps) => (
  <CarouselWrapper>
    <FastImage
      source={{ uri: item.uri }}
      resizeMode={FastImage.resizeMode.cover}
      style={{
        width: '100%',
        height: 260,
        flex: 1,
        borderRadius: 20,
        borderWidth: 0.8,
        borderColor: theme.grayColor,
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

  const navigateToWebView = () => {
    Navigation.push(componentId, {
      component: {
        name: 'wearbe.webView',
        options: {
          topBar: {
            title: {
              text: itemDetail.maker,
            },
          },
        },
        passProps: {
          uri: itemDetail.url,
        },
      },
    });
  };

  const onClickLabel = id => {
    setSelectedSize(id);
  };

  return (
    <Wrapper>
      <StatusBar barStyle="dark-content" />
      <Header>
        <HeaderText>{itemDetail.maker}</HeaderText>
        <SubText>{itemDetail.name}</SubText>
      </Header>
      <Body showsVerticalScrollIndicator={false}>
        <Carousel
          activeSlideAlignment="start"
          data={filtered}
          inactiveSlideScale={1}
          renderItem={renderItem}
          hasParallaxImages
          slideStyle={{ flex: 1, marginRight: 15 }}
          // loopClonesPerSide={2}
          containerCustomStyle={{ flex: 1 }}
          sliderWidth={win.width}
          itemWidth={win.width - 100}
        />
        <ItemInfoWrapper>
          <ItemInfo>
            <ItemInfo.Label>가격</ItemInfo.Label>
            <NumberFormat
              value={itemDetail.price}
              thousandSeparator
              prefix="₩"
              displayType="text"
              renderText={value => <ItemInfo.Text>{value}</ItemInfo.Text>}
            ></NumberFormat>
          </ItemInfo>
          <ItemInfo>
            <ItemInfo.Label>소재</ItemInfo.Label>
            <ItemInfo.Text>{`${itemDetail.material[0].name} ${itemDetail.material[0].value}`}</ItemInfo.Text>
          </ItemInfo>
        </ItemInfoWrapper>
        <SizeChartWrapper>
          <SizeLabel horizontal showsHorizontalScrollIndicator={false}>
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
                    main={content.userSize >= content.size}
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
          <SizeGraph.LegendWrapper>
            <SizeGraph.Legend>
              <SizeGraph.LegendDot></SizeGraph.LegendDot>
              <SizeGraph.LegendText>사이즈 카드 치수</SizeGraph.LegendText>
            </SizeGraph.Legend>
            <SizeGraph.Legend>
              <SizeGraph.LegendDot item></SizeGraph.LegendDot>
              <SizeGraph.LegendText item>아이템 치수</SizeGraph.LegendText>
            </SizeGraph.Legend>
          </SizeGraph.LegendWrapper>
        </SizeChartWrapper>
      </Body>
      <Footer>
        <Footer.Button onPress={navigateToWebView}>
          <Footer.Text>구매하러 가기</Footer.Text>
        </Footer.Button>
      </Footer>
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
