package com.laposadaapp;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.react.rnspinkit.RNSpinkitPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.reactnative.photoview.PhotoViewPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.rnfs.RNFSPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new RNSpinkitPackage(),
           new MainReactPackage(),
            new RNSpinkitPackage(),
            new PhotoViewPackage(),
            new ImageResizerPackage(),
            new RNFSPackage(),
            new ImagePickerPackage(),
            new VectorIconsPackage(),
            new RNFetchBlobPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
