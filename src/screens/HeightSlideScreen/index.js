/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanResponder, Animated, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import FastImage from 'react-native-fast-image';
import { Icon } from 'react-native-elements';
import { StepHeader } from '../../components';
import {
  Container,
  ImageContainer,
  MagnifierContainer,
  Slider,
  MagnifierImage,
  MagifierCross,
  MagnifierWrapper,
  MagnifierText,
  HelpWrapper,
  GuideImage,
  Sliderlabel,
  SliderlabelText,
  SliderBar,
  HeadGuideWrapper,
  FootGuideWrapper,
  PartGuideImage,
  BellySlider,
  BellySliderBar,
  BellyLabel,
  StepHeadrWrapper,
  BellyGuideWrapper,
} from './styles';
import { outputX, outputY, distanceBetween2Offset } from './utils/calculate';
import {
  HEAD_OFFSET,
  FOOT_OFFSET,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  SLIDER_SCALE,
  sampleImg,
  BELLY_OFFSET,
} from './constants';
import { theme, BaseHeightOffset } from '../../constants';

export class HeightSlideScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '신장',
          color: theme.pointColor,
        },
        noBorder: true,
        rightButtons: [
          {
            id: 'next',
            text: '다음',
          },
        ],
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      typeText: '',
      headOffset: {
        x: HEAD_OFFSET.x,
        y: HEAD_OFFSET.y,
      },
      footOffset: {
        x: FOOT_OFFSET.x,
        y: FOOT_OFFSET.y,
      },
      bellyOffset: {
        x: BELLY_OFFSET.x,
        y: 0,
      },
      headPan: new Animated.ValueXY(),
      headOpacity: new Animated.Value(0.8),
      headGuideOpacity: new Animated.Value(0),

      // 발
      footPan: new Animated.ValueXY(),
      footOpacity: new Animated.Value(0.8),
      // 배꼽
      bellyPan: new Animated.ValueXY(),
      bellyOpacity: new Animated.Value(0.8),

      footGuideOpacity: new Animated.Value(0),
      bellyGuideOpacity: new Animated.Value(0),
      // 가이드 투명도
      guideOpacity: new Animated.Value(0),
    };
    Navigation.events().bindComponent(this);

    const {
      headOpacity,
      headGuideOpacity,
      headPan,
      footGuideOpacity,
      footOpacity,
      footPan,
      bellyOpacity,
      bellyGuideOpacity,
      bellyPan,
      guideOpacity,
    } = this.state;
    // 가이드 버튼
    this.guideResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        Animated.timing(guideOpacity, {
          toValue: 0.8,
        }).start();
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: () => {
        Animated.timing(guideOpacity, {
          toValue: 0,
        }).start();
      },
      onPanResponderTerminate: () => {
        Animated.timing(guideOpacity, {
          toValue: 0,
        }).start();
      },
      onShouldBlockNativeResponder: () => true,
    });
    // 머리 슬라이더 이벤트
    this.headPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        console.log('grant');
        headPan.setOffset({
          // x: headPan.x._value,
          y: headPan.y._value,
        });
        headPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.timing(headOpacity, {
            toValue: 1,
          }),
          Animated.timing(headGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'head', typeText: '정수리' });
      },
      onPanResponderMove: this.onDraggingHead(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        headPan.flattenOffset();
        Animated.parallel([
          Animated.timing(headOpacity, {
            toValue: 0.8,
          }),
          Animated.timing(headGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          headOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 발 슬라이더 이벤트
    this.footPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        footPan.setOffset({
          // x: footPan.x._value,
          y: footPan.y._value,
        });
        footPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.timing(footOpacity, {
            toValue: 1,
          }),
          Animated.timing(footGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'foot', typeText: '발 뒤꿈치' });
      },
      onPanResponderMove: this.onDraggingFoot(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        footPan.flattenOffset();
        Animated.parallel([
          Animated.timing(footOpacity, {
            toValue: 0.8,
          }),
          Animated.timing(footGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          footOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });

    // 배꼽 슬라이더 이벤트
    this.bellyPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        bellyPan.setOffset({
          x: bellyPan.x._value,
          // y: bellyPan.y._value,
        });
        Animated.parallel([
          Animated.timing(bellyOpacity, {
            toValue: 1,
          }),
          Animated.timing(bellyGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        bellyPan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: this.onDraggingBelly(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        bellyPan.flattenOffset();
        Animated.parallel([
          Animated.timing(bellyOpacity, {
            toValue: 0.8,
          }),
          Animated.timing(bellyGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          bellyOffset: {
            x: event.nativeEvent.pageX,
            // y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
  }

  onDraggingHead = () => {
    console.log('dragging');
    const { headPan } = this.state;
    return Animated.event([null, { dy: headPan.y }]);
  };

  onDraggingFoot = () => {
    const { footPan } = this.state;
    return Animated.event([null, { dy: footPan.y }]);
  };

  onDraggingBelly = () => {
    const { bellyPan } = this.state;
    return Animated.event([null, { dx: bellyPan.x }]);
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'next') {
      const { componentId, base64, height, weight, isMe } = this.props;
      const { headOffset, footOffset, bellyOffset } = this.state;
      Navigation.push(componentId, {
        component: {
          name: 'wearbe.partialHeightSlide',
          passProps: {
            height,
            weight,
            base64,
            headOffsetY: headOffset.y,
            footOffsetY: footOffset.y,
            bellyOffsetX: bellyOffset.x,
            isMe,
          },
        },
      });
    }
  }

  render() {
    // 각 슬라이더에 따라 돋보기 오프셋 설정
    // this.adjustMagnifierOffset();
    const {
      footPan,
      bellyPan,
      headPan,
      headOpacity,
      headGuideOpacity,
      footOpacity,
      bellyOpacity,
      footGuideOpacity,
      bellyGuideOpacity,
    } = this.state;

    const { base64 } = this.props;
    const { typeText } = this.state;

    const headSlide = {
      transform: [
        // { translateX: headPan.x },
        { translateY: headPan.y },
      ],
      top: HEAD_OFFSET.y - 14,
      opacity: headOpacity,

      // left: HEAD_OFFSET.x,
    };

    console.log(headSlide);

    const footSlide = {
      transform: [
        // { translateX: footPan.x },
        { translateY: footPan.y },
        // { scale: footScale },
      ],
      top: FOOT_OFFSET.y - 15,
      // left: FOOT_OFFSET.x,
      opacity: footOpacity,
    };

    const bellySlide = {
      transform: [{ translateX: bellyPan.x }],
      left: BELLY_OFFSET.x,
      opacity: bellyOpacity,
      // top: 0,
    };

    const guideOpacity = {
      opacity: this.state.guideOpacity,
    };

    // const magnifierImageStyle = {
    //   top: reverseYValue,
    //   left: reverseXValue,
    //   resizeMode: 'cover',
    //   borderWidth: 1,
    // };

    return (
      <Container>
        <ImageContainer
          imageStyle={{
            resizeMode: 'cover',
            opacity: 0.7,
          }}
          source={{
            uri: `data:image/gif;base64,${base64}`,
            // uri:
            //   'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80',
          }}
        >
          <StepHeader position={0} />
          <Slider style={headSlide} {...this.headPanResponder.panHandlers}>
            <SliderBar>
              <Icon
                type="antdesign"
                name="caretup"
                size={13}
                color={theme.guideColor}
                iconStyle={{ position: 'absolute', top: -14, left: 10 }}
              />
              <Icon
                type="antdesign"
                name="caretdown"
                size={13}
                color={theme.guideColor}
                iconStyle={{ position: 'absolute', top: 3, left: 10 }}
              />
              <Sliderlabel>
                <SliderlabelText>정수리</SliderlabelText>
              </Sliderlabel>
              <HeadGuideWrapper style={{ opacity: headGuideOpacity }}>
                <PartGuideImage source={require('./images/headGuide.png')} />
              </HeadGuideWrapper>
            </SliderBar>
          </Slider>
          <Slider style={footSlide} {...this.footPanResponder.panHandlers}>
            <SliderBar>
              <Icon
                type="antdesign"
                name="caretup"
                size={13}
                color={theme.guideColor}
                iconStyle={{ position: 'absolute', top: -14, left: 10 }}
              />
              <Icon
                type="antdesign"
                name="caretdown"
                size={13}
                color={theme.guideColor}
                iconStyle={{ position: 'absolute', top: 3, left: 10 }}
              />
              <Sliderlabel>
                <SliderlabelText>발 끝</SliderlabelText>
              </Sliderlabel>
              <FootGuideWrapper style={{ opacity: footGuideOpacity }}>
                <PartGuideImage source={require('./images/footGuide.png')} />
              </FootGuideWrapper>
            </SliderBar>
          </Slider>
          <BellySlider
            style={bellySlide}
            {...this.bellyPanResponder.panHandlers}
          >
            <BellySliderBar>
              <BellyLabel
                style={{
                  left: -54,
                  top: BaseHeightOffset.foot - BaseHeightOffset.head,
                  transform: [{ rotate: '-90deg' }],
                }}
              >
                <SliderlabelText>배꼽</SliderlabelText>
              </BellyLabel>
              <BellyGuideWrapper style={{ opacity: bellyGuideOpacity }}>
                <PartGuideImage source={require('./images/bellyGuide.png')} />
              </BellyGuideWrapper>
            </BellySliderBar>
          </BellySlider>
        </ImageContainer>
        <HelpWrapper {...this.guideResponder.panHandlers}>
          <Icon name="question" type="font-awesome" color="#ffffff" size={25} />
        </HelpWrapper>
        {/* <GuideImage source={require('./images/shulderArmGuide.png')} /> */}
      </Container>
    );
  }
}

HeightSlideScreen.propTypes = {
  base64: PropTypes.string,
  componentId: PropTypes.string,
  height: PropTypes.string,
  weight: PropTypes.string,
  isMe: PropTypes.bool,
};

HeightSlideScreen.defaultProps = {
  base64: sampleImg,
};

export default HeightSlideScreen;
