import React, { useState, useEffect, createRef } from 'react';
import { StyleSheet, View, Dimensions, Easing, Animated } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Attitude from 'react-native-attitude';
import { useAnimation } from 'react-native-animation-hooks';

import { Icon } from 'react-native-elements';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import { theme } from '../../constants';
import {
  HeadLine,
  TakeButtonWrapper,
  HeadLabel,
  LabelText,
  HeadLineWrapper,
  FootLineWrapper,
  BellyCenterWrapper,
  BellyLine,
  BellyLabel,
  GuideWrapper,
  GuideBottomWrapper,
  GuideText,
  TakeButton,
  TakeButtonInner,
  DisableButton,
} from './styles';

const CameraScreen = () => {
  const [pitch, setPitch] = useState(0);
  const [textOpacityLoop] = useState(new Animated.Value(0));
  const cameraRef = createRef();
  const allowed = pitch < 100 && pitch > 80;

  useNavigationComponentDidAppear(() => {
    startAnimation();
  });

  useEffect(() => {
    const watchId = Attitude.watch(payload => {
      setPitch(payload.pitch + 90);
    });

    return () => {
      Attitude.clearWatch(watchId);
      Attitude.stopObserving();
    };
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  const startAnimation = () => {
    textOpacityLoop.setValue(0.2);
    Animated.timing(textOpacityLoop, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
    }).start(() => {
      startAnimation();
    });
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          console.log(barcodes);
        }}
      />
      <GuideWrapper allowed={allowed}>
        <GuideText
          style={{
            opacity: allowed ? 1 : textOpacityLoop,
          }}
        >
          {allowed
            ? '정수리와 발 끝을 맞추고 촬영하세요!'
            : '최대한 수직으로 유지해주세요!'}
        </GuideText>
      </GuideWrapper>
      <HeadLineWrapper>
        <HeadLine>
          <HeadLabel>
            <LabelText>정수리</LabelText>
          </HeadLabel>
        </HeadLine>
      </HeadLineWrapper>
      <BellyCenterWrapper>
        <BellyLine>
          {/* <BellyLabel style={{ transform: [{ rotate: '-90deg' }] }}>
              <LabelText>배꼽</LabelText>
            </BellyLabel> */}
        </BellyLine>
      </BellyCenterWrapper>
      <FootLineWrapper>
        <HeadLine>
          <HeadLabel>
            <LabelText>발 끝</LabelText>
          </HeadLabel>
        </HeadLine>
      </FootLineWrapper>
      <GuideBottomWrapper allowed={allowed}>
        <TakeButtonWrapper>
          {allowed ? (
            <TakeButton onPress={takePicture}>
              <TakeButtonInner></TakeButtonInner>
            </TakeButton>
          ) : (
            <DisableButton>
              <Icon
                type="ant-design"
                name="close"
                size={40}
                color={theme.pointColor}
              />
            </DisableButton>
          )}
        </TakeButtonWrapper>
      </GuideBottomWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'black',
  },
  preview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 44,
    alignItems: 'center',
  },
});

export default CameraScreen;
