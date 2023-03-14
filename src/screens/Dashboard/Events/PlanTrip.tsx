import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Headers from '../../../components/Dashboard/common/Headers'
import MapView from 'react-native-maps'
import { Styles } from '../../../../assets/styles/GlobalStyles'
import PlanTripActionContainer from '../../../components/Dashboard/chalenges/PlanTripActionContainer'
import { useDispatch } from 'react-redux'
import { ToggleEventTabVisibility } from '../../../redux/reducers/planTrip.reducer'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'

const PlanTrip = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ToggleEventTabVisibility('none'));
    return () => {
      dispatch(ToggleEventTabVisibility('flex'))
    }
  }, []);

  return (
   <SafeAreaView edges={['top']} style={[StyleSheet.absoluteFill ,styles.container]}>
      <PlanTripActionContainer />
      <MapView style={styles.map} />
   </SafeAreaView>
  )
}

export default PlanTrip;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'red'
  },
  map: {
    flex: 1,
  },
  footer: {
    backgroundColor: 'white',
    paddingVertical: responsiveScreenHeight(1),
    paddingHorizontal: responsiveScreenWidth(2)
  }
})