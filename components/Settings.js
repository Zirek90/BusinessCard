import React from 'react';
import {View, Switch, StyleSheet, Image} from 'react-native';
import {Popover, Layout} from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Settings = ({
  visible,
  theme,
  language,
  toggleTheme,
  toggleLanguage,
  setVisible,
}) => {
  const renderMenuButton = () => (
    <Ionicons
      name={'settings-outline'}
      size={20}
      color={'#ffbf00'}
      onPress={() => setVisible(true)}
    />
  );

  return (
    <View style={styles.settingContainer}>
      <Popover
        anchor={renderMenuButton}
        visible={visible}
        placement={'bottom'}
        onBackdropPress={() => setVisible(false)}>
        <Layout style={styles.popoverLayout}>
          <View style={styles.popoverWrapper}>
            <Ionicons name={'sunny-outline'} size={19} color={'#ffbf00'} />
            <Switch
              trackColor={{false: '#bfc7c1', true: '#bfc7c1'}}
              thumbColor={theme === 'light' ? '#ffbf00' : 'blue'}
              ios_backgroundColor="#bfc7c1"
              onValueChange={toggleTheme}
              value={theme !== 'light' ? true : false}
            />
            <Ionicons name={'moon-outline'} size={19} color={'blue'} />
          </View>

          <View style={styles.popoverWrapper}>
            <Image
              style={{width: 25, height: 17}}
              source={require('../assets/pl_flag.png')}
            />
            <Switch
              trackColor={{false: '#bfc7c1', true: '#bfc7c1'}}
              thumbColor={
                language.no_businesscards === 'No business cards available'
                  ? 'blue'
                  : '#ffbf00'
              }
              ios_backgroundColor="#bfc7c1"
              onValueChange={toggleLanguage}
              value={
                language.no_businesscards === 'No business cards available'
                  ? true
                  : false
              }
            />
            <Image
              style={{width: 25, height: 17}}
              source={require('../assets/eng_flag.png')}
            />
          </View>
        </Layout>
      </Popover>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  settingContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  popoverLayout: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  popoverWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 100,
  },
});
