import {Alert} from 'react-native';

const useHandleError = () => {
   const ErrorHandler = (error: any) => {
    return Alert.alert('Error', error.response.data.errors[0].message);
   }
   return ErrorHandler;
}

export default useHandleError;