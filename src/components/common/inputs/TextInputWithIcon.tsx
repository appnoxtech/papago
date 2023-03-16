import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  DeviceEventEmitter
} from 'react-native';
import {Menu} from 'react-native-paper';
import React, {FC, useEffect} from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import LoadIcon from '../LoadIcon';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import { useDispatch } from 'react-redux';
import { UpdateTripStopPoints } from '../../../redux/reducers/planTrip.reducer';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

interface props {
  iconFamily: Array<string>;
  iconName: Array<string>;
  iconColor: Array<string>;
  iconSize: Array<number>;
  iconStyle?: any;
  id?: string;
  placeholder: string;
  onChangeHandler?: any,
  rightIconClickHandler?: any,
  type?: string;
  index?: number;
  stopAdded?: boolean;
  value?: string;
  isError?: boolean;
  isEditable?: boolean
}
const TextInputWithIcon: FC<props> = ({
  iconFamily,
  iconName,
  iconColor,
  iconSize,
  iconStyle = {},
  placeholder,
  index,
  type,
  stopAdded,
  value,
  rightIconClickHandler,
  onChangeHandler,
  id = '',
  isError = false,
  isEditable = true,
}) => {
  const Navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const handleInputFocus = () => {
    Navigation.navigate('SearchLocationPage' as never, {id} as never);
  }
  
  useEffect(() => {
    DeviceEventEmitter.addListener(`${id}`, (eventData) => {
      console.log('*** eventData ***', eventData);
      onChangeHandler(eventData);
    });
  }, []);

  return ( 
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {type === 'stops' ? (
          <View style={styles.customIconContainer}>
            <Text style={styles.customIconText}>
              { index ? String.fromCharCode(index + 64) : null}
            </Text>
          </View>
        ) : (
          <LoadIcon
            iconFamily={iconFamily[0]}
            iconName={iconName[0]}
            color={iconColor[0]}
            size={iconSize[0]}
            style={iconStyle}
          />
        )}
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          editable={isEditable}
          placeholderTextColor={'#565555'}
          placeholder={placeholder}
          id={id}
          onFocus={handleInputFocus}
          style={[styles.textInput, {borderColor: isError ? 'red' : '#bbbbbb' }]}
          value={value}
          onChangeText={(text) => onChangeHandler(id, text)}
        />
      </View>
      {iconFamily.length > 1 ? (
        <View style={styles.rightIconContainer}>
          {placeholder === 'Start location' ? (
            <Menu
              contentStyle={styles.menu}
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={openMenu}>
                  <LoadIcon
                    iconFamily={iconFamily[1]}
                    iconName={iconName[1]}
                    color={iconColor[1]}
                    size={iconSize[1]}
                    style={iconStyle}
                  />
                </TouchableOpacity>
              }>
              <Menu.Item
                style={styles.menuItem}
                titleStyle={styles.menuTitle}
                onPress={() => {
                  rightIconClickHandler();
                  closeMenu();
                }}
                title="Add Stops"
              />
            </Menu>
          ) : (
            <LoadIcon
              iconFamily={iconFamily[1]}
              iconName={iconName[1]}
              color={iconColor[1]}
              size={iconSize[1]}
              style={iconStyle}
            />
          )}
        </View>
      ) : null}
      {type === 'stops' ? (
        <View style={styles.rightIconContainer}>
          {stopAdded ? (
            <TouchableOpacity onPress={() => rightIconClickHandler(index)}>
              <LoadIcon
              iconFamily={'Entypo'}
              iconName={'circle-with-cross'}
              color={'red'}
              size={26}
              style={{}}
            />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => rightIconClickHandler()}>
               <LoadIcon
              iconFamily={'FontAwesome'}
              iconName={'plus-circle'}
              color={'green'}
              size={26}
              style={{}}
            />
            </TouchableOpacity>
          )}
        </View>
      ) : null}
    </View>
  );
};

export default TextInputWithIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsiveScreenHeight(0.5),
  },
  textInput: {
    paddingHorizontal: responsiveScreenWidth(2),
    width: '90%',
    paddingVertical: responsiveScreenHeight(1.5),
    fontSize: responsiveFontSize(2),
    color: 'black',
    borderWidth: 1,
    borderRadius: responsiveScreenHeight(1),
  },
  iconContainer: {
    width: responsiveScreenWidth(10),
  },
  textInputContainer: {
    width: responsiveScreenWidth(63),
  },
  rightIconContainer: {
    width: responsiveScreenWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
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
  customIconContainer: {
    width: responsiveScreenWidth(6),
    height: responsiveScreenWidth(6),
    borderRadius: responsiveScreenWidth(3),
    borderWidth: 2.5,
    borderColor: '#535353',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customIconText: {
    fontSize: responsiveFontSize(1.75),
    color: '#535353',
    fontWeight: 'bold',
  },
});
