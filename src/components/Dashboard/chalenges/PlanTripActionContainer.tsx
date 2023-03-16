import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import {
    responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import TextInputWithIcon from '../../common/inputs/TextInputWithIcon';
import LoadIcon from '../../common/LoadIcon';
import ViewActivityHorizontalList from './ViewActivityHorizontalList';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
    PlanTripInterface,
  planTripCords,
} from '../../../interfaces/reducers/PlanTripInterface';
import {UpdateTripsCords} from '../../../redux/reducers/planTrip.reducer';
import { Menu } from 'react-native-paper';

const errorInitialState = {
  startCords: false,
  endingCords: false,
};

interface props {
  openStopsContainer: any;
}

interface params {
  id: 'startingCords' | 'endingCords';
  planTripCords: planTripCords;
}

const PlanTripActionContainer: FC<props> = ({openStopsContainer}) => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const dispatch = useDispatch();
  const {startingCords, endingCords, stops} = useSelector(
    (state: any): PlanTripInterface => state.planTrip,
  );
  const Navigation = useNavigation();
  const [error, setError] = useState(errorInitialState);

  const handleBackPress = () => {
    Navigation.goBack();
  };

  const handleAddStopsClick = () => {
    if (!startingCords.cords) {
      return setError({
        endingCords: false,
        startCords: true,
      });
    } else if (!endingCords.cords) {
      return setError({
        startCords: false,
        endingCords: true,
      });
    } else {
      openStopsContainer();
    }
  };

  const handleCordsSwap = () => {};

  const onChangeHandler = ({id, planTripCords}: params) => {
    dispatch(UpdateTripsCords({key: id, planTripCords}));
  };

  const getName = (name: string) => name.split(",")[0];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backBtnContainer}>
          <LoadIcon
            iconFamily="AntDesign"
            iconName="arrowleft"
            size={26}
            style={{}}
            color="black"
          />
        </TouchableOpacity>
        <View style={styles.actionContainer}>
          {stops?.length ? (
            <TouchableOpacity onPress={openStopsContainer} style={styles.tripsCordsSummaryContainer}>
                <View style={styles.tripsCordsSummary}>
                    <View style={styles.tripCordContainer}>
                        <LoadIcon
                            iconFamily={'FontAwesome'}
                            iconName={'dot-circle-o'}
                            color={colorPrimary}
                            size={20}
                            style={styles.icon}
                        />
                        <Text style={styles.tripCordText}>{getName(startingCords.name)}</Text>
                    </View>
                    <View style={styles.tripCordContainer}>
                        <LoadIcon
                            iconFamily={'FontAwesome'}
                            iconName={'circle-thin'}
                            color={'#565555'}
                            size={20}
                            style={styles.icon}
                        />
                        <Text style={styles.tripCordText}>{`${stops.length} Stops`}</Text>  
                    </View>
                    <View style={styles.tripCordContainer}>
                       <LoadIcon
                            iconFamily={'Entypo'}
                            iconName={'location'}
                            color={'red'}
                            size={20}
                            style={styles.icon}
                        />
                        <Text style={styles.tripCordText}>{getName(endingCords.name)}</Text>
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <Menu
              contentStyle={styles.menu}
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={openMenu}>
                                         <LoadIcon 
                            iconFamily={'MaterialCommunityIcons'}
                            iconName={'dots-vertical'}
                            color={'black'}
                            size={25}
                            style={{}}
                        />
                </TouchableOpacity>
              }>
              <Menu.Item
                style={styles.menuItem}
                titleStyle={styles.menuTitle}
                onPress={() => {
                  openStopsContainer();
                  closeMenu();
                }}
                title="Edit Stops"
              />
            </Menu>
                </View>
            </TouchableOpacity>
          ) : (
            <>
              <View style={styles.textContainer}>
                <TextInputWithIcon
                  onChangeHandler={onChangeHandler}
                  value={startingCords.name}
                  id={'startingCords'}
                  isError={error.startCords}
                  rightIconClickHandler={handleAddStopsClick}
                  iconFamily={['FontAwesome', 'MaterialCommunityIcons']}
                  iconName={['dot-circle-o', 'dots-vertical']}
                  iconColor={[colorPrimary, 'black']}
                  iconSize={[25, 25]}
                  placeholder="Start location"
                />
              </View>
              <View style={styles.textContainer}>
                <TextInputWithIcon
                  onChangeHandler={onChangeHandler}
                  value={endingCords.name}
                  id={'endingCords'}
                  isError={error.endingCords}
                  rightIconClickHandler={handleCordsSwap}
                  iconFamily={['Entypo', 'Ionicons']}
                  iconName={['location', 'swap-vertical']}
                  iconColor={['red', 'black']}
                  iconSize={[25, 25]}
                  placeholder="Drop location"
                />
              </View>
            </>
          )}
        </View>
      </View>
      <ViewActivityHorizontalList />
    </View>
  );
};

export default PlanTripActionContainer;

const styles = StyleSheet.create({
  container: {
    paddingTop: responsiveScreenHeight(1),
    paddingHorizontal: responsiveScreenWidth(2),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  backBtnContainer: {
    width: responsiveScreenWidth(10),
  },
  actionContainer: {
    width: responsiveScreenWidth(90),
    marginLeft: responsiveScreenWidth(1.7),
  },
  textContainer: {
    marginVertical: responsiveScreenHeight(1),
  },
  tripsCordsSummaryContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tripsCordsSummary: {
    width: responsiveScreenWidth(70),
    borderWidth: 1.5,
    borderRadius: responsiveScreenWidth(3),
    borderColor: '#eeeeee',
    paddingHorizontal: responsiveScreenWidth(1),
    paddingVertical: responsiveScreenHeight(1),
  },
  btnContainer: {
    width: responsiveScreenWidth(15),
    justifyContent: 'center',
    alignItems: 'center'
  },
  tripCordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsiveScreenHeight(0.5)
  },
  tripCordText: {
     fontSize: responsiveFontSize(2.2),
     fontWeight: '500',
     color: '#565555',
     paddingLeft: responsiveScreenWidth(2)
  },
  icon: {
    marginHorizontal: responsiveScreenWidth(2)
  },
  menu: {
    padding: 0,
    backgroundColor: 'white',
    marginTop: responsiveScreenHeight(5),
  },
  menuItem: {
    height: responsiveScreenHeight(3),
    backgroundColor: 'white',
  },
  menuTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});
