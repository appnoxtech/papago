import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { inputsHandlerParams } from '../../../interfaces/components/inputs';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { colorPrimary } from '../../../../assets/styles/GlobalTheme';

interface props {
    value: string,
    handleChange: any,
    label: string,
    id: string,
    subText: string
}

const TextInputComponent: React.FC<props> = ({ value, handleChange, label, id, subText = '' }) => {

    return (
        <View style={{paddingHorizontal: responsiveScreenWidth(1)}}>
            <TextInput
                mode='outlined'
                style={styles.inputs}
                label={label}
                activeOutlineColor={colorPrimary}
                value={value}
                textColor={'#8391A1'}
                onChangeText={text => handleChange({ value: text, id })}
            />
            <Text style={[styles.textGrey]}>
                {subText}
            </Text>
        </View>

    )
}

export default TextInputComponent;

const styles = StyleSheet.create({
    inputs: {
        backgroundColor: 'white',
        color: '#8391A1'
    },
    textGrey: {
        marginTop: responsiveScreenHeight(.2),
        fontSize: responsiveFontSize(1.5),
        color: '#8391A1'
    },
})