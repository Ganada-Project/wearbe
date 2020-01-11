/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanResponder, Animated } from 'react-native';
import { Navigation } from 'react-native-navigation';
import FastImage from 'react-native-fast-image';
import { Button, Icon } from 'react-native-elements';
import {
  Container,
  ImageContainer,
  Slider,
  HelpWrapper,
  GuideImage,
  SliderBar,
  SliderLabel,
  LabelText,
  RightSliderLabel,
  LeftPelvisGuideWrapper,
  LeftWaistGuideWrapper,
  PartGuideImage,
  RightPelvisGuideWrapper,
  RightWaistGuideWrapper,
} from './styles';
import {
  LEFT_WAIST_OFFSET,
  LEFT_PELVIS_OFFSET,
  SLIDER_SCALE,
  RIGHT_PELVIS_OFFSET,
  RIGHT_WAIST_OFFSET,
} from './constants';
import { theme } from '../../constants';
import { StepHeader } from '../../components';

export class LowerBodySlideScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '하반신 넓이',
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
      type: null,
      typeText: '',
      leftPelvisOffset: {
        x: LEFT_WAIST_OFFSET.x,
        y: LEFT_WAIST_OFFSET.y,
      },
      leftWaistOffset: {
        x: LEFT_PELVIS_OFFSET.x,
        y: LEFT_PELVIS_OFFSET.y,
      },
      rightPelvisOffset: {
        x: RIGHT_PELVIS_OFFSET.x,
        y: RIGHT_PELVIS_OFFSET.y,
      },
      rightWaistOffset: {
        x: RIGHT_WAIST_OFFSET.x,
        y: RIGHT_WAIST_OFFSET.y,
      },
    };
    Navigation.events().bindComponent(this);
    // 왼쪽 골반
    this.leftPelvisPan = new Animated.ValueXY();
    this.leftPelvisOpacity = new Animated.Value(0.5);
    // 왼쪽 허리
    this.leftWaistPan = new Animated.ValueXY();
    this.leftWaistOpacity = new Animated.Value(0.5);
    // 오른쪽 허벅지
    this.rightPelvisPan = new Animated.ValueXY();
    this.rightPelvisOpacity = new Animated.Value(0.5);
    // 오른쪽 발목
    this.rightWaistPan = new Animated.ValueXY();
    this.rightWaistOpacity = new Animated.Value(0.5);

    // 돋보기 투명도
    this.magnifierOpacity = new Animated.Value(0);
    // 가이드 투명도
    this.guideOpacity = new Animated.Value(0);

    this.leftPelvisGuideOpacity = new Animated.Value(0);
    this.leftWaistGuideOpacity = new Animated.Value(0);
    this.rightPelvisGuideOpacity = new Animated.Value(0);
    this.rightWaistGuideOpacity = new Animated.Value(0);

    const {
      leftPelvisOpacity,
      leftWaistOpacity,
      leftPelvisGuideOpacity,
      leftWaistGuideOpacity,
      rightPelvisOpacity,
      rightPelvisGuideOpacity,
      rightWaistGuideOpacity,
      rightWaistOpacity,
      magnifierOpacity,
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
    // 왼쪽 골반 슬라이더 이벤트
    this.leftPelvisPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.leftPelvisPan.setOffset({
          x: this.leftPelvisPan.x._value,
        });
        this.leftPelvisPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.timing(leftPelvisOpacity, {
            toValue: 1,
          }),
          Animated.timing(leftPelvisGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'leftPelvis', typeText: '왼쪽 골반' });
      },
      onPanResponderMove: this.onDraggingLeftPelvis(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        this.leftPelvisPan.flattenOffset();
        Animated.parallel([
          Animated.timing(leftPelvisGuideOpacity, {
            toValue: 0,
          }),
          Animated.timing(leftPelvisOpacity, {
            toValue: 0.5,
          }),
        ]).start();
        this.setState({
          leftPelvisOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 왼쪽 허리 슬라이더 이벤트
    this.leftWaistPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.leftWaistPan.setOffset({
          x: this.leftWaistPan.x._value,
        });
        this.leftWaistPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.timing(leftWaistOpacity, {
            toValue: 1,
          }),
          Animated.timing(leftWaistGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'leftWaist', typeText: '왼쪽 허리' });
      },
      onPanResponderMove: this.onDraggingLeftWaist(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        this.leftWaistPan.flattenOffset();
        Animated.parallel([
          Animated.timing(leftWaistOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(leftWaistGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          leftWaistOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 오른쪽 골반 슬라이더 이벤트
    this.rightPelvisPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.rightPelvisPan.setOffset({
          x: this.rightPelvisPan.x._value,
        });
        this.rightPelvisPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.timing(rightPelvisOpacity, {
            toValue: 1,
          }),
          Animated.timing(rightPelvisGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'rightPelvis', typeText: '오른쪽 골반' });
      },
      onPanResponderMove: this.onDraggingRightPelvis(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        this.rightPelvisPan.flattenOffset();
        Animated.parallel([
          Animated.timing(rightPelvisOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(rightPelvisGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          rightPelvisOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 오른쪽 허리 슬라이더 이벤트
    this.rightWaistPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.rightWaistPan.setOffset({
          x: this.rightWaistPan.x._value,
        });
        this.rightWaistPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.timing(rightWaistOpacity, {
            toValue: 1,
          }),
          Animated.timing(rightWaistGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'rightWaist', typeText: '오른쪽 허리' });
      },
      onPanResponderMove: this.onDraggingRightWaist(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        this.rightWaistPan.flattenOffset();
        Animated.parallel([
          Animated.timing(rightWaistOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(rightWaistGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          rightWaistOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
  }

  onDraggingLeftPelvis = () => {
    const { leftPelvisPan } = this;
    return Animated.event([null, { dx: leftPelvisPan.x, dy: leftPelvisPan.y }]);
  };

  onDraggingLeftWaist = () => {
    const { leftWaistPan } = this;
    return Animated.event([null, { dx: leftWaistPan.x, dy: leftWaistPan.y }]);
  };

  onDraggingRightPelvis = () => {
    const { rightPelvisPan } = this;
    return Animated.event([
      null,
      { dx: rightPelvisPan.x, dy: rightPelvisPan.y },
    ]);
  };

  onDraggingRightWaist = () => {
    const { rightWaistPan } = this;
    return Animated.event([null, { dx: rightWaistPan.x, dy: rightWaistPan.y }]);
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
      } = this.props;
      const {
        leftPelvisOffset,
        leftWaistOffset,
        rightPelvisOffset,
        rightWaistOffset,
      } = this.state;

      Navigation.push(componentId, {
        component: {
          name: 'wearbe.thighSlide',
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
            leftWaistOffsetX: leftWaistOffset.x,
            leftPelvisOffsetX: leftPelvisOffset.x,
            rightWaistOffsetX: rightWaistOffset.x,
            rightPelvisOffsetX: rightPelvisOffset.x,
            isMe,
          },
        },
      });
    }
  }

  render() {
    // 각 슬라이더에 따라 돋보기 오프셋 설정
    const {
      leftPelvisPan,
      leftWaistPan,
      rightPelvisPan,
      rightWaistPan,
      leftPelvisOpacity,
      leftPelvisGuideOpacity,
      leftWaistGuideOpacity,
      leftWaistOpacity,
      rightPelvisOpacity,
      rightPelvisGuideOpacity,
      rightWaistOpacity,
      rightWaistGuideOpacity,
    } = this;

    const { base64 } = this.props;
    const { typeText } = this.state;

    const leftPelvisSlide = {
      transform: [{ translateX: leftPelvisPan.x }],
      left: LEFT_WAIST_OFFSET.x,
      opacity: leftPelvisOpacity,
    };

    const leftWaistSlide = {
      transform: [{ translateX: leftWaistPan.x }],
      left: LEFT_PELVIS_OFFSET.x,
      opacity: leftWaistOpacity,
    };

    const rightPelvisSlide = {
      transform: [{ translateX: rightPelvisPan.x }],
      left: RIGHT_PELVIS_OFFSET.x,
      opacity: rightPelvisOpacity,
    };

    const rightWaistSlide = {
      transform: [{ translateX: rightWaistPan.x }],
      left: RIGHT_WAIST_OFFSET.x,
      opacity: rightWaistOpacity,
    };

    const guideOpacity = {
      opacity: this.guideOpacity,
    };

    return (
      <Container>
        <StepHeader position={3} />
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
          <Slider
            style={leftPelvisSlide}
            {...this.leftPelvisPanResponder.panHandlers}
          >
            <SliderBar>
              <SliderLabel
                isBottom
                style={{ transform: [{ rotate: '-90deg' }] }}
              >
                <LabelText>왼쪽 골반</LabelText>
              </SliderLabel>
              <LeftPelvisGuideWrapper
                style={{ opacity: leftPelvisGuideOpacity }}
              >
                <PartGuideImage
                  source={require('./images/leftPelvisGuide.png')}
                />
              </LeftPelvisGuideWrapper>
            </SliderBar>
          </Slider>
          <Slider
            style={leftWaistSlide}
            {...this.leftWaistPanResponder.panHandlers}
          >
            <SliderBar>
              <SliderLabel style={{ transform: [{ rotate: '-90deg' }] }}>
                <LabelText>왼쪽 허리</LabelText>
              </SliderLabel>
              <LeftWaistGuideWrapper style={{ opacity: leftWaistGuideOpacity }}>
                <PartGuideImage
                  source={require('./images/leftWaistGuide.png')}
                />
              </LeftWaistGuideWrapper>
            </SliderBar>
          </Slider>
          <Slider
            style={rightPelvisSlide}
            {...this.rightPelvisPanResponder.panHandlers}
          >
            <SliderBar>
              <RightSliderLabel
                isBottom
                style={{ transform: [{ rotate: '90deg' }] }}
              >
                <LabelText>오른쪽 골반</LabelText>
              </RightSliderLabel>
              <RightPelvisGuideWrapper
                style={{ opacity: rightPelvisGuideOpacity }}
              >
                <PartGuideImage
                  source={require('./images/rightPelvisGuide.png')}
                />
              </RightPelvisGuideWrapper>
            </SliderBar>
          </Slider>
          <Slider
            style={rightWaistSlide}
            {...this.rightWaistPanResponder.panHandlers}
          >
            <SliderBar>
              <RightSliderLabel style={{ transform: [{ rotate: '90deg' }] }}>
                <LabelText>오른쪽 허리</LabelText>
              </RightSliderLabel>
              <RightWaistGuideWrapper
                style={{ opacity: rightWaistGuideOpacity }}
              >
                <PartGuideImage
                  source={require('./images/rightWaistGuide.png')}
                />
              </RightWaistGuideWrapper>
            </SliderBar>
          </Slider>
        </ImageContainer>
        {/* <HelpWrapper {...this.guideResponder.panHandlers}>
          <Icon name="question" type="font-awesome" color="#ffffff" size={25} />
        </HelpWrapper>
        <GuideImage
          source={require('./images/lowerBodyGuide.png')}
          style={guideOpacity}
        /> */}
      </Container>
    );
  }
}

LowerBodySlideScreen.propTypes = {
  isMe: PropTypes.bool,
  base64: PropTypes.string,
  componentId: PropTypes.string,
  height: PropTypes.string,
  weight: PropTypes.string,
  headOffsetY: PropTypes.number,
  footOffsetY: PropTypes.number,
  bellyOffsetX: PropTypes.number,
  shoulderOffsetY: PropTypes.number,
  pelvisOffsetY: PropTypes.number,
  wristOffsetY: PropTypes.number,
  crotchOffsetY: PropTypes.number,
  ankleOffsetY: PropTypes.number,
  leftShulderOffsetX: PropTypes.number,
  leftChestOffsetX: PropTypes.number,
  rightShulderOffsetX: PropTypes.number,
  rightChestOffsetX: PropTypes.number,
};

export default LowerBodySlideScreen;
