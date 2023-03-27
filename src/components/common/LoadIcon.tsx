import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
// import {MaterialCommunityIcons, FontAwesome5} from 'react-native-vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
      ) :iconFamily === 'FontAwesome' ? (
        <FontAwesome style={style} size={size} name={iconName} color={color} />
      ) :iconFamily === 'Entypo' ? (
        <Entypo style={style} size={size} name={iconName} color={color} />
      ) : iconFamily === 'AntDesign' ? (
        <AntDesign style={style} size={size} name={iconName} color={color} />
      ) :iconFamily === 'Ionicons' ? (
        <Ionicons style={style} size={size} name={iconName} color={color} />
      ) :iconFamily === 'Feather' ? (
        <Feather style={style} size={size} name={iconName} color={color} />
      ) :iconFamily === 'MaterialIcons' ? (
        <MaterialIcons style={style} size={size} name={iconName} color={color} />
      ) : null}
    </View>
  );
};

export default LoadIcon;

const styles = StyleSheet.create({});
