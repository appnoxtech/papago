import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import HeaderWithBackBtn from '../../../components/common/Headers/HeaderWithBackBtn';
import {useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {Text} from 'react-native-paper';
import {Switch} from 'react-native-paper';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import {useNavigation} from '@react-navigation/native';

const Setting = () => {
  const {selectedActivity} = useSelector((state: any) => state.activity);
  const [autoPause, setAutoPause] = useState(false);
  const [isScreenAwake, setIsScreenAwake] = useState(false);
  const navigation = useNavigation();

  const handleActivityPress = () => {
    navigation.navigate('SelectActivity' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBackBtn title="Setting" />
      <View style={styles.body}>
        <View style={styles.tiles}>
          <View>
            <Text style={styles.primaryText}>Activity</Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleActivityPress}>
              <View style={styles.activityContainer}>
                <Text style={styles.activityName}>{selectedActivity.activityName}</Text>
                <Entypo style={styles.icon} name="chevron-right" size={22} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tiles}>
          <View>
            <Text style={styles.primaryText}>Auto-pause</Text>
          </View>
          <View>
            <View>
              <Switch
                color={colorPrimary}
                value={autoPause}
                onValueChange={setAutoPause}
              />
            </View>
          </View>
        </View>
        <View style={styles.tiles}>
          <View style={{width: responsiveScreenWidth(60)}}>
            <Text style={styles.primaryText}>Keep Screen awake</Text>
            <Text style={styles.subText}>
              This prevents the screen from turning off during recording.
            </Text>
          </View>
          <View>
            <View>
              <Switch
                color={colorPrimary}
                value={isScreenAwake}
                onValueChange={setIsScreenAwake}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  activityName: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    // fontFamily: 'NunitoSans-Bold',
    fontSize: responsiveFontSize(2.6),
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
  },
  tiles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(3.5),
    paddingVertical: responsiveScreenHeight(2),
    borderBottomColor: '#D0D0D0',
    borderBottomWidth: 0.8,
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginTop: responsiveScreenHeight(0.5),
  },
  primaryText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: 'black',
  },
  subText: {
    fontSize: responsiveFontSize(1.3),
    opacity: 0.5,
  },
});
