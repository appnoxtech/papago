import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { colorGrey } from '../../../../assets/styles/GlobalTheme'
import { Styles } from '../../../../assets/styles/GlobalStyles'
import LoadIcon from '../../common/LoadIcon'
import { useNavigation } from '@react-navigation/native'

interface props {
    title: string,
}
const EventDetailsHeader: FC<props> = ({title}) => {
  const Navigation = useNavigation();

  const handelBackBtnPress = () => {
    Navigation.goBack();
  };

  const handelSettingPress = () => {
    Navigation.navigate('EventSetting' as never)
  };

  return (
    <View style={[Styles.bgWhite, styles.container]}>
        <StatusBar
            animated={true}
            backgroundColor="white"
            barStyle={'default'}
            showHideTransition={'slide'}
        />
      <TouchableOpacity onPress={handelBackBtnPress}>
        <LoadIcon iconFamily='Entypo' iconName='chevron-left' size={32} color={'black'} style={{}} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={handelSettingPress}>
       <LoadIcon iconFamily='Feather' iconName='settings' size={28} color={'black'} style={{}} />
      </TouchableOpacity>
    </View>
  )
}

export default EventDetailsHeader

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flexDirection: 'row',
        paddingVertical: responsiveScreenHeight(1.3),
        paddingHorizontal: responsiveScreenWidth(2),
        borderBottomColor: colorGrey,
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      title: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        marginRight: responsiveScreenWidth(1),
      },
})