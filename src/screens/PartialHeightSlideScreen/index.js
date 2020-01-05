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
  MagnifierContainer,
  Slider,
  MagnifierImage,
  MagifierCross,
  MagnifierWrapper,
  MagnifierText,
  HelpWrapper,
  GuideImage,
  Sliderlabel,
  RightSliderlabel,
  SliderlabelText,
  SliderBar,
  ShoulderGuideWrapper,
  PelvisGuideWrapper,
  PartGuideImage,
  BellySlider,
  BellySliderBar,
  BellyLabel,
  WristGuideWrapper,
  CrotchGuideWrapper,
  AnkleGuideWrapper,
} from './styles';
import { outputX, outputY, distanceBetween2Offset } from './utils/calculate';
import {
  SHOULDER_OFFSET,
  PELVIS_OFFSET,
  CROTCH_OFFSET,
  ANKLE_OFFSET,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  SLIDER_SCALE,
  sampleImg,
  WRIST_OFFSET,
} from './constants';
import { theme, BaseHeightOffset } from '../../constants';
import { StepHeader } from '../../components';

export class PartialHeightSlideScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '부위별 높이',
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
      shoulderOffset: {
        x: SHOULDER_OFFSET.x,
        y: SHOULDER_OFFSET.y,
      },
      pelvisOffset: {
        x: PELVIS_OFFSET.x,
        y: PELVIS_OFFSET.y,
      },
      wristOffset: {
        x: WRIST_OFFSET.x,
        y: WRIST_OFFSET.y,
      },
      crotchOffset: {
        x: CROTCH_OFFSET.x,
        y: CROTCH_OFFSET.y,
      },
      ankleOffset: {
        x: ANKLE_OFFSET.x,
        y: ANKLE_OFFSET.y,
      },
    };
    Navigation.events().bindComponent(this);
    // 어깨
    this.shoulderPan = new Animated.ValueXY();
    this.shoulderOpacity = new Animated.Value(0.5);
    // 골반
    this.pelvisPan = new Animated.ValueXY();
    this.pelvisOpacity = new Animated.Value(0.5);
    // 손목
    this.wristPan = new Animated.ValueXY();
    this.wristOpacity = new Animated.Value(0.5);
    // 밑위
    this.crotchPan = new Animated.ValueXY();
    this.crotchOpacity = new Animated.Value(0.5);

    // 발목
    this.anklePan = new Animated.ValueXY();
    this.ankleOpacity = new Animated.Value(0.5);

    // 돋보기 투명도
    this.shoulderGuideOpacity = new Animated.Value(0);
    this.pelvisGuideOpacity = new Animated.Value(0);
    this.wristGuideOpacity = new Animated.Value(0);
    this.crotchGuideOpacity = new Animated.Value(0);
    this.ankleGuideOpacity = new Animated.Value(0);

    // 가이드 투명도
    this.guideOpacity = new Animated.Value(0);
    const {
      shoulderGuideOpacity,
      shoulderOpacity,
      pelvisGuideOpacity,
      wristGuideOpacity,
      pelvisOpacity,
      wristOpacity,
      crotchGuideOpacity,
      ankleGuideOpacity,
      guideOpacity,
      crotchOpacity,
      ankleOpacity,
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
    // 어깨 슬라이더 이벤트
    this.shoulderPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.shoulderPan.setOffset({
          // x: this.shoulderPan.x._value,
          y: this.shoulderPan.y._value,
        });
        this.shoulderPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.timing(shoulderOpacity, {
            toValue: 1,
          }),
          Animated.timing(shoulderGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'shoulder', typeText: '어깨 높이' });
      },
      onPanResponderMove: this.onDraggingShoulder(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        this.shoulderPan.flattenOffset();
        Animated.parallel([
          Animated.timing(shoulderOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(shoulderGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          shoulderOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 골반 슬라이더 이벤트
    this.pelvisPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.pelvisPan.setOffset({
          // x: this.pelvisPan.x._value,
          y: this.pelvisPan.y._value,
        });
        this.pelvisPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.timing(pelvisOpacity, {
            toValue: 1,
          }),
          Animated.timing(pelvisGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'pelvis', typeText: '골반' });
      },
      onPanResponderMove: this.onDraggingPelvis(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        this.pelvisPan.flattenOffset();
        Animated.parallel([
          Animated.timing(pelvisOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(pelvisGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          pelvisOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });

    // 손목 슬라이더 이벤트
    this.wristPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.wristPan.setOffset({
          // x: this.wristPan.x._value,
          y: this.wristPan.y._value,
        });
        Animated.parallel([
          Animated.timing(wristOpacity, {
            toValue: 1,
          }),
          Animated.timing(wristGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.wristPan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: this.onDraggingWrist(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        this.wristPan.flattenOffset();
        Animated.parallel([
          Animated.timing(wristOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(wristGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          wristOffset: {
            // x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });

    // 밑위 슬라이더 이벤트
    this.crotchPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.crotchPan.setOffset({
          // x: this.crotchPan.x._value,
          y: this.crotchPan.y._value,
        });
        Animated.parallel([
          Animated.timing(crotchOpacity, {
            toValue: 1,
          }),
          Animated.timing(crotchGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.crotchPan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: this.onDraggingCrotch(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        this.crotchPan.flattenOffset();
        Animated.parallel([
          Animated.timing(crotchOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(crotchGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          crotchOffset: {
            // x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });

    // 발목 슬라이더 이벤트
    this.anklePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.anklePan.setOffset({
          // x: this.crotchPan.x._value,
          y: this.anklePan.y._value,
        });
        Animated.parallel([
          Animated.timing(ankleOpacity, {
            toValue: 1,
          }),
          Animated.timing(ankleGuideOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.anklePan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: this.onDraggingAnkle(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: event => {
        this.anklePan.flattenOffset();
        Animated.parallel([
          Animated.timing(ankleOpacity, {
            toValue: 0.5,
          }),
          Animated.timing(ankleGuideOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          ankleOffset: {
            // x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
  }

  onDraggingShoulder = () => {
    const { shoulderPan } = this;
    return Animated.event([null, { dy: shoulderPan.y }]);
  };

  onDraggingPelvis = () => {
    const { pelvisPan } = this;
    return Animated.event([null, { dy: pelvisPan.y }]);
  };

  onDraggingWrist = () => {
    const { wristPan } = this;
    return Animated.event([null, { dy: wristPan.y }]);
  };

  onDraggingCrotch = () => {
    const { crotchPan } = this;
    return Animated.event([null, { dy: crotchPan.y }]);
  };

  onDraggingAnkle = () => {
    const { anklePan } = this;
    return Animated.event([null, { dy: anklePan.y }]);
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'next') {
      const {
        componentId,
        base64,
        height,
        weight,
        isMe,
        headOffsetY,
        footOffsetY,
        bellyOffsetX,
      } = this.props;
      const {
        shoulderOffset,
        pelvisOffset,
        wristOffset,
        crotchOffset,
        ankleOffset,
      } = this.state;
      Navigation.push(componentId, {
        component: {
          name: 'wave.upperBodyWidthSlide',
          passProps: {
            height,
            weight,
            base64,
            shoulderOffsetY: shoulderOffset.y,
            pelvisOffsetY: pelvisOffset.y,
            wristOffsetY: wristOffset.y,
            crotchOffsetY: crotchOffset.y,
            ankleOffsetY: ankleOffset.y,
            headOffsetY,
            footOffsetY,
            bellyOffsetX,
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
      shoulderPan,
      pelvisPan,
      wristPan,
      crotchPan,
      anklePan,
      // footScale,
      // reverseXValue,
      // reverseYValue,
      shoulderOpacity,
      pelvisOpacity,
      wristOpacity,
      crotchOpacity,
      ankleOpacity,
      shoulderGuideOpacity,
      pelvisGuideOpacity,
      wristGuideOpacity,
      crotchGuideOpacity,
      ankleGuideOpacity,
    } = this;

    const { base64 } = this.props;
    const { typeText } = this.state;

    const shoulderSlide = {
      transform: [
        // { translateX: shoulderPan.x },
        { translateY: shoulderPan.y },
      ],
      top: SHOULDER_OFFSET.y,
      opacity: shoulderOpacity,
      // left: SHOULDER_OFFSET.x,
    };

    const pelvisSlide = {
      transform: [
        // { translateX: pelvisPan.x },
        { translateY: pelvisPan.y },
        // { scale: footScale },
      ],
      top: PELVIS_OFFSET.y,
      // left: PELVIS_OFFSET.x,
      opacity: pelvisOpacity,
    };

    const wristSlide = {
      transform: [{ translateY: wristPan.y }],
      top: WRIST_OFFSET.y,
      opacity: wristOpacity,
      // top: 0,
    };

    const crotchSlide = {
      transform: [{ translateY: crotchPan.y }],
      top: CROTCH_OFFSET.y,
      opacity: crotchOpacity,
      // top: 0,
    };

    const ankleSlide = {
      transform: [{ translateY: anklePan.y }],
      top: ANKLE_OFFSET.y,
      opacity: ankleOpacity,
      // top: 0,
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
          <StepHeader position={1} />
          <Slider
            style={shoulderSlide}
            {...this.shoulderPanResponder.panHandlers}
          >
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
                <SliderlabelText>어깨높이</SliderlabelText>
              </Sliderlabel>
              <ShoulderGuideWrapper style={{ opacity: shoulderGuideOpacity }}>
                <PartGuideImage
                  source={require('./images/shoulderGuide.png')}
                />
              </ShoulderGuideWrapper>
            </SliderBar>
          </Slider>
          <Slider style={pelvisSlide} {...this.pelvisPanResponder.panHandlers}>
            <SliderBar>
              <Icon
                type="antdesign"
                name="caretup"
                size={13}
                color={theme.guideColor}
                iconStyle={{ position: 'absolute', top: -14, right: 10 }}
              />
              <Icon
                type="antdesign"
                name="caretdown"
                size={13}
                color={theme.guideColor}
                iconStyle={{ position: 'absolute', top: 3, right: 10 }}
              />
              <RightSliderlabel>
                <SliderlabelText>골반높이</SliderlabelText>
              </RightSliderlabel>
              <PelvisGuideWrapper style={{ opacity: pelvisGuideOpacity }}>
                <PartGuideImage
                  source={require('./images/pelvisCrotchGuide.png')}
                />
              </PelvisGuideWrapper>
            </SliderBar>
          </Slider>
          <Slider style={wristSlide} {...this.wristPanResponder.panHandlers}>
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
                <SliderlabelText>손목높이</SliderlabelText>
              </Sliderlabel>
              <WristGuideWrapper style={{ opacity: wristGuideOpacity }}>
                <PartGuideImage source={require('./images/wristGuide.png')} />
              </WristGuideWrapper>
            </SliderBar>
          </Slider>
          <Slider style={crotchSlide} {...this.crotchPanResponder.panHandlers}>
            <SliderBar>
              <Icon
                type="antdesign"
                name="caretup"
                size={13}
                color={theme.guideColor}
                iconStyle={{ position: 'absolute', top: -14, right: 10 }}
              />
              <Icon
                type="antdesign"
                name="caretdown"
                size={13}
                color={theme.guideColor}
                iconStyle={{ position: 'absolute', top: 3, right: 10 }}
              />
              <RightSliderlabel>
                <SliderlabelText>밑위</SliderlabelText>
              </RightSliderlabel>
              <CrotchGuideWrapper style={{ opacity: crotchGuideOpacity }}>
                <PartGuideImage
                  source={require('./images/pelvisCrotchGuide.png')}
                />
              </CrotchGuideWrapper>
            </SliderBar>
          </Slider>
          <Slider style={ankleSlide} {...this.anklePanResponder.panHandlers}>
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
                <SliderlabelText>발목높이</SliderlabelText>
              </Sliderlabel>
              <AnkleGuideWrapper style={{ opacity: ankleGuideOpacity }}>
                <PartGuideImage source={require('./images/footGuide.png')} />
              </AnkleGuideWrapper>
            </SliderBar>
          </Slider>
        </ImageContainer>
        <HelpWrapper {...this.guideResponder.panHandlers}>
          <Icon name="question" type="font-awesome" color="#ffffff" size={25} />
        </HelpWrapper>
        <GuideImage
          source={require('./images/shulderArmGuide.png')}
          style={guideOpacity}
        />
      </Container>
    );
  }
}

PartialHeightSlideScreen.propTypes = {
  base64: PropTypes.string,
  componentId: PropTypes.string,
  height: PropTypes.string,
  weight: PropTypes.string,
  headOffsetY: PropTypes.number,
  footOffsetY: PropTypes.number,
  bellyOffsetX: PropTypes.number,
  isMe: PropTypes.bool,
};

PartialHeightSlideScreen.defaultProps = {
  base64: sampleImg,
};

export default PartialHeightSlideScreen;
