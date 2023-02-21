import {
  LogBox,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Avatar, Button, IconButton} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  colorPrimary,
  colorSecondary,
} from '../../../../assets/styles/GlobalTheme';
import {data} from '../../../interfaces/Dashboard/record.interface';
import { useNavigation } from '@react-navigation/native';
import { parseMillisecondsIntoReadableTime } from '../../../utlis/common';
import Share from 'react-native-share';
import useGenerateDynamicLinks from '../../../hooks/dynamicLinks/createDynamicLinks';

interface params {
  Activity: data;
}

const RenderActivityIcon = ({Activity}: params) => {
  console.log('Activity', Activity);
  if (Activity.iconFamily === 'MaterialCommunityIcons') {
    return (
      <MaterialCommunityIcons
        size={25}
        name={Activity.iconName}
        color={colorSecondary}
      />
    );
  } else if (Activity.iconFamily === 'FontAwesome5') {
    return (
      <FontAwesome5 size={25} name={Activity.iconName} color={colorSecondary} />
    );
  } else {
    return (
      <Ionicons size={25} name={Activity.iconName} color={colorSecondary} />
    );
  }
};

const RenderDistance: React.FC<any> = ({distance}) => {
  if (distance < 1) {
    return <Text style={styles.activityDistanceText}>{distance * 1000} m</Text>;
  } else {
    <Text style={styles.activityDistanceText}>{distance?.toFixed(2)} Km</Text>;
  }
};



const RecordActivityCard: React.FC<any> = ({userDetails, id, acitivity}) => {
    const navigation = useNavigation();
    const [url, setUrl] = useState('');
    const GenrateDynamicLinks = useGenerateDynamicLinks();
    const handleCardPress = () => {
      navigation.navigate('ViewActivity' as never, {id: acitivity._id} as never);
    }

    const handleLinkGenration = async () => {
      const link = await GenrateDynamicLinks('activity', id);
      console.log('link', link);
      setUrl(link);
    };
    const handleShareBtnPress = () => {
      const options = {
        url: url,
        message: 'Teting',
      };
      Share.open(options);
    }
  useEffect(() => {
    handleLinkGenration();
  }, []);
  return (
    <View style={styles.container} key={id}>
      <View style={styles.head}>
        <Avatar.Text size={33} label="SC" />
        <View style={styles.headUserDetails}>
          <Text style={styles.headText}>{userDetails.name}</Text>
          <Text style={styles.headSubText}>Today at {parseMillisecondsIntoReadableTime(acitivity.startedAt)}</Text>
        </View>
      </View>
      <View style={styles.shareContainer}>
        <View style={styles.shareContainerLeft}>
          <Text style={styles.shareContainerLeftText}>
            {`Hey ${userDetails.name}, you didn't share this video yet!`}
          </Text>
        </View>
        <View>
          <Button
            style={styles.btn}
            mode="contained"
            buttonColor={colorPrimary}
            onPress={handleShareBtnPress}
          >
            <Text style={styles.btnText}>Share</Text>
          </Button>
        </View>
      </View>
      <TouchableOpacity onPress={handleCardPress}>
        <View style={styles.activtyCard}>
          <View style={styles.activitySummary}>
            <View style={styles.activitySummaryContainer}>
              <View style={styles.activityIconContainer}>
                <RenderActivityIcon Activity={acitivity.activityData} />
              </View>
              <View style={styles.activityDistanceTextContainer}>
                <RenderDistance distance={acitivity.distance} />
              </View>
            </View>
            <Text style={styles.activitySummaryText}>
              {acitivity.activityName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.btnsContainer}>
        <IconButton
          icon="heart-outline"
          iconColor={'black'}
          size={25}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon="comment-outline"
          iconColor={'black'}
          size={25}
          onPress={() => console.log('Pressed')}
        />
      </View>
      <View style={styles.footer}>
        <Avatar.Text size={28} label="SC" />
        <TextInput style={styles.commentInput} placeholder="Add a Comment" />
        <Button>
          <Text style={styles.cmntBtnText}>Post</Text>
        </Button>
      </View>
    </View>
  );
};

export default RecordActivityCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(1),
    alignItems: 'center',
    marginBottom: responsiveScreenHeight(2),
  },
  head: {
    flexDirection: 'row',
    marginBottom: responsiveScreenHeight(1),
    width: '100%',
  },
  headUserDetails: {
    marginLeft: responsiveScreenWidth(3),
  },
  headText: {
    fontSize: responsiveFontSize(1.7),
    color: 'black',
    fontWeight: 'bold',
    marginBottom: responsiveScreenHeight(0.5),
  },
  headSubText: {
    fontSize: responsiveFontSize(1.3),
    color: 'grey',
    fontWeight: '700',
  },
  shareContainer: {
    marginTop: responsiveScreenHeight(1.5),
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(1),
    backgroundColor: '#dddddd',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5,
  },
  shareContainerLeft: {
    width: responsiveScreenWidth(60),
  },
  shareContainerLeftText: {
    fontSize: responsiveFontSize(1.5),
    color: 'grey',
    opacity: 0.9,
  },
  btn: {
    width: responsiveScreenWidth(25),
  },
  btnText: {
    color: 'white',
    fontSize: responsiveFontSize(1.5),
  },
  activtyCard: {
    marginTop: responsiveScreenHeight(2),
    width: responsiveScreenWidth(90),
    height: responsiveScreenHeight(20),
    backgroundColor: colorSecondary,
    borderRadius: 5,
    position: 'relative',
  },
  activitySummary: {
    position: 'absolute',
    bottom: 11,
    left: 11,
  },
  activitySummaryText: {
    fontSize: responsiveFontSize(2.7),
    fontWeight: 'bold',
    color: 'black',
  },
  btnsContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  footer: {
    marginTop: responsiveScreenHeight(1),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  commentInput: {
    width: responsiveScreenWidth(65),
    borderColor: '#bbbbbb',
    borderWidth: 1,
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(0.7),
    borderRadius: 10,
  },
  cmntBtnText: {
    color: 'grey',
  },
  activitySummaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIconContainer: {
    padding: 1.5,
    paddingHorizontal: 2.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
  },
  activityDistanceTextContainer: {
    paddingVertical: responsiveScreenHeight(0.4),
    paddingHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginLeft: responsiveScreenWidth(1.3),
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
  },
  activityDistanceText: {
    color: colorSecondary,
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
  },
});
