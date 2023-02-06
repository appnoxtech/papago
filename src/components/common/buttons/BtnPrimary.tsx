import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  colorPrimary,
  colorSecondary,
} from '../../../../assets/styles/GlobalTheme';

interface props {
  label: string;
  isActive: boolean;
  handlePress: () => any;
}

const BtnPrimary: React.FC<props> = ({label, isActive = true, handlePress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!isActive}
      onPress={handlePress}>
      <View
        style={[
          styles.btnContainer,
          {backgroundColor: isActive ? colorPrimary : colorSecondary},
        ]}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BtnPrimary;

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveScreenHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: '98%',
    borderRadius: responsiveScreenWidth(2),
    paddingHorizontal: responsiveScreenWidth(1),
    paddingVertical: responsiveScreenHeight(1.9),
  },
  label: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1.9),
    color: 'white',
  },
});
