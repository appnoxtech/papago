import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
// import {MaterialCommunityIcons, FontAwesome5} from 'react-native-vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface props {
  iconFamily: string;
  iconName: string;
  style: any;
  size: number;
  color: string;
}

const LoadIcon: FC<props> = ({iconFamily, iconName, style, size, color}) => {
  return (
    <View>
      {iconFamily === 'MaterialCommunityIcons' ? (
        <MaterialCommunityIcons
          size={size}
          name={iconName}
          color={color}
          style={style}
        />
      ) : iconFamily === 'FontAwesome5' ? (
        <FontAwesome5 style={style} size={size} name={iconName} color={color} />
      ) : null}
    </View>
  );
};

export default LoadIcon;

const styles = StyleSheet.create({});
