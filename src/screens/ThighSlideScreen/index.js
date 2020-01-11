/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanResponder, Animated } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Icon } from 'react-native-elements';
import { StepHeader } from '../../components';
import {
  Container,
  ImageContainer,
  Slider,
  GuideImage,
  HelpWrapper,
  SliderLabel,
  SliderlabelText,
  SliderBar,
  LeftThighGuideWrapper,
  RightThighGuideWrapper,
  PartGuideImage,
  StepHeadrWrapper,
} from './styles';
import {
  LEFT_THIGH_OFFSET,
  RIGHT_THIGH_OFFSET,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  SLIDER_SCALE,
  sampleImg,
} from './constants';
import { theme, BaseHeightOffset } from '../../constants';

export class ThighSlideScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '허벅지',
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
      leftThighOffset: {
        x: LEFT_THIGH_OFFSET.x,
        y: LEFT_THIGH_OFFSET.y,
      },
      rightThighOffset: {
        x: RIGHT_THIGH_OFFSET.x,
        y: RIGHT_THIGH_OFFSET.y,
      },
    };
    Navigation.events().bindComponent(this);
    // 머리
    this.leftThighPan = new Animated.ValueXY();
    this.leftThighOpacity = new Animated.Value(0.5);
    // 발
    this.rightThighPan = new Animated.ValueXY();
    this.rightThighOpacity = new Animated.Value(0.5);

    // 돋보기 투명도
    this.leftThighGuideOpacity = new Animated.Value(0);
    this.rightThighGuideOpacity = new Animated.Value(0);

    // 가이드 투명도
    this.guideOpacity = new Animated.Value(0);
    const {
      leftThighGuideOpacity,
      leftThighOpacity,
      rightThighGuideOpacity,
      rightThighOpacity,
      guideOpacity,
    } = this;
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
    // 왼쪽 허벅지 바깥 슬라이더 이벤트
    this.leftThighPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.leftThighPan.setOffset({
          x: this.leftThighPan.x._value,
        });
        this.leftThighPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.timing(leftThighOpacity, {
            toValue: 1,
          }),
          Animated.timing(leftThighGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'leftThigh', typeText: '왼쪽 허벅지' });
      },
      onPanResponderMove: this.onDraggingHead(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        this.leftThighPan.flattenOffset();
        Animated.parallel([
          Animated.timing(leftThighOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(leftThighGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          leftThighOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 오른쪽 허벅지 바깥 슬라이더 이벤트
    this.rightThighPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.rightThighPan.setOffset({
          x: this.rightThighPan.x._value,
        });
        this.rightThighPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.timing(rightThighOpacity, {
            toValue: 1,
          }),
          Animated.timing(rightThighGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'right', typeText: '오른쪽 허벅지' });
      },
      onPanResponderMove: this.onDraggingFoot(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        this.rightThighPan.flattenOffset();
        Animated.parallel([
          Animated.timing(rightThighOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(rightThighGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          rightThighOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
  }

  onDraggingHead = () => {
    const { leftThighPan } = this;
    return Animated.event([null, { dx: leftThighPan.x }]);
  };

  onDraggingFoot = () => {
    const { rightThighPan } = this;
    return Animated.event([null, { dx: rightThighPan.x }]);
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'next') {
      const {
        componentId,
        base64,
        height,
        weight,
        headOffsetY,
        footOffsetY,
        bellyOffsetX,
        isMe,
        shoulderOffsetY,
        pelvisOffsetY,
        wristOffsetY,
        crotchOffsetY,
        ankleOffsetY,
        leftShulderOffsetX,
        leftChestOffsetX,
        rightShulderOffsetX,
        rightChestOffsetX,
        leftWaistOffsetX,
        leftPelvisOffsetX,
        rightWaistOffsetX,
        rightPelvisOffsetX,
      } = this.props;
      const { leftThighOffset, rightThighOffset } = this.state;

      Navigation.push(componentId, {
        component: {
          name: 'wearbe.sizeCardInfo',
          passProps: {
            height,
            weight,
            base64,
            headOffsetY,
            footOffsetY,
            bellyOffsetX,
            shoulderOffsetY,
            pelvisOffsetY,
            wristOffsetY,
            crotchOffsetY,
            ankleOffsetY,
            leftShulderOffsetX,
            leftChestOffsetX,
            rightShulderOffsetX,
            rightChestOffsetX,
            leftWaistOffsetX,
            leftPelvisOffsetX,
            rightWaistOffsetX,
            rightPelvisOffsetX,
            isMe,
            leftThighOffsetX: leftThighOffset.x,
            rightThighOffsetX: rightThighOffset.x,
          },
        },
      });
    }
  }

  render() {
    // 각 슬라이더에 따라 돋보기 오프셋 설정
    // this.adjustMagnifierOffset();
    const {
      leftThighPan,
      rightThighPan,
      // footScale,
      // reverseXValue,
      // reverseYValue,
      leftThighOpacity,
      rightThighOpacity,
      leftThighGuideOpacity,
      rightThighGuideOpacity,
    } = this;

    const { base64 } = this.props;
    const { typeText } = this.state;

    const leftThighSlide = {
      transform: [{ translateX: leftThighPan.x }],
      left: LEFT_THIGH_OFFSET.x,
      opacity: leftThighOpacity,
    };

    const rightThighSlide = {
      transform: [{ translateX: rightThighPan.x }],
      left: RIGHT_THIGH_OFFSET.x,
      opacity: rightThighOpacity,
    };

    const guideOpacity = {
      opacity: this.guideOpacity,
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
            resizeMode: 'contain',
          }}
          source={{
            uri: `data:image/gif;base64,${base64}`,
            // uri:
            //   'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80',
          }}
        >
          <StepHeader position={4} />
          <Slider
            style={leftThighSlide}
            {...this.leftThighPanResponder.panHandlers}
          >
            <SliderBar>
              <SliderLabel
                style={{
                  left: -74,
                  top: BaseHeightOffset.foot - BaseHeightOffset.head,
                  transform: [{ rotate: '-90deg' }],
                }}
              >
                <SliderlabelText>왼쪽 허벅지 바깥</SliderlabelText>
              </SliderLabel>
              <LeftThighGuideWrapper style={{ opacity: leftThighGuideOpacity }}>
                <PartGuideImage
                  source={require('./images/leftThighGuide.png')}
                />
              </LeftThighGuideWrapper>
            </SliderBar>
          </Slider>
          <Slider
            style={rightThighSlide}
            {...this.rightThighPanResponder.panHandlers}
          >
            <SliderBar>
              <SliderLabel
                style={{
                  left: -44,
                  top: BaseHeightOffset.foot - BaseHeightOffset.head,
                  transform: [{ rotate: '90deg' }],
                }}
              >
                <SliderlabelText>오른쪽 허벅지 바깥</SliderlabelText>
              </SliderLabel>
              <RightThighGuideWrapper
                style={{ opacity: rightThighGuideOpacity }}
              >
                <PartGuideImage
                  source={require('./images/rightThighGuide.png')}
                />
              </RightThighGuideWrapper>
            </SliderBar>
          </Slider>
        </ImageContainer>
        {/* <HelpWrapper {...this.guideResponder.panHandlers}>
          <Icon name="question" type="font-awesome" color="#ffffff" size={25} />
        </HelpWrapper>
        <GuideImage
          source={require('./images/shulderArmGuide.png')}
          style={guideOpacity}
        /> */}
      </Container>
    );
  }
}

ThighSlideScreen.propTypes = {
  base64: PropTypes.string,
  componentId: PropTypes.string,
  isMe: PropTypes.bool,
  height: PropTypes.string,
  weight: PropTypes.string,
  headOffsetY: PropTypes.number,
  footOffsetY: PropTypes.number,
  bellyOffsetX: PropTypes.number,
  shoulderOffsetY: PropTypes.number,
  wristOffsetY: PropTypes.number,
  crotchOffsetY: PropTypes.number,
  pelvisOffsetY: PropTypes.number,
  ankleOffsetY: PropTypes.number,
  leftShulderOffsetX: PropTypes.number,
  leftChestOffsetX: PropTypes.number,
  leftWaistOffsetX: PropTypes.number,
  leftPelvisOffsetX: PropTypes.number,
  rightShulderOffsetX: PropTypes.number,
  rightChestOffsetX: PropTypes.number,
  rightWaistOffsetX: PropTypes.number,
  rightPelvisOffsetX: PropTypes.number,
};

ThighSlideScreen.defaultProps = {
  base64: sampleImg,
};

export default ThighSlideScreen;
