import React from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { data } from "../../interfaces/Dashboard/record.interface";
import { colorSecondary } from "../../../assets/styles/GlobalTheme";

interface params {
    Activity: data;
    size: number
}

const RenderActivityIcon = ({Activity, size}: params) => {
    console.log('Activity', Activity);
    if (Activity.iconFamily === 'MaterialCommunityIcons') {
      return (
        <MaterialCommunityIcons
          size={size}
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

export default RenderActivityIcon