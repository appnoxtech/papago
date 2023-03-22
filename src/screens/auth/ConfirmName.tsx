import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ConfirmDetails from './ConfirmDetails';
import { SignUpService } from '../../services/auth/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ResetAuthDetails, UpdateAuthDetails } from '../../redux/reducers/auth';

const initialState = {
  name: '',
};

const errorInitialState = {
  name: '',
};

const ConfirmName = () => {
  const dispatch = useDispatch();
  const {email, password, userName, name} = useSelector((state: any) => state.authDetails);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const Navigation = useNavigation();
  const changeHandler = ({value}: {value: string}) => {
    dispatch(UpdateAuthDetails({key: 'name', value}))
  };

  const clickHandler = () => {
     if(name){
        setError(false);
        handleClick();
     }else {
        setError(true)
     }
  }

  const handleClick = async () => {
    try {
      setLoading(true);
      await SignUpService({email, password, userName, name});
      setLoading(false);
      dispatch(ResetAuthDetails());
      Navigation.navigate(
        'OTP' as never,
        {email: email, type: 'VERIFY', flow: 'Signup'} as never,
      );
    } catch (error: any) {
      Alert.alert('Notification', error.response.data.errors[0].message);
      setLoading(false);
    }
  };

  return (
    <ConfirmDetails
      data={name}
      subLabel={'What is your name?'}
      error={error}
      changeHandler={changeHandler}
      helpingText={
        'The name you choose here will show on your activities and videos.'
      }
      inputLabel={'Name'}
      clickHandler={clickHandler}
      btnText={'Create account'}
    />
  );
};

export default ConfirmName;

const styles = StyleSheet.create({});
