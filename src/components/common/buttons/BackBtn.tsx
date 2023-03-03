import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';;
import React from 'react';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';;
import AntDesign from 'react-native-vector-icons/AntDesign';
import useNavigate from '../../../hooks/navigation/navigationHook';
// import { useNavigation } from '@react-navigation/native';

const BackBtn: React.FC<any> = () => {
  const NavigateTo = useNavigate();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => NavigateTo('')}>
        <View style={styles.btn}>
          <AntDesign name="left" size={24} color='black' />
        </View>
      </TouchableOpacity>
    </View>
  );;
};

export default BackBtn;

const styles = StyleSheet.create({
  container: {
    paddingVertical: responsiveScreenWidth(1),
  },
  btn: {
    borderRadius: responsiveScreenWidth(3.3),
    borderColor: 'white',
    borderWidth: 0.6,
    paddingVertical: responsiveScreenHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})
