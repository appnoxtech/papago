import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { cords } from '../../../interfaces/Dashboard/record.interface';
import { colorPrimary } from '../../../../assets/styles/GlobalTheme'
import startPointImage from '../../../../assets/images/Dashboard/Oval.png';
import finishPointImage from '../../../../assets/images/Dashboard/greenMarker.png';
import { dateStartTimeAndEndTime, getTwelveHourTimeBySeconds, parseMillisecondsIntoReadableTime } from '../../../utlis/common';
import ShowViewActivityImages from '../Record/ShowViewActivityImages';

interface props {
    wayPoints: Array<cords>,
    startedAt: number,
    finishedAt: number,
    images: any
}
const ActivityMapPreview: React.FC<props> = ({wayPoints, startedAt, finishedAt, images}) => {
  const mapRef = useRef(null);
  const initialRegion = {
    ...wayPoints[0],
    latitudeDelta: 0.0030,
    longitudeDelta: 0.0020,
  }

  useEffect(() => {
    //@ts-ignore
    mapRef.current.fitToCoordinates(wayPoints, {
        edgePadding: {
            top: 5,
            bottom: 5,
            left: 0,
            right: 0,
        }
    })
  }, [])
  
  
  return (
    <View style={styles.container}>
       <View style={styles.topContainer}>
          <View style={styles.topLeftContainer}>
              <View style={styles.circle}>
                 <SimpleLineIcons name='location-pin' color='white' size={20} />
              </View>
              <View style={styles.verticalLine}></View>
          </View>
          <View style={styles.topRightContainer}>
             <Text style={styles.textPrimary}>Started at {parseMillisecondsIntoReadableTime(startedAt)}</Text>
          </View>
       </View>
       <View style={styles.middleContainer}>
          <MapView ref={mapRef} region={initialRegion} style={StyleSheet.absoluteFill}>
               <Marker image={startPointImage} coordinate={wayPoints[0]} />
               <Marker image={finishPointImage} coordinate={wayPoints[wayPoints.length -1]} />
               <Polyline
                  strokeWidth={3}
                  strokeColor={colorPrimary}
                  coordinates={wayPoints}
                />
          </MapView>
          {/* <MapView style={StyleSheet.absoluteFill} /> */}
       </View>
       {
         images.length ? 
          <ShowViewActivityImages images={images} startingCords={wayPoints[0]}  />
         : null
       }
       <View style={styles.bottomContainer}>
           <View style={styles.bottomLeftContainer}>
              <View style={styles.circle}>
                 <SimpleLineIcons name='flag' color='white' size={20} />
              </View>
              <View style={[styles.verticalLine, styles.bottomVerticalLine]}></View>
           </View>
           <View style={styles.bottomRightContainer}>
              <Text style={styles.textPrimary}>Finished at {parseMillisecondsIntoReadableTime(finishedAt)}</Text>
           </View>
       </View>
    </View>
  )
}

export default ActivityMapPreview

const styles = StyleSheet.create({
    container: {

    },
    topContainer: {
      paddingHorizontal: responsiveScreenWidth(5),
      paddingVertical: responsiveScreenHeight(4),
      flexDirection: 'row',
      borderBottomColor: '#bbbbbb',
      borderBottomWidth: 0.5
    },
    textPrimary: {
        fontSize: responsiveFontSize(2.5),
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    middleContainer: {
        width: '100%',
        height: responsiveScreenHeight(25)
    },
    bottomContainer: {
        borderTopWidth: 0.5,
        borderTopColor: '#bbbbbb',
        flexDirection: 'row',
        paddingHorizontal: responsiveScreenWidth(5),
        paddingVertical: responsiveScreenHeight(4),
    },
    topLeftContainer: {
        
    },
    circle: {
        width: responsiveScreenWidth(10),
        height: responsiveScreenWidth(10),
        borderRadius: responsiveScreenWidth(5),
        backgroundColor: colorPrimary,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    verticalLine: {
        height: responsiveScreenHeight(3),
        width: responsiveScreenWidth(1),
        backgroundColor: colorPrimary,
        position: 'absolute',
        bottom: responsiveScreenHeight(-3),
        left: responsiveScreenWidth(4.5)
    },
    bottomVerticalLine: {
        bottom: responsiveScreenHeight(4.5)
    },
    topRightContainer: {
        paddingHorizontal: responsiveScreenWidth(3),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    bottomLeftContainer: {

    },
    bottomRightContainer: {
        paddingHorizontal: responsiveScreenWidth(3),
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})