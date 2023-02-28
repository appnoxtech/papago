import { StyleSheet, Text, View } from 'react-native';
import Modal from "react-native-modal";
import React from 'react'
import { Button } from 'react-native-paper';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
interface props {
    isVisible: boolean,
}
const BottomSheetModal: React.FC<props> = ({isVisible}) => {
  return (
      <Modal 
       isVisible={isVisible}
       animationIn={'slideInUp'}
       >
          <View style={styles.container}>
             <Text style={styles.primaryText}>Enable GPS to have the best tracking result.</Text>
             <Text style={styles.subText}>Enable GPS to have the best tracking result.</Text>
             <Button
              mode="contained"
              buttonColor={'#34b8ed'}
              style={styles.btn}
             >
                <Text>
                    Open Setting
                </Text>
             </Button>
          </View>
      </Modal>
     )
}

export default BottomSheetModal

const styles = StyleSheet.create({
    container: {
       paddingHorizontal: responsiveScreenWidth(3),
       paddingVertical: responsiveScreenHeight(3)
    },
    primaryText: {
        fontSize: responsiveFontSize(3),
        color: 'black',
        fontWeight: 'bold'
    },
    subText: {
        fontSize: responsiveFontSize(1.5),
        color: 'black',
        opacity: 0.5,
        marginVertical: responsiveScreenHeight(2),
    },
    btn: {
        paddingVertical: responsiveScreenHeight(0.6),
        width: responsiveScreenWidth(50),
      },
})