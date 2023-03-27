import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useState } from 'react';
import TripsDetailsContainer from '../../../components/Dashboard/chalenges/TripDetailsContainer';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { UpdatePlanTripDetails } from '../../../redux/reducers/planTrip.reducer';

const PlanTripTitleDescription = () => {
  const dispatch = useDispatch();
  const {title, description} = useSelector((state: any) => state.planTrip);

  const titleChangeHandler = (value: string) => {
    console.log('value', value);
    
    dispatch(UpdatePlanTripDetails({key: 'title', value}))
  }

  const descriptionChangeHandler = (value: string) => {
    dispatch(UpdatePlanTripDetails({key: 'description', value}));
  }

  console.log('title', title);
  console.log('description', description);
  
  

  return (
    <TripsDetailsContainer title={''}>
      {
        <View style={styles.body}>
          <View>
            <View style={styles.textPrimaryContainer}>
              <Text style={styles.textPrimary}>
                Change your challenge details
              </Text>
            </View>
            <View style={styles.textInputContainer}>
              <Text style={styles.inputTitle}>Event Title</Text>
              <TextInput
                style={styles.textInput}
                value={title}
                onChangeText={(text) => titleChangeHandler(text)}
                maxLength={40}
              />
              <View style={styles.textInputFooter}>
                <Text style={styles.textCount}>40</Text>
                <Text style={styles.slash}>{`/`}</Text>
                <Text style={styles.textCount}>{`${title?.length}`}</Text>
              </View>
            </View>
            <View style={styles.textInputContainer}>
              <Text style={styles.inputTitle}>Event Description</Text>
              <TextInput
                style={styles.textInput}
                value={description}
                multiline={true}
                onChangeText={(text) => descriptionChangeHandler(text)}
              />
              <View style={styles.textInputFooter}>
                <Text style={styles.textCount}>500</Text>
                <Text style={styles.slash}>{`/`}</Text>
                <Text
                  style={styles.textCount}>{`${description?.length}`}</Text>
              </View>
            </View>
          </View>
        </View>
      }
    </TripsDetailsContainer>
  );
};

export default PlanTripTitleDescription;

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    textPrimary: {
        fontSize: responsiveFontSize(2.7),
        fontWeight: 'bold',
        color: 'black'
    },
    textInput: {
        paddingHorizontal: responsiveScreenWidth(3),
        paddingVertical: responsiveScreenHeight(1.4),
        borderWidth: 2,
        borderColor: '#eeeeee',
        borderRadius: 7,
        marginVertical: responsiveScreenHeight(0.7),
        fontSize: responsiveFontSize(2.2),
        fontWeight: '400'
    },
    textInputContainer: {
       marginVertical: responsiveScreenHeight(1.5)
    },
    inputTitle: {
        fontSize: responsiveFontSize(1.6),
        color: 'black',
        textTransform: 'uppercase',
        fontWeight: '500',
    },
    textPrimaryContainer: {
        marginVertical: responsiveScreenHeight(1.5)
    },
    textInputFooter: {
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    textCount: {
       fontSize: responsiveFontSize(1.5),
       color: 'grey',
    },
    slash:{
        fontSize: responsiveFontSize(2),
        color: 'grey',
    },
});
