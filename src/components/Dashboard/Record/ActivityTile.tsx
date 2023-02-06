import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {data} from '../../../interfaces/Dashboard/record.interface';
import {updateActivity} from '../../../redux/reducers/activity';
import useNavigate from '../../../hooks/navigation/navigationHook';

interface params {
  Activity: data;
}

const RenderActivityIcon = ({Activity}: params) => {
  if (Activity.iconFamily === 'MaterialCommunityIcons') {
    return (
      <MaterialCommunityIcons
        size={25}
        name={Activity.iconName}
        color={'black'}
      />
    );
  } else if (Activity.iconFamily === 'FontAwesome5') {
    return <FontAwesome5 size={25} name={Activity.iconName} color={'black'} />;
  } else {
    return <Ionicons size={25} name={Activity.iconName} color={'black'} />;
  }
};

const ActivityTile = ({Activity}: params) => {
  const [isSelected, setIsSelected] = useState(false);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const {selectedActivity} = useSelector((state: any) => state.activity);

  const handleActivityTilesPress = (activityObj: data) => {
    dispatch(updateActivity(activityObj));
    navigation('');
  };

  useEffect(() => {
    if (Activity.activityName === selectedActivity.activityName) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, []);

  return (
    <TouchableOpacity onPress={() => handleActivityTilesPress(Activity)}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <RenderActivityIcon Activity={Activity} />
          <Text
            style={[
              styles.primaryText,
              {fontWeight: isSelected ? 'bold' : '400'},
            ]}>
            {Activity.activityName}
          </Text>
        </View>
        <View>
          {isSelected ? (
            <FontAwesome5 name="check-circle" size={15} color="#00c04b" />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityTile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveScreenWidth(4),
    paddingVertical: responsiveScreenHeight(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#D0D0D0',
    borderBottomWidth: 0.8,
  },
  primaryText: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    marginLeft: responsiveScreenWidth(5),
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
