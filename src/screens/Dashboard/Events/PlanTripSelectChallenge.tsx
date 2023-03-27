import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import TripsDetailsContainer from '../../../components/Dashboard/chalenges/TripDetailsContainer'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import LoadIcon from '../../../components/common/LoadIcon';
import { colorPrimary } from '../../../../assets/styles/GlobalTheme';
 const data = [
    {
        index: '0',
        iconName: 'arrow-expand',
        iconColor: 'black',
        bgColor: 'green',
        iconFamily: 'MaterialCommunityIcons',
        chalengeType: 'Distance',
        challengeDescription: 'Achieve a set distance within your challenge timeframe.'
    },
    {
        index: '1',
        iconName: 'reload',
        iconColor: 'white',
        bgColor: '#1F456E',
        iconFamily: 'MaterialCommunityIcons',
        chalengeType: 'Duration',
        challengeDescription: 'Spend a certain amount of time on your activites.'
    },
    {
        index: '2',
        iconName: 'height',
        iconColor: 'black',
        bgColor: 'pink',
        iconFamily: 'MaterialIcons',
        chalengeType: 'Elevation',
        challengeDescription: 'Set the elevation gains you want to aim for your activites.'
    },
    {
        index: '3',
        iconName: 'bolt',
        iconColor: 'white',
        bgColor: 'orange',
        iconFamily: 'MaterialIcons',
        chalengeType: 'Number of activities',
        challengeDescription: 'Complete a set number of activities.'
    }
  ];

const Item: FC<any> = ({item, activeIndex, setActiveIndex}) => {
   return (
    <TouchableOpacity onPress={() => setActiveIndex(item?.index)} style={[styles.box, {borderColor: activeIndex === item?.index ? colorPrimary : '#eeeeee'}]}>
    <View style={styles.leftSection}>
      <View style={[styles.iconContainer, {backgroundColor: item?.bgColor}]}>
        <LoadIcon
          iconFamily={item?.iconFamily}
          iconName={item?.iconName}
          color={item?.iconColor}
          style={{}}
          size={30}
        />
      </View>
    </View>
    <View style={styles.rightSection}>
      <Text style={styles.challengeTitle}>{item?.chalengeType}</Text>
      <View style={{marginTop: 5}}>
        <Text style={styles.challengActivityText}>
          {
            item?.challengeDescription
          }
        </Text>
      </View>
    </View>
  </TouchableOpacity>
   )
}

const PlanTripSelectChallenge = () => {
  const [activeIndex, setActiveIndex] = useState('0');

  return (
    <TripsDetailsContainer title={'What type of challenge do you want to create?'}>
        {
           <View>
              <FlatList 
                 data={data}
                 renderItem={({item}) => <Item item={item} activeIndex={activeIndex} setActiveIndex={setActiveIndex}  />}
                 extraData={activeIndex}
                 keyExtractor={item => item.index}
              />
           </View>
        }
    </TripsDetailsContainer>
  )
}

export default PlanTripSelectChallenge

const styles = StyleSheet.create({
    box: {
        borderWidth: 2,
        borderRadius: responsiveScreenWidth(3),
        paddingHorizontal: responsiveScreenWidth(3),
        paddingVertical: responsiveScreenHeight(2),
        marginTop: responsiveScreenHeight(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
      leftSection: {
        width: '10%',
      },
      rightSection: {
        paddingHorizontal: responsiveScreenWidth(3),
        flex: 1,
      },
      iconContainer: {
        width: responsiveScreenWidth(7),
        height: responsiveScreenWidth(7),
        marginVertical: responsiveScreenHeight(0.5),
        borderRadius: responsiveScreenWidth(3.5),
        backgroundColor: '#03C04A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: responsiveScreenWidth(2),
      },
      challengeTitle: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: 'black',
      },
      challengActivityText: {
        fontSize: responsiveFontSize(1.9),
        color: 'black',
        opacity: 0.5,
      },
})