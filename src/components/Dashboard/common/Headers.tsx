import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {Styles} from '../../../../assets/styles/GlobalStyles';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorGrey} from '../../../../assets/styles/GlobalTheme';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {useAuthHooks} from '../../../hooks/authHooks';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
interface props {
  title: string;
}
const Headers = ({title}: props) => {
  const {handleLogout} = useAuthHooks();
  const recordStatus = useSelector((state: any) => state.recordStatus);
  const {isStart, isPaused, isEnd} = recordStatus;
  const navigation = useNavigation();
  const {selectedActivity} = useSelector((state: any) => state.activity);

  const handleIconPress = () => {
    console.log('btn pressed');
  };

  const handleSettingIconClick = () => {
    if (title === 'Record') {
      navigation.navigate('Setting' as never);
    } else {
      handleLogout();
    }
  };

  const handleChangeActivity = () => {
    navigation.navigate('SelectActivity' as never);
  };

  return (
    <View style={[Styles.bgWhite, styles.container]}>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle={'default'}
        showHideTransition={'slide'}
      />
      {title === 'Record' ? (
        <>
          {!(isStart && !isPaused) ? (
            <TouchableOpacity
              onPress={handleChangeActivity}
              style={{width: responsiveScreenWidth(50)}}>
              <View style={styles.activityTypeContainer}>
                <Text style={styles.activity}>
                  {selectedActivity.activityName}
                </Text>
                <Entypo name="chevron-down" color={'black'} size={20} />
              </View>
            </TouchableOpacity>
          ) : (
            <Text style={styles.activity}>{selectedActivity.activityName}</Text>
          )}
        </>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}

      {title === 'Feed' ? (
        <Feather
          onPress={handleIconPress}
          name="user-plus"
          size={26}
          style={styles.icon}
        />
      ) : title === 'Record' ? (
        <>
          {!(isStart && !isPaused) ? (
            <Feather
              onPress={handleSettingIconClick}
              name="settings"
              size={24}
              style={styles.icon}
            />
          ) : null}
        </>
      ) : title === 'Menu' ? (
        <Feather
          onPress={handleSettingIconClick}
          name="settings"
          size={25}
          style={styles.icon}
        />
      ) : null}
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({
  title: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  activity: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginRight: responsiveScreenWidth(1),
  },
  icon: {
    position: 'absolute',
    top: responsiveScreenHeight(1.8),
    right: responsiveScreenWidth(3),
    color: 'black',
  },
  headersContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    paddingVertical: responsiveScreenHeight(1.3),
    borderBottomColor: colorGrey,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
