import React from 'react';
import Orientation from 'react-native-orientation';

export const useOrientation = (navigation, mode) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Orientation.unlockAllOrientations();
      if (mode === 'details') Orientation.lockToLandscape();
      else Orientation.lockToPortrait();
    });

    return () => unsubscribe();
  }, [])
}