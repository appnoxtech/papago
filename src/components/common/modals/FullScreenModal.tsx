import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import ReactNativeModal from 'react-native-modal';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import LoadIcon from '../LoadIcon';

interface props {
  isModalVisible: boolean;
  setModalVisible: any;
  onClose?: any;
  children: any;
  title: string
}
const FullScreenModal: FC<props> = ({
  isModalVisible,
  title,
  setModalVisible,
  onClose,
  children,
}) => {
    
  return (
    <View style={styles.mainContainer}>
      <ReactNativeModal
        isVisible={isModalVisible}
        style={styles.modal}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOutTiming={500}
        animationOut="slideOutDown">
        <SafeAreaProvider>
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <LoadIcon 
                    iconFamily='Entypo'
                    iconName='circle-with-cross'
                    size={28}
                    color={'grey'}
                    style={{}}
                />
              </TouchableOpacity>
              <View style={styles.headerLeftSide}>
                <Text style={styles.header}>{title}</Text>
              </View>
            </View>
            {children}
          </SafeAreaView>
        </SafeAreaProvider>
      </ReactNativeModal>
    </View>
  );
};

export default FullScreenModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  modal: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    margin: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: responsiveScreenWidth(2.3),
    paddingVertical: responsiveScreenHeight(0.5),
  },
  headerLeftSide: {
    width: responsiveScreenWidth(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
});
