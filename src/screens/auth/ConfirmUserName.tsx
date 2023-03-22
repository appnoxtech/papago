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
  const {username} = useSelector((state: any) => state.authDetails);
  const [error, setError] = useState(false);

  const changeHandler = ({value}: {value: string}) => {
    dispatch(UpdateAuthDetails({key: 'username', value}))
  }

  const clickHandler = () => {
     if(username){
        Navigation.navigate('ConfirmName' as never);
        setError(false);
     }else {
        setError(true);
     }
  }

  return (
    <ConfirmDetails
       data={username}
       subLabel={'Create your username'}
       error={error}
       changeHandler={changeHandler}
       helpingText={'Please Choose a unique username for yourself.'}
       inputLabel={'Username'}
       clickHandler={clickHandler}
       btnText={'Next'}
     />
  )
}

export default ConfirmUserName;

const styles = StyleSheet.create({})