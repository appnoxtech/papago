import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker'
import HeaderWithBackBtn from '../../../components/common/Headers/HeaderWithBackBtn';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Button} from 'react-native-paper';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import {Calendar} from 'react-native-calendars';
import TripsDetailsContainer from '../../../components/Dashboard/chalenges/TripDetailsContainer';
import FullScreenModal from '../../../components/common/modals/FullScreenModal';
import { timestampToLocaleDateConverterFunction } from '../../../utlis/common';
import { useDispatch, useSelector } from 'react-redux';
import { UpdatePlanTripDetails } from '../../../redux/reducers/planTrip.reducer';
import { useNavigation } from '@react-navigation/native';
const TenDay = (86400000*10);

const SelectTripDate = () => {
  const dispatch = useDispatch();
  const Navigation = useNavigation();
  const {startingAt, endingAt} = useSelector((state: any) => state.planTrip);
  const [isStartDateModalVisible, setIsStartDateModalVisible] = useState(false);
  const [isEndDateModalVisible, setIsEndDateModalVisible] = useState(false);
  const [startedAt, setStartedAt] = useState(new Date(startingAt));
  const [ending, setEnding] = useState(new Date(endingAt));
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const startingDateFormatter = () => {
    const tempDate = new Date(startedAt).getTime();
    dispatch(UpdatePlanTripDetails({key: 'startingAt', value: tempDate}));
    setIsStartDateModalVisible(false);
  }

  const endingAtDateFormatter = () => {
    const tempDate = new Date(ending).getTime();
    console.log('tempDate', tempDate);
    dispatch(UpdatePlanTripDetails({key: 'endingAt', value: tempDate}));
    setIsEndDateModalVisible(false);
  }

  useEffect(() => {
    const startDate = new Date(startedAt).getTime();
    const endDate = new Date(ending).getTime();
    const remains = endDate - startDate;
    console.log('isPositive', remains);
    
    if(remains < 0){
      setStartedAt(new Date());
      setEnding(new Date());
    }
  }, [startedAt, ending])
  
  
  return (
    <TripsDetailsContainer title={'When does this challenge start and finish?'}>
      {
        <View style={styles.dateContainer}>
          <View
            style={styles.dateItem}>
            <Text style={styles.dateItemText}>start date</Text>
            <TouchableOpacity 
              onPress={() => setIsStartDateModalVisible(true)} 
              style={styles.date}
            >
              <Text style={styles.dateText}>{timestampToLocaleDateConverterFunction(new Date(startedAt).getTime(), 'dd/mm/yyyy')}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={styles.dateItem}>
            <Text style={styles.dateItemText}>end date</Text>
            <TouchableOpacity onPress={() => setIsEndDateModalVisible(true)} style={styles.date}>
              <Text style={styles.dateText}>{timestampToLocaleDateConverterFunction(new Date(ending).getTime(), 'dd/mm/yyyy')}</Text>
            </TouchableOpacity>
          </View>
          <FullScreenModal
            title='Start date'
            isModalVisible={isStartDateModalVisible}
            setModalVisible={setIsStartDateModalVisible}
          >
            {
              <View style={styles.modalBody}>
                <View style={styles.datePickerContainer}>
                  <DatePicker onDateChange={setStartedAt} minimumDate={new Date(timestampToLocaleDateConverterFunction(new Date().getTime(), 'yyyy-mm-dd'))} mode='date' date={startedAt} />
                </View>
                <View style={styles.btnContainer}>
                   <Button onPress={startingDateFormatter} mode='contained' buttonColor={colorPrimary} style={styles.btn}>
                       <Text>Okay</Text>
                   </Button>
                </View>
              </View>
            }
          </FullScreenModal>
          <FullScreenModal
            title='End date'
            isModalVisible={isEndDateModalVisible}
            setModalVisible={setIsEndDateModalVisible}
          >
            {
              <View style={styles.modalBody}>
                <View style={styles.datePickerContainer}>
                  <DatePicker onDateChange={setEnding} minimumDate={new Date(timestampToLocaleDateConverterFunction(new Date(startedAt).getTime(), 'yyyy-mm-dd'))} mode='date' date={ending} />
                </View>
                <View style={styles.btnContainer}>
                   <Button onPress={endingAtDateFormatter} mode='contained' buttonColor={colorPrimary} style={styles.btn}>
                       <Text>Okay</Text>
                   </Button>
                </View>
              </View>
            }
          </FullScreenModal>
        </View>
      }
    </TripsDetailsContainer>
  );
};

export default SelectTripDate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    paddingTop: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(4.5),
    backgroundColor: 'white',
  },
  textPrimaryContainer: {
    width: responsiveScreenWidth(90),
  },
  textPrimary: {
    fontSize: responsiveFontSize(3.5),
    letterSpacing: 0.4,
    fontWeight: 'bold',
    color: 'black',
  },
  dateContainer: {
    width: responsiveScreenWidth(50),
    marginVertical: responsiveScreenHeight(3),
  },
  dateItem: {
    marginVertical: responsiveScreenHeight(2.5),
    position: 'relative',
  },
  dateItemText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  date: {
    borderWidth: 1.5,
    borderColor: '#eeeeee',
    marginTop: responsiveScreenHeight(1),
    borderRadius: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(1.9),
    paddingHorizontal: responsiveScreenWidth(5),
  },
  dateText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    color: 'black',
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveScreenHeight(2),
  },
  btn: {
    width: responsiveScreenWidth(90),
    paddingVertical: responsiveScreenHeight(0.4),
  },
  btnText: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: '700',
  },
  calender: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'visible',
  },
  modalBody: {
    flex: 1,
    backgroundColor: 'white'
  },
  datePickerContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  }
});
