/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanResponder, Animated, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Icon } from 'react-native-elements';
import { StepHeader } from '../../components';
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
  PartGuideImage,
  LeftShoulderGuideWrapper,
  LeftChestGuideWrapper,
  RightShoulderGuideWrapper,
  RightChestGuideWrapper,
} from './styles';
import {
  LEFT_SHULDER_OFFSET,
  LEFT_CHEST_OFFSET,
  RIGHT_SHULDER_OFFSET,
  RIGHT_CHEST_OFFSET,
} from './constants';
import { theme } from '../../constants';

const centerOffset = Dimensions.get('window').width / 2 - 15;

export class UppderBodyWidthSlideScreen extends Component {
  static options() {
    return {
      topBar: {
        title: {
          text: '상반신 넓이',
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
    const { bellyOffsetX } = props;
    this.state = {
      type: null,
      typeText: '',
      leftShulderOffset: {
        x: centerOffset - 100,
        y: LEFT_SHULDER_OFFSET.y,
      },
      leftChestOffset: {
        x: centerOffset - 50,
        y: LEFT_CHEST_OFFSET.y,
      },
      rightShulderOffset: {
        x: centerOffset + 100,
        y: RIGHT_SHULDER_OFFSET.y,
      },
      rightChestOffset: {
        x: centerOffset + 50,
        y: RIGHT_CHEST_OFFSET.y,
      },
    };
    Navigation.events().bindComponent(this);
    // 왼쪽 어깨
    this.leftShulderPan = new Animated.ValueXY();
    this.leftShulderOpacity = new Animated.Value(0.5);
    // this.reverseLeftShulder = new Animated.ValueXY();

    // 왼쪽 가슴
    this.leftChestPan = new Animated.ValueXY();
    this.leftChestOpacity = new Animated.Value(0.5);

    // 오른쪽 어깨
    this.rightShulderPan = new Animated.ValueXY();
    this.rightShulderOpacity = new Animated.Value(0.5);
    // this.reverseRightShulder = new Animated.ValueXY();

    // 오른쪽 가슴
    this.rightChest = new Animated.ValueXY();
    this.rightChestOpacity = new Animated.Value(0.5);

    // 돋보기 투명도
    this.magnifierOpacity = new Animated.Value(0);
    // 가이드 투명도
    this.guideOpacity = new Animated.Value(0);
    this.leftShoulderGuideOpacity = new Animated.Value(0);
    this.leftChestGuideOpacity = new Animated.Value(0);
    this.rightShoulderGuideOpacity = new Animated.Value(0);
    this.rightChestGuideOpacity = new Animated.Value(0);

    const {
      leftShulderOpacity,
      leftShoulderGuideOpacity,
      leftChestOpacity,
      leftChestGuideOpacity,
      rightShoulderGuideOpacity,
      rightChestGuideOpacity,
      rightShulderOpacity,
      rightChestOpacity,
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
    // 왼쪽 어깨 슬라이더 이벤트
    this.leftShulderPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.leftShulderPan.setOffset({
          x: this.leftShulderPan.x._value,
        });
        this.leftShulderPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.timing(leftShulderOpacity, {
            toValue: 1,
          }),
          Animated.timing(rightShulderOpacity, {
            toValue: 1,
          }),
          Animated.timing(leftShoulderGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'leftShulder', typeText: '왼쪽 어깨' });
      },
      onPanResponderMove: this.onDraggingLeftShulder(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event, gestureState) => {
        this.leftShulderPan.flattenOffset();
        Animated.parallel([
          Animated.timing(leftShulderOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(rightShulderOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(leftShoulderGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          leftShulderOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 왼쪽 가슴 슬라이더 이벤트
    this.leftChestPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.leftChestPan.setOffset({
          x: this.leftChestPan.x._value,
        });
        this.leftChestPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.timing(leftChestOpacity, {
            toValue: 1,
          }),
          Animated.timing(rightChestOpacity, {
            toValue: 1,
          }),
          Animated.timing(leftChestGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'leftChest', typeText: '왼쪽 가슴' });
      },
      onPanResponderMove: this.onDraggingLeftChest(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        this.leftChestPan.flattenOffset();
        Animated.parallel([
          Animated.timing(leftChestOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(rightChestOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(leftChestGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          leftChestOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });

    // 오른쪽 어깨 슬라이더 이벤트
    this.rightShulderPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.rightShulderPan.setOffset({
          x: this.rightShulderPan.x._value,
        });
        this.rightShulderPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.timing(leftShulderOpacity, {
            toValue: 1,
          }),
          Animated.timing(rightShulderOpacity, {
            toValue: 1,
          }),
          Animated.timing(rightShoulderGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'rightShulder', typeText: '오른쪽 어깨' });
      },
      onPanResponderMove: this.onDraggingRightShulder(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        this.rightShulderPan.flattenOffset();
        Animated.parallel([
          Animated.timing(rightShulderOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(leftShulderOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(rightShoulderGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          rightShulderOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 오른쪽 가슴
    this.rightChestResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.rightChest.setOffset({
          x: this.rightChest.x._value,
        });
        this.rightChest.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.timing(rightChestOpacity, {
            toValue: 1,
          }),
          Animated.timing(leftChestOpacity, {
            toValue: 1,
          }),
          Animated.timing(rightChestGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'rightChest', typeText: '오른쪽 가슴' });
      },
      onPanResponderMove: this.onDraggingRightChest(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        this.rightChest.flattenOffset();
        Animated.parallel([
          Animated.timing(rightChestOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(leftChestOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(rightChestGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          rightChestOffset: {
            x: event.nativeEvent.pageX,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
  }

  onDraggingLeftShulder = () => {
    const { leftShulderPan } = this;
    return Animated.event([
      null,
      { dx: leftShulderPan.x, dy: leftShulderPan.y },
    ]);
  };

  onDraggingLeftChest = () => {
    const { leftChestPan } = this;
    return Animated.event([null, { dx: leftChestPan.x, dy: leftChestPan.y }]);
  };

  onDraggingRightShulder = () => {
    const { rightShulderPan } = this;
    return Animated.event([
      null,
      { dx: rightShulderPan.x, dy: rightShulderPan.y },
    ]);
  };

  onDraggingRightChest = () => {
    const { rightChest } = this;
    return Animated.event([null, { dx: rightChest.x, dy: rightChest.y }]);
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'next') {
      const {
        componentId,
        age,
        gender,
        base64,
        height,
        weight,
        headOffsetY,
        footOffsetY,
        shoulderOffsetY,
        pelvisOffsetY,
        wristOffsetY,
        crotchOffsetY,
        ankleOffsetY,
        bellyOffsetX,
        isMe,
      } = this.props;
      const {
        leftShulderOffset,
        leftChestOffset,
        rightShulderOffset,
        rightChestOffset,
      } = this.state;

      Navigation.push(componentId, {
        component: {
          name: 'wearbe.lowerBodySlide',
          passProps: {
            gender,
            base64,
            height,
            age,
            weight,
            headOffsetY,
            footOffsetY,
            shoulderOffsetY,
            pelvisOffsetY,
            wristOffsetY,
            crotchOffsetY,
            ankleOffsetY,
            bellyOffsetX,
            leftShulderOffsetX: leftShulderOffset.x,
            leftChestOffsetX: leftChestOffset.x,
            rightShulderOffsetX: rightShulderOffset.x,
            rightChestOffsetX: rightChestOffset.x,
            isMe,
          },
        },
      });
    }
  }

  render() {
    // 각 슬라이더에 따라 돋보기 오프셋 설정
    const {
      leftShulderPan,
      leftShulderOpacity,
      leftChestPan,
      leftChestOpacity,
      rightShulderPan,
      rightShulderOpacity,
      rightChest,
      rightChestOpacity,
      leftShoulderGuideOpacity,
      leftChestGuideOpacity,
      rightShoulderGuideOpacity,
      rightChestGuideOpacity,
    } = this;

    const { base64 } = this.props;
    const { typeText } = this.state;

    const leftShulderSlide = {
      transform: [
        {
          translateX: leftShulderPan.x,
        },
      ],
      left: centerOffset - 100,
      opacity: leftShulderOpacity,
    };

    const leftChestSlide = {
      transform: [
        {
          translateX: leftChestPan.x,
        },
      ],
      left: centerOffset - 50,
      opacity: leftChestOpacity,
    };

    const rightShulderSlide = {
      transform: [
        {
          translateX: rightShulderPan.x,
        },
      ],
      left: centerOffset + 100,
      opacity: rightShulderOpacity,
    };

    const rightChestSlide = {
      transform: [
        {
          translateX: rightChest.x,
        },
      ],
      left: centerOffset + 50,
      opacity: rightChestOpacity,
    };

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
          <StepHeader position={2} />
          <Slider
            style={leftShulderSlide}
            {...this.leftShulderPanResponder.panHandlers}
          >
            <SliderBar>
              <SliderLabel style={{ transform: [{ rotate: '-90deg' }] }}>
                <LabelText>왼쪽 어깨</LabelText>
              </SliderLabel>
              <LeftShoulderGuideWrapper
                style={{ opacity: leftShoulderGuideOpacity }}
              >
                <PartGuideImage
                  source={require('./images/leftShoulderGuide.png')}
                />
              </LeftShoulderGuideWrapper>
            </SliderBar>
          </Slider>
          <Slider
            style={leftChestSlide}
            {...this.leftChestPanResponder.panHandlers}
          >
            <SliderBar>
              <SliderLabel
                isBottom
                style={{ transform: [{ rotate: '-90deg' }] }}
              >
                <LabelText>왼쪽 가슴</LabelText>
              </SliderLabel>
              <LeftChestGuideWrapper style={{ opacity: leftChestGuideOpacity }}>
                <PartGuideImage
                  source={require('./images/leftShoulderGuide.png')}
                />
              </LeftChestGuideWrapper>
            </SliderBar>
          </Slider>
          <Slider
            style={rightChestSlide}
            {...this.rightChestResponder.panHandlers}
          >
            <SliderBar>
              <RightSliderLabel
                isBottom
                style={{ transform: [{ rotate: '90deg' }] }}
              >
                <LabelText>오른쪽 가슴</LabelText>
              </RightSliderLabel>
              <RightChestGuideWrapper
                style={{ opacity: rightChestGuideOpacity }}
              >
                <PartGuideImage
                  source={require('./images/rightShoulderGuide.png')}
                ></PartGuideImage>
              </RightChestGuideWrapper>
            </SliderBar>
          </Slider>
          <Slider
            style={rightShulderSlide}
            {...this.rightShulderPanResponder.panHandlers}
          >
            <SliderBar>
              <RightSliderLabel style={{ transform: [{ rotate: '90deg' }] }}>
                <LabelText>오른쪽 어깨</LabelText>
              </RightSliderLabel>
              <RightShoulderGuideWrapper
                style={{ opacity: rightShoulderGuideOpacity }}
              >
                <PartGuideImage
                  source={require('./images/rightShoulderGuide.png')}
                ></PartGuideImage>
              </RightShoulderGuideWrapper>
            </SliderBar>
          </Slider>
        </ImageContainer>
      </Container>
    );
  }
}

UppderBodyWidthSlideScreen.propTypes = {
  base64: PropTypes.string,
  componentId: PropTypes.string,
  password: PropTypes.string,
  phone: PropTypes.string,
  gender: PropTypes.number,
  height: PropTypes.string,
  weight: PropTypes.string,
  name: PropTypes.string,
  age: PropTypes.string,
  nickname: PropTypes.string,
  headOffsetY: PropTypes.number,
  footOffsetY: PropTypes.number,
  bellyOffsetX: PropTypes.number,
  isMe: PropTypes.bool,
  shoulderOffsetY: PropTypes.number,
  pelvisOffsetY: PropTypes.number,
  wristOffsetY: PropTypes.number,
  crotchOffsetY: PropTypes.number,
  ankleOffsetY: PropTypes.number,
};

export default UppderBodyWidthSlideScreen;
