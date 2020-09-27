import ImagePicker from 'react-native-image-picker';

const options = {
  quality: 0.4,
  maxWidth: 500,
  maxHeight: 500,
};

export const takePhoto = () => {
  return new Promise((resolve, reject) => {
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        reject([response.error]);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        reject([response.customButton]);
      } else {
        // console.log(response);
        const photo = `data:image/jpeg;base64,${response.data}`;
        resolve(photo);
      }
    });
  });
};

export const pickCard = () => {
  return new Promise((resolve, reject) => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        reject([response.error]);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        reject([response.customButton]);
      } else {
        // const photo = response.uri;
        const photo = `data:image/jpeg;base64,${response.data}`;
        resolve(photo);
      }
    });
  });
};
