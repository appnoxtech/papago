import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Menu} from 'react-native-paper';
import React, {FC} from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import LoadIcon from '../LoadIcon';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';

interface props {
  iconFamily: Array<string>;
  iconName: Array<string>;
  iconColor: Array<string>;
  iconSize: Array<number>;
  iconStyle?: any;
  placeholder: string;
}
const TextInputWithIcon: FC<props> = ({
  iconFamily,
  iconName,
  iconColor,
  iconSize,
  iconStyle = {},
  placeholder,
}) => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <LoadIcon
          iconFamily={iconFamily[0]}
          iconName={iconName[0]}
          color={iconColor[0]}
          size={iconSize[0]}
          style={iconStyle}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholderTextColor={'#565555'}
          placeholder={placeholder}
          style={styles.textInput}
        />
      </View>
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
                <Menu.Item style={styles.menuItem} onPress={() => {}} title="Add Stops" />
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
    </View>
  );
};

export default TextInputWithIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(1.5),
    fontSize: responsiveFontSize(2),
    color: 'black',
    borderWidth: 1,
    borderColor: '#bbbbbb',
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
    backgroundColor: 'white'
  },
  menuItem: {
    margin: 0,
    padding: 0,
    backgroundColor: 'white'
  }
});
