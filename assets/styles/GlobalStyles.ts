import {StyleSheet} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';

export const Styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveScreenWidth(2),
  },
  textGrey: {
    textAlign: 'center',
    color: '#8391A1',
  },
  bgWhite: {
    backgroundColor: 'white',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
