import { Alert, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import BackBtn from '../../components/common/buttons/BackBtn';
import TextInputComponent from '../../components/common/inputs/TextInputComponent';
import { inputsHandlerParams } from '../../interfaces/components/inputs';
import BtnPrimary from '../../components/common/buttons/BtnPrimary';
import { resetPassword } from '../../interfaces/auth/authInterface';
import useNavigate from '../../hooks/navigation/navigationHook';
import { ResetPasswordServices } from '../../services/auth/AuthService';

const initialState = {
    password: '',
    confirmPassword: ''
}
const subText = {
    password: '',
    confirmPassword: ''
}
const ConfirmPassword = ({route}: any) => {
    const [inputs, setInputs] = useState(initialState);
    const [subTexts, setSubTexts] = useState(subText);
    const [isActive, setIsActive] = useState(false);
    const {email, otp} = route.params;
    const NavigateTo = useNavigate();

    const handleChange = ({ value, id }: inputsHandlerParams) => {
        setInputs((oldState) => {
            return {
                ...oldState,
                [id]: value,
            }
        });
        validation(value, id)
    };

    const validation = (value: string, id: string) => {
        let state: boolean;
        if(id === 'password' && value === '') {
            state = false;
            setSubTexts({
                ...subTexts,
                password: 'Required !'
            });
        } else if (id === 'password' && value.length < 5) {
            state = false;
            setSubTexts({
                ...subTexts,
                password: 'Password length must be 5 characters !'
            });
        } else if (id === 'confirmPassword' && value === '') {
            state = false;
            setSubTexts({
                ...subTexts,
                password: '',
                confirmPassword: 'Required !'
            });
        } else if (id === 'confirmPassword' && value.length < 5) {
            state = false;
            setSubTexts({
                ...subTexts,
                password: '',
                confirmPassword: 'Password length must be 5 characters !'
            });
        } else if (id === 'confirmPassword' && inputs.password !== value) {
            state = false;
            setSubTexts({
                ...subTexts,
                password: '',
                confirmPassword: 'Password not matched !'
            });
        } else if (id === 'password' && inputs.confirmPassword !== value) {
            state = false;
            setSubTexts({
                ...subTexts,
                password: '',
                confirmPassword: 'Password not matched !'
            });
        } else {
            state = true;
            setSubTexts(subText);
        }
        setIsActive(state);
    };

    const handleClick = async () => {
       try {
        const data: resetPassword = {
           email,
           otp: parseInt(otp, 10),
           password: inputs.password,
        }
        await ResetPasswordServices(data);
        Alert.alert('Password Reset');
        NavigateTo('Login');
       } catch (error) {
         console.log('Error', error);
       }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.headerContainer}>
                        <BackBtn />
                        <View>
                            <Text style={styles.heading}>Reset password</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={styles.primaryText}>Create New Password</Text>
                    <Text style={styles.subText}>Make sure your password is five or more characters long</Text>
                </View>
                <View style={styles.textContainer}>
                    <TextInputComponent
                        label='New Password'
                        id='password'
                        value={inputs.password}
                        handleChange={handleChange}
                        subText=''
                    />
                    <TextInputComponent
                        label='Confirm Password'
                        id='confirmPassword'
                        value={inputs.confirmPassword}
                        handleChange={handleChange}
                        subText=""
                    />
                    <View style={{ marginTop: responsiveScreenHeight(.5) }}>
                        <BtnPrimary
                            label='Reset Password'
                            isActive={isActive}
                            handlePress={handleClick}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default ConfirmPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    heading: {
        // fontFamily: 'NunitoSans-Bold',
        fontSize: responsiveFontSize(2.6),
        textAlign: 'center'
    },
    body: {
        marginVertical: responsiveScreenHeight(2),
        paddingHorizontal: responsiveScreenWidth(4)
    },
    textContainer: {
        paddingHorizontal: responsiveScreenWidth(3)
    },
    primaryText: {
        // fontFamily: 'NunitoSans-SemiBold',
        fontSize: responsiveFontSize(4),
        marginBottom: responsiveScreenHeight(1)
    },
    subText: {
        fontSize: responsiveFontSize(2),
        // fontFamily: 'NunitoSans-Regular',
        opacity: .4
    }
})