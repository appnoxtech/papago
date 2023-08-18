import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ConfirmDetails from './ConfirmDetails'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateAuthDetails } from '../../redux/reducers/auth'

const initialState = {
    userName: ''
}

const ConfirmUserName = () => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const {userName} = useSelector((state: any) => state.authDetails);
  const [error, setError] = useState(false);

  const changeHandler = ({value}: {value: string}) => {
    if(value.length === 0) {
      setError(true);
      dispatch(UpdateAuthDetails({key: 'userName', value}))
    }else {
      setError(false)
      dispatch(UpdateAuthDetails({key: 'userName', value}))
    }
    
  }

  const clickHandler = () => {
     if(userName){
        Navigation.navigate('ConfirmName' as never);
        setError(false);
     }else {
        setError(true);
     }
  }

  return (
    <ConfirmDetails
       data={userName}
       subLabel={'Create your username'}
       error={error}
       changeHandler={changeHandler}
       helpingText={'Please Choose a unique userName for yourself.'}
       inputLabel={'Username'}
       clickHandler={clickHandler}
       btnText={'Next'}
     />
  )
}

export default ConfirmUserName;

const styles = StyleSheet.create({})