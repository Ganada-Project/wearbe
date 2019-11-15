package com.wearbe;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.sensorworks.RNAttitude.RNAttitudePackage;
import org.reactnative.camera.RNCameraPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.mkuczera.RNReactNativeHapticFeedbackPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import com.BV.LinearGradient.LinearGradientPackage;
import java.util.Arrays;
import java.util.List;


import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

public class MainApplication extends NavigationApplication {

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug(){
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages(){
        return Arrays.<ReactPackage>asList(
                new AsyncStoragePackage(),
                new LinearGradientPackage(),
                new RNReactNativeHapticFeedbackPackage(),
                new FastImageViewPackage(),
                new RNCameraPackage(),
                new RNAttitudePackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages(){
        return getPackages();
    }
}

